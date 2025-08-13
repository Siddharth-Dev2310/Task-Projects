import mongoose, {Schema} from "mongoose";

const citySchema = Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true
        },

        state : {
            type: Schema.Types.ObjectId,
            ref : true,
            require : true
        }
    }
)

export const City = mongoose.model('City', citySchema)