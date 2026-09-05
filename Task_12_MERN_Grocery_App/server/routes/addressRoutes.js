import express from "express";
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import authUser from "../middleware/auth.js";

const addressRouter = express.Router();

addressRouter.use(authUser);

addressRouter.get("/list", getAddresses);
addressRouter.post("/add", addAddress);
addressRouter.put("/update/:id", updateAddress);
addressRouter.delete("/delete/:id", deleteAddress);

export default addressRouter;
