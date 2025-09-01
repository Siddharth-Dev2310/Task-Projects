import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import { User } from "../models/user.models.js";
import { Address } from "../models/addresses.models.js";
import { Orders } from "../models/orders.models.js";

const generateAccessAndRefreshTokens = async(userID) => {
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

const options = {
    httpOnly : true,
    secure: true
}

const createUser = asyncHendler( async (req, res) => {
    //! : req.body -> {username, fullname, email, phone, address, orders, password, profilePictue}
    //* : Add The VAlidation any are empty or not
    //! : check The User is Already Exsting Or Not
    //* : Create The User Objects
    //! : check The User Are Create or not ?
    //* : Return The Created user

    const {username, fullname, email, phone, password, profilePictue, pincode, country, city, state, addressLine1, addressLine2} = req.body;

    if([username, fullname, email, phone, password, pincode, country, city, state, addressLine1].some( (fileds) => fileds.trim() === '' )){
        throw new ApiError(400, "Please Fill The All Details")
    }

    const exisrtedUser = await User.findOne(
        {
            $or : [{email}, {username}]
        }
    )

    if(exisrtedUser){
        throw new ApiError(401, "User Alrady existing")
    }

    const addreshCreate = await Address.findOne({
        fullName : fullname.toLowerCase(),
        phoneNumber : phone,
        pincode,
        country,
        city,
        state,
        addressLine1,
        addressLine2
    }) || await Address.create({
        fullName : fullname.toLowerCase(),
        phoneNumber : phone,
        pincode,
        country,
        city,
        state,
        addressLine1,
        addressLine2
    })

    if(!addreshCreate){
        throw new ApiError(400, "Error : Addresh Creation")
    }

    const user = await User.create({
        username : username.toLowerCase(),
        email : email.toLowerCase(),
        fullname,
        phone,
        address : addreshCreate?._id,
        orders : null,
        password,
        profilePictue,
        product_Details : null
    })

    const createUser = await User.findById(user?._id);

    if(!createUser){
        throw new ApiError(500, "Somting Went Wrong!")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    createUser,
                    "User Create Succfully"
                )
            )
})

const loginUser = asyncHendler( async (req, res) => {
    //! : Logic for user login
    //* : req.body -> { email, username, password }
    //? : Validate the data
    //! : Check if the user exists
    //* : If user exists, check the password
    //? : If password matches, generate tokens
    //! : Return the user data without password and refreshToken
    //* : Return the response


    const {email, username, password} = req?.body;

    if(!email && ! username){
        throw new ApiError(400, "Email Or Username Must Be Require")
    }

    if (!password) throw new ApiError(401, "Password Must Be Require")

    const user = await User.findOne({
        $or : [
            {email : email?.toLowerCase()},
            {username : username?.toLowerCase()}
        ]
    })

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
        throw new ApiError(401, "Invalid Password")
    }

    const { accessToken, refreshToken} = await generateAccessAndRefreshTokens(user?._id)

    const loggedInUser = await User.findById(user?._id).select("-password -refreshToken") 

    if(!loggedInUser){
        throw new ApiError(401, "User not Found")
    }

    return res
            .status(200)
            .cookie("refreshToken", refreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    201,
                    {user: loggedInUser, refreshToken, accessToken},
                    "User LoggedIn Succfully"
                )
            )
})

const loogedoutUser = asyncHendler(async (req, res) => {
    //! : user is logged in or not
    //? : if user is logged in then remove the refresh token from the database
    //* : and clear the cookies
    //? : return the response

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset : {
                refreshToken : 1
            }
        },
        { new : true}
    )

    return res
            .status(200)
            .clearCookie("refreshToken", options)
            .clearCookie("accessToken", options)
            .json(
                new ApiResponse(
                    201,
                    {},
                    "User LoggedIn Succfully"
                )
            )
})

const updateUserDetails = asyncHendler(async (req, res) => {
    //? : req.body -> { fullName, email, username}
    //! : Validate the data
    //* : Check if the user exists
    //? : If user exists, update the details
    //! : Return the response

    const {fullname, email, username, phone} = req.body;

    if(!fullname || !email || !username || !phone){
        throw new ApiError(401, "All Fildes Are Required")
    }

    const updadtedUser = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set : {
                email : email.toLowerCase(),
                username : username.toLowerCase(),
                fullname,
                phone
            }
        },
        {
            new : true, runValidators: true
        }
    )

    if(!updadtedUser){
        throw new ApiError(500, "Sorry Can't Updated That Details ! Somthings Went Wrongs")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    201,
                    {user: updadtedUser},
                    "User LoggedIn Succfully"
                )
            )
})

const getOrdersCountPerCustomer = asyncHendler(async(req,res) => {
    //* : User The aggregate On The Oder 
    //? : Group The Id and OrderCount
    //! : lookup The Fildes -> UserDetails
    //* : unwind The UserDetails Object
    //? : collect All The fildes on One Object Project
    //* : Add The Validation Object Create Or not
    //! : return The Object

    const result = await Orders.aggregate([
        {
            $group : {
                _id : "$user",
                orderCount : {$sum : 1}
            }
        },
        {
            $lookup : {
                from : "users",
                localField : "_id",
                foreignField : "_id",
                as : "userDetails"
            }
        },
        {
            $unwind : "$userDetails"
        },
        {
            $project : {
                _id : 0,
                userID : "$userDetails?._id",
                username : "$userDetails?.username",
                fullname : "$userDetails?.fullname",
                orderCount : 1
            }
        }

    ]);

    if(!result){
        throw new ApiError(500, "Order Count Can't Found")
    }

    return res.status(200).json(new ApiResponse(200, result, "Result sussfully Found"))
})

export {createUser, loginUser, loogedoutUser, updateUserDetails, getOrdersCountPerCustomer}