module.exports.isLoggedIn = (req, res, next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please Login to add new Listing");
        return res.redirect("/login");
    }
    next ();
}

module.exports.savedredirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){

        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}