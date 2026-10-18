const Vendor = require("../models/PracticeVendor");
const product = require("../models/PracticeProduct");

// create vendor

const createVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create(req.body);

    return res.status(201).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `Vendor error is ${error.message}`,
    });
  }
};

//getvendor

const getVendor = async (req, res) => {
  try {
    const { address, status, limit = 5, page = 1 } = req.query;

    const filter = {};

    if (address) filter.address = address;
    if (status) filter.status = status;

    const skip = Number(page - 1) * Number(limit);

    const [vendors, total] = await Promise.all([
      Vendor.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      total,
      data: vendors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//updateVendorStatus

const updateVendorStatus = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const updatedStatus = await Vendor.findByIdAndUpdate(
      vendorId,
      { $set: { status: req.body.status } },
      { returnDocument: true },
      { runValidators: true },
    );

    if (!updatedStatus) {
      return res.status(404).json({
        success: true,
        message: "Vendor not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: updateVendorStatus,
    });
  } catch (error) {
    return res.status(400).json({
      success: true,
      message: error.message,
    });
  }
};

//getVendorProducts

const getVendorProducts = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const vendor = await Vendor.findById(vendorId).select("shopName status");

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "vendor is not found",
      });
    }

    const vendorProducts = await product
      .findById({
        vendor: vendorId,
      })
      .populate("category", "name")
      .populate("subCategory", "name")
      .select("-_v");

    return res.status(200).json({
      success: true,
      vendor: vendor.shopName,
      data: vendorProducts,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//deleteVedor

const deleteVedor = async (req, res) => {
  try {
    const vendorId = req.params.id;

    const hasProduct = await product.exists(vendorId);

    if (!hasProduct) {
      return res.status(400).json({
        success: false,
        message: "Vendor has prodcut Aleardy exit, delete items at first",
      });
    }

    const deleteVedor = await product.findByIdAndDelete(vendorId);
    if (!vendor) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found" });
    }
    return res.status(200).json({ success: true, message: "Vendor deleted" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// search Products

const searchProducts = async (req, res) => {
  try {
    const { q, minPrice, maxPrice, tags, vendor, sort } = req.query;

    const filter = { isActive: true };

    if (q) filter.name = { $regex: q, $options: i };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (tags) filter.tags = { $in: tags.splite(" ") };

    if (vendor) filter.vendor = vendor;

    const sortMap = {
      priceAsc: { price: 1 },
      priceDesc: { price: -1 },
      newsest: { createdAt: -1 },
    };

    const products = await product
      .find(filter)
      .sort(sortMap[sort] || sortMap.newsest)
      .populate("vendor", "shopName")
      .populate("subCategory", "name")
      .lean();

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createVendor, getVendor, getVendorProducts };
