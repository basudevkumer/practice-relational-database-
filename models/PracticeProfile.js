const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PracticeUser",
      unique: true,
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    dateOfBirth: Date,
    avater: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("PracticeProfile", profileSchema);
