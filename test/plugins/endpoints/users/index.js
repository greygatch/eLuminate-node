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

describe('GET /leaderboard', function(){
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
  it('should return all users', function(done){
    server.inject({method: 'GET', url: '/leaderboard', credentials: {firebaseId: '99'}}, function(response){
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('should throw a db error', function(done){
    var stub = Sinon.stub(User, 'find').yields(new Error());
    server.inject({method: 'GET', url: '/leaderboard', credentials: {_id: 'b00000000000000000000001'}}, function(response){
      expect(response.statusCode).to.equal(400);
      stub.restore();
      done();
    });
  });
});
