const mongoose = require("mongoose");
const { trim } = require("validator");

const addressSChema = new mongoose.Schema({
  label: {
    type: String,
    enum: ["home", "office", "other"],
    default: "home",
  },
  city: { type: String, require: true },
  area: String,
  zip: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  phone: [String],
  address: [addressSChema],
},{timestamps: true});

module.exports =  mongoose.model("PracticeUser", userSchema)