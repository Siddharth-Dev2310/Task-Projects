import mongoose, {Schema} from "mongoose";

const citySchema = new Schema(
    {
        name : {
            type : String,
            require : true,
            trim : true
        },

        state : {
            type: Schema.Types.ObjectId,
            ref : "State",
            require : true
        }
    },
    {
        timestamps : true
    }
)

export const City = mongoose.model('City', citySchema)