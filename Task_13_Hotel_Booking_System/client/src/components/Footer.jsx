import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-[#F6F9FC] text-gray-500/80 pt-12 px-6 md:px-16 lg:px-24 xl:px-32 border-t border-gray-200">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        <div className="max-w-80">
          <Link to="/" onClick={() => window.scrollTo(0, 0)}>
            <img
              src={assets.logo}
              alt="logo"
              className="mb-4 h-8 md:h-9 invert opacity-80 cursor-pointer"
            />
          </Link>
          <p className="text-sm leading-relaxed">
            Discover the world's most extraordinary places to stay, from
            boutique hotels to luxury villas and private island retreats.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <img src={assets.instagramIcon} alt="instagram-icon" className="w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            <img src={assets.facebookIcon} alt="facebook-icon" className="w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            <img src={assets.twitterIcon} alt="twitter-icon" className="w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
            <img src={assets.linkendinIcon} alt="linkedin-icon" className="w-5 opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
          </div>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800 font-bold">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/experience" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                Experiences
              </Link>
            </li>
            <li>
              <Link to="/rooms" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                Hotels & Suites
              </Link>
            </li>
            <li>
              <Link to="/owner" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                Partner / Host Portal
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="font-playfair text-lg text-gray-800 font-bold">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li>
              <Link to="/my-bookings" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                My Reservations
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                Safety Standards
              </Link>
            </li>
            <li>
              <Link to="/experience" onClick={() => window.scrollTo(0, 0)} className="hover:text-black transition-colors">
                Bespoke Concierge
              </Link>
            </li>
            <li>
              <span className="hover:text-black transition-colors cursor-pointer">
                24/7 Support Center
              </span>
            </li>
          </ul>
        </div>

        <div className="max-w-80">
          <p className="font-playfair text-lg text-gray-800 font-bold">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for curated luxury inspiration and exclusive offers.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert("Thank you for subscribing to QuickStay!"); }} className="flex items-center mt-4">
            <input
              type="email"
              required
              className="bg-white rounded-l-xl border border-gray-300 h-10 px-3 outline-none text-xs text-gray-800 flex-1 focus:border-black"
              placeholder="Enter your email"
            />
            <button type="submit" className="flex items-center justify-center bg-black hover:bg-gray-800 h-10 px-4 rounded-r-xl cursor-pointer text-white text-xs font-semibold">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <hr className="border-gray-200 mt-10" />
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-6 text-xs text-gray-400">
        <p>
          © {new Date().getFullYear()} QuickStay Hospitality Group. All rights reserved.
        </p>
        <ul className="flex items-center gap-6">
          <li>
            <Link to="/about" className="hover:underline">Privacy Policy</Link>
          </li>
          <li>
            <Link to="/about" className="hover:underline">Terms of Service</Link>
          </li>
          <li>
            <Link to="/rooms" className="hover:underline">Explore Hotels</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
