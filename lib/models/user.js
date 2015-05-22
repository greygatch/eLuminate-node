/* eslint no-reserved-keys: 0 */

'use strict';

var Mongoose = require('mongoose');
var User;

var userSchema = Mongoose.Schema({
  firebaseId: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  username: {type: String},
  avatar: {type: String},
  points: {type: Number, required: true, default: 0}
});

User = Mongoose.model('User', userSchema);
module.exports = User;
