import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../util/apiError.js";
import mongoose from "mongoose";
export const placeOrderService = async (
  userId,
  shippingAddress,
  paymentMethod
) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({ user: userId })
      .populate("items.product")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new ApiError(400, "Cart is empty");
    }
for (const item of cart.items) {
  const result = await Product.updateOne(
    {
      _id: item.product._id,
      stock: { $gte: item.quantity }
    },
    {
      $inc: { stock: -item.quantity }
    },
    { session }
  );

  if (result.modifiedCount === 0) {
    throw new ApiError(400, `${item.product.title} out of stock`);
  }
}
    const itemsPrice = cart.items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );

    const totalPrice = itemsPrice;

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      images: item.product.images,
    }));
    const order = await Order.create(
      [{
        user: userId,
        items: orderItems,
        itemsPrice,
        totalPrice,
        paymentMethod,
        shippingAddress,
      }],
      { session }
    );
await Cart.updateOne(
  { user: userId },
  { $set: { items: [] } },
  { session }
);

    await session.commitTransaction();
    session.endSession();

    return order[0];

  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getMyOrdersService = async (userId) => {
  
  const orders = await Order.find({ user: userId })
    .sort({ createdAt: -1 });

if (orders.length === 0) {
  throw new ApiError(404, "No orders found");
}

  return orders;
};

export const getOrderByIdService = async (userId, orderId) => {

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  if (order.user.toString() !== userId) {
    throw new ApiError(403, "Not authorized to view this order");
  }

  return order;
};
export const getAllOrdersService = async () => {

  const orders = await Order.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  if (!orders) {
    throw new ApiError(404, "No orders found");
  }

  return orders;
};

export const updateOrderStatusService = async (orderId, status) => {

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }
  order.orderStatus = status;

  if (status === "shipped") {
    order.shippedAt = new Date();
  }

  if (status === "delivered") {
    order.deliveredAt = new Date();
    order.isDelivered = true;
  }

  if (status === "cancelled") {
    order.cancelledAt = new Date();
  }

  await order.save();

  return order;
};

export const cancelOrderService = async (userId, orderId) => {

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const order = await Order.findById(orderId).session(session);

    if (!order) {
      throw new ApiError(404, "Order not found");
    }

    if (order.user.toString() !== userId) {
      throw new ApiError(403, "Not allowed to cancel this order");
    }

    if (order.orderStatus === "delivered") {
      throw new ApiError(400, "Cannot cancel delivered order");
    }

    if (order.orderStatus === "shipped") {
      throw new ApiError(400, "Cannot cancel shipped order");
    }
  for (const item of order.items) {
await Product.updateOne(
  { _id: item.product },
  { $inc: { stock: item.quantity } },
  { session }
);
  }

    order.orderStatus = "cancelled";
    order.cancelledAt = new Date();

    await order.save({ session });

      await session.commitTransaction();
        session.endSession();
  return order;

} catch (err) {
  await session.abortTransaction();
    session.endSession();
  throw err;

} 
};

export const markAsPaidService = async (orderId, transactionId) => {

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.paymentStatus === "paid") {
    throw new ApiError(400, "Order already paid");
  }
if (order.orderStatus === "cancelled") {
  throw new ApiError(400, "Cannot pay for cancelled order");
}
  order.paymentStatus = "paid";
  order.isPaid = true;
  order.paidAt = new Date();
  order.transactionId = transactionId;

  await order.save();

  return order;
};