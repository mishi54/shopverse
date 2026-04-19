import Product from "../models/productModel.js";
import { ApiError } from "../util/apiError.js";

export const reserveStock = async (items, session) => {

  for (const item of items) {

    const result = await Product.updateOne(
      {
        _id: item.product,
        stock: { $gte: item.quantity }
      },
      {
        $inc: {
          stock: -item.quantity,
          reservedStock: item.quantity
        }
      },
      { session }
    );

    if (result.modifiedCount === 0) {
      throw new ApiError(
        400,
        `Insufficient stock for ${item.title}`
      );
    }
  }

};



export const releaseStock = async (items, session = null) => {

  for (const item of items) {

    await Product.updateOne(
      { _id: item.product },
      {
        $inc: {
          stock: item.quantity,
          reservedStock: -item.quantity
        }
      },
      { session }
    );

  }

};