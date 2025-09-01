import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.models.js";
import { validateUserInput, validateSuperAdminExists, validateUserNotExists } from "../validation/user.validation.js";
import {Role} from "../models/role.models.js"
import {Modules} from "../models/modules.models.js"

const generateAccessAndRefereshTokens = async(userID) => {
    console.log("userID:", userID);
    
    try {
        const user = await User.findById(userID);
        const accessToken = user.generateAccessToken()

        
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave : false });

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Error generating access and refresh tokens");
    }
}

const givenmodules =  async (role) => {
    const allModules = await Modules.find({});

    const getId = name => allModules.find(m => m.name === name)?._id

    if(role === "SUPER_ADMIN" || role === "ADMIN"){
        return allModules.map(m => m?._id)
    }

    if(role === "DOCTOR"){
        return [
            getId("Patient Records"),
            getId("Appointments"),
            getId("Reports & Analytics")
        ].filter(Boolean)
    }

    if(role === "PATIENT"){
        return [getId("Patient Records")].filter(Boolean)
    }

    return []
}

const createUser = asyncHendler( async (req, res) => {
    //! : collect The Data form The user(Req.body) -> fullname, password, username, email, role, modules,
    //? : Add The Validation All The Fildes Empty Or Not?
    //! : Check The User is alrady Exsting Or Not  
    //? : Create The role and modules Object 
    //! : final create The User Object also The Can add The Ids Of The Role And Modules 
    //? : Return The Object Of the User
    
    const {fullname,username,email, password, role} = req.body;
    
    try {
        await validateSuperAdminExists(User);
        validateUserInput({ fullname, username, email, password, role });
        await validateUserNotExists(User, username);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    if (["DOCTOR", "PATIENT"].includes(role?.toUpperCase())) {
        if (!req.user || !req.user.role) {
            throw new ApiError(403, "Authentication required to create DOCTOR or PATIENT users.");
        }
        
        const userRoleDoc = await Role.findById(req.user.role);
        if (!userRoleDoc || !["ADMIN", "SUPER_ADMIN"].includes(userRoleDoc.name)) {
            throw new ApiError(403, "Only ADMIN or SUPER_ADMIN can create DOCTOR or PATIENT users.");
        }
    }

    const moduleIds = await givenmodules(role.toUpperCase())
    const roleDoc = await Role.findOne({name : role?.toUpperCase()}) || 
    await Role.create({
        name : role.toUpperCase(),
        modules : moduleIds
    })
    
    const user = await User.create({
        fullname,
        username : username.toLowerCase(),
        email : email.toLowerCase(),
        password,
        role : roleDoc._id
    })

    const createdUser = await User.findById(user._id)
        .select("-password -refreshToken")
        // .populate({path : "modules", select : "name"})
        .populate({path : "role", select : "name modules"})

    if(!createdUser){
        throw new ApiError(500, "Somting Went Wrong")
    }

    res.status(200)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "User Sussfully Created"
            )
        )
    
})

const sedderSuperAdminCreated = asyncHendler( async (req, res) => {
    //! Check In To The Database Can Empty  Or Not 
    //? : If THe Database Can Have THe Empty Create The SuperEdmin
    //! : Make Sure Super Admin has Been Only and Only Can One On THe enire Data Set
    //? : collect The Data form The user(Req.body) -> fullname, password, username, email, role, modules
    //! : Check The Empty Of not Add This Validation
    //? : Create THe SuperAdmin Object For 
    //! Return The SuperAdmin 


    const superAdmin = await User.find();
    console.log("superAdmin:", superAdmin);
    if( superAdmin.length == 0 ){

        const modulesArr = ["User Management", "Patient Records", "Appointments", "Reports & Analytics"]

        const moduleDocs = await Modules.insertMany(modulesArr.map(name => ({ name })));
        const moduleIds = moduleDocs.map(doc => doc._id);

        const roleObjId = await Role.create({
            name: "SUPER_ADMIN", modules: moduleIds
        })

        const createSA = await User.create({
            fullname : process.env.SUPER_ADMIN_FULLNAME,
            username : process.env.SUPER_ADMIN_USERNAME,
            email : process.env.SUPER_ADMIN_EMAIL,
            password : process.env.SUPER_ADMIN_PASSWORD,
            role : roleObjId._id
        })

        if(!createSA){
            throw new ApiError(500, "Sorry, Super Admin Can Not Cerated");
        }

        const createdSuperAdmin = await User.findById(createSA?._id)
            .select("-password -refreshToken")
            .populate({path : "role", select : "name"})

        if(!createdSuperAdmin){
            throw new ApiError(500, "Somting Went Wrong")
        }

        res.status(200)
           .json(
               new ApiResponse(
                 200,
                 createdSuperAdmin,
                 "Super Admin Has Been Created"
                )
            )

    } else if (superAdmin.length > 0) {
        //? if SuperAdmi Can HAve alrady in the Data Basa
        //! Check Using The Email find THe SuperAdmin 
        //? return The Super Admin

        const superAdminFind = await User.findOne({email : "superadmin@example.com"})
            .select("-password -refreshToken")
            .populate({path : "role", select : "name"})
        

        res.status(200)
            .json(new ApiResponse(
                200,
                superAdminFind,
                "Super User Can Find"
            ))
    } 
    else {
        res
          .status(400)
          .json(
            new ApiResponse(
                400,
                {},
                "Can Not Find The Any Data So You Can Try Again!"
            )
          )
    }                                                        
})

const loginUser = asyncHendler(async (req, res) => {
    //? : Collact The Form The User :- Username , Password,
    //! : Check The SuperAdmin have or not?
    //? : Login The Get The validation User Are Exstinng Or Not?
    //! : Find THe User 
    //? : Check The Password 
    //! : Add The Filds Aggregat Roles
    //? : Access and Reffrec Token Given
    //! : Send Cookies
    
    const {username,email, password} = req.body;

    try {
        await validateSuperAdminExists(User);
    } catch (err) {
        throw new ApiError(400, err.message);
    }

    if(!username && !email){
        throw new ApiError(400, "Username or Email Are requires")
    }

    const exisrtedUser =  await User.findOne(
        {
            $or: [{username} , {email}]
        }
    )

    if(!exisrtedUser){
        throw new ApiError(400, "User Not Exist")
    }

    const isPasswordCorrect = await exisrtedUser.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid Password")
    }
    
    const user = await User.aggregate([
        {
            $match : {
                username : username?.toLowerCase()
            }
        },
        {
            $lookup : {
                from : "roles",
                localField : "role",
                foreignField : "_id",
                as : "roles_Details",
                pipeline : [
                    {
                        $lookup : {
                            from : "modules",
                            localField : "modules",
                            foreignField : "_id",
                            as : "modules_Details"
                        },
                        
                    },
                    {
                        $project : {
                            name : 1,
                            modules : 1,
                            modules_Details : {  name : 1}
                        }
                    }
                ]
            }
        },
        {
            $project : {
                fullname : 1,
                username : 1,
                roles_Details : 1,
                email : 1,
                password : 1,
            }
        }
    ])
    
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(exisrtedUser._id);
    
    const options = {
        httpOnly : true,
        secure: true
    }  

 return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user : user[0], accessToken, refreshToken
            },
            "User Logged In Successfully"
        )
    )  
})

const updateUserDetails = asyncHendler(async (req, res) => {
    //! : Collect The Values Form The Req.body
    //? : and Find By Id and Update the VAlues
    //! : Use THe Middleware THe Find THe USer 
    //? : Return The User Updated Details

    const {fullname, email, username} = req.body;

    if(!fullname || !email || !username) {
        throw new ApiError(400, "Fullname, Email and Username Are Requied")
    }

    const updeteduser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                fullname : fullname.toLowerCase(),
                email : email.toLowerCase(),
                username : username.toLowerCase(),
            }
        }, { new :  true}
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, updeteduser, "Account details updated successfully"))
})

export {createUser, sedderSuperAdminCreated, loginUser, updateUserDetails}