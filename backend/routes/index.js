const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/ProductRoutes");
const CartRoutes = require("../routes/CartRoutes");
const CheckoutRoutes = require("../routes/CheckoutRoutes");
const OrderRoutes = require("../routes/OrderRoutes");

const initRoutes = (app) => {
  app.use("/api/users", UserRoutes);
  app.use("/api/products", ProductRoutes);
  app.use("/api/cart", CartRoutes);
  app.use("/api/checkout", CheckoutRoutes);
  app.use("/api/orders", OrderRoutes);
};

module.exports = initRoutes;
