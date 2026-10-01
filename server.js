require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./dbConfig/dbConnect");
const {
  userController,
  userUpdateController,
  addAddress,removeAddress,updateAddress,findCity,addPhone
} = require("./controller/userControllers");
const { createPost ,createComment} = require("./controller/blogController");

app.use(express.json());

dbConnect();

app.post("/create_user", userController);
app.post("/unpdate_user/:id", userUpdateController);
app.post("/users/:id/address", addAddress);
app.delete("/users/:id/address/:addressId", removeAddress);
app.put("/users/:id/address/:addressID", updateAddress);
app.get("/users/search",findCity)
app.patch("/users/:id/phone",addPhone)

// practice populate

// post
app.post("/posts", createPost)
app.post("/comments", createComment)
//comment

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
