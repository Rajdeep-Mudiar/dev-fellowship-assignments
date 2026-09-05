import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";
import { seedDatabase } from "./config/seedData.js";
import { stripeWebhook } from "./controllers/orderController.js";

import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

// Connect Database & Cloudinary
connectDB()
  .then(() => seedDatabase())
  .catch((e) => console.log("DB Init notice:", e.message));

connectCloudinary();

// Stripe Webhook Endpoint (Raw body parser must be before standard json)
app.post(
  "/api/order/stripe-webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

// Standard Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Dynamic CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    credentials: true,
  })
);

// Health Check & Base Routes
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "GreenCart Grocery Delivery API is running smoothly",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, uptime: process.uptime() });
});

// REST API Route Handlers
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

// Monorepo Serverless Route Handlers
app.use("/api/grocery/auth", authRouter);
app.use("/api/grocery/product", productRouter);
app.use("/api/grocery/cart", cartRouter);
app.use("/api/grocery/address", addressRouter);
app.use("/api/grocery/order", orderRouter);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Express Error:", err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`GreenCart Backend Server started on PORT: ${port}`);
  });
}

export default app;
