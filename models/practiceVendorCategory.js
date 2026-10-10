const mongoose = require("mongoose");

const catSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, lowercase: true, trim: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    subCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCat" }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cat", catSchema);
