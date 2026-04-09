import { loginUser, registerUser } from "../services/authService";
import { ApiResponse } from "../util/apiResponse";
import { asyncHandler } from "../util/asyncHandler";
import validator from "../util/validator";
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
