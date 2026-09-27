import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets, facilityIcons, roomCommonData, roomsDummyData } from "../assets/assets";
import StarRating from "../components/StarRating";
import { getHotelById, createBooking, createCheckoutSession } from "../services/api";
import { useUser, useClerk } from "@clerk/react";
import { useApp } from "../context/AppContext";

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const { searchParams } = useApp();

  const [hotel, setHotel] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [selectedRoomType, setSelectedRoomType] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split("T")[0];

  const [checkIn, setCheckIn] = useState(searchParams.checkIn || todayStr);
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || tomorrowStr);
  const [guests, setGuests] = useState(searchParams.guests || 1);
  const [roomsCount, setRoomsCount] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchHotel = async () => {
      setLoading(true);
      try {
        const res = await getHotelById(id);
        if (res.success && res.data) {
          setHotel(res.data);
          setSelectedImage(res.data.images?.[0] || "");
          setSelectedRoomType(res.data.rooms?.[0]?.roomType || "Deluxe Room");
        }
      } catch (err) {
        // Fallback to dummy data matching id or first item
        const fallback =
          roomsDummyData.find((r) => r._id === id || r.hotel._id === id) ||
          roomsDummyData[0];
        setHotel({
          _id: fallback._id,
          name: fallback.hotel.name,
          city: fallback.hotel.city,
          address: fallback.hotel.address,
          description:
            "Immerse yourself in unrivaled luxury and world-class service. Designed for discerning travelers seeking comfort, style, and memorable moments.",
          rating: 4.8,
          reviewsCount: 150,
          pricePerNight: fallback.pricePerNight,
          amenities: fallback.amenities,
          images: fallback.images,
          rooms: [
            {
              roomType: fallback.roomType,
              pricePerNight: fallback.pricePerNight,
              capacity: 2,
              amenities: fallback.amenities,
            },
          ],
        });
        setSelectedImage(fallback.images[0]);
        setSelectedRoomType(fallback.roomType);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
    window.scrollTo(0, 0);
  }, [id]);

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = Math.ceil((outDate - inDate) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();
  const currentRoom =
    hotel?.rooms?.find((r) => r.roomType === selectedRoomType) || {
      pricePerNight: hotel?.pricePerNight || 299,
    };
  const totalAmount = currentRoom.pricePerNight * nights * roomsCount;

  const handleBooking = async () => {
    setErrorMessage("");
    if (!isSignedIn) {
      openSignIn();
      return;
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setErrorMessage("Check-out date must be after check-in date");
      return;
    }

    try {
      setBookingLoading(true);
      const bookingData = {
        hotelId: hotel._id,
        roomType: selectedRoomType,
        checkIn,
        checkOut,
        guests: Number(guests),
        numberOfRooms: Number(roomsCount),
        userEmail: user.primaryEmailAddress?.emailAddress,
        userName: user.fullName || user.firstName || "Guest",
      };

      const bookingRes = await createBooking(bookingData);

      if (bookingRes.success && bookingRes.data) {
        const sessionRes = await createCheckoutSession(bookingRes.data._id);
        if (sessionRes.url) {
          window.location.href = sessionRes.url;
        } else {
          navigate("/my-bookings");
        }
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message || "Failed to initiate booking. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="pt-32 text-center text-gray-600 min-h-[60vh]">
        <h2 className="text-2xl font-bold">Hotel Not Found</h2>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 px-6 py-2 bg-black text-white rounded-full"
        >
          Back to Hotels
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto pb-24">
      {/* Title & Location */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-playfair text-3xl md:text-4xl text-gray-900 font-bold">
            {hotel.name}
          </h1>
          <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <StarRating rating={hotel.rating || 4.5} />
              <span className="font-semibold ml-1 text-gray-800">
                {hotel.rating || 4.5}
              </span>
              <span className="text-gray-400">
                ({hotel.reviewsCount || 120} reviews)
              </span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1">
              <img src={assets.locationIcon} alt="" className="w-4 h-4" />
              <span>
                {hotel.address}, {hotel.city}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="md:col-span-2">
          <img
            src={selectedImage || hotel.images[0]}
            alt={hotel.name}
            className="w-full h-72 md:h-[420px] object-cover rounded-2xl shadow-sm"
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-3 max-h-[420px] overflow-y-auto">
          {hotel.images?.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt=""
              onClick={() => setSelectedImage(img)}
              className={`w-full h-24 md:h-[100px] object-cover rounded-xl cursor-pointer transition-all ${
                selectedImage === img
                  ? "ring-2 ring-black opacity-100"
                  : "opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
        {/* Left Column: Details, Description, Amenities */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <div>
            <h2 className="text-2xl font-bold font-playfair text-gray-900 mb-3">
              About this property
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {hotel.description}
            </p>
          </div>

          {/* Highlights / Common Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-gray-200 py-6">
            {roomCommonData.map((perk, i) => (
              <div key={i} className="flex items-start gap-3">
                <img src={perk.icon} alt="" className="w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm">{perk.title}</h4>
                  <p className="text-xs text-gray-500">{perk.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Amenities Grid */}
          <div>
            <h3 className="text-xl font-bold font-playfair text-gray-900 mb-4">
              Property Amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities?.map((amenity, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-gray-700 text-sm font-medium"
                >
                  <img
                    src={facilityIcons[amenity] || assets.homeIcon}
                    alt={amenity}
                    className="w-5 h-5"
                  />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Booking Card */}
        <div>
          <div className="sticky top-28 bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="text-3xl font-bold text-gray-900">
                  ${currentRoom.pricePerNight}
                </span>
                <span className="text-gray-500 text-sm"> / night</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-700">
                <img src={assets.starIconFilled} alt="" className="w-4 h-4" />
                <span className="font-semibold">{hotel.rating || 4.5}</span>
              </div>
            </div>

            {errorMessage && (
              <div className="mb-4 p-3 text-xs bg-red-50 text-red-600 rounded-lg border border-red-200">
                {errorMessage}
              </div>
            )}

            {/* Room Type Selector */}
            {hotel.rooms && hotel.rooms.length > 1 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Select Room Type
                </label>
                <select
                  value={selectedRoomType}
                  onChange={(e) => setSelectedRoomType(e.target.value)}
                  className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-800 outline-none focus:border-black"
                >
                  {hotel.rooms.map((room, idx) => (
                    <option key={idx} value={room.roomType}>
                      {room.roomType} — ${room.pricePerNight}/night
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Dates Picker */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  min={todayStr}
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  min={checkIn || todayStr}
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-xs outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Guests & Rooms counter */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Rooms
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={roomsCount}
                  onChange={(e) => setRoomsCount(e.target.value)}
                  className="w-full p-2 bg-gray-50 border border-gray-300 rounded-lg text-sm outline-none focus:border-black"
                />
              </div>
            </div>

            {/* Pricing Calculation Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>
                  ${currentRoom.pricePerNight} × {nights} night(s) × {roomsCount} room(s)
                </span>
                <span>${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Service fees</span>
                <span className="text-green-600 font-medium">Included</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                <span>Total Amount</span>
                <span>${totalAmount}</span>
              </div>
            </div>

            {/* Book Now Button */}
            <button
              onClick={handleBooking}
              disabled={bookingLoading}
              className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-medium rounded-xl transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {bookingLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  <span>Processing Reservation...</span>
                </>
              ) : (
                <span>Reserve & Pay with Stripe</span>
              )}
            </button>

            <p className="text-xs text-center text-gray-400 mt-4">
              Secure checkout powered by Stripe. Instant confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
