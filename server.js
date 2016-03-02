var express = require('express');
var app = express();
require('./router')(app, express);

var port = process.env.PORT || 8080;

app.listen(port);

console.log("Connected to port: ", port);

exports = module.exports = app;
