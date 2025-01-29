// routes/profile.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const USER = mongoose.model("USER");
const ProfileModel = mongoose.model("profileModel");
router.get('/profile', requireLogin, (req, res) => {
  const userId = req.user._id;

  // Find the user and populate profile details
  USER.findById(userId)
    .select("-password")  // Exclude password field
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Try to find the profile for the user
      ProfileModel.findOne({ userId: userId })
        .populate('userId', 'username email') // Populate user details (adjust fields as needed)
        .then(profile => {
          if (!profile) {
            // If profile is not found, create a new one
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
            // If profile exists, return the profile
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

router.post('/profile', requireLogin, (req, res) => {
    const userId = req.user._id;
    const { bio, website, location } = req.body;
})
module.exports = router;
