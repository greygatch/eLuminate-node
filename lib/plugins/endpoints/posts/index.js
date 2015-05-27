'use strict';

var Post = require('../../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts',
    config: {
      description: 'Show all of the posts',
      auth: false,
      handler: function(request, reply){
        Post.find(function(err, posts){
          if(err){return reply(JSON.stringify(err)).code(400); }
          return reply(posts);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.show-all'
};
