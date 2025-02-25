// routes/profile.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const USER = mongoose.model("USER");
const ProfileModel = mongoose.model("profileModel");
router.get('/profile', requireLogin, (req, res) => {
  const userId = req.user._id;

  USER.findById(userId)
    .select("-password")  
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      ProfileModel.findOne({ userId: userId })
        .populate('userId', 'username email') 
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

router.post('/profile', requireLogin, (req, res) => {
    const userId = req.user._id;
    const { bio, website, location } = req.body;
})
module.exports = router;
