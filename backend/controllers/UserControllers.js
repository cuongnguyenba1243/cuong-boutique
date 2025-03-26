const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../middlewares/jwt");

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

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
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

    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const accessToken = generateAccessToken(user._id, user.role);

    return res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//User's Profile
const profile = async (req, res) => {
  return res.status(200).json(req.user);
};

module.exports = { register, login, profile };
