const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  const accessToken = jwt.sign({ user: { id, role } }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRED,
  });

  return accessToken;
};

module.exports = { generateAccessToken };
