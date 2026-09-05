import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import { Filter, SlidersHorizontal, Search, RefreshCw, Sparkles, Check } from "lucide-react";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, currency } = useApp();

  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || selectedCategory || "All");
  const [sortBy, setSortBy] = useState("popular");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync URL query params with state
  useEffect(() => {
    const catFromUrl = searchParams.get("category");
    if (catFromUrl) {
      setCategoryFilter(catFromUrl);
      setSelectedCategory(catFromUrl);
    }
  }, [searchParams, setSelectedCategory]);

  const handleCategorySelect = (cat) => {
    setCategoryFilter(cat);
    setSelectedCategory(cat);
    if (cat === "All") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (categoryFilter !== "All" && product.category?.toLowerCase() !== categoryFilter.toLowerCase()) {
        return false;
      }

      // Search keyword filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name?.toLowerCase().includes(query);
        const matchesCategory = product.category?.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory) return false;
      }

      // Price filter
      const price = product.offerPrice || product.price;
      if (price > maxPrice) return false;

      // In-stock filter
      if (onlyInStock && product.inStock === false) return false;

      return true;
    }).sort((a, b) => {
      const priceA = a.offerPrice || a.price;
      const priceB = b.offerPrice || b.price;

      if (sortBy === "price-low") return priceA - priceB;
      if (sortBy === "price-high") return priceB - priceA;
      if (sortBy === "discount") {
        const discountA = a.price - (a.offerPrice || a.price);
        const discountB = b.price - (b.offerPrice || b.price);
        return discountB - discountA;
      }
      return 0; // Default popularity
    });
  }, [products, categoryFilter, searchQuery, maxPrice, onlyInStock, sortBy]);

  const resetFilters = () => {
    setCategoryFilter("All");
    setSelectedCategory("All");
    setSearchQuery("");
    setMaxPrice(1000);
    setOnlyInStock(false);
    setSortBy("popular");
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-800 to-teal-800 rounded-3xl p-6 sm:p-8 text-white mb-8 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Full Grocery Aisle</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              {categoryFilter === "All" ? "All Grocery Essentials" : `${categoryFilter} Collection`}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Showing {filteredProducts.length} items available for 30-minute delivery
            </p>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-emerald-950 font-bold text-xs"
          >
            <Filter className="w-4 h-4" />
            <span>Filters & Categories</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Filter Sidebar (Desktop) */}
        <aside
          className={`md:block md:col-span-1 space-y-6 ${
            mobileFilterOpen ? "block" : "hidden"
          }`}
        >
          <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
                <span>Filter Products</span>
              </h3>
              <button
                onClick={resetFilters}
                className="text-[11px] font-bold text-emerald-600 hover:text-emerald-800 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Categories list */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-3">
                Categories
              </h4>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategorySelect("All")}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                    categoryFilter === "All"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span>All Categories</span>
                  {categoryFilter === "All" && <Check className="w-3.5 h-3.5" />}
                </button>

                {categories.map((cat, idx) => {
                  const isSelected = categoryFilter.toLowerCase() === cat.path.toLowerCase();
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCategorySelect(cat.path)}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-between ${
                        isSelected
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="truncate">{cat.text}</span>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Max Price
                </h4>
                <span className="text-xs font-black text-emerald-700">
                  {currency}{maxPrice}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="1000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-bold mt-1">
                <span>{currency}20</span>
                <span>{currency}1000+</span>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Availability
              </h4>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>In Stock items only</span>
              </label>
            </div>
          </div>
        </aside>

        {/* Products Grid Area */}
        <main className="md:col-span-3 space-y-6">
          {/* Top Sort & Count Bar */}
          <div className="bg-white rounded-2xl border border-gray-200/80 p-3.5 sm:px-5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="text-xs font-semibold text-gray-600">
              Found <strong className="text-gray-900">{filteredProducts.length}</strong> items
              {searchQuery && (
                <span> for "<span className="text-emerald-700">{searchQuery}</span>"</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold bg-slate-50 border border-gray-200 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="discount">Highest Discount</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black text-gray-900">No Grocery Items Found</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                We couldn't find any products matching your active filters or search terms. Try adjusting your filter parameters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
