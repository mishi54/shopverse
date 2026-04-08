import { registerUser } from "../services/authService";
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