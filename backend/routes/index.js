const UserRoutes = require("../routes/UserRoutes");

const initRoutes = (app) => {
  app.use("/api/users", UserRoutes);
};

module.exports = initRoutes;
