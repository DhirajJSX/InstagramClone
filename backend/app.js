const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";
const frontendUrl = isProduction ? process.env.FRONTEND_URL : "http://192.168.62.111:5174";

const corsOptions = {
  origin: frontendUrl,
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", frontendUrl);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

require("./models/model");
require("./models/userPost");
require("./models/profileModel");

app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));

app.get("/", (req, res) => {
  res.send("🚀 Instagram Clone Backend is Live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
