const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");

const USER = mongoose.model("USER");
const ProfileModel = mongoose.model("profileModel");
const POST = mongoose.model("POST");

router.get("/profile", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await USER.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    let profile = await ProfileModel.findOne({ userId }).populate(
      "userId",
      "userName email"
    );
    if (!profile) {
      const newProfile = new ProfileModel({
        userId,
        bio: "",
        profileImage: "",
        link: "",
      });

      profile = await newProfile.save();
    }

    res.json({ user, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

router.post("/profile", requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, website, location, profileImage } = req.body; 

    let profile = await ProfileModel.findOne({ userId });

    if (!profile) {
      profile = new ProfileModel({
        userId,
        bio: bio || "",
        link: website || "",
        location: location || "",
        profileImage: profileImage || "",
      });
    } else {
      if (bio !== undefined) profile.bio = bio;
      if (website !== undefined) profile.link = website;
      if (location !== undefined) profile.location = location;
      if (profileImage !== undefined) profile.profileImage = profileImage;
    }
    const savedProfile = await profile.save();
    res.json({
      message: "Profile updated successfully",
      profile: savedProfile,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});



router.get("/user/:username", async (req, res) => {
  try {
    const username = req.params.username;
    const user = await USER.findOne({ userName: username }).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });
    const profile = await ProfileModel.findOne({ userId: user._id }).populate(
      "userId",
      "userName email profileImage"
    );
    const postCount = await POST.countDocuments({ postedBy: user._id });
    const posts = await POST.find({ postedBy: user._id }).sort({
      createdAt: -1,
    });

    res.json({ user, profile, postCount, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
