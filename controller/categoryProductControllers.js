const Category = require("../models/PracticeCategory");
const Products = require("../models/PracticeProduct");

const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json({ success: true, data: category });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Category name already exists",
      });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res
      .status(200)
      .json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const existingCategory = await Category.findById(req.body.category);

    if (!existingCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const product = await Products.create(req.body);
    return res.status(201).json({ success: true, data: product });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    const products = await Products.find({ category: category._id });

    return res.status(200).json({
      success: true,
      category: category.name,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};





module.exports = { createCategory, getCategories, createProduct,getProductsByCategory };
