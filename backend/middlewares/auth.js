import User from "../models/userModel.js";
import { asyncHandler } from "../util/asyncHandler.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../util/apiError.js";

if(!process.env.Secret_Key){
throw new Error("Secret_Key is not defined in environment variables");
}

export const auth=asyncHandler(async(req, _, next)=>{
const token=req.header("Authorization")?.replace("Bearer ","");
if(!token){
    return res.status(401).json({message:"No token provided"}); 
}
let decoded;
  try {
   decoded = jwt.verify(token, process.env.Secret_Key);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Access token expired"));
    } else if (error.name === "JsonWebTokenError") {
      return next(new ApiError(401, "Invalid token signature"));
    } else {
      return next(new ApiError(401, error.message || "Invalid access token"));
    }
  }
    const user = await User.findById(decoded.id).select("-password").lean();
  if (!user) {
    return next(new ApiError(401, "Invalid token or user not found"));
  }

  req.user = user;
  req.token = token;
  next();
});

export const adminOnly = asyncHandler(async (req, res, next) => {

if (!req.user) {
  throw new ApiError(401, "Unauthorized");
}

if (req.user.role !== "admin") {
  throw new ApiError(403, "Admin access only");
}

next();

});