/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');
var User = require('../../../../lib/models/user');
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

describe('PUT /users/{userId}/edit', function(){
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
  it('should edit an existing profile', function(done){
    server.inject({method: 'PUT', url: '/users/b00000000000000000000003/edit', credentials: {_id: 'b00000000000000000000003'}, payload: {avatar: 'bob.com', points: 0, username: 'theBombDotCom', createdAt: 1431541042952, firebaseId: '7'}}, function(response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should not edit if no existing profile', function(done){
    server.inject({method: 'PUT', url: '/users/b00000000000000000000003/edit', credentials: {_id: 'b00000000000000000000099'}, payload: {avatar: 'bob.com', points: 0, username: 'theBombDotCom', createdAt: 1431541042952, firebaseId: '7'}}, function(response){
      expect(response.statusCode).to.equal(400);
      done();
    });
  });
  it('should throw a db error', function(done){
    var stub = Sinon.stub(User, 'findByIdAndUpdate').yields(new Error());
    server.inject({method: 'PUT', url: '/users/77/edit', credentials: {_id: 'b00000000000000000000003'}, payload: {avatar: 'bob.com', points: 0, username: 'theBombDotCom', createdAt: 1431541042952, firebaseId: '7'}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
