import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContent } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

  const isDashboard = location.pathname === "/dashboard";

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp");

      if (data.success) {
        navigate("/email-verify");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 backdrop-blur-md border rounded-full py-3 px-6 sm:px-10 flex justify-between items-center transition-all duration-300 shadow-lg ${
        isDashboard
          ? "bg-slate-900/60 border-slate-800/80 text-white shadow-indigo-950/20"
          : "bg-white/60 border-white/40 text-slate-800 shadow-slate-100"
      }`}
    >
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-24 sm:w-28 cursor-pointer hover:opacity-90 transition-opacity"
      />

      {/* User profile dropdown or Login button */}
      {userData ? (
        <div className="relative group">
          {/* Avatar frame with gradient glow ring */}
          <div className="w-9 h-9 flex justify-center items-center rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold cursor-pointer shadow-md transform hover:scale-105 transition-all">
            <span className="w-[32px] h-[32px] flex items-center justify-center bg-slate-950 rounded-full text-xs">
              {userData.name[0].toUpperCase()}
            </span>
          </div>

          {/* Premium Dropdown list */}
          <div className="absolute right-0 top-full pt-3 z-50 hidden group-hover:block animate-fadeIn">
            <ul
              className={`list-none m-0 p-2 w-48 rounded-xl border shadow-xl flex flex-col gap-1 backdrop-blur-lg ${
                isDashboard
                  ? "bg-slate-900/90 border-slate-800 text-slate-200"
                  : "bg-white/95 border-slate-150 text-slate-800"
              }`}
            >
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className="py-2 px-3 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg cursor-pointer text-xs font-medium transition-colors flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Verify email
                </li>
              )}

              <li
                onClick={() => navigate("/dashboard")}
                className="py-2 px-3 hover:bg-indigo-500/10 hover:text-indigo-400 rounded-lg cursor-pointer text-xs font-medium transition-colors flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
                </svg>
                Dashboard
              </li>

              <li
                onClick={logout}
                className="py-2 px-3 hover:bg-rose-500/10 hover:text-rose-450 rounded-lg cursor-pointer text-xs font-medium transition-colors flex items-center gap-2 border-t border-slate-100/10 mt-1 pt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium border transition-all duration-300 transform hover:scale-105 ${
            isDashboard
              ? "border-slate-800 text-white hover:bg-slate-800"
              : "border-slate-300 text-slate-800 hover:bg-slate-50"
          }`}
        >
          Login
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      )}
    </nav>
  );
};

export default Navbar;
