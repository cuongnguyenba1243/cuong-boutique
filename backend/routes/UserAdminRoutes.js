const express = require("express");
const controllers = require("../controllers/AdminControllers");
const { verifyToken, isAdmin } = require("../middlewares/auth");

const router = express.Router();

//Get all users by admin
router.get("/", verifyToken, isAdmin, controllers.getAllUsersByAdmin);

//Add new user by admin
router.post("/", verifyToken, isAdmin, controllers.addNewUserByAdmin);

//Update user by admin
router.put("/:id", verifyToken, isAdmin, controllers.updateUserByAdmin);

//Delete user by admin
router.delete("/:id", verifyToken, isAdmin, controllers.deleteUserByAdmin);

module.exports = router;
