const Follow = require("../models/followModel");
const PlayerCard = require("../models/playerCardModel");
const mongoose = require("mongoose");  // Add this line if it's missing



const followPlayerCard = async (req, res) => {
  const { follower_id, player_card_id } = req.body;
  console.log("Received Data:", { follower_id, player_card_id });

  try {
    // Ensure player_card_id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(player_card_id)) {
      return res.status(400).json({ message: "Invalid Player Card ID format" });
    }

    // Check if player card exists
    const playerCard = await PlayerCard.findById(player_card_id);
    if (!playerCard) {
      console.log("Player Card Not Found:", player_card_id);
      return res.status(404).json({ message: "Player card not found" });
    }

    // Check if the user is already following the player card
    const existingFollow = await Follow.findOne({ follower_id, player_card_id });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this player card" });
    }

    // Create a new follow record
    const follow = new Follow({ follower_id, player_card_id });
    await follow.save();

    res.status(201).json({ message: "Player card followed successfully", follow });
  } catch (error) {
    console.error("Follow Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


const unfollowPlayerCard = async (req, res) => {
  const { followerId, playerCardId } = req.params;
  console.log("Received IDs:", { followerId, playerCardId });  // Log received IDs

  try {
    // Convert to ObjectId using `new` keyword
    const followerObjectId = new mongoose.Types.ObjectId(followerId);
    const playerCardObjectId = new mongoose.Types.ObjectId(playerCardId);

    console.log("Converted ObjectIds:", { followerObjectId, playerCardObjectId });  // Log converted ObjectIds

    // Try to find and delete the follow relationship
    const follow = await Follow.findOneAndDelete({
      follower_id: followerObjectId,
      player_card_id: playerCardObjectId,
    });

    if (!follow) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }

    res.status(200).json({ message: "Player card unfollowed successfully" });
  } catch (error) {
    console.error("Unfollow Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get all follows
const getAllFollows = async (req, res) => {
  try {
    const follows = await Follow.find();
    res.status(200).json(follows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all followers for a specific player card
const getAllFollowsForPlayer = async (req, res) => {
  const { playerCardId } = req.params;

  try {
    const follows = await Follow.find({ player_card_id: playerCardId });
    res.status(200).json(follows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all follows for a specific user
const getAllFollowsForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const follows = await Follow.find({ follower_id: userId });
    res.status(200).json(follows);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update exports to include the new functions
module.exports = { followPlayerCard, unfollowPlayerCard, getAllFollows, getAllFollowsForPlayer, getAllFollowsForUser };

