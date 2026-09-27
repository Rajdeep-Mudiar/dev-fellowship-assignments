import React, { useEffect, useState } from "react";
import { getAdminBookings, updateBookingStatus } from "../../services/api";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await getAdminBookings(statusFilter ? { bookingStatus: statusFilter } : {});
      if (res.success && res.data) {
        setBookings(res.data);
      }
    } catch (err) {
      console.error("Error fetching admin bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateBookingStatus(id, newStatus);
      if (res.success) {
        fetchBookings();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update booking status");
    }
  };

  if (loading && bookings.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900">Manage Reservations</h1>
          <p className="text-gray-500 text-sm mt-1">
            Monitor guest bookings, confirm reservations, and oversee payment states.
          </p>
        </div>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm outline-none font-medium text-gray-700"
        >
          <option value="">All Statuses</option>
          <option value="confirmed">Confirmed</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-gray-500">No bookings match the selected criteria.</p>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6">ID / Date</th>
                  <th className="py-4 px-6">Guest</th>
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-6">Stay Period</th>
                  <th className="py-4 px-6">Total</th>
                  <th className="py-4 px-6">Payment</th>
                  <th className="py-4 px-6 text-right">Status Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/50">
                    <td className="py-4 px-6">
                      <p className="font-mono font-bold text-gray-900">{b.bookingId}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(b.createdAt).toLocaleDateString()}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-gray-900">{b.userName || "Guest"}</p>
                      <p className="text-xs text-gray-400">{b.userEmail}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{b.hotelId?.name || "Hotel"}</p>
                      <p className="text-xs text-gray-400">{b.roomType}</p>
                    </td>
                    <td className="py-4 px-6 text-xs">
                      <span className="font-medium text-gray-800">
                        {new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}
                      </span>
                      <span className="block text-gray-400">({b.nights} night(s), {b.guests} guests)</span>
                    </td>
                    <td className="py-4 px-6 font-bold text-gray-900">${b.totalAmount}</td>
                    <td className="py-4 px-6">
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
                    <td className="py-4 px-6 text-right">
                      <select
                        value={b.bookingStatus}
                        onChange={(e) => handleStatusChange(b._id, e.target.value)}
                        className="text-xs font-semibold px-2 py-1 bg-gray-50 border border-gray-300 rounded-lg outline-none cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBookings;
