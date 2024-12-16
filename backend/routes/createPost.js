const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

// Route: Create a New Post
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
    likes: [], // Initialize with an empty array for likes
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
// Route: Get All Posts (with Sorting)
router.get("/allposts", (req, res) => {
  POST.find()
    .populate("postedBy", "_id name userName") // Populate postedBy field
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
    .then((posts) => {
      if (!posts.length) {
        return res.status(404).json({ error: "No posts found." });
      }
      res.json(posts);
    })
    .catch((err) => {
      console.error("Error fetching posts:", err);
      res.status(500).json({ error: "Failed to fetch posts." });
    });
});


router.get('/me', requireLogin ,(req, res) => {
  POST.find({postedBy: req.user._id})
  .populate('postedBy', '_id name userName') // Populate postedBy field
  .then(myposts=>{
    res.json(myposts);
  })
  
})

// Like a post
// router.put("/like/:postId", requireLogin, (req, res) => {
//     const { postId } = req.params;
//     POST.findById(postId)
//       .then((post) => {
//         if (!post) {
//           return res.status(404).json({ error: "Post not found" });
//         }
  
//         // Check if the user has already liked the post
//         if (post.likes.includes(req.user._id)) {
//           return res.status(400).json({ error: "You already liked this post" });
//         }
  
//         // Add the user's ID to the likes array
//         post.likes.push(req.user._id);
  
//         // Save the updated post
//         post.save()
//           .then((updatedPost) => {
//             res.json({ post: updatedPost });
//           })
//           .catch((err) => {
//             console.error("Error liking post:", err);
//             res.status(500).json({ error: "Failed to like post" });
//           });
//       })
//       .catch((err) => {
//         console.error("Error finding post:", err);
//         res.status(500).json({ error: "Failed to find post" });
//       });
//   });
  
//   // Unlike a post
//   router.put("/unlike/:postId", requireLogin, (req, res) => {
//     const { postId } = req.params;
//     POST.findById(postId)
//       .then((post) => {
//         if (!post) {
//           return res.status(404).json({ error: "Post not found" });
//         }
  
//         // Check if the user has not liked the post
//         if (!post.likes.includes(req.user._id)) {
//           return res.status(400).json({ error: "You have not liked this post" });
//         }
  
//         // Remove the user's ID from the likes array
//         post.likes = post.likes.filter(
//           (userId) => userId.toString() !== req.user._id.toString()
//         );
  
//         // Save the updated post
//         post.save()
//           .then((updatedPost) => {
//             res.json({ post: updatedPost });
//           })
//           .catch((err) => {
//             console.error("Error unliking post:", err);
//             res.status(500).json({ error: "Failed to unlike post" });
//           });
//       })
//       .catch((err) => {
//         console.error("Error finding post:", err);
//         res.status(500).json({ error: "Failed to find post" });
//       });
//   });
  
// Route: Search for Users
router.get("/searchuser", (req, res) => {
  const { query } = req.query; // Accept search term in query parameter (e.g., ?query=john)

  if (!query) {
    return res.status(422).json({ error: "Search query is required" });
  }

  // Search for users by name or userName (case-insensitive)
  const regex = new RegExp(query, 'i'); // 'i' makes it case-insensitive

  mongoose.model("USER").find({
    $or: [
      { name: { $regex: regex } },
      { userName: { $regex: regex } }
    ]
  })
    .select("_id name userName email") // Select specific fields to return
    .limit(10) // Optional: limit the number of results
    .then((users) => {
      if (users.length === 0) {
        return res.status(404).json({ error: "No users found" });
      }
      res.json({ users });
    })
    .catch((err) => {
      console.error("Error searching users:", err);
      res.status(500).json({ error: "Failed to search users" });
    });
});

module.exports = router;
