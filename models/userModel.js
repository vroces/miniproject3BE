const mongoose = require("mongoose");

// Define the schema for users
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  full_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ["Player", "Coach", "Fan"], default: "Player" }, // Add the role field
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
