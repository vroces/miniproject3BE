const PlayerCard = require("../models/playerCardModel");
const User = require("../models/userModel"); // Reference User model for user data

// Create a new player card
const createPlayerCard = async (req, res) => {
  const { profilePic, position, location, team, bio, user_id } = req.body;

  try {
    // Check if the user already has a player card
    const existingCard = await PlayerCard.findOne({ user_id });
    if (existingCard) {
      return res.status(400).json({ message: "Player card already exists" });
    }

    // Create new player card
    const newPlayerCard = new PlayerCard({
      user_id,
      profilePic,
      position,
      location,
      team,
      bio,
    });

    // Save the player card
    await newPlayerCard.save();

    res.status(201).json({ message: "Player card created successfully", newPlayerCard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update an existing player card
const updatePlayerCard = async (req, res) => {
  const { profilePic, position, location, team, bio } = req.body;

  try {
    const playerCard = await PlayerCard.findOne({ user_id: req.params.userId });

    if (!playerCard) {
      return res.status(404).json({ message: "Player card not found" });
    }

    // Update player card details
    playerCard.profilePic = profilePic || playerCard.profilePic;
    playerCard.position = position || playerCard.position;
    playerCard.location = location || playerCard.location;
    playerCard.team = team || playerCard.team;
    playerCard.bio = bio || playerCard.bio;

    await playerCard.save();

    res.status(200).json({ message: "Player card updated successfully", playerCard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get player card by user_id
const getPlayerCardByUserId = async (req, res) => {
  try {
    const playerCard = await PlayerCard.findOne({ user_id: req.params.userId });

    if (!playerCard) {
      return res.status(404).json({ message: "Player card not found" });
    }

    res.status(200).json(playerCard);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};



// Get all player cards
const getAllPlayerCards = async (req, res) => {
  try {
    const playerCards = await PlayerCard.find().populate("user_id", "full_name"); // Fetch user's name
    res.json(playerCards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching player cards" });
  }
};


  
module.exports = { createPlayerCard, updatePlayerCard, getPlayerCardByUserId, getAllPlayerCards };
