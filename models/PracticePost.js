const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeUser",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports =  mongoose.model("PracticePost", postSchema)
