import { DB_NAME } from "../constants.js";
import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)

        console.log(`\n MongoDB Connected !! DB Host: ${connectionInstance.connection.host}`);
        console.log(` Database Name: ${connectionInstance.connection.name}`);
        
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);  
    }
}

export {connectDB};