import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import { dummyProducts, categories, dummyAddress, dummyOrders } from "../assets/assets";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const currency = "₹";

  // Auth State
  const [token, setToken] = useState(localStorage.getItem("greencart_token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("greencart_user");
    return saved ? JSON.parse(saved) : null;
  });

  // Seller Auth State
  const [sellerToken, setSellerToken] = useState(localStorage.getItem("greencart_seller_token") || "");
  const [seller, setSeller] = useState(() => {
    const saved = localStorage.getItem("greencart_seller");
    return saved ? JSON.parse(saved) : null;
  });

  // Product Catalog State
  const [products, setProducts] = useState(dummyProducts || []);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Cart State { [productId]: quantity }
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("greencart_cart");
    return saved ? JSON.parse(saved) : {};
  });

  // Delivery Addresses
  const [addresses, setAddresses] = useState(dummyAddress || []);
  const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0] || null);

  // Orders State
  const [orders, setOrders] = useState(dummyOrders || []);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Search & Navigation Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Auth Modal State
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState("login"); // 'login' | 'register' | 'seller'

  // Persist Cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("greencart_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch Products from Backend API
  const fetchProducts = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const res = await api.get("/product/list");
      if (res.data?.success && res.data.products?.length > 0) {
        setProducts(res.data.products);
      }
    } catch (error) {
      console.warn("Using preset catalog as backend is loading or offline:", error.message);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  // Fetch Addresses
  const fetchAddresses = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get("/address/list");
      if (res.data?.success) {
        setAddresses(res.data.addresses);
        if (res.data.addresses.length > 0 && !selectedAddress) {
          setSelectedAddress(res.data.addresses[0]);
        }
      }
    } catch (error) {
      console.warn("Could not fetch addresses:", error.message);
    }
  }, [token, selectedAddress]);

  // Fetch User Orders
  const fetchOrders = useCallback(async () => {
    if (!token) return;
    setLoadingOrders(true);
    try {
      const res = await api.get("/order/user-orders");
      if (res.data?.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      console.warn("Could not fetch orders from API:", error.message);
    } finally {
      setLoadingOrders(false);
    }
  }, [token]);

  // Sync Cart with Server on login
  const syncCartFromServer = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get("/cart");
      if (res.data?.success && res.data.cartData) {
        // Merge with local cart
        setCartItems((prev) => {
          const merged = { ...prev, ...res.data.cartData };
          return merged;
        });
      }
    } catch (error) {
      console.warn("Cart sync warning:", error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (token) {
      fetchAddresses();
      fetchOrders();
      syncCartFromServer();
    }
  }, [token, fetchAddresses, fetchOrders, syncCartFromServer]);

  // Customer Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      if (res.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("greencart_token", res.data.token);
        localStorage.setItem("greencart_user", JSON.stringify(res.data.user));
        if (res.data.user.cartData) {
          setCartItems(res.data.user.cartData);
        }
        toast.success(res.data.message || "Logged in successfully!");
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Invalid email or password";
      toast.error(msg);
      return false;
    }
  };

  // Customer Register
  const register = async (name, email, password, phone = "") => {
    try {
      const res = await api.post("/auth/register", { name, email, password, phone });
      if (res.data?.success) {
        setToken(res.data.token);
        setUser(res.data.user);
        localStorage.setItem("greencart_token", res.data.token);
        localStorage.setItem("greencart_user", JSON.stringify(res.data.user));
        toast.success("Account created successfully!");
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Registration failed. Try again.";
      toast.error(msg);
      return false;
    }
  };

  // Customer Logout
  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("greencart_token");
    localStorage.removeItem("greencart_user");
    toast.info("Logged out from GreenCart");
  };

  // Seller Login
  const loginSeller = async (email, password) => {
    try {
      const res = await api.post("/auth/seller-login", { email, password });
      if (res.data?.success) {
        setSellerToken(res.data.token);
        setSeller(res.data.seller);
        localStorage.setItem("greencart_seller_token", res.data.token);
        localStorage.setItem("greencart_seller", JSON.stringify(res.data.seller));
        toast.success("Seller Portal unlocked!");
        setIsAuthModalOpen(false);
        return true;
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Seller authentication failed";
      toast.error(msg);
      return false;
    }
  };

  // Seller Logout
  const sellerLogout = () => {
    setSellerToken("");
    setSeller(null);
    localStorage.removeItem("greencart_seller_token");
    localStorage.removeItem("greencart_seller");
    toast.info("Seller session closed");
  };

  // Add Item to Cart
  const addToCart = async (productId, quantity = 1) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      const current = updated[productId] || 0;
      updated[productId] = current + quantity;
      return updated;
    });

    toast.success("Added to basket", { autoClose: 1500 });

    if (token) {
      try {
        await api.post("/cart/add", { productId, quantity });
      } catch (err) {
        console.warn("Could not sync item to server:", err.message);
      }
    }
  };

  // Update Cart Quantity
  const updateCartQuantity = async (productId, quantity) => {
    const num = Number(quantity);
    setCartItems((prev) => {
      const updated = { ...prev };
      if (num <= 0) {
        delete updated[productId];
      } else {
        updated[productId] = num;
      }
      return updated;
    });

    if (token) {
      try {
        await api.post("/cart/update", { productId, quantity: num });
      } catch (err) {
        console.warn("Could not update cart on server:", err.message);
      }
    }
  };

  // Remove Item from Cart
  const removeFromCart = (productId) => {
    updateCartQuantity(productId, 0);
    toast.info("Item removed from basket");
  };

  // Clear Cart
  const clearCart = async () => {
    setCartItems({});
    localStorage.removeItem("greencart_cart");
    if (token) {
      try {
        await api.post("/cart/clear");
      } catch (err) {
        console.warn("Could not clear cart on server:", err.message);
      }
    }
  };

  // Cart Helpers
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + (qty > 0 ? qty : 0), 0);
  };

  const getCartSubtotal = () => {
    let total = 0;
    for (const [id, qty] of Object.entries(cartItems)) {
      if (qty > 0) {
        const item = products.find((p) => String(p._id) === String(id));
        if (item) {
          const price = item.offerPrice || item.price;
          total += price * qty;
        }
      }
    }
    return total;
  };

  const getDeliveryFee = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= 299 ? 0 : 30; // Free delivery above 299
  };

  const getFinalTotal = () => {
    const subtotal = getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal + getDeliveryFee();
  };

  // Add Address Action
  const addDeliveryAddress = async (addressData) => {
    if (!token) {
      const newAddr = { ...addressData, _id: "local_" + Date.now() };
      setAddresses((prev) => [newAddr, ...prev]);
      setSelectedAddress(newAddr);
      toast.success("Address added locally");
      return true;
    }

    try {
      const res = await api.post("/address/add", addressData);
      if (res.data?.success) {
        setAddresses((prev) => [res.data.address, ...prev]);
        setSelectedAddress(res.data.address);
        toast.success("Delivery address saved!");
        return true;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save address");
      return false;
    }
  };

  // Delete Address
  const deleteDeliveryAddress = async (addressId) => {
    if (!token) {
      setAddresses((prev) => prev.filter((a) => a._id !== addressId));
      if (selectedAddress?._id === addressId) {
        setSelectedAddress(null);
      }
      toast.info("Address removed");
      return;
    }

    try {
      const res = await api.delete(`/address/delete/${addressId}`);
      if (res.data?.success) {
        setAddresses((prev) => prev.filter((a) => a._id !== addressId));
        if (selectedAddress?._id === addressId) {
          setSelectedAddress(addresses.find((a) => a._id !== addressId) || null);
        }
        toast.info("Address deleted");
      }
    } catch (error) {
      toast.error("Could not delete address");
    }
  };

  // Place Cash On Delivery Order
  const placeCODOrder = async (orderAddress, deliverySlot = "Express Delivery (30 mins)") => {
    const orderItems = [];
    for (const [id, qty] of Object.entries(cartItems)) {
      if (qty > 0) {
        const product = products.find((p) => String(p._id) === String(id));
        if (product) {
          orderItems.push({ product, quantity: qty });
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your basket is empty!");
      return false;
    }

    const totalAmount = getFinalTotal();

    if (!token) {
      // Local demo order
      const mockOrder = {
        _id: "order_" + Math.random().toString(36).substring(2, 9),
        items: orderItems,
        amount: totalAmount,
        address: orderAddress,
        deliverySlot,
        status: "Order Placed",
        paymentType: "COD",
        isPaid: false,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [mockOrder, ...prev]);
      clearCart();
      toast.success("Order Placed! Delivery within 30 mins.");
      return mockOrder;
    }

    try {
      const res = await api.post("/order/place-cod", {
        items: orderItems,
        amount: totalAmount,
        address: orderAddress,
        deliverySlot,
      });

      if (res.data?.success) {
        setOrders((prev) => [res.data.order, ...prev]);
        clearCart();
        toast.success("Order placed successfully!");
        return res.data.order;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not place order");
      return false;
    }
  };

  // Place Stripe Online Payment Order
  const placeStripeOrder = async (orderAddress, deliverySlot = "Express Delivery (30 mins)") => {
    const orderItems = [];
    for (const [id, qty] of Object.entries(cartItems)) {
      if (qty > 0) {
        const product = products.find((p) => String(p._id) === String(id));
        if (product) {
          orderItems.push({ product, quantity: qty });
        }
      }
    }

    if (orderItems.length === 0) {
      toast.error("Your basket is empty!");
      return false;
    }

    const totalAmount = getFinalTotal();

    if (!token) {
      // Demo online order
      const mockOrder = {
        _id: "order_" + Math.random().toString(36).substring(2, 9),
        items: orderItems,
        amount: totalAmount,
        address: orderAddress,
        deliverySlot,
        status: "Processing",
        paymentType: "Stripe",
        isPaid: true,
        createdAt: new Date().toISOString(),
      };
      setOrders((prev) => [mockOrder, ...prev]);
      clearCart();
      toast.success("Stripe Demo Payment successful! Order placed.");
      return { success: true, order: mockOrder, isMock: true };
    }

    try {
      const frontendUrl = window.location.origin;
      const res = await api.post("/order/place-stripe", {
        items: orderItems,
        amount: totalAmount,
        address: orderAddress,
        deliverySlot,
        frontendUrl,
      });

      if (res.data?.success) {
        clearCart();
        if (res.data.session_url) {
          window.location.href = res.data.session_url;
        }
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Stripe checkout initiation failed");
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        token,
        user,
        login,
        register,
        logout,
        sellerToken,
        seller,
        loginSeller,
        sellerLogout,
        products,
        loadingProducts,
        fetchProducts,
        cartItems,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        getCartCount,
        getCartSubtotal,
        getDeliveryFee,
        getFinalTotal,
        addresses,
        selectedAddress,
        setSelectedAddress,
        addDeliveryAddress,
        deleteDeliveryAddress,
        orders,
        loadingOrders,
        fetchOrders,
        placeCODOrder,
        placeStripeOrder,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        categories,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalTab,
        setAuthModalTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
