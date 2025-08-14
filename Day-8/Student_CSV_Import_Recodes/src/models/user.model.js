import mongoose, {Schema} from "mongoose";

const userSchme = new Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true ,
            index : true,
        },

        email : {
            type : String,
            require : true,
            trim : true ,
        },

        phone : {
            type : String,
            require : true,
            unique : true
        },

        country : {
            type : Schema.Types.ObjectId,
            ref: "Country"
        },

        state : {
            type : Schema.Types.ObjectId,
            ref : "State"
        },

        city : {
            type : Schema.Types.ObjectId,
            ref : "City"
        },

        course : [
            {
                type: Schema.Types.ObjectId,
                ref : "Course"
            }
        ]
    },
    {
        timestamps : true
    }
)

export const User = mongoose.model("User", userSchme)