import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        username : {
            type : String,
            require: true,
            unique : true,
            lowerCase : true,
            index : true
        },
        
        fullName : {
            type : String,
            require: true,
        },

        tasks : [
            {
                type : mongoose.Schema.Types.ObjectId,
                ref : "Task"
            }
        ]
    },
    { 
        timestamps :true
    }
)

export const User = mongoose.model("User", userSchema);