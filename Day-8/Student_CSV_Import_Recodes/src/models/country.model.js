import mongoose, {Schema} from "mongoose";

const countrySchema = new Schema(
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

export const Country = mongoose.model("Country", countrySchema)