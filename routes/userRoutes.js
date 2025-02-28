const express = require("express");
const { registerUser, loginUser, updateUser, getUserById } = require("../controllers/userController");

const router = express.Router();

// Register route
router.post("/auth/register", registerUser);

// Login route
router.post("/auth/login", loginUser);

// Update user route
router.put("/auth/update/:userId", updateUser);

// Get user by ID route
router.get("/auth/user/:userId", getUserById);

module.exports = router;
