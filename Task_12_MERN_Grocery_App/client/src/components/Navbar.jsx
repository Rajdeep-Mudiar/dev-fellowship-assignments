import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ShoppingBag,
  Search,
  User as UserIcon,
  MapPin,
  Menu,
  X,
  Store,
  LogOut,
  PackageCheck,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    user,
    token,
    logout,
    sellerToken,
    seller,
    getCartCount,
    getCartSubtotal,
    currency,
    searchQuery,
    setSearchQuery,
    selectedAddress,
    setIsAuthModalOpen,
    setAuthModalTab,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (location.pathname !== "/products") {
      navigate("/products");
    }
  };

  const cartCount = getCartCount();
  const cartSubtotal = getCartSubtotal();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      {/* Top micro-announcement bar */}
      <div className="bg-emerald-700 text-emerald-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-emerald-950 font-bold px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
              Flash Deal
            </span>
            <span className="hidden sm:inline">⚡ Get FREE 30-Minute Express Delivery on orders above {currency}299!</span>
            <span className="sm:hidden">⚡ Free 30-min delivery on {currency}299+</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <Link
              to="/seller"
              className="text-emerald-100 hover:text-white flex items-center gap-1 font-semibold transition"
            >
              <Store className="w-3.5 h-3.5" />
              <span>{sellerToken ? "Seller Portal (Active)" : "Sell on GreenCart"}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo & Location */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition">
                <img src={assets.logo} alt="GreenCart Logo" className="w-7 h-7 object-contain" />
              </div>
              <div>
                <span className="text-2xl font-black tracking-tight text-emerald-950 flex items-center">
                  Green<span className="text-emerald-600">Cart</span>
                </span>
                <span className="text-[10px] block font-semibold text-emerald-600 -mt-1 tracking-wider uppercase">
                  30-Min Groceries
                </span>
              </div>
            </Link>

            {/* Delivery Location pill */}
            <div className="hidden xl:flex items-center gap-2 bg-emerald-50/80 border border-emerald-100 rounded-xl px-3 py-1.5 text-xs text-emerald-900">
              <div className="p-1 rounded-lg bg-emerald-600/10 text-emerald-700">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-emerald-800 text-[11px] flex items-center gap-1">
                  Delivery in 30 mins
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="text-[11px] text-gray-500 truncate max-w-[140px]">
                  {selectedAddress ? `${selectedAddress.city}, ${selectedAddress.zipcode}` : "Select location"}
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex-1 max-w-xl relative hidden md:block"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search fresh veggies, fruits, dairy, snacks, drinks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-24 py-2.5 rounded-full bg-slate-100/90 border border-transparent focus:border-emerald-500 focus:bg-white text-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-20 top-3 text-xs text-gray-400 hover:text-gray-600 px-1"
                >
                  ✕
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs transition shadow-xs"
              >
                Search
              </button>
            </div>
          </form>

          {/* Nav Right Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Catalog Link */}
            <Link
              to="/products"
              className="hidden lg:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-emerald-700 px-3 py-2 rounded-lg hover:bg-emerald-50 transition"
            >
              <span>Explore All</span>
            </Link>

            {/* Seller Portal Button */}
            <Link
              to="/seller"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 hover:bg-amber-100 transition"
            >
              <Store className="w-4 h-4 text-amber-700" />
              <span>Seller Hub</span>
            </Link>

            {/* Customer Account / Auth */}
            {token && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-2 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 hover:bg-emerald-100 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="hidden md:inline text-xs font-bold truncate max-w-[90px]">
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-emerald-700 hidden sm:block" />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>

                      <Link
                        to="/my-orders"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition"
                      >
                        <PackageCheck className="w-4 h-4 text-emerald-600" />
                        <span>My Orders</span>
                      </Link>

                      <Link
                        to="/seller"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-800 transition"
                      >
                        <Store className="w-4 h-4 text-amber-600" />
                        <span>Seller Dashboard</span>
                      </Link>

                      <div className="border-t border-gray-100 mt-1"></div>

                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthModalTab("login");
                  setIsAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-gray-800 text-xs sm:text-sm font-bold transition"
              >
                <UserIcon className="w-4 h-4 text-gray-600" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Button */}
            <Link
              to="/cart"
              className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 transition relative group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-amber-400 text-emerald-950 font-black text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs border-2 border-white animate-bounce">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="hidden sm:flex flex-col text-left leading-none">
                <span className="text-[10px] text-emerald-100 uppercase font-semibold">My Basket</span>
                <span className="text-xs font-bold mt-0.5">
                  {cartSubtotal > 0 ? `${currency}${cartSubtotal}` : "0 items"}
                </span>
              </div>
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search groceries & daily essentials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-20 py-2 rounded-xl bg-slate-100 border border-transparent focus:border-emerald-500 focus:bg-white text-xs focus:outline-none"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            <button
              type="submit"
              className="absolute right-1 top-1 bottom-1 px-3 rounded-lg bg-emerald-600 text-white font-medium text-xs"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4 space-y-3 animate-fade-in">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-800 py-2 border-b border-gray-50"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-800 py-2 border-b border-gray-50"
          >
            All Products & Categories
          </Link>
          <Link
            to="/my-orders"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-gray-800 py-2 border-b border-gray-50"
          >
            My Orders
          </Link>
          <Link
            to="/seller"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-amber-700 bg-amber-50 p-2.5 rounded-xl"
          >
            Seller Hub & Admin Dashboard
          </Link>
          {!token && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAuthModalOpen(true);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm text-center"
            >
              Sign In / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
