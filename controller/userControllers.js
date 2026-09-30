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

    updatedUser.address.pull(updatedUser.address[1]._id);

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

const addAddress = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $push: { address: req.body } },
      { new: true, runValidators: true },
    );

    if (!user) {
      res.status(404).json("user not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("addAddress error : ", error);
  }
};

const removeAddress = async (req, res) => {
  try {
    const { id, addressId } = req.params;

    console.log(id, addressId);

    const user = await User.findByIdAndUpdate(
      id,
      {
        $pull: { address: { _id: addressId } },
      },
      { new: true, runValidators: true },
    );
    if (!user) {
      res.status(404).json("user not found");
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("removeAddress error : ", error);
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id, addressID } = req.params;

    const user = await User.findOneAndUpdate(
      { _id: id, "address._id": addressID },
      {
        $set: {
          "address.$.area": req.body.area,
          "address.$.city": req.body.city,
        },
      },
      { new: true },
    );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("userUpdateAddress error : ", error);
  }
};

const findCity = async (req, res) => {
  try {
    const user = await User.find({ "address.city": req.query.city });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("userUpdateAddress error : ", error);
  }
};

const addPhone = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { phone: req.body.phone } },
      { new: true, runValidators: true },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("addPhone error : ", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add phone",
    });
  }
};

module.exports = {
  userController,
  removeAddress,
  userUpdateController,
  addAddress,
  updateAddress,
  findCity,addPhone
};
