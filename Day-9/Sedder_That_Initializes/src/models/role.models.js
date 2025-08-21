import mongoose, {Schema} from "mongoose";

const roleSchema  = new Schema(
    {
        name : {
            type : String,
            require : true,
            toUpperCase : true
        },

        modules : [
            {
                type : Schema.Types.ObjectId,
                ref : "Modules"
            }
        ]
    },
    {
        timestamps : true
    }
)

export const Role = mongoose.model("Role", roleSchema);