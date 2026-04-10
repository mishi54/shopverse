import Product from "../models/productModel";

export const createProductService=async(data, image)=>{
const {title,price,description,category,stock,rating}=data;
const newProduct=await Product.create({
    title,
    price,
    description,
    category,
    stock,
    rating,
    images:image
});
return newProduct;

   }  

export const updateProductService = async (id, data) => {

const updatedProduct = await Product.findByIdAndUpdate(
  id,
  { $set: data },
  { new: true, runValidators: true }
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

