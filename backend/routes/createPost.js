const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin");
const POST = mongoose.model("POST");

router.post("/createPost", requireLogin, (req, res) => {
  const { body, pic } = req.body;
  if (!body || !pic) {
    return res
      .status(422)
      .json({ error: "Please provide all required fields" });
  }
  const post = new POST({
    body,
    image: pic,
    postedBy: req.user,
    likes: [],
  });
  post
    .save()
    .then((result) => {
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

router.get("/allposts", (req, res) => {
  POST.find()
    .populate("postedBy", "_id name userName")
    .sort({ createdAt: -1 })
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

router.get("/me", requireLogin, (req, res) => {
  POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name userName")
    .then((myposts) => {
      res.json(myposts);
    });
});

router.get("/searchuser", (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(422).json({ error: "Search query is required" });
  }

  const regex = new RegExp(query, "i");
  mongoose
    .model("USER")
    .find({
      $or: [{ name: { $regex: regex } }, { userName: { $regex: regex } }],
    })
    .select("_id name userName email")
    .limit(10)
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

router.put("/likes", requireLogin, async (req, res) => {
  try {
    const updatedPost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ updatedPost });
  } catch (err) {
    console.error("Error liking post:", err);
    res.status(422).json({ error: err.message || "Failed to like the post" });
  }
});

router.put("/unlikes", requireLogin, async (req, res) => {
  try {
    const updatedPost = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true,
      }
    ).exec();

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ updatedPost });
  } catch (err) {
    console.error("Error unliking post:", err);
    res.status(422).json({ error: err.message || "Failed to unlike the post" });
  }
});

router.put("/comment", requireLogin, async (req, res) => {
  const comment = {
    comment: req.body.text,
    postedBy: req.user._id,
    updatedAt: new Date(),
  };

  try {
    const result = await POST.findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comments: comment },
      },
      {
        new: true,
      }
    ).populate("comments.postedBy", "_id name UserName");
    res.json({ result });
    console.log(result);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

module.exports = router;
