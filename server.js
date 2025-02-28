const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const scheduleRoutes = require("./routes/scheduleRoutes");
const userRoutes = require("./routes/userRoutes"); // User routes
const playerCardRoutes = require("./routes/playerCardRoutes");  // Player card-related routes
const followRoutes = require("./routes/followRoutes");  // Follow-related routes

const app = express();

// Middleware
app.use(cors());  // Enable CORS for React frontend
app.use(express.json());  // Parse incoming JSON requests
app.use(express.static('public')); // Serve static files from 'public' folder

const PORT = 5001;

// Connect to MongoDB (for user data)
mongoose.connect("mongodb://localhost:27017/sheplaysfootball")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Favicon route (avoids warning)
app.get("/favicon.ico", (req, res) => res.status(204));

// Use the user routes
app.use("/api/", userRoutes);  // Add user-related routes

// Use schedule routes
app.use("/api/", scheduleRoutes);  // Add schedule routes

// Use follow routes
app.use("/api/follow", followRoutes);

// Use player card routes
app.use("/api/player-card", playerCardRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
