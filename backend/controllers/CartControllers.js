const Cart = require("../models/CartModel");
const Product = require("../models/ProductModel");

//Create Cart
const createCart = async (req, res) => {
  try {
    const { productId, quantity, size, color, userId } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    //If the cart exists, update it
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) =>
          p.productId.toString() === productId &&
          p.size === size &&
          p.color === color
      );

      if (productIndex > -1) {
        //If the product already exists, update the quantity
        cart.products[productIndex].quantity += quantity;
      } else {
        //Add new product
        cart.products.push({
          productId,
          name: product.name,
          image: product.images[0].url,
          price: product.price,
          size,
          color,
          quantity,
        });
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    } else {
      //Create a new cart for user
      const newCart = await Cart.create({
        user: userId ? userId : undefined,
        products: [
          {
            productId,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            size,
            color,
            quantity,
          },
        ],
        totalPrice: product.price * quantity,
      });
      return res.status(201).json(newCart);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Update Cart
const updateCart = async (req, res) => {
  try {
    const { productId, quantity, size, color, userId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      //Update product
      if (quantity > 0) {
        cart.products[productIndex].quantity = quantity;
      } else {
        cart.products.splice(productIndex, 1); //remove product if quantity is 0
      }

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const updatedCart = await cart.save();
      return res.status(200).json(updatedCart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Cart
const deleteCart = async (req, res) => {
  try {
    const { productId, size, color, userId } = req.body;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) =>
        p.productId.toString() === productId &&
        p.size === size &&
        p.color === color
    );

    if (productIndex > -1) {
      cart.products.splice(productIndex, 1);

      cart.totalPrice = cart.products.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      await cart.save();
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//Get Cart Details
const getCartDetails = async (req, res) => {
  try {
    const { userId } = req.query;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCart, updateCart, deleteCart, getCartDetails };
