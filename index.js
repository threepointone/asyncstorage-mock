'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _Promise = require('babel-runtime/core-js/promise')['default'];

var _regeneratorRuntime = require('babel-runtime/regenerator')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getItem = getItem;
exports.setItem = setItem;
exports.removeItem = removeItem;
exports.mergeItem = mergeItem;
exports.clear = clear;
exports.getAllKeys = getAllKeys;
exports.multiGet = multiGet;
exports.multiSet = multiSet;
exports.multiRemove = multiRemove;
exports.multiMerge = multiMerge;
var cache = {},
    has = ({}).hasOwnProperty;

function cb(fn, err, res) {
  if (fn === undefined) fn = function () {};

  return new _Promise(function (resolve, reject) {
    fn(err, res);
    if (err) {
      return reject(err);
    }
    return resolve(res);
  });
}

function error(msg) {
  return new Error(msg);
}

function getItem(key, callback) {
  var _context;

  return _regeneratorRuntime.async(function getItem$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(_context = cache, has).call(_context, key)) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt('return', cb(callback, null, cache[key]));

      case 2:
        return context$1$0.abrupt('return', cb(callback, error('no such key')));

      case 3:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function setItem(key, value, callback) {
  return _regeneratorRuntime.async(function setItem$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cache[key] = value;
        return context$1$0.abrupt('return', cb(callback));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function removeItem(key, callback) {
  var _context2;

  return _regeneratorRuntime.async(function removeItem$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(_context2 = cache, has).call(_context2, key)) {
          context$1$0.next = 3;
          break;
        }

        delete cache[key];
        return context$1$0.abrupt('return', cb(callback));

      case 3:
        return context$1$0.abrupt('return', cb(callback, error('no such key')));

      case 4:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function mergeItem(key, value, callback) {
  return _regeneratorRuntime.async(function mergeItem$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cache[key] = JSON.stringify(_extends({}, JSON.parse(cache[key]), JSON.parse(value)));
        return context$1$0.abrupt('return', cb(callback));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function clear(callback) {
  return _regeneratorRuntime.async(function clear$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        cache = {};
        return context$1$0.abrupt('return', cb(callback));

      case 2:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function getAllKeys(callback) {
  return _regeneratorRuntime.async(function getAllKeys$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        return context$1$0.abrupt('return', cb(callback, null, _Object$keys(cache)));

      case 1:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function multiGet(keys, callback) {
  var arr, i;
  return _regeneratorRuntime.async(function multiGet$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        arr = [], i = 0;

      case 1:
        if (!(i < keys.length)) {
          context$1$0.next = 12;
          break;
        }

        context$1$0.t0 = arr;
        context$1$0.t1 = keys[i];
        context$1$0.next = 6;
        return _regeneratorRuntime.awrap(getItem(keys[i]));

      case 6:
        context$1$0.t2 = context$1$0.sent;
        context$1$0.t3 = [context$1$0.t1, context$1$0.t2];
        context$1$0.t0.push.call(context$1$0.t0, context$1$0.t3);

        i++;
        context$1$0.next = 1;
        break;

      case 12:
        return context$1$0.abrupt('return', cb(callback, null, arr));

      case 13:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function multiSet(keyvalues, callback) {
  var i;
  return _regeneratorRuntime.async(function multiSet$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < keyvalues.length)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(setItem(keyvalues[i][0], keyvalues[i][1]));

      case 4:
        i++;
        context$1$0.next = 1;
        break;

      case 7:
        return context$1$0.abrupt('return', cb(callback));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function multiRemove(keys, callback) {
  var i;
  return _regeneratorRuntime.async(function multiRemove$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < keys.length)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(removeItem(keys[i]));

      case 4:
        i++;
        context$1$0.next = 1;
        break;

      case 7:
        return context$1$0.abrupt('return', cb(callback));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}

function multiMerge(keyvalues, callback) {
  var i;
  return _regeneratorRuntime.async(function multiMerge$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        i = 0;

      case 1:
        if (!(i < keyvalues.length)) {
          context$1$0.next = 7;
          break;
        }

        context$1$0.next = 4;
        return _regeneratorRuntime.awrap(mergeItem(keyvalues[i][0], keyvalues[i][1]));

      case 4:
        i++;
        context$1$0.next = 1;
        break;

      case 7:
        return context$1$0.abrupt('return', cb(callback));

      case 8:
      case 'end':
        return context$1$0.stop();
    }
  }, null, this);
}
