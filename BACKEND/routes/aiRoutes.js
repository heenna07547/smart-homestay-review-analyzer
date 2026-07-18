const express = require("express");
const router = express.Router();

const { summarizeReview } = require("../controllers/aiController");

router.post("/summarize", summarizeReview);

module.exports = router;