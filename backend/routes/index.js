const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/ProductRoutes");
const CartRoutes = require("../routes/CartRoutes");

const initRoutes = (app) => {
  app.use("/api/users", UserRoutes);
  app.use("/api/products", ProductRoutes);
  app.use("/api/cart", CartRoutes);
};

module.exports = initRoutes;
