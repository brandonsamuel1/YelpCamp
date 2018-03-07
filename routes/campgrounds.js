const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

router.get("/", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/campgrounds", {campgrounds: allCampgrounds});
    }
  })
});


router.post("/", middleware.isLoggedIn, function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let author = {id: req.user._id, username: req.user.username}
  let newCampground = {name: name, image: image, description: desc, author: author}
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});


router.get("/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});


router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds/show", {campground: foundCampground});
    }
  })
});


router.get("/:id/edit", middleware.ownCampground, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    res.render("campgrounds/edit", {campground: foundCampground});
  });
});


router.put("/:id", middleware.ownCampground, function(req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
    if(err){
      res.redirect("/campgrounds");
    } else {
      req.flash("success", "Campground Updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});


router.delete("/:id", middleware.ownCampground, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
});


// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login");
// };

// function ownCampground(req, res, next){
//   if(req.isAuthenticated()){
//     Campground.findById(req.params.id, function(err, foundCampground){
//       if(err){
//         res.redirect("/campgrounds");
//       } else {
//         if(foundCampground.author.id.equals(req.user._id)){
//           next();
//         } else {
//           res.redirect("back");
//         }
//       }
//     });
//   } else {
//     res.redirect("back");
//   }
// }

module.exports = router;