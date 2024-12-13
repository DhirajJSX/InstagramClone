const mongoose = require("mongoose");
const { Schema } = mongoose;
const userPostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "no photo",
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, // Correct usage
    ref: "USER", // Reference to the USER model
  },
});

mongoose.model("POST", userPostSchema);
