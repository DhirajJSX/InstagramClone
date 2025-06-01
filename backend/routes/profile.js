const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');

const USER = mongoose.model("USER");
const ProfileModel = mongoose.model("profileModel");
const POST = mongoose.model("POST");

// Get logged-in user's profile
router.get('/profile', requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user excluding password
    const user = await USER.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Find profile linked to user
    let profile = await ProfileModel.findOne({ userId }).populate('userId', 'userName email');

    // If profile doesn't exist, create a default one
    if (!profile) {
      const newProfile = new ProfileModel({
        userId,
        bio: "This user has not added a bio yet.",
        profileImage: "https://via.placeholder.com/150",
        link: "No Link Yet"
      });

      profile = await newProfile.save();
    }

    res.json({ user, profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch profile data" });
  }
});

// Update logged-in user's profile
router.post('/profile', requireLogin, async (req, res) => {
  try {
    const userId = req.user._id;
    const { bio, website, location, profileImage } = req.body;  // Added profileImage update option

    let profile = await ProfileModel.findOne({ userId });

    if (!profile) {
      // Create new profile if none exists
      profile = new ProfileModel({
        userId,
        bio: bio || "This user has not added a bio yet.",
        link: website || "No Link Yet",
        location: location || "",
        profileImage: profileImage || "https://via.placeholder.com/150",
      });
    } else {
      // Update existing profile fields if provided
      if (bio !== undefined) profile.bio = bio;
      if (website !== undefined) profile.link = website;
      if (location !== undefined) profile.location = location;
      if (profileImage !== undefined) profile.profileImage = profileImage;
    }

    const savedProfile = await profile.save();
    res.json({ message: "Profile updated successfully", profile: savedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get user profile by username (for public profile URLs)
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    const user = await USER.findOne({ userName: username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    const profile = await ProfileModel.findOne({ userId: user._id })
      .populate('userId', 'userName email profileImage');

    const postCount = await POST.countDocuments({ postedBy: user._id });
    const posts = await POST.find({ postedBy: user._id }).sort({ createdAt: -1 });

    res.json({ user, profile, postCount, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
