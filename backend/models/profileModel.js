const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  bio: {
    type: String,
    default: "This user has not added a bio yet.",
  },
  profileImage: {
    type: String,
    default: "https://res.cloudinary.com/igcloudclone/image/upload/v1748871619/noImageProfile_emejna.jpg",
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
  location: {
    type: String,
    default: "",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'USER',
    required: true,
  },
}, { timestamps: true });

// ✅ Export the model
module.exports = mongoose.model("profileModel", profileSchema);
