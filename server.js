require("dotenv").config();
const express = require("express");
const app = express();
const dbConnect = require("./dbConfig/dbConnect");
const {
  userController,
  userUpdateController,
} = require("./controller/userControllers");

app.use(express.json());

dbConnect();

app.post("/create_user", userController);
app.post("/unpdate_user/:id", userUpdateController);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
