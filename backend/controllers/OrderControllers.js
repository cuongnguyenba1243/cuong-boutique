const Order = require("../models/OrderModel");

//Get logged-in user's order
const getUserOrders = async (req, res) => {
  try {
    const { _id } = req.user.user;

    const orders = await Order.find({ user: _id }).sort({
      //Sort by most recent orders
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get logged-in user's order details
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getUserOrders, getOrderDetails };
