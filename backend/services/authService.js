import User from "../models/userModel.js";
import { ApiError } from "../util/apiError.js";
import { generateAccessToken, generateRefreshToken } from "../util/token.js";

export const registerUser=async({name,email,password})=>{

const existing =await User.findOne({email});
if(existing){
    throw new ApiError(400,"User already exists");
}
const hashedPassword=bcrypt.hashSync(password,bcrypt.genSaltSync(10));
const user=await User.create({name,email,password:hashedPassword});
const safeUser=await User.findById(user._id).select("-password");
return safeUser;

}

export const loginUser=async({email,password})=>{
const user=await User.findOne({email});
if(!user){
    throw new ApiError(400,"Invalid email or password");
}
const isMatch=bcrypt.compareSync(password,user.password);
if(!isMatch){
    throw new ApiError(400,"Invalid email or password");
}
const accessToken=generateAccessToken(user._id);
const refreshToken=generateRefreshToken(user._id);
user.refreshToken=refreshToken;
await user.save();
const safeUser=await User.findById(user._id).select("-password");

return {accessToken,refreshToken,user:safeUser};
}

export const refreshAccessToken=async(refreshToken)=>{
    if(!refreshToken){
        throw new ApiError(401,"Refresh token is required");        
    }

const decoded=jwt.verify(refreshToken,process.env.Refresh_Secret_Key);
const user=await User.findById(decoded.id);
if(!user || user.refreshToken!==refreshToken){
    throw new ApiError(401,"Invalid refresh token");    
}
const accessToken=generateAccessToken(user._id);
const newRefreshToken=generateRefreshToken(user._id);
user.refreshToken=newRefreshToken;
await user.save();  
return {accessToken,refreshToken:newRefreshToken};
}


export const logoutUser=async(userId)=>{
    const user=await User.findById(userId);
    if(user){
        await user.findByIdAndUpdate(userId,{refreshToken:null});
    }   
    return true;
};