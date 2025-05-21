const Order = require("../models/OrderModel");

//Get all orders by admin
const getAllOrdersByAdmin = async (req, res) => {
  try {
    const orders = await Order.find({}).populate("user", "name email");
    if (!orders) return res.status(404).json({ message: "Orders not found" });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update an order by admin
const updateOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id).populate("user", "name");
    if (order) {
      order.status = status || order.status;
      order.isDelivered = status === "Delivered" ? true : order.isDelivered;
      order.deliveredAt =
        status === "Delivered" ? Date.now() : order.deliveredAt;
    }

    const updatedOrder = await order.save();
    return res.status(200).json(updatedOrder);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete an order by admin
const deleteOrderByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (order) {
      await order.deleteOne();
      return res.status(200).json({ message: "Deleted Successfully!" });
    } else {
      return res.status(400).json({ message: "Deleted Failed!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Paginate orders
const ordersPaginate = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const total = await Order.countDocuments({});
    const orders = await Order.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    return res.status(200).json({
      orders,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllOrdersByAdmin,
  updateOrderByAdmin,
  deleteOrderByAdmin,
  ordersPaginate,
};
