require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;
const mongoUrl = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

require('./models/model');
require('./models/userPost.js');
require('./models/profileModel.js');

app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));

mongoose.connect(mongoUrl)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
