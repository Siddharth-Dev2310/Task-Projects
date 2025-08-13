import { ApiError } from "../utils/ApiError.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import fs from "fs"
import { registerUserSchema } from "../validation/user.validation.js";

const createStudent = asyncHendler( async (req, res) => {
    // Req.body -> Taken The Json Form The user,
    // implements The Validation Form The name , Age, Course
    // check Student Exist Or Not : name
    //create The Student object - create The Entry Of the DB
    //Chekck The Student Create or Not?
    // Return the Object

    const result = registerUserSchema.safeParse(req.body);

    if(!result.success){
        throw new ApiError(400, result.error.errors.map(e => e.message).join(", "))
    }

    const {name, age, course} = result.data;

    const exisrtedUSer = await User.findOne(
        {
            $or : [{name} , {age}]
        }
    )

    if(exisrtedUSer){
        throw new ApiError(400, "Student Alrady Exist!")
    }

    const user = await User.create({ 
        name,
        age,
        course
    })

    const createdUser = await User.findById(user?._id);
    

    if(!createdUser){
        throw new ApiError(500, "Somthing Went Wrong ! While Registering The Student")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    createdUser,
                    "Student Succesfully Created"
                )
            )
})

const updateStudent = asyncHendler(async (req, res) => {
    // req.body ->  name, age, course
    // validate flides Can empty Or not
    // find The user
    // update the user
    //return The new User

    const { name } = req.body;

    if(!name){
        throw new ApiError(400, "Please Enter The Name");
    }

    const user = await User.findOne({
        $or : [{name}]
    })
    
    if(!user){
        throw new ApiError(401, "Student Can not existing!")
    }

    const {age , course} = req.body;

    if(!name && !age && !course){
        throw new ApiError(400,"Please Enter The Fildes!")
    }

    const updetedUser = await User.findByIdAndUpdate(
        user?._id,
        {
            $set : {
                name,
                age,
                course
            }
        }
    )

    if(!updetedUser){
        throw new ApiError
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    updetedUser,
                    "Student Update Scussfully"
                )
            )
} )

const deleteStudent = asyncHendler( async ( req, res) => {
    // add The Validate name Filed Empty Or Not
    // find The Student using The name,
    // Enter remove Form the DB
    // validate If not Delet Given The Error
    // Send The res to User sccussflly delete

    const {name} = req.body;

    if(!name){
        throw new ApiError(400,  " Please The name its Required Filde!")
    }

    const user = await User.findOne({
        $or : [{name}]
    })

    if(!user){
        throw new ApiError(401, "Student Can not Existing")
    }

    const deletedUser = await User.findByIdAndDelete(user?._id)

    if(!deletedUser){
        throw new ApiError(500,"Student Can't Not Deleted! Somting Went Wrong")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    deleteStudent,
                    "Student Succesfully Deleted"
                )
            )
})

const searchStudent = asyncHendler(async ( req, res) => {
    const {name} = req.body;

    if(!name){
        throw new ApiError(400,  " Please The name its Required Filde!")
    }

    const user = await User.find(
        {
            name : {
                $regex : name, $options : 'i'
            }
        }
    )

    if(!user){
        throw new ApiError(401, "Student Can not Existing")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    user,
                    "Student Succesfully Found"
                )
            )
})

const viewAllStudent = asyncHendler(async (req, res) => {

    const users = await User.find();

    if(!users){
        throw new ApiError(401, "Students Can Not Exisitng!")
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    users,
                    "All Studentes Found"
                )
            )

} )

const sortStudent =  asyncHendler( async (req, res) => {
    
    const users = await User.find().sort({createdAt : -1})

    if(!users){
        throw new ApiError(
            401 , "Users Can not Found"
        )
    }

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    users,
                    "Sort All The Students"
                )
            )
})

const exportStudentList = asyncHendler( async (req, res) => {
    
    // const createFile = fs.createWriteStream("Student.txt")
    
    // const users = await User.find({});

    // if(!users){
    //     throw new ApiError(401, "Students Can Not Exisitng!")
    // }

    // const writeFile = createFile.write(users);

    // if(!writeFile){
    //     throw new ApiErro(400, "Can't Write The Data")
    // }


    const users = await User.find({})

    let jsondata = JSON.stringify(users,null,2)

    const writeFile = fs.writeFile("Student.txt" ,jsondata, (error,data)=>{
        if(error){
            console.log(error)
        }
        return res.json({
            message: 'file created successfully'
        })
    })

    return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    {users, writeFile},
                    "All Studentes Found"
                )
            )
})

const importFile =  asyncHendler(async (req, res) => {
    
} )

export {
    createStudent, 
    updateStudent, 
    deleteStudent, 
    searchStudent, 
    viewAllStudent, 
    sortStudent,
    exportStudentList
}