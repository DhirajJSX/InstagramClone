const mongoose = require('mongoose');

const profileModel = new mongoose.Schema({
  bio: {
    type: String,
    default: "This user has not added a bio yet.",
  },
  profileImage: {
    type: String,
    default: "https://i.sstatic.net/GqoVi.png",
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  link: {
    type: String,
    default: "No Link Yet",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true,
  },
}, { timestamps: true });

mongoose.model("profileModel", profileModel);
