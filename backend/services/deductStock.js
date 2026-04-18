import Product from "../models/productModel";
import { ApiError } from "../util/apiError";


export const deductStock = async (items, session = null) => {
  if (!session) {
    throw new Error("Transaction session required");
  }

  for (const item of items) {

    const result = await Product.updateOne(
      {
        _id: item.product,
        stock: { $gte: item.quantity }
      },
      {
        $inc: { stock: -item.quantity }
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