import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { categories } from "../assets/assets";
import { Sparkles } from "lucide-react";

const CategoryRail = () => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useApp();

  const handleCategoryClick = (categoryPath) => {
    setSelectedCategory(categoryPath);
    navigate(`/products?category=${encodeURIComponent(categoryPath)}`);
  };

  return (
    <section className="my-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Aisles</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-0.5">
            Explore by Category
          </h2>
        </div>
        <button
          onClick={() => handleCategoryClick("All")}
          className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          View All Aisles →
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4">
        {categories.map((cat, idx) => {
          const isSelected = selectedCategory === cat.path;
          return (
            <button
              key={idx}
              onClick={() => handleCategoryClick(cat.path)}
              className={`flex flex-col items-center p-3.5 rounded-2xl transition duration-200 transform hover:-translate-y-1 hover:shadow-md border ${
                isSelected
                  ? "border-emerald-500 ring-2 ring-emerald-500/20 shadow-md bg-white"
                  : "border-transparent bg-white shadow-xs hover:border-gray-200"
              }`}
            >
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-2.5 p-2 transition group-hover:scale-105"
                style={{ backgroundColor: cat.bgColor || "#F0FDF4" }}
              >
                <img
                  src={cat.image}
                  alt={cat.text}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="text-xs sm:text-sm font-bold text-gray-800 text-center leading-tight line-clamp-1">
                {cat.text}
              </span>
              <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                Explore
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryRail;
