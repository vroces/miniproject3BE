const express = require("express");
const {
  followPlayerCard,
  unfollowPlayerCard,
  getAllFollowsForPlayer,
  getAllFollowsForUser,
  getAllFollows,

} = require("../controllers/followController");

const router = express.Router();

// Follow a player card
router.post("/follow", followPlayerCard);

// Unfollow a player card
router.delete("/unfollow/:followerId/:playerCardId", unfollowPlayerCard);

// Get all followers for a specific player card
router.get("/player/:playerCardId", getAllFollowsForPlayer);

// Get all follows for a specific user
router.get("/user/:userId", getAllFollowsForUser);

// Get all follows 
router.get("/", getAllFollows);

module.exports = router;
