/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var Post = require('../../../../lib/models/post');
var Sinon = require('sinon');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var CP = require('child_process');
var Path = require('path');
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;

var server;

describe('GET /posts/{postId}', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });
  beforeEach(function(done){
    var db = server.app.environment.MONGO_URL.split('/')[3];
    CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
      done();
    });
  });
  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });
  it('should return post by user', function(done){
    server.inject({method: 'GET', url: '/posts/b00000000000000000000001', credentials: {_id: 'b00000000000000000000001'}}, function(response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should return error if unauthorized', function(done){
    server.inject({method: 'GET', url: '/posts/b00000000000000000000001'}, function(response){
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
  it('should return an error if bad credentials', function(done){
    server.inject({method: 'GET', url: '/posts/b00000000000000000000001', credentials: {_id: 'b00000000000000000000011'}}, function(response){
      expect(response.payload).to.not.be.ok;
      done();
    });
  });
  it('should return an error if bad url', function(done){
    server.inject({method: 'GET', url: '/posts/q00000000000000000000001', credentials: {_id: 'b00000000000000000000001'}}, function(response){
      expect(response.payload).to.not.be.ok;
      done();
    });
  });
  it('should throw a db error', function(done){
    var stub = Sinon.stub(Post, 'findOne').yields(new Error());
    server.inject({method: 'GET', url: '/posts/b00000000000000000000001', credentials: {_id: 'b00000000000000000000001'}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
