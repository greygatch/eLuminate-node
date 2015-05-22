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
          username: Joi.string().min(3).required(),
          avatar: Joi.string().required(),
          createdAt: Joi.date(),
          points: Joi.number().required(),
          firebaseId: Joi.string()
        }
      },
      handler: function(request, reply){

        User.findByIdAndUpdate(request.auth.credentials._id, request.payload, function(err, user){
          if(err || !user){
            return reply(JSON.stringify(err)).code(400);
          }else{
            return reply(user);
          }
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.update'
};
