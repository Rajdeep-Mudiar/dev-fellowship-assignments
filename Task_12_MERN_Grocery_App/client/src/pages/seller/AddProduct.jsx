import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import { assets } from "../../assets/assets";
import {
  UploadCloud,
  Plus,
  Trash2,
  CheckCircle,
  Package,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

const AddProduct = () => {
  const navigate = useNavigate();
  const { categories, fetchProducts, currency } = useApp();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Vegetables");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [unit, setUnit] = useState("1 kg");
  const [description, setDescription] = useState(
    "100% Farm fresh & organically cultivated\nHandpicked and carefully cleaned\nIdeal for daily kitchen preparation"
  );
  const [inStock, setInStock] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category) {
      toast.warning("Please fill in product title, category, and price!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("offerPrice", offerPrice || price);
      formData.append("unit", unit);
      formData.append("description", description);
      formData.append("inStock", inStock);

      if (imageUrl.trim()) {
        formData.append("imageUrls", imageUrl.trim());
      }

      for (let i = 0; i < imageFiles.length; i++) {
        formData.append("images", imageFiles[i]);
      }

      const res = await api.post("/product/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data?.success) {
        toast.success("New product published to GreenCart catalog!");
        await fetchProducts();
        navigate("/seller/products");
      }
    } catch (error) {
      console.error("Add Product error:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-8">
      <div>
        <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
          Catalog Management
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
          Add New Grocery Product
        </h1>
        <p className="text-xs sm:text-sm text-gray-500">
          Upload images, set pricing, and publish directly to customers on the GreenCart store.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload Area */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Product Images (Upload via Cloudinary or Image URL)
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* File drop area */}
            <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-amber-50/40 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition text-center">
              <UploadCloud className="w-8 h-8 text-amber-600 mb-2" />
              <span className="text-xs font-bold text-gray-800">
                Choose Image Files to Upload
              </span>
              <span className="text-[10px] text-gray-400 mt-0.5">
                PNG, JPG, SVG up to 10MB
              </span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>

            {/* Direct Image URL input */}
            <div className="bg-slate-50 border border-gray-200 rounded-2xl p-4 flex flex-col justify-center space-y-2">
              <span className="text-xs font-bold text-gray-700">
                Or Paste Image URL directly:
              </span>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs bg-white focus:outline-none focus:border-amber-500"
              />
              <p className="text-[10px] text-gray-400">
                Direct CDN, Unsplash, or Cloudinary URL
              </p>
            </div>
          </div>

          {/* Previews */}
          {(previewUrls.length > 0 || imageUrl) && (
            <div className="flex gap-3 pt-2 overflow-x-auto">
              {previewUrls.map((url, i) => (
                <div key={i} className="w-16 h-16 rounded-xl border border-gray-200 p-1 bg-white shrink-0">
                  <img src={url} alt="preview" className="w-full h-full object-contain" />
                </div>
              ))}
              {imageUrl && (
                <div className="w-16 h-16 rounded-xl border border-gray-200 p-1 bg-white shrink-0">
                  <img src={imageUrl} alt="preview url" className="w-full h-full object-contain" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Product Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Organic Seedless Watermelon"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Grocery Category *
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none bg-white font-semibold"
            >
              {categories.map((c, i) => (
                <option key={i} value={c.path}>
                  {c.text} ({c.path})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing & Units */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Original MRP Price ({currency}) *
            </label>
            <input
              type="number"
              required
              min="1"
              placeholder="e.g. 100"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Offer / Selling Price ({currency})
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 85"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Unit Weight / Packaging
            </label>
            <input
              type="text"
              placeholder="e.g. 1 kg, 500 g, 1 Litre"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">
            Description / Bullet Highlights (One per line)
          </label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Key product highlights..."
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-amber-500 focus:outline-none"
          ></textarea>
        </div>

        {/* In Stock Toggle */}
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-gray-200">
          <input
            type="checkbox"
            id="inStockToggle"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
            className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
          />
          <label htmlFor="inStockToggle" className="text-xs font-bold text-gray-800 cursor-pointer">
            Mark product as "In Stock" immediately upon publishing
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              <span>Publish Product to Store</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
