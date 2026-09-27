import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { UserButton } from "@clerk/react";

const OwnerLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Dashboard", path: "/owner", icon: assets.dashboardIcon },
    { name: "Add Hotel", path: "/owner/add-hotel", icon: assets.addIcon },
    { name: "Manage Hotels", path: "/owner/hotels", icon: assets.listIcon },
    { name: "Manage Bookings", path: "/owner/bookings", icon: assets.totalBookingIcon },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col justify-between p-6">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-10">
            <img src={assets.logo} alt="QuickStay" className="h-8 invert opacity-90" />
          </Link>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Admin Management
          </p>

          <nav className="space-y-1.5">
            {sidebarLinks.map((link, idx) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={idx}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-black text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <img
                    src={link.icon}
                    alt=""
                    className={`w-4 h-4 ${isActive ? "invert" : "opacity-70"}`}
                  />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="text-xs font-semibold text-gray-500 hover:text-gray-900"
          >
            ← View Main Site
          </button>
          <UserButton />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <Link to="/">
            <img src={assets.logo} alt="" className="h-7 invert opacity-80" />
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/owner" className="text-xs font-bold text-gray-800">
              Admin
            </Link>
            <UserButton />
          </div>
        </header>

        <main className="p-4 md:p-10 flex-1 max-w-6xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default OwnerLayout;
