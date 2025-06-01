const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// In production, FRONTEND_URL must be set. Exit if missing.
if (isProduction && !process.env.FRONTEND_URL) {
  console.error("❌ ERROR: FRONTEND_URL is not defined in environment!");
  process.exit(1);
}

// Use the provided FRONTEND_URL in production, otherwise use your local dev address
const frontendUrl = isProduction
  ? process.env.FRONTEND_URL
  : "http://192.168.62.111:5174";

// Configure CORS via the cors package (handles preflight automatically)
app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// Load your models
require("./models/model");
require("./models/userPost");
require("./models/profileModel");

// Mount your route files
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));

app.get("/", (req, res) => {
  res.send("🚀 Instagram Clone Backend is Live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
