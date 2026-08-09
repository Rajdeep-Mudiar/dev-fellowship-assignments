import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  const handleCtaClick = () => {
    if (userData) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col items-center mt-36 px-4 text-center max-w-3xl animate-fadeIn">
      {/* Decorative Badge */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-200/60 bg-indigo-50/50 backdrop-blur-sm text-indigo-700 text-xs font-semibold tracking-wide mb-6 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping"></span>
        v1.0 Live Workspace
      </div>

      {/* Pulsing Avatar Frame */}
      <div className="relative p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-full shadow-xl mb-6 hover:rotate-6 transition-all duration-300">
        <div className="bg-white rounded-full p-1">
          <img src={assets.header_img} className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover" />
        </div>
      </div>

      {/* Greeting */}
      <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-3xl font-semibold mb-2 text-slate-800">
        Hey {userData ? userData.name : "Developer"}
        <img src={assets.hand_wave} className="w-8 aspect-square animate-bounce" />
      </h1>

      {/* Premium Title */}
      <h2 className="text-4xl sm:text-6xl font-extrabold mb-5 bg-gradient-to-r from-indigo-650 via-purple-600 to-pink-600 bg-clip-text text-transparent tracking-tight leading-tight">
        Welcome to our app
      </h2>

      {/* Subtitle */}
      <p className="mb-8 text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
        Discover a unified workspace designed to elevate your notes, organize task lists, and secure ideas effortlessly.
      </p>

      {/* Call to Action */}
      <button
        onClick={handleCtaClick}
        className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white rounded-full font-medium shadow-lg shadow-indigo-200/50 hover:shadow-indigo-300 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200"
      >
        {userData ? "Go to Dashboard" : "Get Started"}
      </button>

      {/* Highlights Grid */}
      <div className="grid grid-cols-3 gap-4 mt-16 w-full max-w-2xl border-t border-slate-200/60 pt-10">
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/40 border border-white/60 shadow-sm">
          <span className="text-lg mb-1">⚡</span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fast Auth</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/40 border border-white/60 shadow-sm">
          <span className="text-lg mb-1">📝</span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Note CRUD</span>
        </div>
        <div className="flex flex-col items-center p-3 rounded-xl bg-white/40 border border-white/60 shadow-sm">
          <span className="text-lg mb-1">🛡️</span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secure JWT</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
