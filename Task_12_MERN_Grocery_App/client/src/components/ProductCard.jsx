import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { Plus, Minus, Star, ShoppingBag } from "lucide-react";

const ProductCard = ({ product }) => {
  const { currency, cartItems, addToCart, updateCartQuantity } = useApp();

  const productId = String(product._id);
  const qtyInCart = cartItems[productId] || 0;
  const isOutOfStock = product.inStock === false;

  const originalPrice = product.price;
  const offerPrice = product.offerPrice || product.price;
  const discountPercent =
    originalPrice > offerPrice
      ? Math.round(((originalPrice - offerPrice) / originalPrice) * 100)
      : 0;

  const imageUrl =
    product.image && product.image.length > 0
      ? product.image[0]
      : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 shadow-xs hover:shadow-lg transition duration-200 flex flex-col justify-between overflow-hidden group">
      {/* Top Media & Badges */}
      <div className="relative p-3 bg-slate-50/50 flex items-center justify-center aspect-square overflow-hidden">
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-rose-500 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
            {discountPercent}% Off
          </span>
        )}

        {/* Stock Badge */}
        {isOutOfStock && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-xs z-20 flex items-center justify-center">
            <span className="bg-gray-800 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}

        <Link to={`/product/${product._id}`} className="w-full h-full flex items-center justify-center">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-4/5 h-4/5 object-contain group-hover:scale-108 transition duration-300 filter drop-shadow-xs"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1 text-[11px] text-gray-400 font-semibold mb-1">
            <span className="uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <span className="flex items-center gap-0.5 text-amber-500">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>4.8</span>
            </span>
          </div>

          <Link
            to={`/product/${product._id}`}
            className="block text-sm font-bold text-gray-900 group-hover:text-emerald-700 transition line-clamp-2 leading-snug"
          >
            {product.name}
          </Link>

          <p className="text-xs text-gray-400 font-medium mt-0.5">
            {product.unit || "1 unit"}
          </p>
        </div>

        {/* Price & Add to Cart Controls */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-black text-gray-900">
                {currency}{offerPrice}
              </span>
              {originalPrice > offerPrice && (
                <span className="text-xs text-gray-400 line-through">
                  {currency}{originalPrice}
                </span>
              )}
            </div>
            {discountPercent > 0 && (
              <p className="text-[10px] font-semibold text-emerald-600">
                Save {currency}{originalPrice - offerPrice}
              </p>
            )}
          </div>

          {/* Action Button */}
          {isOutOfStock ? (
            <button
              disabled
              className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-400 font-semibold text-xs cursor-not-allowed"
            >
              Unavailable
            </button>
          ) : qtyInCart > 0 ? (
            <div className="flex items-center bg-emerald-600 text-white rounded-xl shadow-xs overflow-hidden">
              <button
                onClick={() => updateCartQuantity(productId, qtyInCart - 1)}
                className="p-1.5 hover:bg-emerald-700 transition"
                title="Decrease"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs font-bold">{qtyInCart}</span>
              <button
                onClick={() => updateCartQuantity(productId, qtyInCart + 1)}
                className="p-1.5 hover:bg-emerald-700 transition"
                title="Increase"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(productId, 1)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-200 hover:border-emerald-600 font-bold text-xs transition duration-150 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
