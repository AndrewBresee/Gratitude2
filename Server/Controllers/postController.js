var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;
var bcrypt = require('bcrypt');
var Post = require('../Models/postModel.js');

exports.makePost = function (req, res, next) {
  if(req.session.user === undefined){
    console.log("You are not logged in!");
    res.statusCode(404).json("You are not logged in!");
    //probably need to stop them from continuing here.
    return;
  }

  var post = new Post({
    title: req.body.title,
    content: req.body.content,
    userId: req.session.user._id
  });

  post.save(function (err, post) {
    if (err) {
      return next(err);
    } else {
      res.json(201, post);
    }
  });
};

exports.getPost = function(req, res){
  console.log("req.params.title :", req.params.title);
  var requestedTitle = req.params.title;
  Post.findOne({title: requestedTitle}, function(err, data){
    if (err){
      res.statusCode(404).json(err);
    } else {
      res.json(200, data);
    }
  });
};

exports.changePost = function (req, res, next) {
  //This console.log tells me the post request in coming in right from postman
  console.log("UPDATE POST :" , req.body);
  var updateTitle = req.body.title;
  var updateContent = req.body.content;
  Post.update({ title: updateTitle}, { $set: { content: updateContent }}, function(err, data){
    if (err) {
      res.statusCode(404).json(err);
      //return next(err);
    } else {
      res.json(200, data);
    }
  });
};

exports.deletePost = function(req, res){
  var requestedTitle = req.headers.title;
  Post.find({title: requestedTitle}).remove(function(err, data){
    if(err){
      res.statusCode(404).json(err);
      console.log("Could not find");
    } else {
      res.send(200, data);
      console.log("Data Deleted!");
    }
  });
};
