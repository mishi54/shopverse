import User from "../models/userModel";
import { asyncHandler } from "../util/asyncHandler";


if(!process.env.JWT_SECRET){
throw new Error("JWT_SECRET is not defined in environment variables");
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
    const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    return next(new ApiError(401, "Invalid token or user not found"));
  }

  req.user = user.toObject();
  req.token = token;
  next();
});
