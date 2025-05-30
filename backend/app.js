require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUrl = process.env.MONGO_URI;
const frontendUrl = process.env.FRONTEND_URL;

// ✅ Setup CORS
const corsOptions = {
  origin: frontendUrl || "*",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ Extra CORS headers (optional but helps)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendUrl || "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

// ✅ JSON parsing middleware
app.use(express.json());

// ✅ Models
require("./models/model");
require("./models/userPost");
require("./models/profileModel");

// ✅ Routes
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));

// ✅ MongoDB connection
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

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Instagram Clone Backend is Live!");
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
