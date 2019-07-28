'use strict';

var fs = require('fs');
var exec = require('child_process').exec;
require('should');

describe('cli', function() {

  var filePath = __dirname + '/tmp';
  var filePath2 = __dirname + '/tmp2';
  beforeEach(function() {
    fs.writeFileSync(filePath);
    fs.writeFileSync(filePath2);
  });
  afterEach(function() {
    fs.unlinkSync(filePath);
    fs.unlinkSync(filePath2);
  });

  it('handles single file', function(done) {
    exec(__dirname + '/../cli.js 777 ' + filePath, function (chmodError) {
      if (chmodError) {
        return done(chmodError);
      }

      exec('ls -l ' + filePath, function(lsError, stdout) {
        stdout.should.match(/^-rwxrwxrwx/);
        done(lsError);
      });
    });
  });

  it('handles many files', function(done) {
    exec(__dirname + '/../cli.js 777 ' + filePath + ' ' + filePath2, function (chmodError) {
      if (chmodError) {
        return done(chmodError);
      }

      exec('ls -l ' + filePath, function(lsError, stdout) {
        if (lsError) {
          return done(lsError);
        }

        stdout.should.match(/^-rwxrwxrwx/);

        exec('ls -l ' + filePath2, function(lsError2, stdout2) {
          stdout2.should.match(/^-rwxrwxrwx/);
          done(lsError2);
        });
      });
    });
  });

  it('handles invalid file', function(done) {
    exec(__dirname + '/../cli.js 777 missing-file.txt ' + filePath, function (chmodError) {
      chmodError.code.should.match(1);
      exec('ls -l ' + filePath, function(lsError, stdout) {
        stdout.should.match(/^-rwxrwxrwx/);
        done(lsError);
      });
    });
  });
});
