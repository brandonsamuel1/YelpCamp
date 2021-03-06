const express = require("express");
const router = express.Router({mergeParams: true});
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    } else {
      res.render("comments/new", {campground: campground});
    }
  })
});


router.post("/", middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something Went Wrong! :(");
          console.log(err);
        } else {
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.save();
          campground.comments.push(comment._id);
          campground.save();
          req.flash("success", "Successfully Added Comment");
          res.redirect("/campgrounds/" + campground._id);
        }
      })
    }
  })
});


router.get("/:comment_id/edit", middleware.ownComment, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });
});


router.put("/:comment_id", middleware.ownComment, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment Updated");
      res.redirect("/campgrounds/" + req.params.id);
    }
  })
});


router.delete("/:comment_id", middleware.ownComment, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment Deleted");
      res.rendirect("/campgrounds/" + req.params.id);
    }
  });
});

// function isLoggedIn(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//   }
//   res.redirect("/login");
// };


// function ownComment(req, res, next){
//   if(req.isAuthenticated()){
//     Comment.findById(req.params.comment_id, function(err, foundComment){
//       if(err){
//         res.redirect("back");
//       } else {
//         if(foundComment.author.id.equals(req.user._id)){
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
