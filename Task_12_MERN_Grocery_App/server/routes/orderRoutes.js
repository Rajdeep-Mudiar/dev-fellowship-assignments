import express from "express";
import {
  placeOrderCOD,
  placeOrderStripe,
  verifyStripePayment,
  userOrders,
  allOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import authUser from "../middleware/auth.js";
import authSeller from "../middleware/authSeller.js";

const orderRouter = express.Router();

// Customer routes
orderRouter.post("/place-cod", authUser, placeOrderCOD);
orderRouter.post("/place-stripe", authUser, placeOrderStripe);
orderRouter.post("/verify-stripe", authUser, verifyStripePayment);
orderRouter.get("/user-orders", authUser, userOrders);

// Seller / Admin routes
orderRouter.get("/seller-orders", authSeller, allOrders);
orderRouter.post("/update-status", authSeller, updateOrderStatus);

export default orderRouter;
