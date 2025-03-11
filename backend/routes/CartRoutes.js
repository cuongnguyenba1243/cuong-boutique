const express = require("express");
const controllers = require("../controllers/CartControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Create Cart
router.post("/", controllers.createCart);

//Update Cart
router.put("/", controllers.updateCart);

//Delete Cart
router.delete("/", controllers.deleteCart);

//Get Cart Details
router.get("/", controllers.getCartDetails);

module.exports = router;
