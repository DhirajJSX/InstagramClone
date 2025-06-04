const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";


if (isProduction && !process.env.FRONTEND_URL) {
  console.error("❌ ERROR: FRONTEND_URL is not defined in environment!");
  process.exit(1);
}

const frontendUrl = isProduction
  ? process.env.FRONTEND_URL
  : "http://localhost:5173";

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


require("./models/model");
require("./models/userPost");
require("./models/profileModel");
// require('./models/Userhistory');

app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/profile"));
// app.use(require("./routes/userHistoryRoutes"))
app.get("/", (req, res) => {
  res.send("🚀 Instagram Clone Backend is Live!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
