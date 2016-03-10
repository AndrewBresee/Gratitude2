var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Post = require('./post.js');



module.exports = function(app, express) {

  app.post('/', function (req, res, next) {
    console.log("REQUEST FROM POST :" , req);
    var post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save(function (err, post) {
      if (err) {
        return next(err);
      } else {
        res.json(201, post);
      }
    });
  });

  app.get('/', function(req, res){
    mongoose.connection.db.collections['posts'].find({}, function(err, data){
      if(err){
        res.statusCode(404).json(err);
        console.log("Could not find");
      } else {
        res.statusCode(200).json(data)
      }
    })
  });

};
