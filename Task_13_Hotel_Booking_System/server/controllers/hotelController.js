import mongoose from "mongoose";
import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";
import { initialHotelsData } from "../config/seedData.js";

/**
 * Get all hotels with search, filter, and sort options
 */
export const getHotels = async (req, res, next) => {
  try {
    const { city, minPrice, maxPrice, amenities, roomType, sort, search } = req.query;

    let query = { isAvailable: true };

    if (city && city.trim() !== "") {
      query.city = { $regex: city.trim(), $options: "i" };
    }

    if (search && search.trim() !== "") {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { city: { $regex: search.trim(), $options: "i" } },
        { address: { $regex: search.trim(), $options: "i" } },
      ];
    }

    if (minPrice || maxPrice) {
      query.pricePerNight = {};
      if (minPrice) query.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) query.pricePerNight.$lte = Number(maxPrice);
    }

    if (amenities) {
      const amenitiesList = Array.isArray(amenities)
        ? amenities
        : amenities.split(",").map((a) => a.trim());
      query.amenities = { $in: amenitiesList };
    }

    if (roomType) {
      query["rooms.roomType"] = roomType;
    }

    let sortOption = {};
    if (sort === "price_asc" || sort === "Price Low to High") {
      sortOption.pricePerNight = 1;
    } else if (sort === "price_desc" || sort === "Price High to Low") {
      sortOption.pricePerNight = -1;
    } else if (sort === "rating") {
      sortOption.rating = -1;
    } else {
      sortOption.createdAt = -1; // Newest first
    }

    let hotels = await Hotel.find(query).sort(sortOption);

    // If database is completely empty, populate initial items
    if (hotels.length === 0 && !city && !search && !minPrice && !maxPrice) {
      hotels = initialHotelsData;
    }

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
      message: "Hotels fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single hotel details by ID
 */
export const getHotelById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Hotel ID is required",
      });
    }

    let hotel = null;
    if (mongoose.Types.ObjectId.isValid(id)) {
      hotel = await Hotel.findById(id);
    }

    // Check baseline seed data if not yet in DB
    if (!hotel) {
      const match = initialHotelsData.find((h) => h._id.toString() === id.toString());
      if (match) {
        hotel = await Hotel.create(match).catch(() => match);
      }
    }

    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      data: hotel,
      message: "Hotel details retrieved",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search hotels by destination, check-in, check-out, and guests
 */
export const searchHotels = async (req, res, next) => {
  try {
    const { city, checkIn, checkOut, guests } = req.query;

    let query = { isAvailable: true };

    if (city && city.trim() !== "") {
      query.city = { $regex: city.trim(), $options: "i" };
    }

    const guestCount = Number(guests) || 1;
    query["rooms.capacity"] = { $gte: guestCount };

    let hotels = await Hotel.find(query);

    if (hotels.length === 0 && (!city || city === "All")) {
      hotels = initialHotelsData;
    }

    // If checkIn and checkOut dates are provided, filter out hotels with no remaining room availability
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);

      // Find overlapping confirmed/paid bookings in this date window
      const conflictingBookings = await Booking.find({
        bookingStatus: { $in: ["confirmed", "pending"] },
        paymentStatus: { $in: ["paid", "unpaid"] },
        $or: [
          { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
        ],
      });

      const bookedHotelIds = conflictingBookings.map((b) => b.hotelId.toString());

      // Filter available hotels
      const availableHotels = hotels.filter((hotel) => {
        const hotelBookings = bookedHotelIds.filter((id) => id === hotel._id.toString()).length;
        const totalRooms = hotel.rooms?.reduce((acc, r) => acc + (r.totalRooms || 5), 0) || 10;
        return hotelBookings < totalRooms;
      });

      return res.json({
        success: true,
        count: availableHotels.length,
        data: availableHotels,
        message: "Search completed",
      });
    }

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
      message: "Hotels found",
    });
  } catch (error) {
    next(error);
  }
};
