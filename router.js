var express = require('express');
var app = express();
var mongoose = require('mongoose');
var Post = require('post');

module.exports = function(app, express) {

  app.post('/', function (req, res, next) {
    var post = new Post({
      //This probably won't work, because body only works with bodyparser.
      //I could start using body parser, or figure out how to get the information in another way. 
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
