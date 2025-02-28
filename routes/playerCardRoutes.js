const express = require("express");
const {
  createPlayerCard,
  updatePlayerCard,
  getPlayerCardByUserId,
  getAllPlayerCards,
} = require("../controllers/playerCardController");

const router = express.Router();

// Route to create a player card
router.post("/", createPlayerCard);

// Route to update a player card
router.put("/update/:userId", updatePlayerCard);

// Route to get player card by user_id
router.get("/:userId", getPlayerCardByUserId);

// Route to get all player cards
router.get("/", getAllPlayerCards);


module.exports = router;
