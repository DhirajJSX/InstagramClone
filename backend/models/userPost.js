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
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER"
    }],
    comments: [{
      comment:{type: String},
      postedBy:{type: mongoose.Schema.Types.ObjectId, ref:"USER"},
      updatedAt: {type: Date, default: Date.now },
      likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER"
      }]
    }]
  },
  { timestamps: true }
);

mongoose.model("POST", userPostSchema);
 