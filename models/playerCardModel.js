const mongoose = require("mongoose");

const playerCardSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User
  profilePic: { type: String },
  position: { type: String },
  location: { type: String },
  team: { type: String },
  bio: { type: String },
  created_at: { type: Date, default: Date.now },
});

const PlayerCard = mongoose.model("PlayerCard", playerCardSchema);

module.exports = PlayerCard;
