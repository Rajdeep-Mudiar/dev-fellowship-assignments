import React from "react";
import { Link } from "react-router-dom";
import { assets, exclusiveOffers } from "../assets/assets";

const experiencesList = [
  {
    id: 1,
    title: "Private Rooftop Dining & Skyline Views",
    category: "Gastronomy",
    location: "Manhattan, New York",
    rating: 4.9,
    price: 180,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200",
    description: "Multi-course culinary journey prepared by Michelin-starred private chefs overlooking the Manhattan skyline.",
  },
  {
    id: 2,
    title: "Luxury Yacht Cruise & Sunset Retreat",
    category: "Adventure",
    location: "Palm Jumeirah, Dubai",
    rating: 5.0,
    price: 350,
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1200",
    description: "Private sunset cruise along the Arabian Gulf with bespoke cocktail service and premium lounge seating.",
  },
  {
    id: 3,
    title: "Holistic Thermal Spa & Mineral Baths",
    category: "Wellness",
    location: "Kensington, London",
    rating: 4.8,
    price: 120,
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200",
    description: "Revitalizing hydrotherapy sessions, eucalyptus steam rooms, and aromatherapy massage therapies.",
  },
  {
    id: 4,
    title: "Private Infinity Pool & Sky Garden Lounge",
    category: "Leisure",
    location: "Marina Bay, Singapore",
    rating: 4.9,
    price: 220,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1200",
    description: "Exclusive daytime cabana reservation with complimentary champagne and panoramic city garden views.",
  },
];

const Experience = () => {
  return (
    <div className="pt-28 md:pt-36 pb-24 px-4 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest text-blue-600 font-bold bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100">
          Curated Stays & Memories
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight">
          Unforgettable Travel Experiences
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-4 leading-relaxed">
          From private culinary masterclasses to exclusive sunset yacht charters, discover handpicked bespoke moments designed to elevate your stay.
        </p>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        {experiencesList.map((exp) => (
          <div
            key={exp.id}
            className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={exp.image}
                alt={exp.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {exp.category}
              </span>
              <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                ★ {exp.rating}
              </span>
            </div>

            <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
                  {exp.location}
                </p>
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {exp.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {exp.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-xs text-gray-400 block">Starting from</span>
                  <p className="text-xl font-bold text-gray-900">
                    ${exp.price} <span className="text-xs font-normal text-gray-500">/ person</span>
                  </p>
                </div>

                <Link
                  to="/rooms"
                  className="px-6 py-2.5 bg-black hover:bg-gray-800 text-white text-xs font-medium rounded-full transition-all cursor-pointer active:scale-95"
                >
                  Explore Stays
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Special Perks Banner */}
      <div className="bg-gray-900 text-white rounded-3xl p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Personalized Concierge Service
          </h2>
          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8">
            Every booking includes dedicated 24/7 travel coordination, VIP airport transfers, and tailored itinerary planning.
          </p>
          <Link
            to="/rooms"
            className="inline-block px-8 py-3.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-gray-100 transition-all shadow-lg active:scale-98"
          >
            Find Your Dream Luxury Stay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Experience;
