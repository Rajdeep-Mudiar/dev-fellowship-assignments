import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AddressModal from "../components/AddressModal";
import {
  MapPin,
  Plus,
  CreditCard,
  Banknote,
  Clock,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const Checkout = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    currency,
    addresses,
    selectedAddress,
    setSelectedAddress,
    getCartSubtotal,
    getDeliveryFee,
    getFinalTotal,
    placeCODOrder,
    placeStripeOrder,
    token,
    setIsAuthModalOpen,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState("Stripe"); // "Stripe" | "COD"
  const [deliverySlot, setDeliverySlot] = useState("Express Delivery (30 mins)");
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const totalAmount = getFinalTotal();

  // Check if cart has items
  const cartCount = Object.values(cartItems).reduce((sum, q) => sum + q, 0);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.warning("Please select or add a delivery address first!");
      setIsAddressModalOpen(true);
      return;
    }

    if (cartCount === 0) {
      toast.error("Your basket is empty!");
      navigate("/products");
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === "COD") {
        const order = await placeCODOrder(selectedAddress, deliverySlot);
        if (order) {
          navigate("/my-orders?placed=true");
        }
      } else {
        const res = await placeStripeOrder(selectedAddress, deliverySlot);
        if (res && res.isMock) {
          navigate("/my-orders?success=true");
        }
      }
    } catch (err) {
      toast.error("Error processing order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Checkout & Delivery
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Select delivery location and payment method to complete your grocery order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Options Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* 1. Address Section */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                  1
                </div>
                <h3 className="text-base font-black text-gray-900">
                  Select Delivery Address
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddressModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs hover:bg-emerald-100 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            {/* Address Cards Grid */}
            {addresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {addresses.map((addr) => {
                  const isSelected = selectedAddress?._id === addr._id;
                  return (
                    <div
                      key={addr._id}
                      onClick={() => setSelectedAddress(addr)}
                      className={`p-4 rounded-2xl border-2 transition cursor-pointer relative ${
                        isSelected
                          ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {addr.firstName} {addr.lastName}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {addr.street}, {addr.city}, {addr.state} - {addr.zipcode}
                      </p>
                      <p className="text-[11px] text-gray-500 font-medium mt-2">
                        Phone: <strong>{addr.phone}</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-6 border border-dashed border-gray-200 rounded-2xl space-y-3">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto" />
                <p className="text-xs text-gray-500">No delivery addresses found.</p>
                <button
                  type="button"
                  onClick={() => setIsAddressModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Add Your Address
                </button>
              </div>
            )}
          </div>

          {/* 2. Delivery Slot */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                2
              </div>
              <h3 className="text-base font-black text-gray-900">
                Choose Delivery Slot
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Express Delivery", time: "In 30 Minutes", badge: "⚡ Fastest" },
                { title: "Morning Slot", time: "7:00 AM - 9:00 AM", badge: "Tomorrow" },
                { title: "Evening Slot", time: "6:00 PM - 8:00 PM", badge: "Today" },
              ].map((slot, idx) => {
                const label = `${slot.title} (${slot.time})`;
                const isSelected = deliverySlot.includes(slot.title);

                return (
                  <div
                    key={idx}
                    onClick={() => setDeliverySlot(label)}
                    className={`p-4 rounded-2xl border-2 transition cursor-pointer ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      {slot.badge}
                    </span>
                    <h4 className="text-sm font-bold text-gray-900 mt-2">{slot.title}</h4>
                    <p className="text-xs text-gray-500">{slot.time}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
                3
              </div>
              <h3 className="text-base font-black text-gray-900">
                Select Payment Mode
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Stripe Online */}
              <div
                onClick={() => setPaymentMethod("Stripe")}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === "Stripe"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                      <span>Online Payment (Stripe)</span>
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded">
                        Cards / UPI
                      </span>
                    </h4>
                    <p className="text-xs text-gray-500">
                      Secure checkout with 128-bit encryption
                    </p>
                  </div>
                </div>
                {paymentMethod === "Stripe" && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>

              {/* Cash On Delivery */}
              <div
                onClick={() => setPaymentMethod("COD")}
                className={`p-5 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                  paymentMethod === "COD"
                    ? "border-emerald-600 bg-emerald-50/40 shadow-xs"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">
                      Cash on Delivery (COD)
                    </h4>
                    <p className="text-xs text-gray-500">
                      Pay cash or UPI directly to rider upon delivery
                    </p>
                  </div>
                </div>
                {paymentMethod === "COD" && (
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Summary Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-black text-gray-900 tracking-tight pb-3 border-b border-gray-100">
              Payment Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Total Items</span>
                <span className="font-bold text-gray-900">{cartCount} items</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">{currency}{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Delivery</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-emerald-600 uppercase">FREE</span>
                ) : (
                  <span className="font-bold text-gray-900">{currency}{deliveryFee}</span>
                )}
              </div>

              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-200">
                <span>Total Payable</span>
                <span className="text-emerald-700">{currency}{totalAmount}</span>
              </div>
            </div>

            {/* Selected Address Preview */}
            {selectedAddress && (
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-gray-100 text-xs space-y-1">
                <p className="font-bold text-gray-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Delivering to:</span>
                </p>
                <p className="text-gray-600 truncate">
                  {selectedAddress.street}, {selectedAddress.city}
                </p>
              </div>
            )}

            {/* Place Order CTA */}
            <button
              type="button"
              disabled={loading || cartCount === 0}
              onClick={handlePlaceOrder}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>
                    {paymentMethod === "Stripe"
                      ? `Pay ${currency}${totalAmount} with Stripe`
                      : `Place Order (Pay ${currency}${totalAmount} on Delivery)`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>100% Safe & Encrypted Transactions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Address Form Modal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
      />
    </div>
  );
};

export default Checkout;
