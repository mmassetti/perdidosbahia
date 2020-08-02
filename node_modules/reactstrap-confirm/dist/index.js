"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = require("react-dom");

var _ConfirmModal = _interopRequireDefault(require("./components/ConfirmModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var confirm = function confirm(props) {
  return new Promise(function (resolve) {
    var el = document.createElement('div');

    var handleResolve = function handleResolve(result) {
      (0, _reactDom.unmountComponentAtNode)(el);
      el = null;
      resolve(result);
    };

    (0, _reactDom.render)(_react["default"].createElement(_ConfirmModal["default"], _extends({}, props, {
      onClose: handleResolve
    })), el);
  });
};

var _default = confirm;
exports["default"] = _default;