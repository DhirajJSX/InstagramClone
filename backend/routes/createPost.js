const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

// Route: Create a New Post
router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;

  // Validate input fields
  if (!body || !pic) {
    return res.status(422).json({ error: "Please provide all required fields" });
  }

  const post = new POST({
    body,
    image: pic, // Using 'image' for clarity
    postedBy: req.user, // Attach user info
  });

  post
    .save()
    .then((result) => {
      // Populate postedBy field after saving
      return POST.findById(result._id)
        .populate("postedBy", "_id name userName email")
        .then((populatedPost) => {
          res.json({ post: populatedPost });
        });
    })
    .catch((err) => {
      console.error("Error creating post:", err);
      res.status(500).json({ error: "Failed to create post" });
    });
});

// Route: Get All Posts
router.get("/allposts", (req, res) => {
  POST.find()
    .populate("postedBy", "_id name") // Populate postedBy field
    .then((posts) => {
    //   if (!posts.length) {
    //     return res.status(404).json({ error: "No posts found." });
    //   }
      res.json(posts);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
    //   res.status(500).json({ error: "Failed to fetch posts." });
    });
});

module.exports = router;
