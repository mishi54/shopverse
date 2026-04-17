import express from "express";
import { login, register,logout,refreshTokenController } from "../controller/authController.js";
import { auth } from "../middlewares/auth.js";
import uploadFile from "../util/uploadFiles.js";

const router=express.Router();

router.post("/register",uploadFile.single("image"), register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.post("/refresh-token", refreshTokenController);
export default router;