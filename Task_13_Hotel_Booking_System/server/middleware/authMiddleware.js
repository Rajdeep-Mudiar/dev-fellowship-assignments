import { getAuth } from "@clerk/express";
import User from "../models/User.js";

/**
 * Middleware to verify that the request is authenticated via Clerk
 */
export const requireAuth = async (req, res, next) => {
  try {
    const auth = getAuth(req);

    if (!auth || !auth.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in to continue.",
      });
    }

    req.auth = auth;
    req.userId = auth.userId;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. Invalid session.",
    });
  }
};
