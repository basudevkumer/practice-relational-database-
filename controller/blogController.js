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


module.exports =  {createPost,createComment}