const express = require("express");
const app = express();

app.set("view engine", "ejs");


app.get("/", function(req, res){
  res.render("landing");
})

app.get("/campgrounds", function(req, res){
  let campgrounds = [
    {name: "Salmon Creek", image: "https://source.unsplash.com/K9olx8OF36A"},
    {name: "Granite Hill", image: "https://source.unsplash.com/h4bBVo_CpqQ"},
    {name: "Mountain Goat Rest", image: "https://source.unsplash.com/yOujaSETXlo"}
  ]
  res.render("campgrounds", {campgrounds: campgrounds});
})


app.listen(3000, function(){
  console.log("YelpCamp Server has started...");
})