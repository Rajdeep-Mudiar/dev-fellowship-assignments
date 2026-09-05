import jwt from "jsonwebtoken";

const authSeller = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = req.headers.seller_token || req.headers.token;

    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies && req.cookies.seller_token) {
      token = req.cookies.seller_token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Seller authentication required." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret_key");
    
    // Check if role is seller or admin
    if (decoded.role !== "seller" && decoded.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Seller or Admin privileges required." });
    }

    req.sellerId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired seller token." });
  }
};

export default authSeller;
