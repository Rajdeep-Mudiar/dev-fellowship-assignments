import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { assets } from "../assets/assets";
import { Lock, Mail, User, Phone, Store, CheckCircle, Sparkles, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register, loginSeller } = useApp();

  const [mode, setMode] = useState(searchParams.get("mode") || "login"); // 'login' | 'register' | 'seller'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let success = false;
    if (mode === "login") {
      success = await login(email, password);
    } else if (mode === "register") {
      success = await register(name, email, password, phone);
    } else if (mode === "seller") {
      success = await loginSeller(email, password);
    }

    setLoading(false);
    if (success) {
      if (mode === "seller") {
        navigate("/seller");
      } else {
        navigate("/");
      }
    }
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-linear-to-r from-emerald-800 to-teal-900 p-8 text-white text-center space-y-3">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shadow-md">
              <img src={assets.logo} alt="GreenCart" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              Green<span className="text-emerald-300">Cart</span>
            </span>
          </Link>

          <h2 className="text-xl font-black">
            {mode === "seller"
              ? "Seller & Store Portal"
              : mode === "register"
              ? "Create Customer Account"
              : "Sign in to GreenCart"}
          </h2>

          <div className="grid grid-cols-3 gap-1 bg-black/20 p-1 rounded-xl text-xs font-bold mt-4">
            <button
              onClick={() => setMode("login")}
              className={`py-1.5 rounded-lg transition ${
                mode === "login" ? "bg-white text-emerald-950" : "text-emerald-100"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode("register")}
              className={`py-1.5 rounded-lg transition ${
                mode === "register" ? "bg-white text-emerald-950" : "text-emerald-100"
              }`}
            >
              Register
            </button>
            <button
              onClick={() => setMode("seller")}
              className={`py-1.5 rounded-lg transition ${
                mode === "seller" ? "bg-amber-400 text-amber-950" : "text-amber-200"
              }`}
            >
              Seller
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {/* Quick Demo Fill Buttons */}
          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Demo Quick-Fill:</span>
            </span>
            {mode === "seller" ? (
              <button
                type="button"
                onClick={fillDemoSeller}
                className="px-2.5 py-1 bg-amber-500 text-white font-bold rounded-lg text-[11px]"
              >
                Demo Seller
              </button>
            ) : (
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="px-2.5 py-1 bg-emerald-600 text-white font-bold rounded-lg text-[11px]"
              >
                Demo Customer
              </button>
            )}
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Rajdeep Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder={mode === "seller" ? "seller@greencart.com" : "customer@greencart.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:border-emerald-500 focus:outline-none"
              />
              <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-black text-sm text-white shadow-md transition flex items-center justify-center gap-2 ${
              mode === "seller"
                ? "bg-amber-500 hover:bg-amber-600 shadow-amber-500/20"
                : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
            }`}
          >
            {loading ? (
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>
                  {mode === "seller"
                    ? "Enter Seller Hub"
                    : mode === "register"
                    ? "Complete Registration"
                    : "Sign In"}
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
