import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  PlusCircle,
  Package,
  ShoppingBag,
  Store,
  LogOut,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { assets } from "../../assets/assets";

const SellerLayout = () => {
  const navigate = useNavigate();
  const { sellerToken, seller, sellerLogout, setIsAuthModalOpen, setAuthModalTab } = useApp();

  if (!sellerToken) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
          <Store className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">
            Seller & Admin Portal
          </h2>
          <p className="text-xs text-gray-500">
            Please authenticate with your seller or admin credentials to manage products, monitor stock, and process customer orders.
          </p>
        </div>
        <button
          onClick={() => {
            setAuthModalTab("seller");
            setIsAuthModalOpen(true);
          }}
          className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition"
        >
          Sign In to Seller Dashboard
        </button>
        <div>
          <Link to="/" className="text-xs font-bold text-gray-500 hover:text-gray-800">
            ← Return to GreenCart Store
          </Link>
        </div>
      </div>
    );
  }

  const navItems = [
    { name: "Overview & Analytics", path: "/seller", icon: LayoutDashboard, end: true },
    { name: "Add New Product", path: "/seller/add-product", icon: PlusCircle },
    { name: "Manage Inventory", path: "/seller/products", icon: Package },
    { name: "Customer Orders", path: "/seller/orders", icon: ShoppingBag },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Seller Top Bar */}
      <header className="bg-amber-950 text-amber-50 border-b border-amber-900 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center">
                <Store className="w-5 h-5 text-amber-950" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                GreenCart <span className="text-amber-400">Seller Hub</span>
              </span>
            </Link>

            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-black uppercase">
              Admin Verified
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="flex items-center gap-1 text-xs font-bold text-amber-200 hover:text-white px-3 py-1.5 rounded-lg hover:bg-amber-900 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>

            <button
              onClick={sellerLogout}
              className="flex items-center gap-1 text-xs font-bold text-rose-300 hover:text-rose-100 px-3 py-1.5 rounded-lg bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Seller Content Container with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Sidebar */}
        <aside className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-4 shadow-xs space-y-1">
            <div className="p-3 mb-2 bg-amber-50 rounded-2xl border border-amber-100 text-xs">
              <p className="text-[10px] uppercase font-bold text-amber-700">Store Manager</p>
              <p className="text-sm font-black text-amber-950 truncate">
                {seller?.name || "Official Grocery Hub"}
              </p>
              <p className="text-[11px] text-gray-500 truncate">{seller?.email}</p>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-3 rounded-2xl text-xs font-bold transition ${
                      isActive
                        ? "bg-amber-500 text-amber-950 shadow-md shadow-amber-500/20 font-black"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </aside>

        {/* Main Content View */}
        <main className="md:col-span-9">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
