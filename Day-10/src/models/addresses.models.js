import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
        trim: true
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },

    pincode: {
        type: String,
        required: true,
        trim: true
    },

    country: {
        type: String,
        required: true,
        trim: true
    },

    city : {
        type: String,
        required: true,
        trim: true
    },

    state: {
        type: String,
        required: true,
        trim: true
    },

    addressLine1: {
        type: String,
        required: true,
        trim: true
    },
    
    addressLine2: {
        type: String,
        trim: true
    },
})

export const Address = mongoose.model("Address", addressSchema);