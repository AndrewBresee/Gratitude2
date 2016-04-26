var express = require('express');
var mongoose = require('mongoose');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser')

//Got this from documentation online. A little unsure of how to use it.

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
  cookieName: 'chcolateChip',
  secret: 'totally_random_string',
  duration: 30 * 60 * 1000,
  //This extends the duration of the cookies
  activeDuration: 5 * 60 * 1000,
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
