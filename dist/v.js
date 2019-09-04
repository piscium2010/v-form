"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vRule = _interopRequireDefault(require("v-rule"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function create(ruleStore) {
  var validation = _vRule["default"].create(ruleStore);

  var forms = new Map(); // listeners

  var test = validation.test,
      testAllRules = validation.testAllRules;

  var notify = function notify(result) {
    var messages = result.messages;
    window.setTimeout(function () {
      forms.forEach(function (onMessages) {
        onMessages(messages);
      });
    }, 100);
  };

  validation.addListener = function (instance, onMessages) {
    forms.set(instance, onMessages);
  };

  validation.removeListener = function (instance) {
    forms["delete"](instance);
  };

  validation.test = function (values, context) {
    var result = test(values, context);
    notify(result);
    return result;
  };

  validation.testAllRules = function (values, context) {
    var result = testAllRules(values, context);
    notify(result);
    return result;
  };

  validation.has = function (instance) {
    return forms.has(instance);
  };

  return validation;
}

var v = Object.assign({}, _vRule["default"], {
  create: create
});
var _default = v;
exports["default"] = _default;