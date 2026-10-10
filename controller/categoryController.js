const Cat = require("../models/practiceVendorCategory");
const { attachSubCategories } = require("../uitils/categoryPromise");

let createCategory = async (req, res) => {
  try {
    let { name, owner } = req.body;

    if (!name || !owner) {
      return res
        .status(400)
        .json({ success: false, message: "Name and owner are required" });
    }

    let existing = await Cat.findOne({ name: name.toLowerCase(), owner });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Category Already Exists" });
    }

    let category = await Cat.create({ name, owner });

    res
      .status(201)
      .json({ success: true, message: "Category Created", data: category });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let getAllOwnerWiseCategory = async (req, res) => {
  try {
    let { id } = req.params;

    let data = await Cat.find({ owner: id }).lean();
    let cat = await attachSubCategories(data);

    res.status(200).json({
      success: true,
      message: "All Category",
      data: cat,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCategory, getAllOwnerWiseCategory };