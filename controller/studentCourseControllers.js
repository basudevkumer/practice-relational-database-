const Course = require("../models/PracticeCoruse");
const Student = require("../models/PracticeStudent");

// course

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

// create students

const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    return res.status(201).json({ success: true, data: student });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ success: false, message: "Student email already exists" });
    }
    return res.status(400).json({ success: false, message: error.message });
  }
};

// get student with course

const getStudents = async (req, res) => {
  try {
    const students = await Student.find().populate(
      "courses",
      "title instuctor",
    );
    return res
      .status(200)
      .json({ success: true, count: students.length, data: students });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createCourser, getCourses, createStudent ,getStudents};
