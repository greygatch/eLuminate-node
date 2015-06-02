'use strict';

var User = require('../../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/users/{userId}/edit',
    config: {
      description: 'Update a user profile',
      validate: {
        payload: {
          _id: Joi.string(),
          username: Joi.string().min(3),
          avatar: Joi.string(),
          createdAt: Joi.date(),
          points: Joi.number(),
          firebaseId: Joi.string(),
          badges: Joi.array()
        }
      },
      handler: function(request, reply){
        User.findByIdAndUpdate(request.auth.credentials._id, request.payload, function(err, user){
          if(err || !user){
            return reply(JSON.stringify(err)).code(400);
          }

          if(request.payload.username){user.username = request.payload.username; }
          if(request.payload.avatar){user.avatar = request.payload.avatar; }
          if(request.payload.points){user.points = request.payload.points; }
          // if(request.payload.badges){user.badges = request.payload.badges; }
          return reply(user);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.update'
};
