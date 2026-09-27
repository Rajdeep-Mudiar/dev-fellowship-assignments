import express from "express";
import {
  getHotels,
  getHotelById,
  searchHotels,
  seedInitialHotels,
} from "../controllers/hotelController.js";

const router = express.Router();

router.get("/", getHotels);
router.get("/search", searchHotels);
router.get("/seed", seedInitialHotels);
router.get("/:id", getHotelById);

export default router;
