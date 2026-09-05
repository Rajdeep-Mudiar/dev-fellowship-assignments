import Product from "../models/Product.js";
import { cloudinary } from "../config/cloudinary.js";

const CATEGORY_DEFAULT_IMAGES = {
  Vegetables: "https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=600&q=80",
  Fruits: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80",
  Dairy: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=600&q=80",
  Drinks: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80",
  Instant: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
  Bakery: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
  Grains: "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80",
};

// Helper to upload memory buffer to Cloudinary with safe fallback
const uploadBufferToCloudinary = async (buffer, mimetype = "image/jpeg") => {
  const isCloudinaryConfigured =
    process.env.CLOUDINARY_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET &&
    !process.env.CLOUDINARY_NAME.includes("cloud") &&
    !process.env.CLOUDINARY_API_SECRET.includes("sample");

  if (!isCloudinaryConfigured) {
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
  }

  try {
    const url = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "greencart_products", resource_type: "image" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      uploadStream.end(buffer);
    });
    return url;
  } catch (err) {
    console.warn("Cloudinary upload notice, using base64 storage:", err.message);
    return `data:${mimetype};base64,${buffer.toString("base64")}`;
  }
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
      for (const file of req.files) {
        try {
          const url = await uploadBufferToCloudinary(file.buffer, file.mimetype || "image/jpeg");
          images.push(url);
        } catch (e) {
          images.push(`data:${file.mimetype || "image/jpeg"};base64,${file.buffer.toString("base64")}`);
        }
      }
    }

    // Also handle imageUrls if sent as JSON/array/string
    if (imageUrls) {
      const parsedUrls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];
      images = [...images, ...parsedUrls];
    }

    if (images.length === 0) {
      const defaultImg = CATEGORY_DEFAULT_IMAGES[category] || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80";
      images = [defaultImg];
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
