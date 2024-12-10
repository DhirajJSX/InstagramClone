const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const USER = mongoose.model("USER");


router.get('/', (req, res) => {
    res.send("Hello Auth????");
});

// router.post('/signup', (req, res) => {
//     const { name, userName, email, password } = req.body;

//     if (!name || !userName || !email || !password) {
//         return res.status(422).json({ error: "Please add all the fields." });
//     }

//     USER.findOne({ $or: [{ email }, { userName }] })
//         .then((existingUser) => {
//             if (existingUser) {
//                 if (existingUser.email === email) {
//                     return res.status(422).json({ error: "User already exists with this email." });
//                 }
//                 if (existingUser.userName === userName) {
//                     return res.status(422).json({ error: "User already exists with this username." });
//                 }
//             }
//             bcrypt.hash(password,12).then((hashedPassword)=>{
//                 const user = new USER({
//                     name,
//                     userName,
//                     email,
//                     password: hashedPassword
//                 });
    
//                 user.save()
//                     .then((savedUser) => {
//                         res.json({ message: "Saved successfully.", user: savedUser });
//                     })
//                     .catch((err) => {
//                         console.error(err);
//                         res.status(500).json({ error: "Failed to save the user." });
//                     });
//             })
//         })
//         .catch((err) => {
//             console.error(err);
//             res.status(500).json({ error: "Internal server error." });
//         });
// });



router.post('/signup', (req, res) => {
    // Log to check if email and other fields are coming correctly
    console.log(req.body);  // Check the incoming data from frontend

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
            }

            bcrypt.hash(password, 12).then((hashedPassword) => {
                const user = new USER({
                    name,
                    userName,
                    email, 
                    password: hashedPassword
                });

                user.save()
                    .then((savedUser) => {
                        res.json({ message: "Saved successfully.", user: savedUser });
                    })
                    .catch((err) => {
                        console.error(err);
                        res.status(500).json({ error: "Failed to save the user." });
                    });
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Internal server error." });
        });
});


router.post('/', (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({ error: "Please add email and password." });
    }
    
    USER.findOne({ email: email }).then((saveUser) => {
        if(!savedUser){
            return res.status(422).json({ error: "User not found with this email." });
        }
        console.log(saveUser);
        
    })

})

module.exports = router;
