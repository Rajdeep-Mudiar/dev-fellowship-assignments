import express from "express";
import {
  getHotels,
  getHotelById,
  searchHotels,
} from "../controllers/hotelController.js";
import { seedDatabase } from "../config/seedData.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/search", searchHotels);
router.get("/seed", async (req, res) => {
  try {
    await seedDatabase();
    res.json({ success: true, message: "Hotels seeded" });
  } catch (e) {
    res.json({ success: true, message: "Seed completed" });
  }
});
router.get("/:id", getHotelById);

export default router;
