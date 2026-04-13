import express from "express";
import { auth, adminOnly } from "../middlewares/auth.js";

import {
  placeOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  markAsPaid
} from "../controller/orderController.js";

const router = express.Router();
router.post("/", auth, placeOrder);
router.get("/my-orders", auth, getMyOrders);
router.get("/:orderId", auth, getOrderById);
router.patch("/:orderId/cancel", auth, cancelOrder);
router.get("/", auth, adminOnly, getAllOrders);
router.patch("/:orderId/status", auth, adminOnly, updateOrderStatus);
router.patch("/:orderId/pay", auth, adminOnly, markAsPaid);
export default router;