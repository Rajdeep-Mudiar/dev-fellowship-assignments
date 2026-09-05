import React from "react";
import { Link } from "react-router-dom";
import { assets, footerLinks } from "../assets/assets";
import { ShieldCheck, Truck, Headphones, RotateCcw } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Value badges bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold">30-Min Delivery</h4>
              <p className="text-xs text-slate-400">Guaranteed on all fresh items</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold">100% Quality</h4>
              <p className="text-xs text-slate-400">Handpicked farm produce</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold">Easy Replacement</h4>
              <p className="text-xs text-slate-400">No-questions-asked policy</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-bold">24/7 Support</h4>
              <p className="text-xs text-slate-400">Dedicated grocery care</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 py-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center">
                <img src={assets.logo} alt="GreenCart" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Green<span className="text-emerald-400">Cart</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Your neighborhood hyper-local grocery destination delivering farm-fresh vegetables, organic fruits, daily dairy, pantry staples, and snacks in 30 minutes.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Subscribe to Daily Discounts
              </p>
              <div className="flex max-w-sm">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 text-sm px-4 py-2 rounded-l-xl focus:outline-none focus:ring-1 focus:ring-emerald-500 w-full text-white placeholder-slate-500 border border-slate-700"
                />
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 rounded-r-xl transition">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Link Groups */}
          {footerLinks.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-white text-sm font-bold tracking-wide uppercase">
                {group.title}
              </h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.url}
                      className="hover:text-emerald-400 transition"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GreenCart Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security & Payments</span>
            <Link to="/seller" className="text-emerald-400 font-semibold hover:underline">
              Seller Dashboard
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
