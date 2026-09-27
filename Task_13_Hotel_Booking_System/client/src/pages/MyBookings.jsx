import React, { useEffect, useState } from "react";
import { getMyBookings, cancelBooking, createCheckoutSession } from "../services/api";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getMyBookings();
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlePayNow = async (bookingId) => {
    try {
      setActionLoading(bookingId);
      const res = await createCheckoutSession(bookingId);
      if (res.url) {
        window.location.href = res.url;
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to initiate payment");
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      setActionLoading(bookingId);
      const res = await cancelBooking(bookingId);
      if (res.success) {
        fetchBookings();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "unpaid":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "refunded":
        return "bg-purple-50 text-purple-700 border-purple-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32 max-w-6xl mx-auto pb-24 min-h-[75vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-gray-200 mb-8">
        <div>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
            My Bookings
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Track and manage your upcoming stays, payment invoices, and reservation details.
          </p>
        </div>
        <button
          onClick={() => navigate("/rooms")}
          className="mt-4 md:mt-0 text-sm font-medium text-blue-600 hover:underline"
        >
          + Book Another Stay
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <img src={assets.homeIcon} alt="" className="w-12 h-12 mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No Bookings Found</h3>
          <p className="text-sm text-gray-500 mb-6">
            You don't have any hotel reservations yet. Start exploring properties!
          </p>
          <button
            onClick={() => navigate("/rooms")}
            className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
          >
            Explore Hotels
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6"
            >
              {/* Hotel Info & Image */}
              <div className="flex flex-col sm:flex-row gap-5">
                <img
                  src={
                    booking.hotelId?.images?.[0] ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600"
                  }
                  alt=""
                  className="w-full sm:w-44 h-32 object-cover rounded-xl"
                />
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-bold">
                        {booking.bookingId}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold capitalize ${getStatusBadge(
                          booking.bookingStatus
                        )}`}
                      >
                        {booking.bookingStatus}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold capitalize ${getPaymentBadge(
                          booking.paymentStatus
                        )}`}
                      >
                        {booking.paymentStatus}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-playfair text-gray-900">
                      {booking.hotelId?.name || "Hotel Reservation"}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {booking.hotelId?.address}, {booking.hotelId?.city}
                    </p>
                    <p className="text-xs font-medium text-gray-700 mt-1">
                      Room: {booking.roomType} • {booking.guests} Guest(s) • {booking.numberOfRooms || 1} Room(s)
                    </p>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 mt-3 pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-gray-400 block">Check-in:</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(booking.checkIn).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Check-out:</span>
                      <span className="font-semibold text-gray-800">
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400 block">Duration:</span>
                      <span className="font-semibold text-gray-800">{booking.nights} Night(s)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="flex flex-col justify-between items-end border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6 min-w-40">
                <div className="text-right">
                  <span className="text-xs text-gray-400">Total Price</span>
                  <p className="text-2xl font-bold text-gray-900">${booking.totalAmount}</p>
                </div>

                <div className="flex flex-col gap-2 w-full mt-4">
                  {booking.paymentStatus === "unpaid" && booking.bookingStatus !== "cancelled" && (
                    <button
                      onClick={() => handlePayNow(booking._id)}
                      disabled={actionLoading === booking._id}
                      className="w-full px-4 py-2 bg-black hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-all"
                    >
                      {actionLoading === booking._id ? "Loading..." : "Pay with Stripe"}
                    </button>
                  )}

                  {booking.bookingStatus !== "cancelled" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      disabled={actionLoading === booking._id}
                      className="w-full px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 text-xs font-medium rounded-lg transition-all"
                    >
                      Cancel Reservation
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
