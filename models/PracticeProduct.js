const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      min: 0,
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeCategory",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeSubCategory",
      required: true,
    },
    vendor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeVendor",
      required: true,
    },
    tags: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
    image: [
      {
        type: String,
        default: "",
      },
    ],
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, id: false },
);

productSchema.virtual("imageUrl").get(function () {
  return this.image?.length ? `/uploads/${this.image[0]}` : "";
});

productSchema.index({
  category: 1,
  vendor: 1,
});

module.exports = mongoose.model("PracticeProduct", productSchema);
