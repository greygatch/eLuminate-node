'use strict';

var User = require('../../../models/user');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/leaderboard',
    config: {
      description: 'Show all of the posts',
      auth: false,
      handler: function(request, reply){
        User.find(function(err, users){
          if(err){return reply(JSON.stringify(err)).code(400); }
          return reply(users);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'users.show-all'
};
