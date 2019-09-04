"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveNames = defaultResolveNames;
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function isReactComponent(component) {
  return !!(component && component.prototype && component.prototype.isReactComponent);
}

function defaultResolveNames(props, container) {
  var group = props.group,
      forNames = props['for'];
  if (!forNames && container) forNames = container.namesForGroup(group);
  return forNames ? [].concat(forNames) : [];
}

function defaultMapMessages(messages, names) {
  if (!names.length) return messages;
  var messagesForNames = {};
  names.forEach(function (name) {
    if (messages[name]) messagesForNames[name] = messages[name];
  });
  return messagesForNames;
}

function connectToMessageContainer(Component) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$methods = _ref.methods,
      methods = _ref$methods === void 0 ? [] : _ref$methods,
      _ref$mapMessages = _ref.mapMessages,
      mapMessages = _ref$mapMessages === void 0 ? defaultMapMessages : _ref$mapMessages,
      _ref$resolveNames = _ref.resolveNames,
      resolveNames = _ref$resolveNames === void 0 ? defaultResolveNames : _ref$resolveNames;

  function resolveNamesAndMapMessages(messages, props, container) {
    var names = resolveNames ? resolveNames(props, container) : [];
    return (props.mapMessages || mapMessages)(messages, names, props, container);
  }

  var MessageListener =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(MessageListener, _React$Component);

    function MessageListener() {
      _classCallCheck(this, MessageListener);

      return _possibleConstructorReturn(this, _getPrototypeOf(MessageListener).apply(this, arguments));
    }

    _createClass(MessageListener, [{
      key: "UNSAFE_componentWillMount",
      value: function UNSAFE_componentWillMount() {
        var _this = this;

        var container = this.context.messageContainer;

        if (container) {
          this.unsubscribe = container.subscribe(function (allMessages) {
            if (_this.unmounted) return;
            var messages = resolveNamesAndMapMessages(allMessages, _this.props, _this.context.messageContainer);

            _this.setState({
              messages: messages,
              allMessages: allMessages
            });
          });
        }
      }
    }, {
      key: "UNSAFE_componentWillReceiveProps",
      value: function UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (mapMessages && mapMessages.length >= 2) {
          var container = nextContext.messageContainer; // callback style because the listener may have been called before
          // and not had a chance to flush it's changes yet

          this.setState(function (_ref2) {
            var allMessages = _ref2.allMessages;
            return {
              messages: resolveNamesAndMapMessages(allMessages, nextProps, container)
            };
          });
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.unmounted = true;
        this.unsubscribe && this.unsubscribe();
      }
    }, {
      key: "render",
      value: function render() {
        var _ref3 = this.state || {},
            _ref3$messages = _ref3.messages,
            messages = _ref3$messages === void 0 ? {} : _ref3$messages;

        if (this.props.messages) {
          messages = this.props.messages;
        }

        return _react["default"].createElement(Component, _extends({}, this.props, {
          messages: messages,
          ref: isReactComponent(Component) ? 'inner' : undefined
        }));
      }
    }]);

    return MessageListener;
  }(_react["default"].Component);

  MessageListener.DecoratedComponent = Component;
  MessageListener.propTypes = {
    mapMessages: _propTypes["default"].func
  };
  MessageListener.contextTypes = {
    messageContainer: _propTypes["default"].object
  };
  methods.forEach(function (method) {
    MessageListener.prototype[method] = function () {
      var _this$refs$inner;

      return (_this$refs$inner = this.refs.inner)[method].apply(_this$refs$inner, arguments);
    };
  });
  return MessageListener;
}

connectToMessageContainer.resolveNames = defaultResolveNames;
var _default = connectToMessageContainer;
exports["default"] = _default;