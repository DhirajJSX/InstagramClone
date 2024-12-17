// models/userPost.js
const mongoose = require("mongoose");

const userPostSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "USER",
      default: [],
    },
  },
  { timestamps: true }
);

mongoose.model("POST", userPostSchema);
