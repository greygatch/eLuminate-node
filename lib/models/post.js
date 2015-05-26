'use strict';

var Mongoose = require('mongoose');

var postSchema = Mongoose.Schema({
  title: {type: String, required: true},
  url: {type: String},
  votes: {type: Number, required: true, default: 1},
  userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
  body: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now},
  comments: [{
    body: {type: String, required: true},
    userId: {type: Mongoose.Schema.ObjectId, ref: 'User', required: true},
    votes: {type: Number, default: 1}
  }]
});

var Post = Mongoose.model('Post', postSchema);
module.exports = Post;
