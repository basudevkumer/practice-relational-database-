const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeCategory",
      required: true,
    },
  },
  { timestamps: true },
);

subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

module.exports = mongoose.model("PracticeSubCategory", subCategorySchema);
