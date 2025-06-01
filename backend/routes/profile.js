const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const USER = mongoose.model("USER");
const ProfileModel = mongoose.model("profileModel");
const POST = mongoose.model("POST");
// Get current logged-in user's profile
router.get('/profile', requireLogin, (req, res) => {
  const userId = req.user._id;

  USER.findById(userId)
    .select("-password")
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      ProfileModel.findOne({ userId: userId })
        .populate('userId', 'userName email')
        .then(profile => {
          if (!profile) {
            const newProfile = new ProfileModel({
              userId: userId,
              bio: "This user has not added a bio yet.",
              profileImage: "https://via.placeholder.com/150",
              link: "No Link Yet"
            });

            newProfile.save()
              .then(createdProfile => {
                res.json({ user, profile: createdProfile });
              })
              .catch(err => {
                console.error(err);
                res.status(500).json({ error: "Failed to create profile" });
              });
          } else {
            res.json({ user, profile });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: "Failed to fetch profile data" });
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: "Failed to fetch user profile" });
    });
});

// Update logged-in user's profile
router.post('/profile', requireLogin, async (req, res) => {
  const userId = req.user._id;
  const { bio, website, location } = req.body;

  try {
    let profile = await ProfileModel.findOne({ userId });

    if (!profile) {
      profile = new ProfileModel({
        userId,
        bio: bio || "This user has not added a bio yet.",
        link: website || "No Link Yet",
        location: location || "",
        profileImage: "https://via.placeholder.com/150",
      });
    } else {
      // Update fields if provided
      if (bio !== undefined) profile.bio = bio;
      if (website !== undefined) profile.link = website;
      if (location !== undefined) profile.location = location;
    }

    const savedProfile = await profile.save();
    res.json({ message: "Profile updated successfully", profile: savedProfile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// Get user profile by username (for URL like /user/:username)
router.get('/user/:username', async (req, res) => {
  try {
    const username = req.params.username;

    const user = await USER.findOne({ userName: username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const profile = await ProfileModel.findOne({ userId: user._id })
      .populate('userId', 'userName email');

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    // Count posts made by this user
    const postCount = await POST.countDocuments({ postedBy: user._id });

    // Optionally: fetch actual posts if you want
    // const posts = await POST.find({ postedBy: user._id }).sort({ createdAt: -1 });

    res.json({ user, profile, postCount /*, posts*/ });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
