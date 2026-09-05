import express from "express";
import {
  getCart,
  addToCart,
  updateCart,
  clearCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.use(authUser);

cartRouter.get("/", getCart);
cartRouter.post("/add", addToCart);
cartRouter.post("/update", updateCart);
cartRouter.post("/clear", clearCart);

export default cartRouter;
