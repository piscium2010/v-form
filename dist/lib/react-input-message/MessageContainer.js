"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireDefault(require("react"));

var _connectToMessageContainer = _interopRequireDefault(require("./connectToMessageContainer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var uniq = function uniq(array) {
  return array.filter(function (item, idx) {
    return array.indexOf(item) === idx;
  });
};

var add = function add(array, item) {
  return array.indexOf(item) === -1 && array.push(item);
};

var remove = function remove(array, item) {
  return array.filter(function (i) {
    return i !== item;
  });
};

var ALL_FIELDS = '@all';

var MessageContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MessageContainer, _React$Component);

  function MessageContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MessageContainer);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MessageContainer)).call.apply(_getPrototypeOf2, [this].concat(_args)));

    _this.namesForGroup = function (groups) {
      groups = groups ? [].concat(groups) : [];

      if (groups.indexOf(ALL_FIELDS) !== -1) {
        groups = Object.keys(_this._groups);
      }

      return uniq(groups.reduce(function (fields, group) {
        return fields.concat(_this._groups[group]);
      }, []));
    };

    _this.addToGroup = function (grpName, names) {
      if (grpName === ALL_FIELDS) return;
      grpName = grpName || '@@unassigned-group';
      names = names && [].concat(names);
      var group = _this._groups[grpName];
      if (!names || !names.length) return;
      if (!group) group = _this._groups[grpName] = [];
      names.forEach(function (name) {
        return add(group, name);
      });
      return function () {
        return names.forEach(function (name) {
          return remove(group, name);
        });
      };
    };

    _this.onValidate = function (fields, type, args) {
      if (!fields || !fields.length) return;
      var _this$props = _this.props,
          mapNames = _this$props.mapNames,
          passthrough = _this$props.passthrough;
      var messageContainer = _this.context.messageContainer;

      if (messageContainer && passthrough) {
        messageContainer.onValidate(mapNames(fields), type, args);
        return;
      }

      _this.props.onValidationNeeded && _this.props.onValidationNeeded({
        type: type,
        fields: fields,
        args: args
      });
    };

    _this.subscribe = function (listener) {
      var context = _this._listenerContext(_this.props);

      _this._handlers.push(listener);

      listener(context);
      return function () {
        return remove(_this._handlers, listener);
      };
    };

    _this._handlers = [];
    _this._groups = Object.create(null);
    return _this;
  }

  _createClass(MessageContainer, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      this._emit(nextProps);
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      if (!this._context) this._context = {
        messageContainer: {
          addToGroup: this.addToGroup,
          namesForGroup: this.namesForGroup,
          subscribe: this.subscribe,
          onValidate: this.onValidate
        }
      };
      return this._context;
    }
  }, {
    key: "_emit",
    value: function _emit(props) {
      var context = this._listenerContext(props);

      this._handlers.forEach(function (fn) {
        return fn(context);
      });
    }
  }, {
    key: "_listenerContext",
    value: function _listenerContext(_ref) {
      var messages = _ref.messages;
      return messages;
    }
  }, {
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);

  return MessageContainer;
}(_react["default"].Component);

MessageContainer.propTypes = {
  passthrough: _propTypes["default"].bool,
  mapNames: _propTypes["default"].func,
  messages: _propTypes["default"].object,
  onValidationNeeded: _propTypes["default"].func
};
MessageContainer.defaultProps = {
  messages: Object.create(null),
  mapNames: function mapNames(names) {
    return names;
  }
};
MessageContainer.contextTypes = {
  messageContainer: _propTypes["default"].object
};
MessageContainer.childContextTypes = {
  messageContainer: _propTypes["default"].object
};

var _default = (0, _connectToMessageContainer["default"])(MessageContainer, {
  resolveNames: function resolveNames() {},
  mapMessages: function mapMessages(messages) {
    return messages;
  },
  methods: ['namesForGroup', 'addToGroup']
});

exports["default"] = _default;