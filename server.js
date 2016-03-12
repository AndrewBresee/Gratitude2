var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

//localhost --> where the database is being hosted.
//If it were deployed, it would be at the ip/domain.
mongoose.connect('mongodb://localhost/myproject');
var db = mongoose.connection;

db.on('error', function() {
  console.log('Error connecting to the database');
});

db.once('open', function() {
  console.log('MongoDB is open');
});

var port = process.env.PORT || 8080;

require('./router')(app, express);

app.listen(port);


console.log("Connected to port: ", port);

exports = module.exports = app;
