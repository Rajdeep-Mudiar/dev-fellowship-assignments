import mongoose from "mongoose";
import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import { initialHotelsData } from "../config/seedData.js";
import { generateBookingId } from "../utils/generateBookingId.js";

/**
 * Create a new hotel reservation (Pending payment)
 */
export const createBooking = async (req, res, next) => {
  try {
    const userId = req.userId || req.body.userId || "user_guest";
    const {
      hotelId,
      roomType,
      checkIn,
      checkOut,
      guests = 1,
      numberOfRooms = 1,
      userEmail,
      userName,
    } = req.body;

    if (!hotelId || !roomType || !checkIn || !checkOut) {
      return res.status(400).json({
        success: false,
        message: "Missing required booking details (hotelId, roomType, checkIn, checkOut)",
      });
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date format",
      });
    }

    if (checkOutDate <= checkInDate) {
      return res.status(400).json({
        success: false,
        message: "Check-out date must be after check-in date",
      });
    }

    // Calculate nights
    const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
    const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Fetch hotel from DB or initial data
    let hotel = null;
    if (mongoose.Types.ObjectId.isValid(hotelId)) {
      hotel = await Hotel.findById(hotelId);
    }

    if (!hotel) {
      const match = initialHotelsData.find((h) => h._id.toString() === hotelId.toString());
      if (match) {
        hotel = await Hotel.create(match).catch(() => match);
      }
    }

    if (!hotel) {
      hotel = {
        _id: new mongoose.Types.ObjectId(),
        name: "QuickStay Luxury Hotel",
        pricePerNight: 299,
        rooms: [{ roomType, pricePerNight: 299 }],
      };
    }

    // Find the specific room configuration or fallback to hotel base rate
    const roomConfig = hotel.rooms?.find((r) => r.roomType === roomType);
    const pricePerNight = roomConfig ? roomConfig.pricePerNight : hotel.pricePerNight || 299;

    // Independent Server-Side Amount Calculation
    const totalAmount = pricePerNight * nights * Number(numberOfRooms);

    const bookingId = generateBookingId();

    const newBooking = await Booking.create({
      bookingId,
      userId,
      userEmail: userEmail || "guest@quickstay.com",
      userName: userName || "Guest",
      hotelId: hotel._id,
      roomType,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: Number(guests),
      numberOfRooms: Number(numberOfRooms),
      nights,
      pricePerNight,
      totalAmount,
      paymentStatus: "unpaid",
      bookingStatus: "pending",
    });

    const populatedBooking = await Booking.findById(newBooking._id).populate("hotelId");

    res.status(201).json({
      success: true,
      data: populatedBooking || newBooking,
      message: "Reservation created successfully. Proceed to payment.",
    });
  } catch (error) {
    console.error("Create Booking Error:", error);
    next(error);
  }
};

/**
 * Get all bookings for the authenticated user
 */
export const getMyBookings = async (req, res, next) => {
  try {
    const userId = req.userId;

    const bookings = await Booking.find({ userId })
      .populate("hotelId")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
      message: "User bookings fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single booking details by ID
 */
export const getBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id).populate("hotelId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
      message: "Booking retrieved",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Cancel a booking
 */
export const cancelBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Invalid booking ID",
      });
    }

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.bookingStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.bookingStatus = "cancelled";
    if (booking.paymentStatus === "paid") {
      booking.paymentStatus = "refunded";
    }
    await booking.save();

    res.json({
      success: true,
      data: booking,
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    next(error);
  }
};
