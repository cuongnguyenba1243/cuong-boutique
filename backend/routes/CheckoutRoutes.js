const express = require("express");
const controllers = require("../controllers/CheckoutControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Create Checkout Session
router.post("/", verifyToken, controllers.createCheckout);

//Update Checkout Session
router.put("/:id/pay", verifyToken, controllers.updateCheckout);

//Finalize Checkout Session
router.post("/:id/finalize", verifyToken, controllers.finalizeCheckout);

module.exports = router;
