'use strict';

var Post = require('../../../models/post');

exports.register = function(server, options, next){
  server.route({
    method: 'DELETE',
    path: '/posts/{postId}/destroy',
    config: {
      description: 'Delete a user post',
      handler: function(request, reply){
        console.log(request.params.postId);
        Post.findOne({_id: request.params.postId}, function(err, post){
          if(!post || err){return reply().code(400); }
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
