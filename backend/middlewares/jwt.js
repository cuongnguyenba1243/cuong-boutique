const jwt = require("jsonwebtoken");

const generateAccessToken = (_id, role) => {
  const accessToken = jwt.sign(
    { user: { _id, role } },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_JWT_EXPIRED,
    }
  );

  return accessToken;
};

const generateRefreshToken = (_id, role) => {
  const refreshToken = jwt.sign(
    { user: { _id, role } },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_JWT_EXPIRED,
    }
  );

  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
