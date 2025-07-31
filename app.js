if(process.env.NODE_ENV != 'production'){
  const dotEnv = require('dotenv').config();
}
// console.log(process.env.SECRET);
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");//helps to create templates
const expressError = require("./utils/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash"); // Correct: Keep this one
const passport = require("passport");
const LocalStrategy = require("passport-local");

const UserRouter = require("./models/user.js"); // Assuming this is your User model, not a router
const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
// const { error } = require('console'); // This import is not used and can be removed
const dbUrl = process.env.ATLASDB_URL;

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

const store = MongoStore.create({
  mongoUrl : dbUrl,
  crypto : {
    secret : process.env.SECRET,
  },
  touchAfter: 24 *3600,
});

store.on("error",()=>{
  console.log("Error in MongodDb Session Store");
});

const sessionOptions = {
  store,
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized:true,
  cookie : {
    expires : Date.now() +7 * 24 * 60 *60 * 1000,
    maxAge : 7 * 24 * 60 *60 * 1000,
    httpOnly : true,
  },
};
app.use(session(sessionOptions));

app.use(flash()); // This line correctly initializes flash middleware

// --- Passport.js Setup ---
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(UserRouter.authenticate())); // Assuming UserRouter is your User model
passport.serializeUser(UserRouter.serializeUser());
passport.deserializeUser(UserRouter.deserializeUser());

app.use((req, res, next) => {
    const flashedSuccess = req.flash('success');
    const flashedError = req.flash('error');

    res.locals.success = flashedSuccess;
    res.locals.error = flashedError;
    res.locals.currentUser = req.user; // Set by Passport.js
    res.locals.searchQuery = req.query.q || "";
    res.locals.activeCategory = req.query.category || null;

    next();
});

// connecting to databse
async function main() {
  await mongoose.connect(dbUrl);
};

//calling the main function
main()
  .then(() => {
    console.log("Cloud Database connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.redirect("/listings");
});

// --- Route Middlewares ---
app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter); 
app.all("*", (req, res, next) => {
  next(new expressError(404, "Page not found...!!"));
});

// Middleware for server-side validation / Generic error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went Wrong!!" } = err;
  res.status(statusCode).render("error.ejs", { err }); 
});

app.listen(process.env.port, () => {
  console.log(`Server is listening on port ${process.env.port}`);
});