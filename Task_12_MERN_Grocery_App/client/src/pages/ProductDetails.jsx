import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/ProductCard";
import {
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, currency, cartItems, addToCart, updateCartQuantity } = useApp();

  const product = products.find((p) => String(p._id) === String(id));
  const [activeImage, setActiveImage] = useState("");
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    if (product) {
      const defaultImg =
        product.image && product.image.length > 0
          ? product.image[0]
          : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
      setActiveImage(defaultImg);
      setSelectedQty(1);
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-gray-900">Product Not Found</h2>
        <p className="text-xs text-gray-500">
          The grocery item you're looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Grocery Catalog</span>
        </Link>
      </div>
    );
  }

  const productId = String(product._id);
  const qtyInCart = cartItems[productId] || 0;
  const originalPrice = product.price;
  const offerPrice = product.offerPrice || product.price;
  const discountPercent =
    originalPrice > offerPrice
      ? Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
      : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && String(p._id) !== productId)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
        <Link to="/" className="hover:text-emerald-700">Home</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-emerald-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-bold truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main Details Card */}
      <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square rounded-2xl bg-slate-50/80 border border-gray-100 p-8 flex items-center justify-center overflow-hidden">
            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-black text-xs px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                {discountPercent}% Discount
              </span>
            )}
            <img
              src={activeImage}
              alt={product.name}
              className="w-4/5 h-4/5 object-contain filter drop-shadow-md hover:scale-105 transition duration-300"
            />
          </div>

          {/* Thumbnails */}
          {product.image && product.image.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-xl border p-1 bg-slate-50 shrink-0 transition ${
                    activeImage === img
                      ? "border-emerald-600 ring-2 ring-emerald-500/20"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info & Actions */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-md tracking-wider">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-1 rounded-md">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>4.9 (120+ ratings)</span>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            <p className="text-xs font-bold text-gray-500">
              Unit Packaging: <span className="text-gray-800">{product.unit || "1 unit"}</span>
            </p>
          </div>

          {/* Pricing Box */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-gray-100 flex items-baseline gap-3">
            <span className="text-3xl font-black text-gray-900">
              {currency}{offerPrice}
            </span>
            {originalPrice > offerPrice && (
              <span className="text-base text-gray-400 line-through">
                {currency}{originalPrice}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                Save {currency}{originalPrice - offerPrice} ({discountPercent}% OFF)
              </span>
            )}
          </div>

          {/* Key Product Bullet Points */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
              Product Highlights & Freshness
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              {product.description && product.description.length > 0 ? (
                product.description.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>100% farm-sourced & quality tested for daily consumption.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Hygienically sorted and climate-controlled packaging.</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Stock & Action Bar */}
          <div className="pt-4 border-t border-gray-100 space-y-4">
            {product.inStock === false ? (
              <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs font-bold text-center">
                Currently Out of Stock. Notify me when available.
              </div>
            ) : qtyInCart > 0 ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-emerald-600 text-white rounded-2xl p-1 shadow-md shadow-emerald-600/20">
                  <button
                    onClick={() => updateCartQuantity(productId, qtyInCart - 1)}
                    className="p-2 hover:bg-emerald-700 rounded-xl transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-black">{qtyInCart} in Basket</span>
                  <button
                    onClick={() => updateCartQuantity(productId, qtyInCart + 1)}
                    className="p-2 hover:bg-emerald-700 rounded-xl transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="px-6 py-3 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-gray-800 transition"
                >
                  View Basket →
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => addToCart(productId, selectedQty)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Basket</span>
                </button>
              </div>
            )}
          </div>

          {/* Delivery Guarantees */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-100 text-[11px] text-gray-500 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>30 Min Express</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Farm Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Instant Refund</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-900 tracking-tight">
            Similar Groceries in {product.category}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
