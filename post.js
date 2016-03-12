var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({
  title: String,
  content: String
});

var Post = mongoose.model('posts', post);
module.exports = Post;
