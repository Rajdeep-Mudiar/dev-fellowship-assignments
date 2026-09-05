import React, { useState, useEffect } from "react";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import {
  ShoppingBag,
  RefreshCw,
  Clock,
  MapPin,
  CheckCircle,
  Truck,
  CreditCard,
  Banknote,
} from "lucide-react";
import { toast } from "react-toastify";

const OrderList = () => {
  const { currency, orders } = useApp();
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get("/order/seller-orders");
      if (res.data?.success) {
        setSellerOrders(res.data.orders);
      } else {
        setSellerOrders(orders);
      }
    } catch (err) {
      setSellerOrders(orders);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await api.post("/order/update-status", {
        orderId,
        status: newStatus,
      });

      if (res.data?.success) {
        toast.success(`Order status updated to: ${newStatus}`);
        setSellerOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
        );
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadge = (status) => {
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
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
            Order Fulfillment
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Customer Orders ({sellerOrders.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Fulfill grocery deliveries and update dispatch statuses in real time.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 font-bold text-xs transition self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Orders</span>
        </button>
      </div>

      {sellerOrders.length > 0 ? (
        <div className="space-y-6">
          {sellerOrders.map((order) => {
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
                className="bg-slate-50/70 rounded-2xl border border-gray-200 p-5 space-y-4 text-xs"
              >
                {/* Header info */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-200">
                  <div>
                    <span className="font-black text-gray-900 text-sm">
                      Order #{String(order._id).substring(String(order._id).length - 8).toUpperCase()}
                    </span>
                    <p className="text-[11px] text-gray-400">Placed: {orderDate}</p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-600">Update Status:</span>
                    <select
                      value={order.status}
                      disabled={updatingId === order._id}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`font-black text-xs px-3 py-1.5 rounded-xl border focus:outline-none ${getStatusBadge(
                        order.status
                      )}`}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Processing">Processing / Packing</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Details grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Address */}
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Customer & Destination:</span>
                    </p>
                    <p className="font-semibold text-gray-800">
                      {order.address?.firstName} {order.address?.lastName}
                    </p>
                    <p className="text-gray-500">
                      {order.address?.street}, {order.address?.city} - {order.address?.zipcode}
                    </p>
                    <p className="text-gray-500">Phone: {order.address?.phone}</p>
                  </div>

                  {/* Items */}
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 flex items-center gap-1">
                      <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                      <span>Order Items ({order.items?.length || 0}):</span>
                    </p>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {order.items?.map((item, idx) => (
                        <p key={idx} className="text-gray-700 truncate">
                          • {item.quantity}x {item.product?.name || "Item"} (
                          {currency}{item.product?.offerPrice || item.product?.price || 0})
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Payment & Amount */}
                  <div className="space-y-1 md:text-right">
                    <p className="font-bold text-gray-900">Payment Summary:</p>
                    <p className="text-sm font-black text-gray-900">
                      Total: {currency}{order.amount}
                    </p>
                    <p className="text-gray-600">
                      Method: <strong>{order.paymentType}</strong> (
                      {order.isPaid ? (
                        <span className="text-emerald-600 font-bold">Paid</span>
                      ) : (
                        <span className="text-amber-600 font-bold">Unpaid COD</span>
                      )}
                      )
                    </p>
                    <p className="text-[11px] text-gray-400">
                      Slot: {order.deliverySlot || "Express"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-3xl space-y-2">
          <ShoppingBag className="w-10 h-10 text-gray-300 mx-auto" />
          <h3 className="text-sm font-bold text-gray-700">No Orders in Queue</h3>
          <p className="text-xs text-gray-400">
            Customer orders will show up here for fulfillment and status updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
