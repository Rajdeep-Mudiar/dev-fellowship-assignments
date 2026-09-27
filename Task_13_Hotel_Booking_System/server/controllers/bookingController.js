import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";
import { generateBookingId } from "../utils/generateBookingId.js";

/**
 * Create a new hotel reservation (Pending payment)
 */
export const createBooking = async (req, res, next) => {
  try {
    const userId = req.userId;
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid check-in or check-out date format",
      });
    }

    if (checkInDate < today) {
      return res.status(400).json({
        success: false,
        message: "Check-in date cannot be in the past",
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

    // Fetch hotel from DB
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({
        success: false,
        message: "Selected hotel does not exist",
      });
    }

    // Find the specific room configuration or fallback to hotel base rate
    const roomConfig = hotel.rooms.find((r) => r.roomType === roomType);
    const pricePerNight = roomConfig ? roomConfig.pricePerNight : hotel.pricePerNight;

    // Independent Server-Side Amount Calculation
    const totalAmount = pricePerNight * nights * Number(numberOfRooms);

    // Double Booking / Overlap Prevention
    const existingBookings = await Booking.countDocuments({
      hotelId,
      roomType,
      bookingStatus: { $in: ["confirmed", "pending"] },
      paymentStatus: { $in: ["paid", "unpaid"] },
      $or: [
        { checkIn: { $lt: checkOutDate }, checkOut: { $gt: checkInDate } },
      ],
    });

    const totalAllowedRooms = roomConfig?.totalRooms || 5;
    if (existingBookings + Number(numberOfRooms) > totalAllowedRooms) {
      return res.status(409).json({
        success: false,
        message: `Sorry, not enough ${roomType} rooms available for these selected dates.`,
      });
    }

    const bookingId = generateBookingId();

    const newBooking = await Booking.create({
      bookingId,
      userId,
      userEmail: userEmail || "guest@quickstay.com",
      userName: userName || "Guest",
      hotelId,
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
      data: populatedBooking,
      message: "Reservation created successfully. Proceed to payment.",
    });
  } catch (error) {
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

    const booking = await Booking.findById(id).populate("hotelId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Security check: only owner of booking or admin can access
    if (booking.userId !== userId && req.auth?.sessionClaims?.metadata?.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access forbidden",
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

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to cancel this booking",
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
