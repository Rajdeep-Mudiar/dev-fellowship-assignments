import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const stats = [
  { label: "Luxury Properties", value: "500+" },
  { label: "Global Destinations", value: "45+" },
  { label: "Guest Satisfaction", value: "99.8%" },
  { label: "Happy Travelers", value: "150k+" },
];

const coreValues = [
  {
    title: "Handpicked Excellence",
    description: "Every property undergoes strict quality auditing, ensuring unmatched luxury and safety.",
  },
  {
    title: "Transparent & Instant",
    description: "No hidden resort fees or surprise charges. Seamless Stripe checkout with immediate confirmation.",
  },
  {
    title: "24/7 Dedicated Concierge",
    description: "Round-the-clock priority support for custom itinerary planning and private travel needs.",
  },
  {
    title: "Eco-Conscious Luxury",
    description: "Championing sustainable hospitality standards and green certified eco-resorts worldwide.",
  },
];

const About = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Our Story & Vision
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
          Redefining Luxury Hospitality
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
          QuickStay was born from a passion to connect discerning travelers with the world’s most exquisite luxury properties, boutique suites, and coastal resorts.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 bg-gray-50 border border-gray-200 rounded-3xl p-8 mb-20">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <p className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
              {stat.value}
            </p>
            <p className="text-xs md:text-sm text-gray-500 mt-1 font-medium">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Mission & Vision Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
            Curated Stays, Unforgettable Memories
          </h2>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4">
            Whether you are seeking a penthouse suite in Manhattan, an overwater retreat in Dubai, or a tranquil haven near London’s Kensington Gardens, our platform offers curated accommodations crafted for comfort, privacy, and indulgence.
          </p>
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            We partner exclusively with verified property hosts and top-tier international hotel chains to guarantee seamless check-ins, immaculate cleaning standards, and five-star hospitality.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800"
            alt=""
            className="w-full h-56 object-cover rounded-2xl shadow-sm"
          />
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800"
            alt=""
            className="w-full h-56 object-cover rounded-2xl shadow-sm mt-6"
          />
        </div>
      </div>

      {/* Core Values Grid */}
      <div className="mb-20">
        <h2 className="font-playfair text-3xl font-bold text-gray-900 text-center mb-10">
          Why Discerning Travelers Choose QuickStay
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((val, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-sm mb-4">
                0{idx + 1}
              </div>
              <h3 className="font-playfair text-xl font-bold text-gray-900 mb-2">
                {val.title}
              </h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="bg-black text-white rounded-3xl p-8 md:p-14 text-center">
        <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
          Ready to Book Your Next Luxury Escape?
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-8">
          Explore curated hotel suites and exclusive packages across London, Dubai, New York, and Singapore.
        </p>
        <Link
          to="/rooms"
          className="inline-block px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 transition-all shadow-md active:scale-95 cursor-pointer"
        >
          Explore All Accommodations
        </Link>
      </div>
    </div>
  );
};

export default About;
