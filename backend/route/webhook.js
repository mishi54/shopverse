import express from "express";
import bodyParser from "body-parser";
import { handleStripeWebhook } from "../controller/webhookController.js";

const router = express.Router();

router.post(
  "/stripe",
express.raw({ type: "application/json" }),
  handleStripeWebhook
);

export default router;