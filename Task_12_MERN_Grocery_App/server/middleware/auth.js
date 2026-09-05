import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    let token = req.headers.token;

    if (!token && authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "Not Authorized. Please login again." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_jwt_secret_key");
    req.userId = decoded.id;
    req.userRole = decoded.role || "customer";
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid or expired session. Please login." });
  }
};

export default authUser;
