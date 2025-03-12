const express = require("express");
const controllers = require("../controllers/CartControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Create Cart
router.post("/", verifyToken, controllers.createCart);

//Update Cart
router.put("/", verifyToken, controllers.updateCart);

//Delete Cart
router.delete("/", verifyToken, controllers.deleteCart);

//Get Cart Details
router.get("/", verifyToken, controllers.getCartDetails);

module.exports = router;
