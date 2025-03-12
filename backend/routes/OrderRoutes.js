const express = require("express");
const controllers = require("../controllers/OrderControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Get logged-in user's orders
router.get("/my-orders", verifyToken, controllers.getUserOrders);

//Get logged-in user's orders details
router.get("/:id", verifyToken, controllers.getOrderDetails);

module.exports = router;
