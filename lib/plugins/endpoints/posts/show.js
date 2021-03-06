'use strict';

var Post = require('../../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'GET',
    path: '/posts/{postId}',
    config: {
      description: 'Show user posts',
      handler: function(request, reply){
        Post.findOne({_id: request.params.postId}, function(err, post){
          if(err){return reply(JSON.stringify(err)).code(400); }
          return reply(post);
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.show'
};
