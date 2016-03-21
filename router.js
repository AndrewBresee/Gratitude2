var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;

var Post = require('./post.js');
var User = require('./user.js');

// allows the post method to use bodyParser.
var jsonParser = bodyParser.json();

module.exports = function(app, express) {
//***USER INFORMATION**//

  //?? What is the difference between a url path and the api path?
    //The url path is where a user will actually go,
    //the api path is a route that is taken internally?
    //When we go to a speciic file path in postman, is that the same as going to the path on the browser?

  //TODO: Will have to authenticate in here. Need to hash the password as it comes in.
    //Will also need to get reference to the user and save some kind of authentication for when they make posts.
    //Need to start using sessions.
  app.post('/signup', jsonParser, function (req, res, next) {
    var user = new User({
      username: req.body.userName,
      password: req.body.password
    });
    user.save(function (err, data) {
      if (err) {
        return next(err);
      } else {
        //This line saves the user on the session
        req.session.user = data;
        // res.redirect('/dashboard'); --> will use this later when pages are visable.
        res.json(201, user);
      }
    });
  });

  app.post('/login', jsonParser, function (req, res, next) {
    var username = req.body.userName;
    var password = req.body.password;
    User.findOne({username: username}, {password: password}, function(err, user){
      if(err){
        res.statusCode(404).json(err);
        console.log("User Does Not Exist");
      } else {
        req.session.user = user;
        console.log("Session is created and is :", req.session);
        res.json(200, user);
      }
    });
  });

  app.get('/logout', function(req, res){
    req.session.destroy();
    res.json("You have logged out");
    console.log("SESSION GONE! SESSION IS NOW : ", req.session);
  });

//***ROUTING INFORMATION**//


//***POST INFORMATION**//

  //?? Questions about the different responses/requests. When to use res.next, or res.send, res.write etc.
    //res.(something) seems to just DO something.
    //We can also do res.render(*filename*)

  //Will create a post with a title and content
  //On post, it seems we can use req.query instead of having to use middleware jsonParser.

  //Will have to refector to include users information
  app.post('/post', jsonParser, function (req, res, next) {
    if(req.session.user === undefined){
      console.log("You are not logged in!");
      res.statusCode(404).json("You are not logged in!")
      //probably need to stop them from continuing here.
      res.json(404);
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
  });

  //Will get a specific post based on a requested title
  //TODO: Refactor to search for posts based on users information
  app.get('/getUser/:title', function(req, res){
    console.log("req.params.title :", req.params.title);
    var requestedTitle = req.params.title;
    Post.findOne({title: requestedTitle}, function(err, data){
      if(err){
        res.statusCode(404).json(err);
      } else {
        res.json(200, data);
      }
    });
  });

  //?? What does next(err) do?
    //It seems that including {upsert: true} makes it so that if there isn't anything with that post, it will make a new one.

  app.put('/', jsonParser, function (req, res, next) {
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
  });

  app.delete('/', function(req, res){
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
  });


};
