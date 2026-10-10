const SubCat = require("../models/practiceVendorSubCategory");
const Cat = require("../models/practiceVendorCategory");

let createSubCategory = async (req, res) => {
  try {
    let { name, parentCategory } = req.body;

    if (!name || !parentCategory) {
      return res.status(400).json({
        success: false,
        message: "Name and parentCategory are required",
      });
    }

    let existingName = await SubCat.findOne({
      name: name.toLowerCase(),
      parentCategory,
    });
    if (existingName) {
      return res
        .status(400)
        .json({ success: false, message: "Sub Category Already Exists" });
    }

    let subCat = await SubCat.create({
      name: name.toLowerCase(),
      parentCategory,
    });

    await Cat.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: subCat._id },
    });

    res
      .status(201)
      .json({ success: true, message: "Sub Category Created", data: subCat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createSubCategory };