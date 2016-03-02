var express = require('express');
var app = express();

module.exports = function(app, express) {
  app.get('/', function(req, res){
    res.send("HELLO!")
  });
};
