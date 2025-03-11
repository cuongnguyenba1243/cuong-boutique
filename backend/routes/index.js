const UserRoutes = require("../routes/UserRoutes");
const ProductRoutes = require("../routes/ProductRoutes");

const initRoutes = (app) => {
  app.use("/api/users", UserRoutes);
  app.use("/api/products", ProductRoutes);
};

module.exports = initRoutes;
