var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//Will need to require authentication to hash passwords
var user = new Schema({
  username: String,
  password: String
});

//Allows Post to be required in on the router
//Why does it need 'user', user at the end?
var User = mongoose.model('user', user);
module.exports = User;
