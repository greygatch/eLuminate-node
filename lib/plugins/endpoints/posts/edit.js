'use strict';

var Post = require('../../../models/post');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/posts/{postId}/edit',
    config: {
      description: 'Edit user posts',
      validate: {
        payload: {
          title: Joi.string().min(4).max(150),
          body: Joi.string().min(10).max(2500),
          _id: Joi.string().alphanum(),
          votes: Joi.number(),
          comments: Joi.array(),
          createdAt: Joi.date(),
          userId: Joi.string(),
          usersVoted: Joi.array(),
          __v: Joi.number()
        }
      },
      handler: function(request, reply){
        Post.findOne({_id: request.params.postId}, function(err, post){
          if(err){return reply(JSON.stringify(err)).code(400); }
          post.usersVoted = request.payload.usersVoted;
          post.comments = request.payload.comments;
          post.votes = request.payload.votes;
          post.title = request.payload.title;
          post.body = request.payload.body;
          post.save(function(){
            return reply(post);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.edit'
};
