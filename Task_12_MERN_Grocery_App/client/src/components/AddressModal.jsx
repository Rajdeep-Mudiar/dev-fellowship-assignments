import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, MapPin, Check } from "lucide-react";

const AddressModal = ({ isOpen, onClose }) => {
  const { addDeliveryAddress, user } = useApp();

  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(" ")[0] : "",
    lastName: user?.name ? user.name.split(" ").slice(1).join(" ") : "",
    email: user?.email || "",
    phone: user?.phone || "",
    street: "",
    city: "New Delhi",
    state: "Delhi",
    zipcode: "110001",
    country: "India",
    isDefault: true,
  });

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await addDeliveryAddress(formData);
    setLoading(false);
    if (success) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={onClose}></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-lg w-full overflow-hidden z-10 animate-fade-in">
        <div className="bg-emerald-800 p-6 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">Add Delivery Address</h3>
              <p className="text-xs text-emerald-200">Where should we deliver your groceries?</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Street / House / Flat No. *</label>
            <input
              type="text"
              name="street"
              required
              placeholder="e.g. Flat 402, Green Palm Residency, Sector 14"
              value={formData.street}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">City *</label>
              <input
                type="text"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">State *</label>
              <input
                type="text"
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Zipcode *</label>
              <input
                type="text"
                name="zipcode"
                required
                value={formData.zipcode}
                onChange={handleChange}
                className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Set as default delivery address</span>
            </label>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center gap-2"
            >
              {loading ? (
                "Saving..."
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Save Address</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
