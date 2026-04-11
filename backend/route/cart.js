import express from "express";
import { auth } from "../middlewares/auth.js";

import {
  addToCart,
  getMyCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controller/cartController.js";

const router = express.Router();


router.post("/add", auth, addToCart);
router.get("/mycart", auth, getMyCart);
router.patch("/item/:productId", updateCartItem);
router.delete("/item/:productId", removeCartItem);
router.delete("/clear", auth, clearCart);


export default router;