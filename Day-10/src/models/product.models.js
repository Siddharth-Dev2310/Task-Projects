import mongoose,{Schema} from "mongoose";

const productSchema = new Schema(
    {
        productName : {
            type : String,
            require : true
        },

        descripstion : {
            type : String,
            require : true
        },

        price : {
            type : Number,
            require : true
        },

        stock : {
            type : String,
            require : true
        },

        productImage : {
            type : String,
            // require : true
        },

        onwer : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }
    },
    {
        timestamps : true
    }
)

export const Product = mongoose.model("Product", productSchema)