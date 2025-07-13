const express = require("express");
const controllers = require("../controllers/UserControllers");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

//Register
router.post("/register", controllers.register);

//Login
router.post("/login", controllers.login);

//Login with google
router.post("/google", controllers.googleLogin);

//Get logged-in user's profile
router.get("/profile", verifyToken, controllers.profile);

//Verify account
router.post("/verify", controllers.verifyAccount);

//Logout
router.delete("/logout", controllers.logout);

module.exports = router;
