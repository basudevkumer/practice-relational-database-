const Vendor = require("../models/practiceVendor");

let createVendor = async (req, res) => {
  try {
    let { name, email } = req.body;

    if (!name || !email) {
      return res
        .status(400)
        .json({ success: false, message: "Name and email are required" });
    }

    let existing = await Vendor.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Vendor Already Exists" });
    }

    let vendor = await Vendor.create({ name, email });

    res
      .status(201)
      .json({ success: true, message: "Vendor Created", data: vendor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

let getAllVendors = async (req, res) => {
  try {
    let data = await Vendor.find();
    res.status(200).json({ success: true, message: "All Vendors", data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createVendor, getAllVendors };