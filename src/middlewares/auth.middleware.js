const jwt = require("jsonwebtoken")
const {ApiError} = require("../utils/ApiError")
const {ApiResponse} = require("../utils/ApiResponse");
const UserModel = require("../models/user.model");

const authMiddleware = async (req, res, next)=>{
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    if(!token){
        return res.status(403).json(new ApiError(403, [], "Token Not found - Unauthorized request"))
    } 
 
    try {
        const decode =jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await UserModel.findById(decode._id);
        if(!user){
            return res.status(404).json(new ApiError(404, [], "User Not found - please signup or sign first"))
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json(new ApiError(500, [], "Unable to verify the access token or incorrect accesstoken please login again"))
    }
}

module.exports = {authMiddleware};