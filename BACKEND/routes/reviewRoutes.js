const express = require("express");
const router = express.Router();

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    searchReviews,
} = require("../controllers/reviewController");

router.get("/", getReviews);

router.get("/search", searchReviews);

router.get("/:id", getReview);

router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

module.exports = router;