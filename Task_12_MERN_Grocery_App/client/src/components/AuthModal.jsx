import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { X, Lock, Mail, User, Phone, Store, Sparkles, CheckCircle } from "lucide-react";
import { assets } from "../assets/assets";

const AuthModal = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalTab,
    setAuthModalTab,
    login,
    register,
    loginSeller,
  } = useApp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (authModalTab === "login") {
      await login(email, password);
    } else if (authModalTab === "register") {
      await register(name, email, password, phone);
    } else if (authModalTab === "seller") {
      await loginSeller(email, password);
    }

    setLoading(false);
  };

  const fillDemoCustomer = () => {
    setEmail("customer@greencart.com");
    setPassword("customer123");
  };

  const fillDemoSeller = () => {
    setEmail("seller@greencart.com");
    setPassword("seller123");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={() => setIsAuthModalOpen(false)}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden z-10 animate-fade-in">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 p-6 text-white relative">
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md">
              <img src={assets.logo} alt="GreenCart" className="w-6 h-6 object-contain" />
            </div>
            <div>
              <h3 className="text-xl font-black tracking-tight">
                {authModalTab === "seller"
                  ? "Seller & Admin Portal"
                  : authModalTab === "register"
                  ? "Join GreenCart Today"
                  : "Welcome to GreenCart"}
              </h3>
              <p className="text-xs text-emerald-200">
                {authModalTab === "seller"
                  ? "Manage grocery catalog, stock & customer orders"
                  : "Enjoy 30-minute delivery & exclusive member savings"}
              </p>
            </div>
          </div>

          {/* Tab Switchers */}
          <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-xl mt-5 text-xs font-bold">
            <button
              onClick={() => setAuthModalTab("login")}
              className={`py-1.5 rounded-lg transition ${
                authModalTab === "login"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModalTab("register")}
              className={`py-1.5 rounded-lg transition ${
                authModalTab === "register"
                  ? "bg-white text-emerald-950 shadow-xs"
                  : "text-emerald-100 hover:text-white"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setAuthModalTab("seller")}
              className={`py-1.5 rounded-lg transition flex items-center justify-center gap-1 ${
                authModalTab === "seller"
                  ? "bg-amber-400 text-amber-950 shadow-xs"
                  : "text-amber-200 hover:text-white"
              }`}
            >
              <Store className="w-3 h-3" />
              <span>Seller</span>
            </button>
          </div>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Demo Login Shortcuts */}
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quick Demo Access:</span>
            </div>
            {authModalTab === "seller" ? (
              <button
                type="button"
                onClick={fillDemoSeller}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[11px] transition shadow-xs"
              >
                Fill Demo Seller
              </button>
            ) : (
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[11px] transition shadow-xs"
              >
                Fill Demo User
              </button>
            )}
          </div>

          {authModalTab === "register" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Rajdeep Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder={
                  authModalTab === "seller" ? "seller@greencart.com" : "you@example.com"
                }
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {authModalTab === "register" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number (Optional)
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm text-white shadow-lg transition duration-200 flex items-center justify-center gap-2 ${
              authModalTab === "seller"
                ? "bg-amber-600 hover:bg-amber-700 shadow-amber-600/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
            }`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>
                  {authModalTab === "seller"
                    ? "Enter Seller Hub"
                    : authModalTab === "register"
                    ? "Create Account"
                    : "Sign In Securely"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
