import express from "express";
import { login, register,logout,refreshTokenController } from "../controller/authController.js";

const router=express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh-token", refreshTokenController);
export default router;