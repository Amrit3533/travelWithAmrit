const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  comment: {
    type: String,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // This must match the name of your User model (e.g., in models/user.js)
  },
});

const Review = mongoose.model("Review", reviewSchema); // Changed 'review' to 'Review' for consistency (though 'review' works)
module.exports = Review; // Changed 'review' to 'Review' for consistency
