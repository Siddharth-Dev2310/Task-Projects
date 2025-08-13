import mongoose, {Schema} from "mongoose";

const courseSchema = new Schema(
    {
        name : {
            type : String,
            unique : true,
            require : true
        }
    },
    {
        timestamps : true
    }
)

export const Course = mongoose.model("Course", courseSchema)