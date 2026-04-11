import { loginUser, registerUser } from "../services/authService.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import validator from "../util/validator.js";
import { loginSchema, registerSchema } from "../schema/userSchema.js";
import { ApiError } from "../util/apiError.js";
import { refreshAccessToken, logoutUser } from "../services/authService.js";
export const register=asyncHandler(async(req,res)=>{

   const error=await validator(registerSchema,req.body);
   if(error){
    throw new ApiError(400,error);
   }
   const result=await registerUser(req.body);
   res.status(200).json(new ApiResponse(200,result,"User registered successfully"));

});

export const login=asyncHandler(async(req,res)=>{
   const error =await validator(loginSchema,req.body);
   if(error){
    throw new ApiError(400,error);
   }
   const result=await loginUser(req.body);
   res.status(200).json(new ApiResponse(200,result,"User logged in successfully"));
});


export const refreshTokenController=asyncHandler(async(req,res)=>{
const refreshToken = req.headers.authorization?.split(" ")[1];    const result=await refreshAccessToken(refreshToken);
    return res.status(200).json(new ApiResponse(200,result,"Token refreshed successfully"));


});


export const logout=asyncHandler(async(req,res)=>{
    const userId=req.user.id;
await logoutUser(userId);
return res.status(200).json(new ApiResponse(200,null,"User logged out successfully"));
});
