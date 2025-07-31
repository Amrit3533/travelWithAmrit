const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing");

module.exports.postMethodReview =  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    
    // CRITICAL FIX: Assign the author of the review
    // This assumes req.user is populated by Passport.js middleware (which should be handled in app.js)
    newReview.author = req.user._id; 

    // Push the full newReview object (or just its ID if you prefer to save first and then push)
    // Given your Listing schema's `reviews` array stores ObjectIds, pushing newReview._id is correct
    listing.reviews.push(newReview._id); 

    await newReview.save(); // Save the review document first
    await listing.save();   // Then save the listing with the new review's ID

    req.flash("success", "New Review Added");
    res.redirect(`/listings/${listing._id}`);
    console.log("review added");
})

module.exports.deleteReviewRoute = wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    // $pull operator removes the reviewId from the reviews array in the Listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId); // Delete the actual review document
    req.flash("success", "Review Deleted");
    res.redirect(`/listings/${id}`);
})