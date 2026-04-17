import { cartSchema } from "../schema/cartSchema.js";
import { addToCartService, clearCartService, getMyCartService, removeCartItemService, updateCartItemService } from "../services/cartService.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import validator from "../util/validator.js";
export const addToCart = asyncHandler(async (req, res) => {
    const error=await validator(cartSchema,req.body);
    if(error){
        throw new ApiError(400,error);
    }
const userId = req.user._id;
    const { productId, quantity } = req.body;
    const result=await addToCartService(userId,productId,quantity);
    res.status(200).json(new ApiResponse(200,result,"Product added to cart successfully"));
});

export const getMyCart=asyncHandler(async(req,res)=>{
const userId = req.user._id;
    const cart=await getMyCartService(userId);
    res.status(200).json(new ApiResponse(200,cart,"Cart fetched successfully"));
});

export const updateCartItem=asyncHandler(async(req,res)=>{
  const userId = req.user._id;
   const { productId } = req.params;
    const {quantity } = req.body;
    const result=await updateCartItemService(userId,productId,quantity);
    res.status(200).json(new ApiResponse(200,result,"Cart item updated successfully"));
});

export const removeCartItem = asyncHandler(async (req, res) => {

const userId = req.user._id;
const { productId } = req.params;
const { quantity } = req.body;

const result = await removeCartItemService(userId, productId, quantity);

res.status(200).json(
 new ApiResponse(200, result, "Cart item removed successfully")
);

});
export const clearCart=asyncHandler(async(req,res)=>{
   const userId = req.user._id;
    const result=await clearCartService(userId);
    res.status(200).json(new ApiResponse(200,result,"Cart cleared successfully"));
}   
);