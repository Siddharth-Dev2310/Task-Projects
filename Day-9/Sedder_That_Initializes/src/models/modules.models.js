import mongoose,{Schema} from "mongoose";

const modulesSchema = new Schema(
    {
        name : {
            type : String,
            require : true
        }  
    },
    {
        timestamps : true
    }
)

export const Modules = mongoose.model("Modules", modulesSchema);