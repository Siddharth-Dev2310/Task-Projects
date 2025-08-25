import mongoose,{Schema} from "mongoose";

const odersSchema = new Schema(
    {
        user : {
            type : Schema.Types.ObjectId,
            ref : "User"
        },

        oderItems : [
            {
                productName : {
                    type : Schema.Types.ObjectId,
                    ref : "Product"
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1
                }
            }
        ],

        shippingAddress : [
            {
                type : Schema.Types.ObjectId,
                ref : "Address"
            }
        ],

        orderStatus: {
            type: String,
            enum: ["pending", "shipped", "delivered", "cancelled"],
            default: "pending"
        },

        totalPrice: {
            type: Number,
            required: true,
            validate: {
                validator: function(value) {
                    return value >= 0;
                },
                message: "Total price must be non-negative"
            }
        },
    },
    {
        timestamps : true
    }
)

export const Orders = mongoose.model("Orders", odersSchema);