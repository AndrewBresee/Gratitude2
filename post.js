var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var post = new Schema({
  title: String,
  content: String,
  userId: String
});

//Allows Post to be required in on the router
var Post = mongoose.model('posts', post);
module.exports = Post;
