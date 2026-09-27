import mongoose from "mongoose";

const roomTypeSchema = new mongoose.Schema({
  roomType: { type: String, required: true }, // e.g., 'Single Bed', 'Double Bed', 'Luxury Room', 'Family Suite'
  pricePerNight: { type: Number, required: true },
  capacity: { type: Number, required: true, default: 2 },
  totalRooms: { type: Number, required: true, default: 5 },
  availableRooms: { type: Number, required: true, default: 5 },
  amenities: [{ type: String }],
  images: [{ type: String }],
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, index: true },
    description: { type: String, required: true },
    city: { type: String, required: true, index: true },
    address: { type: String, required: true },
    contact: { type: String, default: "" },
    rating: { type: Number, default: 4.5 },
    reviewsCount: { type: Number, default: 120 },
    pricePerNight: { type: Number, required: true }, // Starting price
    amenities: [
      {
        type: String,
        enum: [
          "Free WiFi",
          "Free Breakfast",
          "Room Service",
          "Mountain View",
          "Pool Access",
          "Air Conditioning",
          "Spa & Wellness",
          "Fitness Center",
          "Parking",
        ],
      },
    ],
    images: [{ type: String, required: true }],
    rooms: [roomTypeSchema],
    isAvailable: { type: Boolean, default: true },
    ownerClerkId: { type: String, required: true, index: true },
  },
  { timestamps: true }
);

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);
export default Hotel;
