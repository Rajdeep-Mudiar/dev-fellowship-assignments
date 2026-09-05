import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { ArrowRight, Sparkles, Clock, ShieldCheck, ShoppingCart } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white shadow-xl my-6">
      {/* Background graphic elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 -left-20 w-96 h-96 rounded-full bg-emerald-400 blur-3xl"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 rounded-full bg-teal-300 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
            <span>Express Delivery • 30 Minutes</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Fresh Groceries <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-300 via-emerald-200 to-teal-100">
              Delivered Fast
            </span>{" "}
            to Your Door.
          </h1>

          <p className="text-sm sm:text-base text-emerald-100/90 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
            Get daily organic farm vegetables, crisp seasonal fruits, fresh milk, and kitchen staples delivered in 30 minutes with zero hassle.
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-emerald-950 font-black text-sm transition transform hover:-translate-y-0.5 shadow-lg shadow-amber-400/20"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>

            <Link
              to="/products?category=Vegetables"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition backdrop-blur-xs"
            >
              <span>Explore Farm Produce</span>
            </Link>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-700/50 max-w-lg mx-auto lg:mx-0">
            <div>
              <p className="text-xl sm:text-2xl font-black text-amber-300">500+</p>
              <p className="text-[11px] sm:text-xs text-emerald-200/80">Fresh Products</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-emerald-300">30 Min</p>
              <p className="text-[11px] sm:text-xs text-emerald-200/80">Superfast Delivery</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-teal-300">100%</p>
              <p className="text-[11px] sm:text-xs text-emerald-200/80">Farm Sourced</p>
            </div>
          </div>
        </div>

        {/* Hero Visual Banner */}
        <div className="lg:col-span-5 relative flex justify-center items-center">
          <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Glowing background ring */}
            <div className="absolute inset-4 rounded-full bg-linear-to-tr from-emerald-500/20 to-teal-300/30 blur-2xl animate-pulse"></div>

            <img
              src={assets.organic_vegitable_image || assets.main_banner_bg}
              alt="Fresh Organic Produce Basket"
              className="relative z-10 w-4/5 h-4/5 object-contain filter drop-shadow-2xl hover:scale-105 transition duration-500"
            />

            {/* Floating pill 1 */}
            <div className="absolute top-6 left-2 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-2.5 text-emerald-950 border border-white/50 animate-bounce">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Super Express</p>
                <p className="text-xs font-black">⚡ 28 Mins Avg</p>
              </div>
            </div>

            {/* Floating pill 2 */}
            <div className="absolute bottom-6 right-2 z-20 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-xl flex items-center gap-2.5 text-emerald-950 border border-white/50">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-semibold uppercase">Quality Certified</p>
                <p className="text-xs font-black">100% Organic</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
