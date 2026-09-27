import React from "react";
import { Link, useSearchParams } from "react-router-dom";

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  return (
    <div className="pt-32 pb-24 px-4 flex items-center justify-center min-h-[75vh]">
      <div className="bg-white border border-gray-200 rounded-3xl p-8 md:p-12 max-w-lg w-full text-center shadow-lg">
        <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 text-sm mb-6">
          Your Stripe checkout session was cancelled. No charges were made. Your reservation remains saved in your dashboard if you wish to complete payment later.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/my-bookings"
            className="px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
          >
            Go to My Bookings
          </Link>
          <Link
            to="/rooms"
            className="px-6 py-3 border border-gray-300 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-all"
          >
            Explore Hotels
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
