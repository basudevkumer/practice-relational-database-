const Post = require("../models/PracticePost");
const Comment = require("../models/PracticeComment");

// create
const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};
const createComment = async (req, res) => {
  try {
    const post = await Comment.create(req.body);
    return res.status(201).json({ success: true, data: post });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

// start populate practice

const getPostRow = async (req, res) => {
  try {
    const posts = await Post.find();

    return res
      .status(200)
      .json({ success: true, count: posts.length, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// basic populate

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.json({ success: true, count: posts.length, posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// selected data to get

const getPostsSelect = async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email _id");
    res.json({ success: true, posts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//multipole populate to get data

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("user", "name")
      .populate("post", "title");
    res.json({ success: true, comments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const getCommentsNested = async (req, res) => {
  try {
    const comments = await Comment.find().populate({
      path: "post",
      select: "title author",
      populate: {
        path: "author",
        select: "name",
      },
    });

    res.json({ success: true, comments });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  createPost,
  createComment,
  getPostRow,
  getPosts,
  getPostsSelect,
  getComments,
  getCommentsNested
};
