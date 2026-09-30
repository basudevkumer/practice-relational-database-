const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb database successfull connected");
  } catch (error) {
    console.log("mongodb error is : ", error);
  }
};

module.exports = dbConnect;
