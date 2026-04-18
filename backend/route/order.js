import express from "express";
import { auth, adminOnly } from "../middlewares/auth.js";

import {
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  // markAsPaid,
  createCheckoutSession
} from "../controller/orderController.js";

const router = express.Router();
router.post("/checkout", auth, createCheckoutSession);
router.get("/my-orders", auth, getMyOrders);
router.get("/:orderId", auth, getOrderById);
router.patch("/:orderId/cancel", auth, cancelOrder);
router.get("/", auth, adminOnly, getAllOrders);
router.patch("/:orderId/status", auth, adminOnly, updateOrderStatus);
// router.patch("/:orderId/pay", auth, adminOnly, markAsPaid);
export default router;