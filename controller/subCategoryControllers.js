const SubCategory = require("../models/PracticeSubCategory");
const Category = require("../models/PracticeCategory");

const createSubCategory = async (req, res) => {
  try {
    const categoryId = req.body.category;

    const existCategroryId = await Category.exists({ _id: categoryId });

    if (!existCategroryId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const subCategories = await SubCategory.create(req.body);

    return res.status(200).json({
      success: true,
      data: subCategories,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "This sub-category all ready exist",
      });
    }

    return res.status(400).json({
      success: false,
      messge: `SubCategory error is about subcategory ${error.message}`,
    });
  }
};

const getSubCategory = async (req, res) => {
  try {
    const subCategoriex = await SubCategory.find().populate("category", "name");

    return res.status(200).json({
      success: true,
      count: subCategoriex.length,
      data: subCategoriex,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSubCategoriesByCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const subCateogry = await SubCategory.find({
      category: category._id,
    }).select("name");

    return res.status(200).json({
      success: true,
      items: subCateogry.length,
      data: subCateogry,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createSubCategory,
  getSubCategory,
  getSubCategoriesByCategory,
};
