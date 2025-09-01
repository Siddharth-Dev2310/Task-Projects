import mongoose, {Schema} from "mongoose"

const userSchema = new Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true,
            index : true
        },

        age : {
            type : Number,
            require : true,
            trim : true,
        },

        course : {
            type : String,
            require : true,
        }
    } , 
    { 
        timestamps : true 
    }
)

export const User = mongoose.model( "User" , userSchema );