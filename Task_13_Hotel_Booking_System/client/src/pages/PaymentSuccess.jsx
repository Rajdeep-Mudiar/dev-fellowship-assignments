import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBookingById } from "../services/api";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    if (bookingId) {
      getBookingById(bookingId)
        .then((res) => {
          if (res.success) setBooking(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [bookingId]);

  return (
    <div className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[75vh]">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for choosing QuickStay. Your reservation is confirmed and an automated confirmation email has been dispatched.
        </p>

        {booking && (
          <div className="bg-gray-50 rounded-xl p-4 text-left text-xs text-gray-700 space-y-2 mb-6 border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500">Booking ID:</span>
              <span className="font-mono font-bold text-gray-900">{booking.bookingId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Hotel:</span>
              <span className="font-semibold">{booking.hotelId?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Dates:</span>
              <span>
                {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                {new Date(booking.checkOut).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-sm">
              <span>Total Paid:</span>
              <span className="text-green-700">${booking.totalAmount}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/my-bookings"
            className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
