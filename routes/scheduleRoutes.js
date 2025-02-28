const express = require("express");
const { fetchSchedule } = require("../controllers/scheduleController");

const router = express.Router();

router.get("/games", fetchSchedule);

module.exports = router;
