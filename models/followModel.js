const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
  follower_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User who is following
  player_card_id: { type: mongoose.Schema.Types.ObjectId, ref: "PlayerCard", required: true }, // Player card being followed
});

const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;
