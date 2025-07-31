const express = require("express");
const router = express.Router({ mergeParams: true });
// const wrapAsync = require("../utils/wrapAsync.js");
const expressError = require("../utils/expressError.js");
const { reviewSchema } = require("../schema.js");

const { isLoggedIn } = require("../middleware.js");

const reviewController= require('../Controller/reviews.js');

//validate review
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  // console.log(result);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

//reviews POST route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  (reviewController.postMethodReview)
);

//review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  (reviewController.deleteReviewRoute)
);

module.exports = router;
