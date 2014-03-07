'use strict';

var fs = require('fs');
var exec = require('child_process').exec;
var chmod = require('..');
require('should');

describe('chmod', function() {

  var filePath = __dirname + '/tmp';
  beforeEach(function() {
    fs.writeFileSync(filePath);
  });
  afterEach(function() {
    fs.unlinkSync(filePath);
  });

  it('should support number', function(done) {
    chmod(filePath, 777);
    exec('ls -l ' + filePath, function(error, stdout) {
      stdout.should.match(/^-rwxrwxrwx/);
      done();
    });
  });

  it('should support object', function(done) {
    chmod(filePath, {
      owner: {
        read: true,
        write: true,
        execute: true
      },
      group: {
        read: true,
        write: true,
        execute: true
      },
      others: {
        read: true,
        write: true,
        execute: true
      }
    });
    exec('ls -l ' + filePath, function(error, stdout) {
      stdout.should.match(/^-rwxrwxrwx/);
      done();
    });
  });

  it('should support simple object', function(done) {
    chmod(filePath, {
      read: true,
      write: true,
      execute: true
    });
    exec('ls -l ' + filePath, function(error, stdout) {
      stdout.should.match(/^-rwxrwxrwx/);
      done();
    });
  });

  it('should support simple object set false', function(done) {
    chmod(filePath, {
      read: false,
      write: false,
      execute: false
    });
    exec('ls -l ' + filePath, function(error, stdout) {
      stdout.should.match(/^----------/);
      done();
    });
  });

  it('should support number', function() {
    (function() {
      chmod(1);
    }).should.throw();
  });
});
