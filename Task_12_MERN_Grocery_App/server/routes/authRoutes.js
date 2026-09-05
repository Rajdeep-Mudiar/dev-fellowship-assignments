import express from "express";
import {
  registerUser,
  loginUser,
  sellerLogin,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";
import authUser from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/seller-login", sellerLogin);
authRouter.get("/profile", authUser, getUserProfile);
authRouter.put("/profile", authUser, updateUserProfile);

export default authRouter;
