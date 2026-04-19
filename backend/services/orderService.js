import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import { ApiError } from "../util/apiError.js";
import mongoose from "mongoose";
import { releaseStock, reserveStock } from "../services/stockService.js";
import { createStripeSession } from "./stripe.service.js";

export const createCheckoutSessionService = async (
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

    const itemsPrice = cart.items.reduce(
      (acc, item) =>
        acc + item.product.price * item.quantity,
      0
    );

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      images: item.product.images
    }));

    const expiresAt =
      new Date(Date.now() + 15 * 60 * 1000);
    await reserveStock(cart.items, session);

    const order = await Order.create([{
      user: userId,
      items: orderItems,
      itemsPrice,
      totalPrice: itemsPrice,
      paymentMethod,
      paymentStatus: "pending",
      stockStatus: "reserved",
      expiresAt,
      shippingAddress
    }], { session });

    cart.items = [];
    await cart.save({ session });
    if (paymentMethod === "Stripe") {

      const stripeSession =
        await createStripeSession(order[0]);

      order[0].stripeSessionId =
        stripeSession.id;

      await order[0].save({ session });

      await session.commitTransaction();

      return {
        checkoutUrl: stripeSession.url
      };

    }
    order[0].paymentStatus = "paid";
    order[0].stockStatus = "confirmed";

    await order[0].save({ session });

    await session.commitTransaction();

    return {
      order: order[0]
    };

  } catch (err) {

    await session.abortTransaction();
    throw err;

  } finally {

    session.endSession();

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

     await releaseStock(order.items, session);
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

// export const markAsPaidService = async (orderId, transactionId) => {

//   const order = await Order.findById(orderId);

//   if (!order) {
//     throw new ApiError(404, "Order not found");
//   }

//   if (order.paymentStatus === "paid") {
//     throw new ApiError(400, "Order already paid");
//   }
// if (order.orderStatus === "cancelled") {
//   throw new ApiError(400, "Cannot pay for cancelled order");
// }
//   order.paymentStatus = "paid";
//   order.isPaid = true;
//   order.paidAt = new Date();
//   order.transactionId = transactionId;

//   await order.save();

//   return order;
// };