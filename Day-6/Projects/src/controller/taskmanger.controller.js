import { asyncHendler } from "../utils/asyncHendler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.modal.js";
import { Task } from "../models/task.modal.js";

const createUserOfTask = asyncHendler( async (req, res) => {
    // Validation The Req -> Body
    // User And Task Can Marge The With The pipe Line 
    // Can add The Some Filed 
    // Can Creeate The Both Of The Object 
    // crete The Object (User, Tasks) , Store
    // Return Object
    
    const {username , fullName ,tasks } = req.body;

    if(!username && !fullName && !tasks?.[0]?.content && !tasks?.[0]?.endDate){
        throw new ApiError(400, "Please Enter The Values")
    }

    const { content , endDate } = tasks[0];

    if(!content && !endDate) {
        throw new ApiError(400, "Please Enter The Values")
    }

    const newTask = await Task.create( {
        content,
        endDate
    });
    
    if(!newTask){
        throw new ApiError(400 , "Can't Create The new Task")
    }

    const createUser = await User.create(
        {
            username : username?.toLowerCase(),
            fullName : fullName,
            tasks : [newTask?._id]
        }
    )


    if(!createUser){
        throw new ApiError(400 , "Can't Create The User")
    }

    const populateUser = await User.findById(createUser?._id)
    .select("username fullName tasks")
    .populate(
        {
            path: "tasks",
            select: "content endDate createdAt updatedAt"
        }
    )

    

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    populateUser,
                    "User Create Succfully"
                )
            )
})

const updateUserOfTask = asyncHendler(  async (req, res) => {
    const {username, fullName, tasks} = req.body;

    if(!username && !fullName){
        throw new ApiError(200, "Please Enter The value username and fullName!")
    }

    const { content , endDate } = tasks[0];

    if(!content && !endDate){
        throw new ApiError(200, "Please Enter The value content and endDate!")
    }

    const user = await User.findOne( {username: username.toLowerCase() })

    console.log("user:" , user);
    

    if(!user){
        throw new ApiError(200, "User Can not Find")
    }


    const newTask = await Task.create({
        content,
        endDate
    })
    
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        {
            fullName,
            $push: { tasks: newTask._id }
        },
        {
            new: true // return the updated document
        }
    ).select("username fullName tasks")
     .populate({
         path: "tasks",
         select: "content endDate createdAt updatedAt"
     });

    if(!updatedUser){
        throw new ApiError(400, "User Can Not Update!")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    updatedUser ,
                    "Succfully User And Task Can Updated"
                )
        )
})

const showTheUserWithTask = asyncHendler ( async (req, res) => {
    const {username} = req.body;

    if(!username){
        throw new ApiError(400, "Sorry Can Pass The username Other Wish You Can Not Read The Data")
    }

    const user = await User.findOne( {username: username.toLowerCase() }).select("username fullName tasks")
     .populate({
         path: "tasks",
         select: "content endDate createdAt updatedAt"
     });

     if(!user){
        throw new ApiError(200, "User Can not Find")
     }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    user,
                    "Succfully Find THe User"
                )
        )
    
})

const deletedUserOfTask = asyncHendler( async ( req, res ) => {
    const {username} = req.body;

    if(!username){
        throw new ApiError(400," please Enter The Username")
    }

    const user = await User.findOne({username : username.toLowerCase()});

    if(!user){
        throw new ApiError(402, "User Can not Find");
    }

    const deletedUser = await User.findByIdAndDelete(
        user?._id
    )

    if(!deletedUser){
        throw new ApiError(400, "User can not Deleted")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "Delet User Succfully"
                )
        )
})

export {createUserOfTask, updateUserOfTask, showTheUserWithTask, deletedUserOfTask}    