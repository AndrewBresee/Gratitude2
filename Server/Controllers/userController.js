var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connection;
var bcrypt = require('bcrypt');

var User = require('../Models/userModel.js');

exports.signUp = function(req, res, next) {
    var user = new User({
    username: req.body.userName,
    password: req.body.password
  });
  user.save(function (err, data) {
    if (err) {
      return next(err);
    } else {
      //This line saves the user on the session
      //Without hash, it will save their password directly.
      //Maybe should only save their username
      //TODO: only save user id to session
      req.session.user = data;
      // res.redirect('/dashboard'); --> will use this later when pages are visable.
      res.json(201, user);
    }
  });
};

exports.login = function (req, res, next) {
  var username = req.body.userName;
  var password = req.body.password;
  User.findOne({username: username , password: password}, function(err, user){
    if(err){
      res.statusCode(404).json(err);
      //res.redirect('/login');
      console.log("User Does Not Exist");
    } else {
      req.session.user = user;
      res.json(200, user);
    }
  });
};

exports.logout = function(req, res){
  req.session.destroy();
  res.json("You have logged out");
};
