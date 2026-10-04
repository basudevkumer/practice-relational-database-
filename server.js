require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./dbConfig/dbConnect");
const {
  userController,
  userUpdateController,
  addAddress,
  removeAddress,
  updateAddress,
  findCity,
  addPhone,
} = require("./controller/userControllers");

const {
  createPost,
  createComment,
  getPostRow,
  getPosts,
  getPostsSelect,
  getComments,
  getCommentsNested,
  getCommentsByPost,
} = require("./controller/blogController");
const {
  createProfile,
  getProfiles,
  getProfileByUser,
} = require("./controller/profileControllers");
const {
  createCategory,
  getCategories,
} = require("./controller/categoryProductControllers");

app.use(express.json());

dbConnect();

app.post("/create_user", userController);
app.post("/unpdate_user/:id", userUpdateController);
app.post("/users/:id/address", addAddress);
app.delete("/users/:id/address/:addressId", removeAddress);
app.put("/users/:id/address/:addressID", updateAddress);
app.get("/users/search", findCity);
app.patch("/users/:id/phone", addPhone);

// practice populate

// post
app.post("/posts", createPost);
app.get("/rowposts", getPostRow);
// app.get("/rowposts", getPostRow);
app.get("/getposts", getPosts);
app.get("/getpostsselect", getPostsSelect);

//for comments
app.post("/comments", createComment);
app.get("/comments", getComments);
app.get("/comments/nested", getCommentsNested);
app.get("/comments/post/:id", getCommentsByPost);

//one to one practice

app.post("/profiles", createProfile);
app.get("/profiles", getProfiles);
app.get("/profiles/user/:id", getProfileByUser);

//category

app.post("/categories", createCategory);
app.get("/categories", getCategories);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
