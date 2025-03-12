const Checkout = require("../models/CheckoutModel");
const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");
const Order = require("../models/OrderModel");

//Create Checkout Session
const createCheckout = async (req, res) => {
  try {
    const { _id } = req.user;
    const { checkoutItems, shippingAddress, paymentMethod, totalPrice } =
      req.body;

    if (!checkoutItems && checkoutItems.length === 0) {
      return res.status(404).json({ message: "No items in the checkout" });
    }

    const newCheckout = await Checkout.create({
      user: _id,
      checkoutItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });

    return res.status(200).json(newCheckout);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update Checkout Session
const updateCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentStatus, paymentDetails } = req.body;

    const checkout = await Checkout.findById(id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found" });

    if (paymentStatus === "paid") {
      checkout.isPaid = true;
      checkout.paymentStatus = paymentStatus;
      checkout.paymentDetails = paymentDetails;
      checkout.paidAt = Date.now();

      await checkout.save();

      return res.status(200).json(checkout);
    } else {
      return res.status(400).json({ message: "Invalid Payment Status" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Finalize Checkout Session
const finalizeCheckout = async (req, res) => {
  try {
    const { id } = req.params;
    const checkout = await Checkout.findById(id);
    if (!checkout)
      return res.status(404).json({ message: "Checkout not found" });

    if (checkout.isPaid && !checkout.isFinalized) {
      const finalOrder = await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "paid",
        paymentDetails: checkout.paymentDetails,
      });

      //Mark checkout as finalized
      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      //Delete the cart associated with the user
      await Cart.findOneAndDelete({ user: checkout.user });
      res.status(201).json(finalOrder);
    } else if (checkout.isFinalized) {
      return res.status(400).json({ message: "Checkout already finalized" });
    } else {
      return res.status(400).json({ message: "Checkout is not paid" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCheckout, updateCheckout, finalizeCheckout };
