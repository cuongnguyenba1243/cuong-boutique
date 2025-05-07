const express = require("express");
const controllers = require("../controllers/UserControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Register
router.post("/register", controllers.register);

//Login
router.post("/login", controllers.login);

//Get logged-in user's profile
router.get("/profile", verifyToken, controllers.profile);

//Verify account
router.put("/verify", controllers.verifyAccount);

module.exports = router;
