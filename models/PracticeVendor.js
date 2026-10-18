const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "active", "suspended"],
      default: "pending",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PracticeVendor", vendorSchema);