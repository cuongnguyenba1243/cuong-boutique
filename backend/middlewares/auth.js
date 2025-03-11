const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

//Middleware to protect route
const verifyToken = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.user.id).select("-password");
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.status(401).json({ message: "AUTHORIZATION REQUIRED!" });
  }
};

module.exports = { verifyToken };
