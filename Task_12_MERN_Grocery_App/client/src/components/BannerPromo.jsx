import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight, Tag } from "lucide-react";

const BannerPromo = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
      {/* Banner 1: Farm Fresh Produce */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-amber-500/10 via-amber-100/40 to-emerald-50 border border-amber-200/60 p-6 sm:p-8 flex items-center justify-between shadow-xs hover:shadow-md transition">
        <div className="space-y-3 z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            <span>Farm Direct</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
            100% Organic Veggies & Fruits
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            Harvested at dawn, delivered to your kitchen table within 30 minutes.
          </p>
          <Link
            to="/products?category=Vegetables"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950 pt-2"
          >
            <span>Shop Fresh Produce</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="w-28 sm:w-36 h-28 sm:h-36 shrink-0 relative">
          <img
            src={assets.organic_vegitable_image}
            alt="Organic Vegetables"
            className="w-full h-full object-contain filter drop-shadow-md hover:scale-110 transition duration-300"
          />
        </div>
      </div>

      {/* Banner 2: Dairy & Bakery */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-500/10 via-sky-100/40 to-indigo-50 border border-blue-200/60 p-6 sm:p-8 flex items-center justify-between shadow-xs hover:shadow-md transition">
        <div className="space-y-3 z-10 max-w-[60%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-wider">
            <Tag className="w-3 h-3" />
            <span>Morning Breakfast</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight leading-tight">
            Fresh Milk, Artisan Bread & Eggs
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            Pure daily essentials from certified local creameries & bakeries.
          </p>
          <Link
            to="/products?category=Dairy"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 pt-2"
          >
            <span>Shop Dairy & Bakery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="w-28 sm:w-36 h-28 sm:h-36 shrink-0 relative">
          <img
            src={assets.dairy_product_image}
            alt="Dairy Products"
            className="w-full h-full object-contain filter drop-shadow-md hover:scale-110 transition duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerPromo;
