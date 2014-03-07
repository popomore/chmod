'use strict';

var fs = require('fs');
var deepExtend = require('deep-extend');
var Mode = require('stat-mode');

module.exports = function(file, mode) {
  if (typeof mode !== 'number' && typeof mode !== 'object') {
    throw new TypeError('Expected a number or object');
  }

  var newMode, stat = fs.statSync(file);

  if (typeof mode === 'object') {
    var statMode = new Mode(stat);
    deepExtend(statMode, normalize(mode));
    newMode = statMode.stat.mode;
  } else {
    newMode = parseInt(mode, 8);
  }
  fs.chmodSync(file, newMode);
};

function normalize(mode) {
  var keys = ['read', 'write', 'execute'], called = false;
  var newOne = {
    owner: {},
    group: {},
    others: {}
  };
  keys.forEach(function(key) {
    if (mode[key]) {
      newOne.owner[key] = true;
      newOne.group[key] = true;
      newOne.others[key] = true;
      called = true;
    }
  });
  return called ? newOne : mode;
}
