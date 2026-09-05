import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import api from "../services/api";
import OrderTrackingModal from "../components/OrderTrackingModal";
import {
  PackageCheck,
  Clock,
  MapPin,
  CreditCard,
  Banknote,
  CheckCircle,
  Truck,
  ArrowRight,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

const MyOrders = () => {
  const [searchParams] = useSearchParams();
  const { orders, fetchOrders, currency, token, loadingOrders, addToCart } = useApp();

  const [selectedTrackingOrder, setSelectedTrackingOrder] = useState(null);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);

  // Handle Stripe Success Callback Verification
  useEffect(() => {
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const sessionId = searchParams.get("session_id");

    if (success === "true" && orderId) {
      toast.success("Payment Received! Your grocery order is placed.");
      if (token) {
        api.post("/order/verify-stripe", { orderId, sessionId }).then(() => {
          fetchOrders();
        });
      }
    }
  }, [searchParams, token, fetchOrders]);

  const openTracker = (order) => {
    setSelectedTrackingOrder(order);
    setIsTrackingModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Out for Delivery":
        return "bg-sky-100 text-sky-800 border-sky-200";
      case "Processing":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Cancelled":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <PackageCheck className="w-3.5 h-3.5" />
            <span>Customer Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            My Grocery Orders
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Track real-time status and delivery timeline for all your recent orders.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="self-start sm:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold text-xs transition"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loadingOrders ? "animate-spin" : ""}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => {
            const orderDate = new Date(order.createdAt || Date.now()).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={order._id}
                className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs hover:shadow-md transition space-y-4"
              >
                {/* Order Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-gray-900">
                        Order #{String(order._id).substring(String(order._id).length - 8).toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 font-medium">Placed on {orderDate}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => openTracker(order)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track Order</span>
                    </button>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {order.items?.map((item, idx) => {
                    const prod = item.product || {};
                    const img =
                      prod.image && prod.image.length > 0
                        ? prod.image[0]
                        : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80";

                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-50/70 rounded-2xl border border-gray-100"
                      >
                        <div className="w-12 h-12 rounded-xl bg-white p-1 border border-gray-200 shrink-0 flex items-center justify-center">
                          <img src={img} alt={prod.name} className="w-full h-full object-contain" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-gray-900 truncate">
                            {prod.name || "Grocery Item"}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-medium">
                            Qty: {item.quantity} × {currency}{prod.offerPrice || prod.price || 0}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Footer Info */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 text-xs text-gray-600">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>
                        Slot: <strong>{order.deliverySlot || "Express (30 mins)"}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {order.paymentType === "Stripe" ? (
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <Banknote className="w-4 h-4 text-emerald-600" />
                      )}
                      <span>
                        Payment: <strong>{order.paymentType}</strong> (
                        {order.isPaid ? (
                          <span className="text-emerald-600 font-bold">Paid</span>
                        ) : (
                          <span className="text-amber-600 font-bold">Pending on delivery</span>
                        )}
                        )
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Order Total:</span>
                    <span className="text-base font-black text-gray-900">
                      {currency}{order.amount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-black text-gray-900">No Orders Placed Yet</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Once you order your fresh groceries, you can track them here in real-time.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* Live Tracker Modal */}
      <OrderTrackingModal
        order={selectedTrackingOrder}
        isOpen={isTrackingModalOpen}
        onClose={() => setIsTrackingModalOpen(false)}
      />
    </div>
  );
};

export default MyOrders;
