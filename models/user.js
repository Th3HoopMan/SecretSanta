const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  currentExchanges: {
    type: Array,
  },
  pastExchanges: {
    type: Array,
  },
  ownedExchanges: {
    type: Array,
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
  return callback;
}

module.exports.getUserByUsername = function(username, callback){
  const query = {'username': username}
  User.findOne(query, callback);
  return callback;
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
}

module.exports.updateOwnedExchanges = function(username, ownedExchanges, callback){
  const updateQuery = { 'ownedExchanges': ownedExchanges }

  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;

    user.set(updateQuery);
    user.save(callback);
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
