"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactInputMessage = require("react-input-message");

var _Field = _interopRequireDefault(require("./Field"));

var _Context = require("./Context");

var _v = _interopRequireDefault(require("./v"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var VForm =
/*#__PURE__*/
function (_React$Component) {
  _inherits(VForm, _React$Component);

  function VForm(props) {
    var _this;

    _classCallCheck(this, VForm);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(VForm).call(this, props));

    _this.onMessages = function (messages) {
      var newMessages = _objectSpread({}, _this.state.messages, {}, messages);

      _this.setState({
        messages: newMessages
      });
    };

    _this.subscribe = function () {
      var validation = _this.props.validation;
      var has = validation.has,
          addListener = validation.addListener;

      if (has && addListener) {
        if (!validation.has(_assertThisInitialized(_this))) {
          _this.unSubscribe(); // first unsubscribe previous


          _this.validation = validation;

          _this.validation.addListener(_assertThisInitialized(_this), _this.onMessages);
        }
      } else {
        throw 'invalid valition passed to VForm';
      }
    };

    _this.unSubscribe = function () {
      _this.validation.removeListener(_assertThisInitialized(_this));
    };

    _this.state = {
      messages: props.defaultMessages || {}
    };
    _this.validation = props.validation;
    return _this;
  }

  _createClass(VForm, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.subscribe();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.subscribe();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.unSubscribe();
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_Context.VFormContext.Provider, {
        value: {
          name: 'VForm'
        }
      }, _react["default"].createElement(_reactInputMessage.MessageContainer, {
        messages: this.messages
      }, this.props.children));
    }
  }, {
    key: "messages",
    get: function get() {
      return 'messages' in this.props ? this.props.messages : this.state.messages;
    }
  }]);

  return VForm;
}(_react["default"].Component);

exports["default"] = VForm;
VForm.defaultProps = {
  validation: _v["default"].create({}) // validation with empty rules

};

VForm.fieldFactory = function (C) {
  var CustomField = (0, _reactInputMessage.connectToMessageContainer)((0, _Field["default"])(C), {
    mapMessages: function mapMessages(messages, names, props, container) {
      var one = messages[props.name];
      var message = [].concat(one)[0];
      return message || '';
    }
  });
  return CustomField;
};