const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");

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

    user = new User({ name, email, password });
    await user.save();

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (error, token) => {
        if (error) throw error;

        //Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
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

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //Create JWT Payload
    const payload = { user: { id: user._id, role: user.role } };
    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "48h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//User's Profile
const profile = async (req, res) => {
  res.status(200).json(req.user);
};

module.exports = { register, login, profile };
