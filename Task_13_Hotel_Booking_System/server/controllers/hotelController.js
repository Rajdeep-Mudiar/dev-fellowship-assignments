import Hotel from "../models/Hotel.js";
import Booking from "../models/Booking.js";

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

    const hotels = await Hotel.find(query).sort(sortOption);

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
    const hotel = await Hotel.findById(id);

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

    const hotels = await Hotel.find(query);

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

      // Filter available hotels (hotels whose total rooms exceed active bookings)
      const availableHotels = hotels.filter((hotel) => {
        const hotelBookings = bookedHotelIds.filter((id) => id === hotel._id.toString()).length;
        const totalRooms = hotel.rooms.reduce((acc, r) => acc + (r.totalRooms || 5), 0);
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

/**
 * Seed initial sample hotels into MongoDB if empty
 */
export const seedInitialHotels = async (req, res, next) => {
  try {
    const count = await Hotel.countDocuments();
    if (count > 0) {
      return res.json({
        success: true,
        message: `Database already has ${count} hotels. Seeding skipped.`,
      });
    }

    const sampleHotels = [
      {
        name: "Urbanza Suites & Spa",
        description: "Experience world-class hospitality in the heart of the city with luxury amenities and panoramic skyline views.",
        city: "New York",
        address: "Main Road 123 Street, Manhattan, NY",
        contact: "+1 212-555-0199",
        rating: 4.8,
        reviewsCount: 240,
        pricePerNight: 299,
        amenities: ["Free WiFi", "Free Breakfast", "Room Service", "Pool Access", "Spa & Wellness"],
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
          "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200",
        ],
        rooms: [
          {
            roomType: "Double Bed",
            pricePerNight: 299,
            capacity: 2,
            totalRooms: 10,
            availableRooms: 10,
            amenities: ["Free WiFi", "Room Service", "Pool Access"],
            images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"],
          },
          {
            roomType: "Luxury Suite",
            pricePerNight: 499,
            capacity: 4,
            totalRooms: 5,
            availableRooms: 5,
            amenities: ["Free WiFi", "Free Breakfast", "Mountain View", "Spa & Wellness"],
            images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"],
          },
        ],
        isAvailable: true,
        ownerClerkId: "system_admin",
      },
      {
        name: "Grand Horizon Bay Resort",
        description: "Breathtaking beachfront resort offering private balconies, infinite sea views, and award-winning dining.",
        city: "Dubai",
        address: "Palm Jumeirah Crescent, Dubai, UAE",
        contact: "+971 4 555 0100",
        rating: 4.9,
        reviewsCount: 310,
        pricePerNight: 399,
        amenities: ["Free WiFi", "Pool Access", "Room Service", "Mountain View", "Fitness Center"],
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
          "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200",
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200",
        ],
        rooms: [
          {
            roomType: "Single Bed",
            pricePerNight: 199,
            capacity: 1,
            totalRooms: 8,
            availableRooms: 8,
            amenities: ["Free WiFi", "Room Service"],
            images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200"],
          },
          {
            roomType: "Double Bed",
            pricePerNight: 399,
            capacity: 2,
            totalRooms: 12,
            availableRooms: 12,
            amenities: ["Free WiFi", "Pool Access", "Free Breakfast"],
            images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200"],
          },
        ],
        isAvailable: true,
        ownerClerkId: "system_admin",
      },
      {
        name: "The Royal Crest Hotel",
        description: "Classic elegance and modern luxury located near historic landmarks, theaters, and shopping districts.",
        city: "London",
        address: "45 Kensington Gardens, London, UK",
        contact: "+44 20 7946 0991",
        rating: 4.7,
        reviewsCount: 185,
        pricePerNight: 249,
        amenities: ["Free WiFi", "Free Breakfast", "Room Service", "Parking"],
        images: [
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
          "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
        ],
        rooms: [
          {
            roomType: "Double Bed",
            pricePerNight: 249,
            capacity: 2,
            totalRooms: 15,
            availableRooms: 15,
            amenities: ["Free WiFi", "Free Breakfast"],
            images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200"],
          },
        ],
        isAvailable: true,
        ownerClerkId: "system_admin",
      },
      {
        name: "Marina Bay Vista",
        description: "Iconic contemporary stay featuring rooftop infinity pool, sky garden lounge, and gourmet dining.",
        city: "Singapore",
        address: "10 Bayfront Avenue, Marina Bay, Singapore",
        contact: "+65 6688 8868",
        rating: 4.9,
        reviewsCount: 420,
        pricePerNight: 349,
        amenities: ["Free WiFi", "Pool Access", "Room Service", "Fitness Center", "Spa & Wellness"],
        images: [
          "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200",
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
        ],
        rooms: [
          {
            roomType: "Family Suite",
            pricePerNight: 549,
            capacity: 5,
            totalRooms: 6,
            availableRooms: 6,
            amenities: ["Free WiFi", "Pool Access", "Free Breakfast"],
            images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200"],
          },
        ],
        isAvailable: true,
        ownerClerkId: "system_admin",
      },
    ];

    await Hotel.insertMany(sampleHotels);

    res.json({
      success: true,
      message: `Seeded ${sampleHotels.length} sample hotels successfully.`,
    });
  } catch (error) {
    next(error);
  }
};
