const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const expressError = require("../utils/expressError.js");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
// const upload = multer({dest: "C:/Volume D/Codes/Mega_Project/Uploads"})
const upload = multer({ storage });
//Controllers
const ListingsController = require("../Controller/listings.js");

//validate listing
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  // console.log(result);
  if (error) {
    throw new expressError(400, error);
  } else {
    next();
  }
};

//create new listing route
router.get("/new", isLoggedIn, ListingsController.renderNewForm);

//edit route
router.get("/:id/edit", isLoggedIn, ListingsController.renderEditForm);

router
  .route("/")
  //index route get request
  .get(ListingsController.index)
  // index route get request
  .post(
    upload.single("listing[image]"),
    validateListing,
    ListingsController.createListing
  );

router
  .route("/:id")
  //show route
  .get(ListingsController.showListings)
  //update route
  .put(isLoggedIn,  upload.single("listing[image]"), validateListing, ListingsController.postEditListingForm)
  //delete route
  .delete(isLoggedIn, ListingsController.deleteRoute);

module.exports = router;
