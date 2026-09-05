import express from "express";
import {
  addProduct,
  listProducts,
  getProductById,
  updateProduct,
  toggleStock,
  deleteProduct,
} from "../controllers/productController.js";
import authSeller from "../middleware/authSeller.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/list", listProducts);
productRouter.get("/:id", getProductById);

// Seller/Admin protected routes
productRouter.post("/add", authSeller, upload.array("images", 5), addProduct);
productRouter.put("/update/:id", authSeller, updateProduct);
productRouter.patch("/stock/:id", authSeller, toggleStock);
productRouter.delete("/delete/:id", authSeller, deleteProduct);

export default productRouter;
