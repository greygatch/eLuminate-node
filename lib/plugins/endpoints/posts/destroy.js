'use strict';

var Post = require('../../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/posts/{postId}/destroy',
    config: {
      description: 'Show user posts',
      handler: function(request, reply){
        console.log(request.params);
        Post.findOne({_id: request.params.postId}, function(err, post){
          if(!post){return reply().code(400); }
          post.remove(function(){
            return reply(post);
          });
        });
      }
    }
  });

  return next();
};

exports.register.attributes = {
  name: 'posts.destroy'
};
