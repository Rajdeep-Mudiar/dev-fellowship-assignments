import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    offerPrice: {
      type: Number,
      required: true,
    },
    image: {
      type: [String],
      required: true,
    },
    description: {
      type: [String],
      default: [],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    unit: {
      type: String,
      default: "1 unit",
    },
    sellerId: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
