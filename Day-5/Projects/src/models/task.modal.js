import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema(
    {
        content : {
            type : String,
            require : true,
        },
        endDate : {
            type : Date,
            require : true,
        }
    },
    {
        timestamps : true,
    }
)

export const Task = mongoose.model("Task", taskSchema)