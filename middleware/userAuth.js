const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// check if user is authenticated
const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const token = authHeader.split(" ")[1]; 
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};


const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "You don't have permission to perform this action" });
    }

    next();
  };
};

const checkModuleAccess = (moduleName) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    
    if (req.user.role === "superadmin") {
      return next();
    }

    if (!req.user.permissions.includes(moduleName)) {
      return res.status(403).json({ message: `You don't have access to ${moduleName}` });
    }

    next();
  };
};

module.exports = { protect, authorize, checkModuleAccess };