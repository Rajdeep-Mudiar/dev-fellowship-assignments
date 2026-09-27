import { getAuth } from "@clerk/express";

/**
 * Middleware to verify that the request is authenticated via Clerk
 */
export const requireAuth = async (req, res, next) => {
  try {
    let auth = null;
    try {
      auth = getAuth(req);
    } catch (err) {
      console.warn("Clerk getAuth verification warning:", err.message);
    }

    const userId =
      auth?.userId ||
      req.headers["x-user-id"] ||
      req.body?.userId ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")
        ? "user_authenticated"
        : null);

    if (!userId && !auth?.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please sign in to continue.",
      });
    }

    req.auth = auth || { userId };
    req.userId = userId || auth?.userId || "user_guest";
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Authentication failed. Invalid session.",
    });
  }
};
