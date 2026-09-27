import express from "express";
import {
  getAdminStats,
  getAdminHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getAdminBookings,
  updateBookingStatus,
} from "../controllers/adminController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { requireAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Apply Clerk Auth and Admin Role Guard across all admin routes
router.use(requireAuth, requireAdmin);

router.get("/stats", getAdminStats);
router.get("/hotels", getAdminHotels);
router.post("/hotels", createHotel);
router.put("/hotels/:id", updateHotel);
router.delete("/hotels/:id", deleteHotel);

router.get("/bookings", getAdminBookings);
router.patch("/bookings/:id/status", updateBookingStatus);

export default router;
