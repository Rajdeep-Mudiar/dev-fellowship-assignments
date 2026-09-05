import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js";

// Helper to upload memory buffer to Cloudinary
const uploadBufferToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "greencart_products", resource_type: "image" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(buffer);
  });
};

// Add New Product (Seller)
export const addProduct = async (req, res) => {
  try {
    const { name, category, price, offerPrice, description, unit = "1 unit", inStock = true, imageUrls } = req.body;

    if (!name || !category || !price) {
      return res.status(400).json({ success: false, message: "Name, category, and price are required." });
    }

    let images = [];

    // Check if files uploaded via Multer
    if (req.files && req.files.length > 0) {
      if (process.env.CLOUDINARY_NAME && process.env.CLOUDINARY_API_KEY) {
        for (const file of req.files) {
          const url = await uploadBufferToCloudinary(file.buffer);
          images.push(url);
        }
      } else {
        // Fallback placeholder data URL if Cloudinary keys are not provided
        images = req.files.map((file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`);
      }
    }

    // Also handle imageUrls if sent as JSON/array/string
    if (imageUrls) {
      const parsedUrls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
      images = [...images, ...parsedUrls];
    }

    if (images.length === 0) {
      images = ["https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"];
    }

    // Parse description if stringified
    let descArray = [];
    if (Array.isArray(description)) {
      descArray = description;
    } else if (typeof description === "string") {
      try {
        descArray = JSON.parse(description);
      } catch {
        descArray = description.split("\n").filter((item) => item.trim() !== "");
      }
    }

    const newProduct = await Product.create({
      name,
      category,
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : Number(price),
      image: images,
      description: descArray,
      unit,
      inStock: inStock === true || inStock === "true",
      sellerId: req.sellerId || null,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// List All Products (Public / Customer / Seller)
export const listProducts = async (req, res) => {
  try {
    const { category, search, inStock } = req.query;
    const filter = {};

    if (category && category !== "All") {
      filter.category = new RegExp(category, "i");
    }

    if (search) {
      filter.$or = [
        { name: new RegExp(search, "i") },
        { category: new RegExp(search, "i") },
      ];
    }

    if (inStock !== undefined) {
      filter.inStock = inStock === "true";
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    console.error("List Products Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Product By ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle In-Stock Status (Seller)
export const toggleStock = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    product.inStock = !product.inStock;
    await product.save();

    res.json({
      success: true,
      message: `Product is now ${product.inStock ? "In Stock" : "Out of Stock"}`,
      product,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.price) updates.price = Number(updates.price);
    if (updates.offerPrice) updates.offerPrice = Number(updates.offerPrice);
    if (typeof updates.description === "string") {
      try {
        updates.description = JSON.parse(updates.description);
      } catch {
        updates.description = updates.description.split("\n").filter(Boolean);
      }
    }

    const product = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product removed from store catalog" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
