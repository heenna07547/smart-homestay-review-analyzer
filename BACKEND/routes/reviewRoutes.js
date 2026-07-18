const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    getReviews,
    getReview,
    createReview,
    updateReview,
    deleteReview,
    searchReviews,
} = require("../controllers/reviewController");

// Public Routes
router.get("/search", searchReviews);

// Protected Routes
router.get("/", authMiddleware, getReviews);
router.get("/:id", authMiddleware, getReview);
router.post("/", authMiddleware, createReview);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;