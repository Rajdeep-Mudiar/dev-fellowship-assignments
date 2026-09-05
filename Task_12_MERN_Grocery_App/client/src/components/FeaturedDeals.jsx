import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Sparkles, Flame } from "lucide-react";

const FeaturedDeals = ({ products, title = "Trending Grocery Essentials", subtitle = "Top picks with exclusive daily discounts", filterCategory = null }) => {
  let displayProducts = products;
  if (filterCategory) {
    displayProducts = products.filter(
      (p) => p.category?.toLowerCase() === filterCategory.toLowerCase()
    );
  }

  // Pick first 8 items
  const items = displayProducts.slice(0, 8);

  if (items.length === 0) return null;

  return (
    <section className="my-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wider">
            <Flame className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Hot In-Demand</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight mt-0.5">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
        </div>
        <Link
          to="/products"
          className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
        >
          View Full Aisle →
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedDeals;
