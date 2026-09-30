const mongoose = require("mongoose");

const addressSChema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["home", "office", "other"],
    default: "home",
  },
  city: { type: String },
  area: String,
  zip: String,
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: [String],
    address: [addressSChema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("PracticeUser", userSchema);
