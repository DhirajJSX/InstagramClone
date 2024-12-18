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
    like:{
      type: [mongoose.Schema.Types.ObjectId],
      ref: "USER",
    }
  },
  { timestamps: true }
);

mongoose.model("POST", userPostSchema);
