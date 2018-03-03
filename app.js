const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

let campgrounds = [
  {name: "Salmon Creek", image: "https://source.unsplash.com/K9olx8OF36A"},
  {name: "Granite Hill", image: "https://source.unsplash.com/h4bBVo_CpqQ"},
  {name: "Mountain Goat Rest", image: "https://source.unsplash.com/yOujaSETXlo"}
]


app.get("/", function(req, res){
  res.render("landing");
});


app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds});
});


app.post("/campgrounds", function(req, res){
  let name = req.body.name;
  let image = req.body.image;
  let newCampground = {name: name, image: image}
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});


app.get("/campgrounds/new", function(req, res){
  res.render("new");
})


app.listen(3000, function(){
  console.log("YelpCamp Server has started...");
})