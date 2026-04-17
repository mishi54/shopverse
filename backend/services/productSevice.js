import Product from "../models/productModel.js";

export const createProductService=async(data)=>{
const {title,price,description,category,stock,images,rating}=data;
const newProduct=await Product.create({
    title,
    price,
    description,
    category,
    stock,
    rating,
    images
});
return newProduct;

   }  

export const updateProductService = async (id, data) => {

const updatedProduct = await Product.findByIdAndUpdate(
  id,
  { $set: data },
{ returnDocument: "after", runValidators: true }
);

return updatedProduct;

}; 

export const deleteProductService=async(id)=>{
    await Product.findByIdAndDelete(id);
    return true;
       }    

export const getProductByIdService=async(id)=>{
    const product=await Product.findById(id);
    return product;
       }

