const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const USER = mongoose.model('USER');
const { JwtSecret } = require('../key.js');

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JwtSecret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const { _id } = payload;
        USER.findById(_id).then(userData => {
            req.user = userData;
            next();
        }).catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        });
    });
};
