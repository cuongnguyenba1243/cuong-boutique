const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

//Get all users by admin
const getAllUsersByAdmin = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const total = await User.countDocuments({});
    const users = await User.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return res
      .status(200)
      .json({ users, currentPage: page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Add new user by admin
const addNewUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing inputs" });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "customer",
    });

    await user.save();
    return res
      .status(200)
      .json({ message: "User created successfully!", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update user by admin
const updateUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.findById(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      user.role = role || user.role;
      user.password = hashedPassword || user.password;
    }

    const updatedUser = await user.save();
    return res
      .status(200)
      .json({ message: "Updated Successfully!", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete user by admin
const deleteUserByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user) {
      await user.deleteOne();
      return res.status(200).json({ message: "Deleted Successfully!" });
    } else {
      return res.status(400).json({ message: "Deleted Failed!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsersByAdmin,
  addNewUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
};
