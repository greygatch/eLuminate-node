'use strict';

var User = require('../../../models/user');
var Joi = require('joi');

exports.register = function(server, options, next){
  server.route({
    method: 'PUT',
    path: '/users/{userId}/edit',
    config: {
      description: 'Update a user profile',
      // validate: {
      //   payload: {
      //     username: Joi.string().min(3),
      //     avatar: Joi.string(),
      //     createdAt: Joi.date(),
      //     points: Joi.number(),
      //     firebaseId: Joi.string()
      //   }
      // },
      handler: function(request, reply){
        console.log(request.payload);
        User.findByIdAndUpdate(request.auth.credentials._id, request.payload, function(err, user){
          if(err || !user){
            return reply(JSON.stringify(err)).code(400);
          }
          user.points = request.payload.points;
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
