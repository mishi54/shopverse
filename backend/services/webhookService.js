import mongoose from "mongoose";
import Order from "../models/orderModel.js";
export const processStripeEvent = async (event) => {
  console.log("Processing Stripe event:", event.type);
  switch (event.type) {
    case "checkout.session.completed":
      await handlePaymentSuccess(event.data.object);

      break;
    case "payment_intent.succeeded":
      console.log("Payment intent succeeded");
      break;
    case "payment_intent.payment_failed":
      console.log("Payment failed");

      break;

    default:
      console.log("Unhandled", event.type);
  }
};

export const handlePaymentSuccess = async (sessionData) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const order = await Order.findOne({
    //   stripeSessionId: sessionData.id,
   
    // }).session(session);
        const order = await Order.findById(
  sessionData?.metadata?.orderId
    ).session(session);

if (!order) {
  await session.abortTransaction();
  return;
}

if (order.orderStatus === "cancelled") {
  await session.abortTransaction();
  return;
}
if (order.stripePaymentIntentId === sessionData.payment_intent) {
  await session.abortTransaction();
  return;
}

    order.paymentStatus = "paid";
    order.isPaid = true;
    order.paidAt = new Date();

    order.stockStatus = "confirmed";

    order.stripePaymentIntentId = sessionData.payment_intent;

    await order.save({ session });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();
    console.error(err);
  } finally {
    session.endSession();
  }
};
