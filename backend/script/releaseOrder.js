import Order from "../models/orderModel.js";
import { releaseStock } from "../services/stockService.js";
import cron from "node-cron";
export const releaseExpiredOrders =
async () => {

  const expiredOrders =
    await Order.find({
     paymentStatus: "pending",
    paymentMethod: "Stripe",
    createdAt: { $lt: new Date(Date.now() - 15 * 60 * 1000) }
    });

  for (const order of expiredOrders) {

    await releaseStock(order.items);
    order.paymentStatus = "failed";
    order.orderStatus = "cancelled";

    await order.save();

  }

};
cron.schedule("*/5 * * * *", async () => {
  console.log("Running expired orders job...");
  await releaseExpiredOrders();
});
