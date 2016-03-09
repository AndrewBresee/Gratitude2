var express = require('express');
var app = express();
var mongoose = require('mongoose');
require('./router')(app, express);

mongoose.connect('mongodb://localhost/flock');
var db = mongoose.connection;

db.on('error', function() {
  console.log('Error connecting to the database');
});

db.once('open', function() {
  console.log('MongoDB is open');
});

var port = process.env.PORT || 8080;

app.listen(port);

console.log("Connected to port: ", port);

exports = module.exports = app;
