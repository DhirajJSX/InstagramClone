const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const USER = mongoose.model("USER");
const requireLogin = require('../middleware/requireLogin.js');

require('dotenv').config(); 
const JwtSecret = process.env.JWT_SECRET;
router.get('/', (req, res) => {
    res.send("Hello Auth????");
});

router.post('/signup', async (req, res) => {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields." });
    }

    try {
        const existingUser = await USER.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            if (existingUser.email === email) {
                return res.status(422).json({ error: "User already exists with this email." });
            }
            if (existingUser.userName === userName) {
                return res.status(422).json({ error: "User already exists with this username." });
            }
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new USER({
            name,
            userName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        // ✅ **Token Generate Karo**
        const token = jwt.sign({ _id: savedUser._id }, JwtSecret, { expiresIn: '7d' });

        res.status(201).json({
            message: "User registered successfully.",
            token, // ✅ Yeh token response me milega
            user: {
                _id: savedUser._id,
                name: savedUser.name,
                userName: savedUser.userName,
                email: savedUser.email
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error." });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: "Please add email and password." });
        }

        const savedUser = await USER.findOne({ email });

        if (!savedUser) {
            return res.status(422).json({ error: "Invalid email or password." });
        }

        const match = await bcrypt.compare(password, savedUser.password);

        if (!match) {
            return res.status(422).json({ error: "Invalid email or password." });
        }

        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is missing in .env file");
            return res.status(500).json({ error: "Server error. Try again later." });
        }

        const token = jwt.sign({ _id: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // 🛠 FIXED: Remove duplicate `email` declaration
        const userInfo = {
            _id: savedUser._id,
            name: savedUser.name,
            email: savedUser.email,  // ✅ No re-declaration now!
            userName: savedUser.userName
        };

        res.status(200).json({
            message: "Signed in Successfully",
            token,
            user: userInfo
        });

    } catch (err) {
        console.error("❌ Login Error:", err.message || err);
        res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
});

module.exports = router;
