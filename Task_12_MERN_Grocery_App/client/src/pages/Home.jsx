import React from "react";
import { useApp } from "../context/AppContext";
import Hero from "../components/Hero";
import CategoryRail from "../components/CategoryRail";
import FeaturedDeals from "../components/FeaturedDeals";
import BannerPromo from "../components/BannerPromo";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  const { products, loadingProducts } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Hero Banner with 30-min express pledge */}
      <Hero />

      {/* Category Quick Rail */}
      <CategoryRail />

      {/* Daily Fresh Picks */}
      <FeaturedDeals
        products={products}
        title="Farm Fresh Produce & Greens"
        subtitle="Harvested at dawn, 100% organic, delivered in 30 minutes"
        filterCategory="Vegetables"
      />

      {/* Mid Page Promo Banners */}
      <BannerPromo />

      {/* Dairy & Morning Essentials */}
      <FeaturedDeals
        products={products}
        title="Dairy, Bakery & Daily Staples"
        subtitle="Pure whole milk, artisan breads, farm eggs, and grains"
        filterCategory="Dairy"
      />

      {/* Instant Munchies & Drinks */}
      <FeaturedDeals
        products={products}
        title="Beverages, Coolers & Instant Snacks"
        subtitle="Refreshing sodas, instant noodles, and hot soups"
        filterCategory="Drinks"
      />

      {/* Why Choose Us & Trust Pillars */}
      <WhyChooseUs />
    </div>
  );
};

export default Home;
