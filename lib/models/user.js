/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var User;

var userSchema = Mongoose.Schema({
  firebaseId: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  email: {type: String},
  password: {type: String},
  username: {type: String},
  avatar: {type: String},
  points: {type: Number, required: true, default: 0},
  // badges: [{
  //   image: {type: String},
  //   description: {type: String},
  //   isAchieved: {type: Boolean, required: true, default: false}
  // }]
});

User = Mongoose.model('User', userSchema);
module.exports = User;
