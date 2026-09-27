import React, { useEffect, useState } from "react";
import { getAdminStats } from "../../services/api";
import { assets } from "../../assets/assets";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalHotels: 0,
    totalBookings: 0,
    paidBookings: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    recentBookings: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats()
      .then((res) => {
        if (res.success && res.data) {
          setStats(res.data);
        }
      })
      .catch((err) => console.error("Stats Error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: assets.totalRevenueIcon,
      bgColor: "bg-emerald-50 text-emerald-700",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: assets.totalBookingIcon,
      bgColor: "bg-blue-50 text-blue-700",
    },
    {
      title: "Active Properties",
      value: stats.totalHotels,
      icon: assets.homeIcon,
      bgColor: "bg-purple-50 text-purple-700",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      icon: assets.calenderIcon,
      bgColor: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">
          Overview of platform revenue, bookings, and listed hotel inventory.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map((card, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs text-gray-500 font-medium">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
            </div>
            <div className={`p-3 rounded-xl ${card.bgColor}`}>
              <img src={card.icon} alt="" className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings Section */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Reservations</h2>
        {stats.recentBookings?.length === 0 ? (
          <p className="text-sm text-gray-500 py-4">No recent bookings recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Guest</th>
                  <th className="py-3 px-4">Hotel</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {stats.recentBookings?.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-mono font-semibold text-gray-900">
                      {b.bookingId}
                    </td>
                    <td className="py-3 px-4">{b.userName || b.userEmail}</td>
                    <td className="py-3 px-4 font-medium">{b.hotelId?.name || "Hotel"}</td>
                    <td className="py-3 px-4 font-bold text-gray-900">${b.totalAmount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-medium capitalize ${
                          b.paymentStatus === "paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.paymentStatus}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-400">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
