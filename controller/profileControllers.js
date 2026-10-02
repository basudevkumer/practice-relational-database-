const PracticeProfile = require("../models/PracticeProfile");
const User = require("../models/User");

const createProfile = async (req, res) => {
  try {
    const { user } = req.body;

    const userExists = await User.findById(user);

    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profile = await PracticeProfile.create(req.body);
    return res.status(201).json({ success: true, data: profile });
  } catch (error) {
    if ((error.code = 11000)) {
      return res
        .status(400)
        .json({ success: false, message: "This user already has a profile" });
    }

    return res.status(400).json({ success: false, message: error.message });
  }
};

// all profilers

const getProfiles = async (req, res) => {
  try {
    const profiles = await PracticeProfile.find().populate(
      "user",
      "name email",
    );
    return res
      .status(200)
      .json({ success: true, count: profiles.length, data: profiles });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createProfile ,getProfiles};
