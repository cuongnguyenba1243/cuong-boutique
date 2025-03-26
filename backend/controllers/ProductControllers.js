const Product = require("../models/ProductModel");

//Create Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      sku,
      rating,
      numView,
    } = req.body;

    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      sku,
      rating,
      numView,
      user: req.user,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Update Product
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      sku,
      rating,
      numView,
    } = req.body;

    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.images = images || product.images;
      product.sku = sku || product.sku;
      product.rating = rating || product.rating;
      product.numView = numView || product.numView;
    }

    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Delete Product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      await product.deleteOne();
      res.json({ message: "Deleted Successfully!" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//GET ALL PRODUCT BY QUERY
const getAllProducts = async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      sortBy,
      search,
      category,
      material,
      brand,
      limit = 8,
      page = 1,
    } = req.query;

    let query = {};

    //Filter
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }
    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }
    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    //Sort
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "popularity":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    //Fetch products and apply sorting and pagination
    let products = await Product.find(query).sort(sort).limit(limit);

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get An Product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      return res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get Similar Product
const getSimilarProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id },
      gender: product.gender,
      category: product.category,
    }).limit(4);

    return res.status(200).json(similarProducts);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get New Arrivals Product
const getNewArrivalsProduct = async (req, res) => {
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(4);
    if (newArrivals) {
      return res.status(200).json(newArrivals);
    } else {
      res.status(404).json({ message: "No new arrivals product found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get Best Seller Product
const getBestSellerProduct = async (req, res) => {
  try {
    const bestSeller = await Product.find().sort({ rating: -1 }).limit(4);
    if (bestSeller) {
      return res.status(200).json(bestSeller);
    } else {
      res.status(404).json({ message: "No best seller product found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get All Products By Admin
const getProductsByAdmin = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const total = await Product.countDocuments({});

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    if (!products)
      return res.status(404).json({ message: "Products not found!" });

    return res.status(200).json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getSimilarProduct,
  getNewArrivalsProduct,
  getBestSellerProduct,
  getProductsByAdmin,
};
