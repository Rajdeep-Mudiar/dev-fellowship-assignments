import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config();

import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import { seedDatabase } from "./config/seedData.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import { handleStripeWebhook } from "./controllers/paymentController.js";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

// Standard CORS
app.use(cors());

// Connect to MongoDB asynchronously without blocking
connectDB()
  .then(() => seedDatabase())
  .catch((e) => console.log("DB Init notice:", e.message));

// Stripe Webhook MUST be mounted before express.json() with raw parser
app.post(
  ["/api/payments/webhook", "/api/hotel/payments/webhook", "/payments/webhook"],
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

// Body Parser for standard JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure DB connect attempt on serverless requests without blocking
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    // Non-blocking fallback
  }
  next();
});

// Clerk Auth Middleware (attaches req.auth gracefully)
const clerkPub =
  process.env.CLERK_PUBLISHABLE_KEY ||
  process.env.VITE_CLERK_PUBLISHABLE_KEY;
const clerkSecret = process.env.CLERK_SECRET_KEY;

if (clerkPub && clerkSecret) {
  try {
    app.use(
      clerkMiddleware({
        publishableKey: clerkPub,
        secretKey: clerkSecret,
      })
    );
  } catch (err) {
    console.warn("Clerk middleware init warning:", err.message);
  }
}

// API Health Check
app.get(["/", "/api", "/api/hotel", "/api/health"], (req, res) => {
  res.json({
    success: true,
    message: "QuickStay Hotel Booking API is active and running",
    timestamp: new Date().toISOString(),
  });
});

// Seed endpoint for manual trigger if needed
app.get(["/api/seed", "/api/hotel/seed", "/seed"], async (req, res) => {
  try {
    await seedDatabase();
    res.json({ success: true, message: "Database seeded successfully" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Standard API Routes
app.use("/api/hotels", hotelRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/admin", adminRoutes);

// Monorepo Serverless Aliases
app.use("/api/hotel/api/hotels", hotelRoutes);
app.use("/api/hotel/api/bookings", bookingRoutes);
app.use("/api/hotel/api/payments", paymentRoutes);
app.use("/api/hotel/api/admin", adminRoutes);

app.use("/api/hotel/hotels", hotelRoutes);
app.use("/api/hotel/bookings", bookingRoutes);
app.use("/api/hotel/payments", paymentRoutes);
app.use("/api/hotel/admin", adminRoutes);

// Direct stripped path handlers
app.use("/hotels", hotelRoutes);
app.use("/bookings", bookingRoutes);
app.use("/payments", paymentRoutes);
app.use("/admin", adminRoutes);

// Error Handling Middlewares
app.use(notFoundHandler);
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`QuickStay Hotel Booking Server started on http://localhost:${PORT}`);
  });
}

export default app;
