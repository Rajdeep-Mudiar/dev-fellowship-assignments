import User from "../models/User.js";

/**
 * Middleware to enforce Admin / Owner permissions
 */
export const requireAdmin = async (req, res, next) => {
  try {
    const userId = req.userId || req.auth?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Missing authentication token",
      });
    }

    // Check user role in DB or Clerk session claims
    let user = await User.findOne({ clerkId: userId });
    
    // In initial setup or dev environment, allow if role is admin or owner
    const isAdmin = 
      user?.role === "admin" || 
      user?.role === "hotelOwner" || 
      req.auth?.sessionClaims?.metadata?.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Admin privileges required",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Authorization verification failed",
    });
  }
};
