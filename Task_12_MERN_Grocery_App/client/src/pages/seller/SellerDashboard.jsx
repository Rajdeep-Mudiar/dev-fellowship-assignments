import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import {
  TrendingUp,
  ShoppingBag,
  Package,
  AlertCircle,
  Plus,
  ArrowRight,
  Clock,
  DollarSign,
  CheckCircle,
} from "lucide-react";

const SellerDashboard = () => {
  const { products, currency, orders } = useApp();
  const [sellerOrders, setSellerOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSellerOrders = async () => {
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

    fetchSellerOrders();
  }, [orders]);

  const totalRevenue = sellerOrders.reduce((sum, ord) => sum + (ord.amount || 0), 0);
  const inStockCount = products.filter((p) => p.inStock !== false).length;
  const outOfStockCount = products.filter((p) => p.inStock === false).length;

  return (
    <div className="space-y-8">
      {/* Top Welcome */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
            Live Store Metrics
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Store Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Real-time analytics for your grocery stock, customer sales, and pending deliveries.
          </p>
        </div>

        <Link
          to="/seller/add-product"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md shadow-amber-500/20 transition self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Card 1: Revenue */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Gross Revenue
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              {currency}
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              {currency}{totalRevenue.toLocaleString("en-IN")}
            </h3>
            <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Orders volume active</span>
            </p>
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              {sellerOrders.length}
            </h3>
            <p className="text-[11px] font-bold text-amber-700 mt-1">
              Customer checkouts
            </p>
          </div>
        </div>

        {/* Card 3: Catalog Items */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Catalog Items
            </span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              {products.length}
            </h3>
            <p className="text-[11px] font-bold text-indigo-700 mt-1">
              Active grocery items
            </p>
          </div>
        </div>

        {/* Card 4: Inventory Health */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Stock Status
            </span>
            <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
              {inStockCount} <span className="text-xs text-gray-400 font-bold">/ {products.length} In Stock</span>
            </h3>
            <p className="text-[11px] font-bold text-gray-500 mt-1">
              {outOfStockCount > 0 ? (
                <span className="text-rose-600 font-bold">{outOfStockCount} Out of Stock</span>
              ) : (
                <span className="text-emerald-600 font-bold">100% In Stock</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="text-base font-black text-gray-900">Recent Customer Orders</h3>
          <Link
            to="/seller/orders"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
          >
            <span>View all orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {sellerOrders.length > 0 ? (
          <div className="divide-y divide-gray-100 overflow-x-auto">
            {sellerOrders.slice(0, 5).map((order) => (
              <div key={order._id} className="py-3 flex items-center justify-between gap-4 text-xs">
                <div>
                  <p className="font-bold text-gray-900">
                    Order #{String(order._id).substring(String(order._id).length - 8).toUpperCase()}
                  </p>
                  <p className="text-[11px] text-gray-400">
                    {order.items?.length || 0} items • {order.paymentType}
                  </p>
                </div>
                <span className="font-black text-gray-900 text-sm">
                  {currency}{order.amount}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-slate-100 text-gray-700">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 py-4 text-center">No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
