const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.renderSignupform = (req, res) => {
  res.render("users/signup.ejs");
};
module.exports.signupFormPostMethod =
 wrapAsync(async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "User is successfully registered");
      res.redirect("/listings");
    });
  } catch (err) {
    req.flash("error", err.message);
    res.redirect("/signup");
  }
});

module.exports.loginRenderForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.loginPostMethod;
