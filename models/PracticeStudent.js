const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PracticeCourse",
      },
    ],
  },
  { timestamps: true },
);

studentSchema.index({ courses: 1 });

module.exports = mongoose.model("StudentSchema", studentSchema);
