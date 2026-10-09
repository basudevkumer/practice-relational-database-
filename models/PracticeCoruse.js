const mongoose = require("mongoose");

const coruseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    instuctor: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    duration: {
      type: Number,
      min: 1,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("PracticeCourse", coruseSchema);
