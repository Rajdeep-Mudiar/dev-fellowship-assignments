import User from "../models/User.js";

// Get user cart data
export const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = { ...(user.cartData || {}) };
    if (cartData[productId]) {
      cartData[productId] += Number(quantity);
    } else {
      cartData[productId] = Number(quantity);
    }

    user.cartData = cartData;
    await user.save();

    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update item quantity
export const updateCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: "Product ID and quantity are required" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = { ...(user.cartData || {}) };
    const numQty = Number(quantity);

    if (numQty <= 0) {
      delete cartData[productId];
    } else {
      cartData[productId] = numQty;
    }

    user.cartData = cartData;
    await user.save();

    res.json({ success: true, message: "Cart updated", cartData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    user.cartData = {};
    await user.save();

    res.json({ success: true, message: "Cart cleared", cartData: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
