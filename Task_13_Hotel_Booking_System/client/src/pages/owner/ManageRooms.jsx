import React, { useEffect, useState } from "react";
import { getAdminHotels, deleteHotel } from "../../services/api";
import { Link } from "react-router-dom";
import { roomsDummyData } from "../../assets/assets";

const ManageRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchHotels = async () => {
    setLoading(true);
    try {
      const res = await getAdminHotels();
      let list = res.success && res.data ? res.data : [];

      // Merge locally saved custom hotels from localStorage
      try {
        const localList = JSON.parse(localStorage.getItem("quickstay_custom_hotels") || "[]");
        if (localList.length > 0) {
          const existingNames = new Set(list.map((h) => h.name));
          const toAdd = localList.filter((h) => !existingNames.has(h.name));
          list = [...toAdd, ...list];
        }
      } catch (e) {}

      setHotels(list);
    } catch (err) {
      console.error("Error fetching admin hotels:", err);
      try {
        const localList = JSON.parse(localStorage.getItem("quickstay_custom_hotels") || "[]");
        setHotels(localList.length > 0 ? localList : []);
      } catch (e) {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name || "this property"}"?`)) return;

    try {
      setDeleteLoading(id);
      await deleteHotel(id).catch(() => {});

      // Remove from localStorage
      try {
        const localList = JSON.parse(localStorage.getItem("quickstay_custom_hotels") || "[]");
        const updated = localList.filter((h) => h._id !== id && h.name !== name);
        localStorage.setItem("quickstay_custom_hotels", JSON.stringify(updated));
      } catch (e) {}

      setHotels((prev) => prev.filter((h) => h._id !== id && h.name !== name));
    } catch (err) {
      setHotels((prev) => prev.filter((h) => h._id !== id && h.name !== name));
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-playfair text-3xl font-bold text-gray-900">Manage Properties</h1>
          <p className="text-gray-500 text-sm mt-1">
            View, edit, or remove hotel listings and monitor inventory across destinations.
          </p>
        </div>
        <Link
          to="/owner/add-hotel"
          className="px-5 py-2.5 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-all"
        >
          + Add New Property
        </Link>
      </div>

      {hotels.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <p className="text-gray-500 mb-4">No properties listed yet.</p>
          <Link
            to="/owner/add-hotel"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Create your first property →
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-xs uppercase text-gray-400 font-semibold border-b border-gray-100">
                <tr>
                  <th className="py-4 px-6">Property</th>
                  <th className="py-4 px-6">Destination</th>
                  <th className="py-4 px-6">Starting Price</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Total Rooms</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {hotels.map((hotel) => (
                  <tr key={hotel._id || hotel.name} className="hover:bg-gray-50/50">
                    <td className="py-4 px-6 flex items-center gap-3">
                      <img
                        src={hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200"}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{hotel.name}</p>
                        <p className="text-xs text-gray-400">{hotel.address}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-gray-800">{hotel.city}</td>
                    <td className="py-4 px-6 font-bold text-gray-900">${hotel.pricePerNight} / night</td>
                    <td className="py-4 px-6">★ {hotel.rating || 4.8}</td>
                    <td className="py-4 px-6">
                      {hotel.rooms?.reduce((acc, r) => acc + (r.totalRooms || 5), 0) || 10} rooms
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDelete(hotel._id, hotel.name)}
                        disabled={deleteLoading === hotel._id}
                        className="px-3 py-1.5 border border-red-200 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 transition-all cursor-pointer"
                      >
                        {deleteLoading === hotel._id ? "Deleting..." : "Delete"}
                      </button>
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

export default ManageRooms;
