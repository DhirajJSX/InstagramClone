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

router.post('/signup', (req, res) => {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
        return res.status(422).json({ error: "Please add all the fields." });
    }

    USER.findOne({ $or: [{ email }, { userName }] })
        .then((existingUser) => {
            if (existingUser) {
                if (existingUser.email === email) {
                    return res.status(422).json({ error: "User already exists with this email." });
                }
                if (existingUser.userName === userName) {
                    return res.status(422).json({ error: "User already exists with this username." });
                }
                return;
            }

            bcrypt.hash(password, 12)
                .then((hashedPassword) => {
                    const user = new USER({
                        name,
                        userName,
                        email,
                        password: hashedPassword
                    });

                    user.save()
                        .then((savedUser) => {
                            res.json({ message: "User registered successfully.", user: savedUser });
                        })
                        .catch((err) => {
                            console.error(err);
                            res.status(500).json({ error: "Failed to save the user." });
                        });
                })
                .catch(err => console.error(err));
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error." });
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please add email and password." });
    }

    USER.findOne({ email: email })
        .then((savedUser) => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email or password." });
            }

            bcrypt.compare(password, savedUser.password)
                .then((match) => {
                    if (!match) {
                        return res.status(422).json({ error: "Invalid email or password." });
                    }
                    const token = jwt.sign({ _id: savedUser.id }, JwtSecret, { expiresIn: '7d' });
                    const { _id, name, email, userName } = savedUser;
                    res.status(200).json({
                        message: "Signed in Successfully",
                        token,
                        user: { _id, name, email, userName }
                    });
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ error: "Failed to authenticate user." });
                });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error." });
        });
});

module.exports = router;
