var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({
  title: String,
  content: String
});
