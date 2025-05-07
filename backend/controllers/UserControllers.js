const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../middlewares/jwt");
const { v4 } = require("uuid");
const ms = require("ms");
const sendEmail = require("../utils/sendEmail");

//Register
const register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    if (!email || !password || !name) {
      return res
        .status(401)
        .json({ success: false, message: "Missing inputs" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exist" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      verifyToken: v4(),
    });
    await user.save();

    //Send email
    const verificationLink = `http://localhost:5173/account/verification?email=${user.email}&token=${user.verifyToken}`;
    const costomSubject = "Please verify your email before using our service";
    const htmlContent = `
      <h3>Here is your verification link</h3>
      <h3>${verificationLink}</h3>
      <h3>Sincerely, <br/> - Cuong Boutique - </h3>
    `;

    await sendEmail.send(user.email, costomSubject, htmlContent);

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        verifyToken: user.verifyToken,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(401).json({ message: "Missing inputs" });

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Credentials" });

    if (!user.isActive) {
      return res.status(400).json({
        message: "Your account is not active! Please check your email!",
      });
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);
    const refreshToken = generateAccessToken(user._id, user.role);

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: ms("14 days"),
    };

    res.cookie("accessToken", accessToken, cookieOptions);
    res.cookie("refreshToken", refreshToken, cookieOptions);

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Verify account
const verifyAccount = async (req, res) => {
  try {
    const { email, token } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }
    if (user.isActive) {
      return res
        .status(400)
        .json({ message: "Your account is already active!" });
    }
    if (token !== user.verifyToken) {
      return res.status(400).json({ message: "Invalid Token!" });
    }

    user.isActive = true;
    user.verifyToken = null;

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "Verify account successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Logout
const logout = async (req, res) => {
  try {
    //
    res.clearCookie(accessToken);
    res.clearCookie(refreshToken);

    return res.status(200).json({ message: "Logged out!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//User's Profile
const profile = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { register, login, profile, verifyAccount, logout };
