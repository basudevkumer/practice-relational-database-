const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    text: {
      type: String,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticePost",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeUser",
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PracticeComment", commentSchema);
