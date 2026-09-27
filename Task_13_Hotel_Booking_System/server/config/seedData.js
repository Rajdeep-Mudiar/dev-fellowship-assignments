import Hotel from "../models/Hotel.js";

export const initialHotelsData = [
  {
    _id: "67f7647c197ac559e4089b96",
    name: "The Royal Crest Hotel",
    description: "Classic elegance and modern luxury located near historic landmarks, theaters, and shopping districts.",
    city: "London",
    address: "45 Kensington Gardens, London, UK",
    contact: "+44 20 7946 0991",
    rating: 4.9,
    reviewsCount: 310,
    pricePerNight: 399,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1200",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Double Bed",
        pricePerNight: 399,
        capacity: 2,
        totalRooms: 10,
        availableRooms: 10,
        amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"],
      },
      {
        roomType: "Luxury Room",
        pricePerNight: 499,
        capacity: 3,
        totalRooms: 5,
        availableRooms: 5,
        amenities: ["Free WiFi", "Free Breakfast", "Mountain View"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
  {
    _id: "67f76452197ac559e4089b8e",
    name: "The Royal Crest Luxury Suite",
    description: "Spacious private suites with top-tier amenities, 24/7 concierge, and bespoke travel experiences in London.",
    city: "London",
    address: "48 Kensington Gardens, Central London, UK",
    contact: "+44 20 7946 0992",
    rating: 4.8,
    reviewsCount: 195,
    pricePerNight: 299,
    amenities: ["Free WiFi", "Room Service", "Mountain View"],
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Luxury Room",
        pricePerNight: 299,
        capacity: 2,
        totalRooms: 8,
        availableRooms: 8,
        amenities: ["Free WiFi", "Room Service", "Mountain View"],
        images: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
  {
    _id: "67f76406197ac559e4089b82",
    name: "Urbanza Suites",
    description: "Experience world-class hospitality in the heart of Manhattan with luxury amenities and panoramic skyline views.",
    city: "New York",
    address: "Main Road 123 Street, Manhattan, NY",
    contact: "+1 212 555 0199",
    rating: 4.8,
    reviewsCount: 240,
    pricePerNight: 249,
    amenities: ["Free WiFi", "Free Breakfast", "Room Service", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Double Bed",
        pricePerNight: 249,
        capacity: 2,
        totalRooms: 12,
        availableRooms: 12,
        amenities: ["Free WiFi", "Free Breakfast", "Room Service"],
        images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
  {
    _id: "67f763d8197ac559e4089b7a",
    name: "Urbanza Single Studio",
    description: "Modern, minimalist boutique rooms perfect for solo adventurers and business executives visiting Manhattan.",
    city: "New York",
    address: "125 Broadway Ave, New York, NY",
    contact: "+1 212 555 0200",
    rating: 4.6,
    reviewsCount: 140,
    pricePerNight: 199,
    amenities: ["Free WiFi", "Room Service", "Pool Access"],
    images: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Single Bed",
        pricePerNight: 199,
        capacity: 1,
        totalRooms: 15,
        availableRooms: 15,
        amenities: ["Free WiFi", "Room Service", "Pool Access"],
        images: ["https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
  {
    _id: "67f763d8197ac559e4089b7b",
    name: "Grand Horizon Bay Resort",
    description: "Breathtaking beachfront resort on Palm Jumeirah offering private balconies, infinite sea views, and award-winning dining.",
    city: "Dubai",
    address: "Palm Jumeirah Crescent, Dubai, UAE",
    contact: "+971 4 555 0100",
    rating: 4.9,
    reviewsCount: 450,
    pricePerNight: 499,
    amenities: ["Pool Access", "Free WiFi", "Mountain View", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200",
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Family Suite",
        pricePerNight: 499,
        capacity: 4,
        totalRooms: 8,
        availableRooms: 8,
        amenities: ["Pool Access", "Free WiFi", "Mountain View"],
        images: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
  {
    _id: "67f763d8197ac559e4089b7c",
    name: "Marina Bay Vista Hotel",
    description: "Iconic contemporary stay featuring rooftop infinity pool, sky garden lounge, and gourmet dining overlooking the Singapore skyline.",
    city: "Singapore",
    address: "10 Bayfront Avenue, Marina Bay, Singapore",
    contact: "+65 6688 8868",
    rating: 4.7,
    reviewsCount: 190,
    pricePerNight: 349,
    amenities: ["Pool Access", "Free Breakfast", "Free WiFi", "Room Service"],
    images: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200",
    ],
    rooms: [
      {
        roomType: "Luxury Room",
        pricePerNight: 349,
        capacity: 2,
        totalRooms: 10,
        availableRooms: 10,
        amenities: ["Pool Access", "Free Breakfast", "Free WiFi"],
        images: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200"],
      },
    ],
    isAvailable: true,
    ownerClerkId: "system_admin",
  },
];

export const seedDatabase = async () => {
  try {
    for (const hotelData of initialHotelsData) {
      const exists = await Hotel.findById(hotelData._id);
      if (!exists) {
        await Hotel.create(hotelData);
      }
    }
    console.log("Hotel database synchronized with sample properties.");
  } catch (err) {
    console.error("Hotel seed database notice:", err.message);
  }
};
