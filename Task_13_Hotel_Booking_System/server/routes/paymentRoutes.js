import express from "express";
import {
  createCheckoutSession,
  handleStripeWebhook,
} from "../controllers/paymentController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create-checkout-session", requireAuth, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
