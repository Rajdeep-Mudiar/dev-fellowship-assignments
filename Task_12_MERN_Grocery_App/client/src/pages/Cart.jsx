import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Tag,
  Clock,
  ArrowLeft,
} from "lucide-react";
import { toast } from "react-toastify";

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    cartItems,
    currency,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    getCartSubtotal,
    getDeliveryFee,
    getFinalTotal,
    token,
    setIsAuthModalOpen,
  } = useApp();

  const [promoCode, setPromoCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCode, setAppliedCode] = useState("");

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = Math.max(0, getFinalTotal() - discountAmount);

  // Build items array
  const cartProductList = [];
  for (const [id, qty] of Object.entries(cartItems)) {
    if (qty > 0) {
      const product = products.find((p) => String(p._id) === String(id));
      if (product) {
        cartProductList.push({ product, quantity: qty });
      }
    }
  }

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    const code = promoCode.trim().toUpperCase();
    if (code === "FRESH50" || code === "GREEN50") {
      const discount = Math.min(50, Math.round(subtotal * 0.2));
      setDiscountAmount(discount);
      setAppliedCode(code);
      toast.success(`Promo code ${code} applied! Saved ${currency}${discount}`);
    } else if (code === "FREESHIP") {
      setDiscountAmount(deliveryFee);
      setAppliedCode(code);
      toast.success("Free Delivery Promo Applied!");
    } else {
      toast.error("Invalid or expired coupon code");
    }
  };

  const handleProceedToCheckout = () => {
    navigate("/checkout");
  };

  if (cartProductList.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Your Grocery Basket is Empty
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
            Looks like you haven't added any farm fresh produce or daily groceries yet. Start filling your cart with organic essentials!
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm transition shadow-lg shadow-emerald-600/20"
        >
          <span>Explore 500+ Grocery Items</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title Bar */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>30-Minute Basket</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Shopping Cart ({cartProductList.length} items)
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Empty Basket</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-gray-200/80 p-4 sm:p-6 shadow-xs space-y-4">
          <div className="divide-y divide-gray-100">
            {cartProductList.map(({ product, quantity }) => {
              const unitPrice = product.offerPrice || product.price;
              const lineTotal = unitPrice * quantity;
              const imageUrl =
                product.image && product.image.length > 0
                  ? product.image[0]
                  : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80";

              return (
                <div
                  key={product._id}
                  className="py-4 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  {/* Thumbnail & Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-50 border border-gray-100 p-2 shrink-0 flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        {product.category}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 truncate mt-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium">
                        {product.unit || "1 unit"} • {currency}{unitPrice} each
                      </p>
                    </div>
                  </div>

                  {/* Quantity controls & Line Total */}
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-gray-200">
                      <button
                        onClick={() =>
                          updateCartQuantity(String(product._id), quantity - 1)
                        }
                        className="p-1 hover:bg-white rounded-lg transition text-gray-700"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2.5 text-xs font-black text-gray-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(String(product._id), quantity + 1)
                        }
                        className="p-1 hover:bg-white rounded-lg transition text-gray-700"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <p className="text-sm sm:text-base font-black text-gray-900">
                        {currency}{lineTotal}
                      </p>
                    </div>

                    <button
                      onClick={() => removeFromCart(String(product._id))}
                      className="p-1.5 text-gray-400 hover:text-red-600 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Add more groceries</span>
            </Link>
            <span className="text-xs text-gray-400">
              Free returns & replacements at delivery
            </span>
          </div>
        </div>

        {/* Right Summary & Checkout Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-200/80 p-6 shadow-sm space-y-6">
            <h3 className="text-base font-black text-gray-900 tracking-tight pb-3 border-b border-gray-100">
              Order Summary
            </h3>

            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-2">
              <label className="block text-xs font-bold text-gray-700">
                Apply Voucher / Coupon
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Try 'FRESH50'"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 rounded-xl border border-gray-200 text-xs uppercase font-bold focus:border-emerald-500 focus:outline-none"
                  />
                  <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-2.5" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
                >
                  Apply
                </button>
              </div>
              {appliedCode && (
                <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                  ✓ Code {appliedCode} applied!
                </p>
              )}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-3 text-xs border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span className="font-bold text-gray-900">{currency}{subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Express Delivery Fee</span>
                {deliveryFee === 0 ? (
                  <span className="font-bold text-emerald-600 uppercase">FREE</span>
                ) : (
                  <span className="font-bold text-gray-900">{currency}{deliveryFee}</span>
                )}
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-{currency}{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <span>Handling & Taxes</span>
                <span className="font-bold text-gray-900">{currency}0</span>
              </div>

              <div className="flex justify-between text-base font-black text-gray-900 pt-3 border-t border-gray-200">
                <span>To Pay</span>
                <span className="text-emerald-700">{currency}{grandTotal}</span>
              </div>
            </div>

            {/* Express guarantee pill */}
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-2.5 text-emerald-950 text-xs">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Lightning 30-Min Delivery</p>
                <p className="text-[11px] text-emerald-700">Estimated arrival at your door</p>
              </div>
            </div>

            {/* Proceed CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
