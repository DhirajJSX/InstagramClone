const mongoose = require("mongoose");
const { Schema } = mongoose;
const userPostSchema = new Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    // default: "no photo",
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "USER",
  },
});

mongoose.model("POST", userPostSchema);
