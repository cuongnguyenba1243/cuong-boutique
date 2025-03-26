const express = require("express");
const controllers = require("../controllers/OrderAdminControllers");
const { verifyToken, isAdmin } = require("../middlewares/auth");

const router = express.Router();

//Get all orders by admin
router.get("/", verifyToken, isAdmin, controllers.getAllOrdersByAdmin);

//Orders paginate
router.get("/paginate", verifyToken, isAdmin, controllers.ordersPaginate);

//Update an order by admin
router.put("/:id", verifyToken, isAdmin, controllers.updateOrderByAdmin);

//Delete an order by admin
router.delete("/:id", verifyToken, isAdmin, controllers.deleteOrderByAdmin);

module.exports = router;
