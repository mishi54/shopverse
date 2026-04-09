
import jwt from "jsonwebtoken";

export const generateAccessToken=(id)=>{
    const token=jwt.sign({id},process.env.Secret_Key,{expiresIn:"15m"});
    return token;
}

export const generateRefreshToken=(id)=>{
    const token=jwt.sign({id},process.env.Refresh_Secret_Key,{expiresIn:"7d"});
    return token;
}   