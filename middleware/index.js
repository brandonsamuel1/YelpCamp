const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middlewareObj = {}

middlewareObj.ownCampground = function(req, res, next){
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground){
      if(err){
        req.flash("error", "Campground Not Found!");
        res.redirect("/campgrounds");
      } else {
        if(foundCampground.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You Do Not Have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You need to be Logged in!")
    res.redirect("back");
  }
};



middlewareObj.ownComment = function(req, res, next){
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
        res.redirect("back");
      } else {
        if(foundComment.author.id.equals(req.user._id)){
          next();
        } else {
          req.flash("error", "You Do Not Have Permission");
          res.redirect("back");
        }
      }
    });
  } else {
    req.flash("error", "You Need To Be Logged In");
    res.redirect("back");
  }
};




middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  req.flash("error", "Please Login!");
  res.redirect("/login");
};


module.exports = middlewareObj