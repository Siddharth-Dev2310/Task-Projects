import { ApiError } from "../utils/ApiError.js"
import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"
import { asyncHendler } from "../utils/asyncHendler.js"

export const verifyJWT = asyncHendler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        
        if(!token){
            throw new ApiError(401, "Unauthorization")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if(!decodedToken){
            throw new ApiError(400, "Token Can not Be Decoded")
        }

    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        console.log("user", user);
    
        if(!user){
            throw new ApiError(401, "Invalid access Token")
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Acceess Token")
    }

})