import mongoose from "mongoose";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";


export const processStripeEvent = async (event) => {

  switch (event.type) {

    case "checkout.session.completed":

      const sessionData = event.data.object;

      await markOrderPaid(sessionData);

      break;

    default:
      console.log("Unhandled event", event.type);
  }

};


const markOrderPaid = async (sessionData) => {

  const session = await mongoose.startSession();

  try {

    session.startTransaction();

    const order = await Order.findOne({
      stripeSessionId: sessionData.id
    }).session(session);

    if (!order) return;

    if (order.paymentStatus === "paid") return;
    if (order.stripePaymentIntentId === sessionData.payment_intent) return;

    for (const item of order.items) {

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
        throw new Error("Stock not available");
      }

    }

    order.paymentStatus = "paid";
    order.isPaid = true;
    order.paidAt = new Date();

    order.stripePaymentIntentId =
      sessionData.payment_intent;

    await order.save({ session });

    await session.commitTransaction();

  } catch (err) {

    await session.abortTransaction();

    console.error(err);

  } finally {

    session.endSession();

  }

};