const express = require("express");
const controllers = require("../controllers/ProductControllers");
const { verifyToken, isAdmin } = require("../middlewares/auth");

const router = express.Router();

//Create Product
router.post("/", verifyToken, isAdmin, controllers.createProduct);

//Update Product
router.put("/:id", verifyToken, isAdmin, controllers.updateProduct);

//Delete Product
router.delete("/:id", verifyToken, isAdmin, controllers.deleteProduct);

//Get All Products By Query
router.get("/", controllers.getAllProducts);

module.exports = router;
