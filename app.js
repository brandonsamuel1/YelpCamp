const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");


const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

let Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Granite Hill", image: "https://source.unsplash.com/h4bBVo_CpqQ", description: "This is a huge campsite!"
//   }, function(err, campground){
//   if(err){
//     console.log(err)
//   } else {
//     console.log("CREATED CAMPGROUND");
//     console.log(campground);
//   }
// })



app.get("/", function(req, res){
  res.render("landing");
});


app.get("/campgrounds", function(req, res){
  Campground.find({}, function(err, allCampgrounds){
    if(err){
      console.log(err);
    } else {
      res.render("campgrounds", {campgrounds: allCampgrounds});
    }
  })
});


app.post("/campgrounds", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let desc = req.body.description;
  let newCampground = {name: name, image: image, description: desc}
  Campground.create(newCampground, function(err, newlyCreated){
    if(err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  })
});


app.get("/campgrounds/new", function(req, res){
  res.render("new");
});


app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  })
})


app.listen(3000, function(){
  console.log("YelpCamp Server has started...");
})