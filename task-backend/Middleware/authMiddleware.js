const jwt = require("jsonwebtoken");

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied, token required" });
  }

  try {
    const decoded = jwt.verify(token, "12345");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};



const rolemiddleware = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res
          .status(403)
          .json({ success: false, message: "User role not found" });
      }

     

      next();
    } catch (error) {
      console.error("Middleware error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  };
};

module.exports = { verifyToken, rolemiddleware };
