const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;

  if (!accessToken) {
    return res.status(403).json({ message: "UNAUTHORIZED!" });
  }

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_JWT_SECRET);

    req.user = decoded;

    console.log(req.user);

    next();
  } catch (error) {
    if (error?.message?.includes("jwt expired")) {
      return res.status(400).json({ message: "Token expired" });
    }

    return res.status(500).json({ success: false, message: error.message });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.user.role === "admin") {
    next();
  } else {
    return res
      .status(403)
      .json({ success: false, message: "REQUIRE ADMIN ROLE!" });
  }
};

module.exports = { verifyToken, isAdmin };
