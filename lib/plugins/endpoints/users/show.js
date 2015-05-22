'use strict';

var User = require('../../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/users/{userId}',
    config: {
      description: 'Show the user profile',
      handler: function(request, reply){
        User.findById({_id: request.auth.credentials._id}, function(err, user){
          if(err || !user){return reply(JSON.stringify(err)).code(400); }
          return reply(user);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.show'
};
