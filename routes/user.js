const express = require("express");
const router = express.Router();

const passport = require("passport");
const { savedredirectUrl } = require("../middleware.js");

const userController = require("../Controller/users.js");

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged Out Successfully.");
    res.redirect("/login");
  });
});

router
  .route("/signup")

  .get(userController.renderSignupform)

  .post(userController.signupFormPostMethod);

router
  .route("/login")

  .get(userController.loginRenderForm)

  .post(
    savedredirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    (req, res) => {
      req.flash("success", "Welcome Back to travelWithAmrit");
      let redirectUrl = res.locals.redirectUrl || "/listings";
      res.redirect(redirectUrl);
    }
  );


module.exports = router;
