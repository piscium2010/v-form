"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Validator =
/*#__PURE__*/
function () {
  function Validator(validate) {
    _classCallCheck(this, Validator);

    this._validator = validate;
    this._errors = Object.create(null);
  }

  _createClass(Validator, [{
    key: "errors",
    value: function errors(names) {
      var _this = this;

      if (!names || !names.length) return _objectSpread({}, this._errors);
      return [].concat(names).reduce(function (o, name) {
        if (_this._errors[name]) o[name] = _this._errors[name];
        return o;
      }, {});
    }
  }, {
    key: "isValid",
    value: function isValid(name) {
      return !this._errors[name] || !this._errors[name].length;
    }
  }, {
    key: "validate",
    value: function validate(name, context) {
      var _this2 = this;

      var fields = [].concat(name).map(function (key) {
        return _this2._validateField(key, context);
      });

      this._removeError(name);

      return Promise.all(fields).then(function () {
        return _this2.errors();
      });
    }
  }, {
    key: "_validateField",
    value: function _validateField(name, context) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        Promise.resolve(_this3._validator(name, context)).then(function (msgs) {
          msgs = msgs == null ? [] : [].concat(msgs);
          if (msgs.length) _this3._addError(name, msgs);
          resolve(!msgs.length);
        })["catch"](reject);
      });
    }
  }, {
    key: "_addError",
    value: function _addError(name, msgs) {
      this._errors[name] = msgs;
    }
  }, {
    key: "_removeError",
    value: function _removeError(fields) {
      var _this4 = this;

      [].concat(fields).forEach(function (field) {
        return delete _this4._errors[field];
      });
    }
  }]);

  return Validator;
}();

var _default = Validator;
exports["default"] = _default;