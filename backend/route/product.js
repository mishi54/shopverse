import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controller/productController.js";
import { auth,adminOnly } from "../middlewares/auth.js";
import uploadFile from "../util/uploadFiles.js";

const router=express.Router();

router.post("/create", auth,adminOnly, uploadFile.array("images", 5), createProduct);
router.patch("/:id", auth, adminOnly, uploadFile.array("images", 5), updateProduct);
router.delete("/:id", auth,adminOnly, deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;