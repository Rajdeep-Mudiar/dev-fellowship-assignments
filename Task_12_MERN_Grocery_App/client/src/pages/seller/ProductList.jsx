import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import api from "../../services/api";
import {
  Package,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  RefreshCw,
  Search,
  ExternalLink,
} from "lucide-react";
import { toast } from "react-toastify";

const ProductList = () => {
  const { products, fetchProducts, currency } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingAction, setLoadingAction] = useState(null);

  const handleToggleStock = async (productId) => {
    setLoadingAction(productId);
    try {
      const res = await api.patch(`/product/stock/${productId}`);
      if (res.data?.success) {
        toast.success(res.data.message);
        await fetchProducts();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not toggle stock");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to remove this product from the store catalog?")) {
      return;
    }

    setLoadingAction(productId);
    try {
      const res = await api.delete(`/product/delete/${productId}`);
      if (res.data?.success) {
        toast.info("Product removed from catalog");
        await fetchProducts();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not delete product");
    } finally {
      setLoadingAction(null);
    }
  };

  const filtered = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return p.name?.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q);
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <span className="text-xs font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md">
            Inventory Table
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-1">
            Store Products ({products.length})
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Monitor product stock, adjust pricing, and manage your grocery items.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchProducts}
            className="p-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            to="/seller/add-product"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-md shadow-amber-500/20 transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input
          type="text"
          placeholder="Filter by product name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-amber-500 bg-slate-50"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600">
          <thead className="bg-slate-50 text-[11px] uppercase font-black text-gray-500 border-y border-gray-200">
            <tr>
              <th className="py-3.5 px-4">Item</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Price</th>
              <th className="py-3.5 px-4">Offer Price</th>
              <th className="py-3.5 px-4">Stock Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((product) => {
              const img =
                product.image && product.image.length > 0
                  ? product.image[0]
                  : "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=100&q=80";
              const inStock = product.inStock !== false;

              return (
                <tr key={product._id} className="hover:bg-slate-50/80 transition">
                  {/* Thumbnail & Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 p-1 border border-gray-200 shrink-0 flex items-center justify-center">
                        <img src={img} alt={product.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <Link
                          to={`/product/${product._id}`}
                          className="font-bold text-gray-900 hover:text-amber-700 flex items-center gap-1"
                        >
                          <span>{product.name}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </Link>
                        <p className="text-[10px] text-gray-400">{product.unit || "1 unit"}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 font-bold text-emerald-800">
                    <span className="bg-emerald-50 px-2.5 py-1 rounded-md text-[10px] uppercase">
                      {product.category}
                    </span>
                  </td>

                  {/* MRP */}
                  <td className="py-3 px-4 font-bold text-gray-500 line-through">
                    {currency}{product.price}
                  </td>

                  {/* Offer Price */}
                  <td className="py-3 px-4 font-black text-gray-900 text-sm">
                    {currency}{product.offerPrice || product.price}
                  </td>

                  {/* In-Stock Toggle */}
                  <td className="py-3 px-4">
                    <button
                      onClick={() => handleToggleStock(product._id)}
                      disabled={loadingAction === product._id}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider transition ${
                        inStock
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-rose-100 text-rose-800 hover:bg-rose-200"
                      }`}
                    >
                      {inStock ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5" />
                          <span>Out of Stock</span>
                        </>
                      )}
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={loadingAction === product._id}
                      className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
