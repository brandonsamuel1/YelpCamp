const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

const data = [
  {name: "Cloud Rest", image: "https://source.unsplash.com/h4bBVo_CpqQ", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
  {name: "Grouse Woods", image: "https://source.unsplash.com/y8Ngwq34_Ak", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."},
  {name: "Eagle Point", image: "https://source.unsplash.com/zQgsdQvj1IM", description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
]

function seedDB(){
  // Remove Camgrounds...
  Campground.remove({}, function(err){
    if(err){
      console.log(err);
    }
    console.log("removed campground");
    // Add Campgrounds..
    data.forEach(function(seed){
      Campground.create(seed, function(err, campground){
        if(err){
          console.log(err)
        } else {
          console.log("added camground");
          // Adding comments...
          Comment.create(
            {text: "This place is great!", author: "Homer"}, function(err, comment){
              if(err){
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            }
          )
        }
      });
    })
  });
}

module.exports = seedDB;