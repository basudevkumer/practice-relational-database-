const mongoose = require("mongoose");

const subCatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cat",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("SubCat", subCatSchema);
