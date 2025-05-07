const jwt = require("jsonwebtoken");

const generateAccessToken = (id, role) => {
  const accessToken = jwt.sign(
    { user: { id, role } },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRED,
    }
  );

  return accessToken;
};

const generateRefreshToken = (id, role) => {
  const refreshToken = jwt.sign(
    { user: { id, role } },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRED,
    }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
