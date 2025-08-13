import mongoose,{Schema} from "mongoose";

const stateSchema = new Schema(
    {
        name : {
            type : String,
            require: true,
            trim : true
        },

        country : {
            type : Schema.Types.ObjectId,
            ref : "Country"
        },
    },
    {
        timestamps : true
    }
)

export const State = mongoose.model("State", stateSchema)