const express = require("express");
const { registerUser, loginUser, updateUser, getUserById } = require("../controllers/userController");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// Update user route
router.put("/update/:userId", updateUser);

// Get user by ID route
router.get("/user/:userId", getUserById);

module.exports = router;
