const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: activities,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;