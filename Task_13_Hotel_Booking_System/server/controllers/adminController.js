import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

/**
 * Get dashboard statistics for Admin
 */
export const getAdminStats = async (req, res, next) => {
  try {
    const totalHotels = await Hotel.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const paidBookings = await Booking.countDocuments({ paymentStatus: "paid" });
    const pendingBookings = await Booking.countDocuments({ bookingStatus: "pending" });
    const confirmedBookings = await Booking.countDocuments({ bookingStatus: "confirmed" });

    // Aggregate total revenue from paid bookings
    const revenueAgg = await Booking.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } },
    ]);

    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].totalRevenue : 0;

    // Recent 5 bookings
    const recentBookings = await Booking.find()
      .populate("hotelId", "name city")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: {
        totalHotels,
        totalBookings,
        paidBookings,
        pendingBookings,
        confirmedBookings,
        totalRevenue,
        recentBookings,
      },
      message: "Admin statistics fetched",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all hotels for admin management
 */
export const getAdminHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: hotels.length,
      data: hotels,
      message: "All hotels fetched for admin",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create a new hotel (Admin / Owner)
 */
export const createHotel = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      name,
      description,
      city,
      address,
      contact,
      pricePerNight,
      amenities,
      images,
      rooms,
    } = req.body;

    if (!name || !description || !city || !address || !pricePerNight) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required hotel fields",
      });
    }

    const defaultImages = [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    ];

    const hotel = await Hotel.create({
      name,
      description,
      city,
      address,
      contact: contact || "",
      pricePerNight: Number(pricePerNight),
      amenities: Array.isArray(amenities) ? amenities : (amenities ? amenities.split(",") : []),
      images: images && images.length > 0 ? images : defaultImages,
      rooms: rooms || [
        {
          roomType: "Double Bed",
          pricePerNight: Number(pricePerNight),
          capacity: 2,
          totalRooms: 5,
          availableRooms: 5,
          amenities: ["Free WiFi", "Room Service"],
        },
      ],
      ownerClerkId: userId,
    });

    res.status(201).json({
      success: true,
      data: hotel,
      message: "Hotel registered successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update existing hotel
 */
export const updateHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedHotel = await Hotel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedHotel) {
      return res.status(404).json({
        success: false,
        message: "Hotel not found",
      });
    }

    res.json({
      success: true,
      data: updatedHotel,
      message: "Hotel updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete hotel with validation
 */
export const deleteHotel = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check for active / upcoming bookings
    const activeBookings = await Booking.countDocuments({
      hotelId: id,
      bookingStatus: { $in: ["confirmed", "pending"] },
      checkOut: { $gte: new Date() },
    });

    if (activeBookings > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete hotel with ${activeBookings} active or upcoming reservation(s).`,
      });
    }

    await Hotel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Hotel deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all bookings across the platform for admin
 */
export const getAdminBookings = async (req, res, next) => {
  try {
    const { status, paymentStatus } = req.query;
    let query = {};

    if (status) query.bookingStatus = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;

    const bookings = await Booking.find(query)
      .populate("hotelId", "name city address")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings,
      message: "Admin bookings retrieved",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update booking status
 */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { bookingStatus, paymentStatus } = req.body;

    const updateFields = {};
    if (bookingStatus) updateFields.bookingStatus = bookingStatus;
    if (paymentStatus) updateFields.paymentStatus = paymentStatus;

    const booking = await Booking.findByIdAndUpdate(id, updateFields, {
      new: true,
    }).populate("hotelId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.json({
      success: true,
      data: booking,
      message: "Booking status updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
