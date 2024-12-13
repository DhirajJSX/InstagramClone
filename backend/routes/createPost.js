const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const POST = mongoose.model('POST');

// Route to create a post
router.post('/createPost', requireLogin, (req, res) => {
    const { title, body } = req.body;

    if (!title || !body) {
        return res.status(422).json({ error: "Please provide all required fields" });
    }

    const post = new POST({
        title,
        body,
        postedBy: req.user // Attach the user object to postedBy
    });

    post.save()
        .then(result => {
            return POST.findById(result._id)
                .populate('postedBy', '_id name userName email') // Populate the postedBy field
                .then(populatedPost => {
                    res.json({ post: populatedPost });
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Failed to create post" });
        });
});

module.exports = router;
