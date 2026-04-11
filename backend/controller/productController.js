import Product from "../models/productModel.js";
import { productSchema } from "../schema/productSchema.js";
import { createProductService, deleteProductService, getProductByIdService, updateProductService } from "../services/productSevice.js";
import { ApiResponse } from "../util/apiResponse.js";
import { asyncHandler } from "../util/asyncHandler.js";
import { getPagination, getPaginationMeta } from "../util/pagination.js";

export const createProduct=asyncHandler(async(req,res)=>{
      const images = req.files?.map(file => file.filename);

if (!images || images.length === 0) {
  return res.status(400).json({ error: '"images" are required' });
}
const error =await validator(productSchema,req.body);
if(error){
    throw new ApiError(400,error);
}
let result=await createProductService({...req.body, images});
res.status(200).json(new ApiResponse(200,result,"Product created successfully"));
});


export const updateProduct = asyncHandler(async (req, res) => {

const { id } = req.params;

const images = req.files?.map(file => file.filename);

const updateData = {
  ...req.body,
};

if (images?.length > 0) {
  updateData.images = images;
}

let result = await updateProductService(id, updateData);

res
.status(200)
.json(new ApiResponse(200, result, "Product updated successfully"));

});

export const deleteProduct=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    await deleteProductService(id);
    res.status(200).json(new ApiResponse(200,null,"Product deleted successfully"));
});


export const getAllProducts=asyncHandler(async(req,res)=>{
    const { page, limit, skip } = getPagination(req.query);
    const products=await Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const total=await Product.countDocuments();
    res.status(200).json(new ApiResponse(200,{products,
       pagination: getPaginationMeta(page, limit, total)},
      "Products fetched successfully"));
});

export const getProductById=asyncHandler(async(req,res)=>{
    const {id}=req.params;
    const result=await getProductByIdService(id);
    res.status(200).json(new ApiResponse(200,result,"Product fetched successfully"));
});