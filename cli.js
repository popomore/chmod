#! /usr/bin/env node

/**
 * @link https://linux.die.net/man/1/chmod
 */

var existsSync = require('fs').existsSync;
var basename = require('path').basename;
var chmod = require('./index');

var exitCode = 0;
var argv = process.argv.splice(1);
var self = basename(argv.shift());

if (argv.length < 2) {
  console.log('usage:\t' + self + ' OCTAL_MODE FILE...');
  process.exit(1);
}

var mode = parseInt(argv.shift(), 10);

while (argv.length > 0) {
  var file = argv.shift();
  if (!existsSync(file)) {
    console.log(self + ': ' + file + ': No such file or directory');
    exitCode = 1;

    continue;
  }

  chmod(file, mode);
}

process.exit(exitCode);
