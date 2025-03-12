const UserRoutes = require("./UserRoutes");
const ProductRoutes = require("./ProductRoutes");
const CartRoutes = require("./CartRoutes");
const CheckoutRoutes = require("./CheckoutRoutes");
const OrderRoutes = require("./OrderRoutes");
const UploadImageRoutes = require("./UploadImageRoutes");
const UserAdminRoutes = require("./UserAdminRoutes");

const initRoutes = (app) => {
  app.use("/api/users", UserRoutes);
  app.use("/api/products", ProductRoutes);
  app.use("/api/cart", CartRoutes);
  app.use("/api/checkout", CheckoutRoutes);
  app.use("/api/orders", OrderRoutes);
  app.use("/api/upload", UploadImageRoutes);

  app.use("/api/admin/users", UserAdminRoutes);
};

module.exports = initRoutes;
