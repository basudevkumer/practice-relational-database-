const User = require("../models/User");

const userController = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      message: "success",
      userData: user,
    });
  } catch (error) {
    console.log("this error from userController");
  }
};
const userUpdateController = async (req, res) => {
  try {
    const id = req.params.id;

    const updatedUser = await User.findById(id);

    // updatedUser.address.push(...req.body.address);

    updatedUser.address.pull(updatedUser.address[1]._id)

    console.log("Updated user", updatedUser);

    await updatedUser.save();

    res.status(200).json({
      message: "success",
      userData: updatedUser,
    });
  } catch (error) {
    console.log("this error from userUpdatedController");
  }
};

module.exports = { userController, userUpdateController };
