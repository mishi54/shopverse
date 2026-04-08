import User from "../models/userModel.js";
import { ApiError } from "../util/apiError";

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
