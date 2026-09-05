import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Helper to generate token
const generateToken = (id, role = "customer") => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || "default_jwt_secret_key", {
    expiresIn: "7d",
  });
};

// Customer Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role = "customer", phone = "" } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "An account with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role === "seller" || role === "admin" ? role : "customer",
      phone,
      cartData: {},
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        cartData: user.cartData,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Customer / General Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: "No account found with this email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        cartData: user.cartData || {},
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Seller / Admin Login
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check against configured ADMIN_EMAIL & ADMIN_PASSWORD or check database
    const adminEmail = process.env.ADMIN_EMAIL || "seller@greencart.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "seller123";

    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ id: "admin_seller_id", role: "seller" }, process.env.JWT_SECRET || "default_jwt_secret_key", {
        expiresIn: "7d",
      });

      return res.json({
        success: true,
        message: "Seller portal access authorized",
        token,
        seller: {
          id: "admin_seller_id",
          name: "GreenCart Official Seller",
          email: adminEmail,
          role: "seller",
        },
      });
    }

    // Otherwise check registered users with role 'seller' or 'admin'
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: "Seller account not found" });
    }

    if (user.role !== "seller" && user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Account does not have seller or admin privileges" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid seller credentials" });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      success: true,
      message: "Seller login successful",
      token,
      seller: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Seller Login Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update profile
export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, phone },
      { new: true }
    ).select("-password");

    res.json({ success: true, message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
