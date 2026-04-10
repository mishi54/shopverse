import User from "../models/userModel";
import { asyncHandler } from "../util/asyncHandler";
import jwt from "jsonwebtoken";
import { ApiError } from "../util/apiError";

if(!process.env.JWT_SECRET_KEY){
throw new Error("JWT_SECRET_KEY is not defined in environment variables");
}

export const auth=asyncHandler(async(req, _, next)=>{
const token=req.header("Authorization")?.replace("Bearer ","");
if(!token){
    return res.status(401).json({message:"No token provided"}); 
}
let decoded;
  try {
   decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
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