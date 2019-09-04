"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _ChildBridge = _interopRequireDefault(require("topeka/ChildBridge"));

var _connectToMessageContainer = _interopRequireWildcard(require("./connectToMessageContainer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var stringOrArrayOfStrings = _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].arrayOf(_propTypes["default"].string)]);

var MessageTrigger =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MessageTrigger, _React$Component);

  function MessageTrigger() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MessageTrigger);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MessageTrigger)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _this.onEvent = function (event) {
      var _this$props = _this.props,
          children = _this$props.children,
          noValidate = _this$props.noValidate;
      var messageContainer = _this.context.messageContainer;
      var handler = _react["default"].isValidElement(children) && children.props[event];

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      handler && handler.apply(_assertThisInitialized(_this), args);
      if (noValidate || !messageContainer) return;
      messageContainer.onValidate(_this.resolveNames(), event, args);
    };

    _this.inject = function (props) {
      var _this$props2 = _this.props,
          messages = _this$props2.messages,
          children = _this$props2.children;
      props.messages = messages;
      if (typeof children === 'function') return children(props);
      return _react["default"].cloneElement(children, props);
    };

    _this.state = {
      isActive: false
    };
    return _this;
  }

  _createClass(MessageTrigger, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      this.addToGroup();
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
      this.addToGroup(nextProps, nextContext);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeFromGroup && this.removeFromGroup();
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement(_ChildBridge["default"], {
        events: this.props.events,
        onEvent: this.onEvent
      }, this.inject);
    }
  }, {
    key: "addToGroup",
    value: function addToGroup() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      var messageContainer = context.messageContainer;
      var forNames = props['for'],
          group = props.group;
      this.removeFromGroup && this.removeFromGroup();
      if (!messageContainer || !forNames) return;
      this.removeFromGroup = messageContainer.addToGroup(group, forNames);
    }
  }, {
    key: "resolveNames",
    value: function resolveNames() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.context;
      return (0, _connectToMessageContainer.resolveNames)(this.props, context.messageContainer);
    }
  }]);

  return MessageTrigger;
}(_react["default"].Component);

MessageTrigger.propTypes = {
  noValidate: _propTypes["default"].bool.isRequired,
  events: stringOrArrayOfStrings,
  "for": stringOrArrayOfStrings,
  children: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].element]),
  group: function group(props, name, compName) {
    if (!props[name] && (!props["for"] || !props["for"].length)) {
      return new Error('A `group` prop is required when no `for` prop is provided' + "for component ".concat(compName));
    }

    for (var _len3 = arguments.length, args = new Array(_len3 > 3 ? _len3 - 3 : 0), _key3 = 3; _key3 < _len3; _key3++) {
      args[_key3 - 3] = arguments[_key3];
    }

    return stringOrArrayOfStrings.apply(void 0, [props, name, compName].concat(args));
  }
};
MessageTrigger.contextTypes = {
  messageContainer: _propTypes["default"].object
};
MessageTrigger.defaultProps = {
  events: 'onChange',
  noValidate: false
};

var _default = (0, _connectToMessageContainer["default"])(MessageTrigger);

exports["default"] = _default;