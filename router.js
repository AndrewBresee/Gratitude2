var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;
var bcrypt = require('bcrypt');

var Post = require('./post.js');
var User = require('./user.js');

var userController = require('./userController');
var postController = require('./postController');

// allows the post method to use bodyParser.
var jsonParser = bodyParser.json();

module.exports = function(app, express) {

//***USER INFORMATION**//
  app.post('/signup', jsonParser, userController.signUp);
  app.post('/login', jsonParser, userController.login);
  app.get('/logout', userController.logout);

//***POST INFORMATION**//
  app.post('/post', postController.makePost);
  app.get('/getUser/:title', postController.getPost);
  app.put('/', jsonParser, postController.changePost);
  app.delete('/', postController.deletePost);

//***ROUTING INFORMATION**//
  app.get('/postPage', function(req, res){
    if(req.session.user === undefined){
      console.log("You are not logged in!");
      res.redirect('/login');
    }
  });

  app.get('/', function(req, res){
    res.send("This is the home page");
  });
};

//When routing json, put api in front "api/getPost"

//?? Questions about the different responses/requests. When to use res.next, or res.send, res.write etc.
  //res.(something) seems to just DO something.
  //We can also do res.render(*filename*)
//?? What is the difference between a url path and the api path?
  //The url path is where a user will actually go,
  //the api path is a route that is taken internally?
  //When we go to a speciic file path in postman, is that the same as going to the path on the browser?

//TODO
  //Will create a post with a title and content
  //On post, it seems we can use req.query instead of having to use middleware jsonParser.
  //Will have to refactor to include users information
  //Setup routing for different paths

  //Make frontend
  //Check if user exists
  //Get bcyrpt to hash passwords
  //Using passport for facebook oauth

  //Ionic on top of angular.
