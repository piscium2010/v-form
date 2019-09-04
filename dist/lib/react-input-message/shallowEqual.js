"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isEql(a, b) {
  if (a === b) return true;
  if (_typeof(a) !== _typeof(b)) return false;
  if (Array.isArray(a)) return !a.some(function (a, idx) {
    return a !== b[idx];
  });
  return false;
}

function shallowEqual(objA, objB) {
  var eql = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isEql;
  if (objA === objB) return true;

  if (_typeof(objA) !== 'object' || objA === null || _typeof(objB) !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false; // Test for A's keys different from B.

  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  for (var i = 0; i < keysA.length; i++) {
    var key = keysA[i];
    if (!bHasOwnProperty(key)) return false;
    if (!eql(objA[key], objB[key])) return false;
  }

  return true;
}

var _default = shallowEqual;
exports["default"] = _default;