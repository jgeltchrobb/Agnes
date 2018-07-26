const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Passport-Local Mongoose will add a username, hash and salt field to store the
// username, the hashed password and the salt value. Additionally Passport-Local
// Mongoose adds some methods to your Schema.
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
  name: String,
  email: String,
  role: String,
  PIN: Number,
});

// connect passportLocalMongoose and use 'email' instead of 'username'
User.plugin(passportLocalMongoose, { usernameField: 'email' });

module.exports = mongoose.model('User', User);
