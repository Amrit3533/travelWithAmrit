const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  let filter = {};
  // searchQuery and activeCategory are now handled by res.locals middleware

  // --- Category Filter Logic ---
  if (req.query.category) {
    const validCategories = [
      "mountains",
      "arctic",
      "camping",
      "trending",
      "rooms",
      "iconic_Cities",
      "castles",
      "pools",
      "farms",
    ];
    if (validCategories.includes(req.query.category)) {
      filter.category = req.query.category;
    } else {
      console.warn(
        `Invalid category requested: "${req.query.category}". Showing all listings.`
      );
    }
  }

  // --- Search Bar Logic ---
  if (req.query.q) {
    // No need to set searchQuery here, it's already in res.locals
    let localSearchQuery = req.query.q.trim(); // Use a local variable for the filter construction

    if (localSearchQuery) {
      filter.$or = [
        { title: { $regex: localSearchQuery, $options: "i" } },
        { description: { $regex: localSearchQuery, $options: "i" } },
        { location: { $regex: localSearchQuery, $options: "i" } },
        { country: { $regex: localSearchQuery, $options: "i" } },
      ];
    }
  }

  const allListings = await Listing.find(filter);

  if (allListings.length === 0) {
  res.render("listings/index.ejs", {
    allListings,
    noResults: true,
  });
} else {
  res.render("listings/index.ejs", { allListings });
}
};

module.exports.renderNewForm = wrapAsync(async (req, res) => {
  res.render("listings/new.ejs");
});

module.exports.createListing = wrapAsync(async (req, res, next) => {
console.log("req.user (in createListing):", req.user);

  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.admin = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListiing = await newListing.save();
  console.log(savedListiing);
  req.flash("success", "New listing added..!!");
  res.redirect("/listings");

  // console.log(url,"-----",filename);
  // let {title , description, image, price, country, location} = req.body;
  // if(!newListing.title){
  //   throw new expressError(400, "Title is missing");
  // }
  // if(!newListing.location){
  //   throw new expressError(400, "location is missing");
  // }
  // if(!newListing.description){
  //   throw new expressError(400, "description is missing");
  // }
  // if(!newListing.price){
  //   throw new expressError(400, "description is missing");
  // }
  // if(!newListing.country){
  //   throw new expressError(400, "country is missing");
  // }
  // if(!newListing.image){
  //   throw new expressError(400, "Image url is missing");
  // }
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing Doesn't Exists!!");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_300");
  res.render("./listings/edit.ejs", { listing, originalImageUrl });
  req.flash("success", "Listing Updated Successfully.");
  // console.log(listing);
});

module.exports.postEditListingForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const updatedListing = new Listing(req.body.listing);
  if (!updatedListing) {
    req.flash("error", "Listing Doesn't Exists!!");
    res.redirect("/listings");
  }
  let newListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    newListing.image = { url, filename };
    await newListing.save();
  }
  req.flash("success", "Listing Updated Successfully.");
  res.redirect(`/listings/${id}`);
  // console.log(updatedListing);
});

module.exports.showListings = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("admin"); // Populate the 'admin' (owner) of the listing

  if (!listing) {
    req.flash("error", "Listing Doesn't Exists!!");
    return res.redirect("/listings"); // Added 'return' for good practice
  }
  // console.log(listing); // You can uncomment this temporarily to inspect the populated data
  res.render("./listings/show.ejs", {
    listing,
    mapToken: process.env.MAP_TOKEN,
  });
});

module.exports.deleteRoute = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted Successfully.");
  res.redirect(`/listings`);
});
