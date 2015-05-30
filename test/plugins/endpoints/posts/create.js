/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
// var Post = require('../../../../lib/models/post');

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

describe('POST /posts', function(){
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
  it('should create a new post', function(done){
    server.inject({method: 'POST', url: '/posts', credentials: {_id: '99'}, payload: {title: 'hello!!', body: 'this is a test comment!'}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.votes).to.equal(1);
      done();
    });
  });
  it('should not create a new post with short title', function(done){
    server.inject({method: 'POST', url: '/posts', credentials: {_id: '99'}, payload: {title: 'hi', body: 'this is a test comment!'}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should not create a new post with short body', function(done){
    server.inject({method: 'POST', url: '/posts', credentials: {_id: '99'}, payload: {title: 'hello!!', body: 'test'}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should not create a new post without credentials', function(done){
    server.inject({method: 'POST', url: '/posts', payload: {title: 'hello!!', body: 'test'}}, function(response){
      expect(response.statusCode).to.equal(401);
      done();
    });
  });
});
