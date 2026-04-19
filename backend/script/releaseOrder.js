import Order from "../models/orderModel.js";
import { releaseStock } from "../services/stockService.js";
import cron from "node-cron";
export const releaseExpiredOrders =
async () => {

  const expiredOrders =
    await Order.find({
      stockStatus: "reserved",
      expiresAt: { $lt: new Date() }
    });

  for (const order of expiredOrders) {

    await releaseStock(order.items);

    order.stockStatus = "released";
    order.paymentStatus = "failed";

    await order.save();

  }

};
cron.schedule("*/5 * * * *", async () => {
  console.log("Running expired orders job...");
  await releaseExpiredOrders();
});
