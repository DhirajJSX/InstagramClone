require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "*", 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

require("./models/model");
require("./models/userPost");
require("./models/profileModel");


app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

connectDB();
 
app.get("/ping", (req, res) => {
  res.send("Server is alive!");
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});


