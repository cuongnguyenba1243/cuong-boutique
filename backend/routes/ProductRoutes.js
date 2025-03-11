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

//Get New Arrivals Product
router.get("/new-arrivals", controllers.getNewArrivalsProduct);

//Get Best Seller Product
router.get("/best-seller", controllers.getBestSellerProduct);

//Get An Product
router.get("/:id", controllers.getProduct);

//Get Similar Product
router.get("/similar/:id", controllers.getSimilarProduct);

module.exports = router;
