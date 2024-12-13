const jwt = require('jsonwebtoken')
const {JwtSecret} = require('../key')
const mongoose = require('mongoose')
const USER = mongoose.model("USER")
module.exports = (req, res, next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error: "You must be logged in to access this route."})
    }
    // res.json("ok")
    const token = authorization.replace("Bearer ","")
    jwt.verify(token, JwtSecret, (err, payload) => {    
        if(err){
            return res.status(401).json({error: "Token is not valid."})
        }
        const {_id}= payload
        USER.findById(_id).then(userData => {
            console.log(userData);
            
        })
    })
    next();
} 