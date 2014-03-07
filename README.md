# Chmod [![Build Status](https://travis-ci.org/popomore/chmod.png?branch=master)](https://travis-ci.org/popomore/chmod) [![Coverage Status](https://coveralls.io/repos/popomore/chmod/badge.png?branch=master)](https://coveralls.io/r/popomore/chmod?branch=master) 

Inspired by [gulp-chmod](https://github.com/sindresorhus/gulp-chmod), but can be used everywhere.

---

## Install

```
$ npm install chmod -g
```

## Usage

```
var chmod = require('chmod');
chmod(file, 777);
```

Or you can use object instead of number, see [stat-mode](https://github.com/TooTallNate/stat-mode)

```
chmod(file, {
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
```

You can also write a object Simply when the same for each

```
chmod(file, {
  read: true
});

// equals

chmod(file, {
  owner: {
    read: true
  },
  group: {
    read: true
  },
  others: {
    read: true
  }
});
```

Otherwise will throw

## LISENCE

Copyright (c) 2014 popomore. Licensed under the MIT license.
