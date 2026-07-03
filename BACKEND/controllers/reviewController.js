const Review = require("../models/reviewModel");
const Activity = require("../models/Activity");
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();

    res.status(200).json({
      success: true,
      message: "Get all reviews",
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createReview = async (req, res) => {
  try {
    const review = await Review.create(req.body);
    await Activity.create({
      action: "CREATE",
      guestName: review.guestName,
      hotelName: review.hotelName,
      rating: review.rating,
      review: review.review,
    });

    res.status(201).json({
      success: true,
      message: "Review created",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
};

exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    // Save activity
    await Activity.create({
      action: "UPDATE",
      guestName: review.guestName,
      hotelName: review.hotelName,
      rating: review.rating,
      review: review.review,
    });

    res.status(200).json({
      success: true,
      message: "Review updated",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    await Activity.create({
      action: "DELETE",
      guestName: review.guestName,
      hotelName: review.hotelName,
      rating: review.rating,
      review: review.review,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.searchReviews = async (req, res) => {
  try {
    const { hotelName } = req.query;

    const reviews = await Review.find({
      hotelName: { $regex: hotelName, $options: "i" },
    });

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};