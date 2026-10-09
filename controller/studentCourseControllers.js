const Course = require("../models/PracticeCoruse");
const Student = require("../models/PracticeStudent");

// course students

const createCourser = async (req, res) => {
  try {
    const course = await Course.create(req.body);

    return res.status(201).json({ success: true, data: course });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(400)
        .json({ success: false, message: "Course title already exists" });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

//get Course

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    return res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCourser,getCourses };
