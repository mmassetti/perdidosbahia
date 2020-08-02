"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConfirmModal = function ConfirmModal(_ref) {
  var onClose = _ref.onClose,
      message = _ref.message,
      title = _ref.title,
      confirmText = _ref.confirmText,
      cancelText = _ref.cancelText,
      confirmColor = _ref.confirmColor,
      cancelColor = _ref.cancelColor,
      className = _ref.className,
      buttonsComponent = _ref.buttonsComponent,
      size = _ref.size;

  var buttonsContent = _react["default"].createElement(_react["default"].Fragment, null, cancelText && _react["default"].createElement(_reactstrap.Button, {
    color: cancelColor,
    onClick: function onClick() {
      return onClose(false);
    }
  }, cancelText), ' ', _react["default"].createElement(_reactstrap.Button, {
    color: confirmColor,
    onClick: function onClick() {
      return onClose(true);
    }
  }, confirmText));

  if (buttonsComponent) {
    var CustomComponent = buttonsComponent;
    buttonsContent = _react["default"].createElement(CustomComponent, {
      onClose: onClose
    });
  }

  return _react["default"].createElement(_reactstrap.Modal, {
    size: size,
    isOpen: true,
    toggle: function toggle() {
      return onClose(false);
    },
    className: "reactstrap-confirm ".concat(className)
  }, title && _react["default"].createElement(_reactstrap.ModalHeader, {
    toggle: function toggle() {
      return onClose(false);
    }
  }, title || null), _react["default"].createElement(_reactstrap.ModalBody, null, message), _react["default"].createElement(_reactstrap.ModalFooter, null, buttonsContent));
};

ConfirmModal.defaultProps = {
  message: 'Are you sure?',
  title: 'Warning!',
  confirmText: 'Ok',
  cancelText: 'Cancel',
  confirmColor: 'primary',
  cancelColor: '',
  className: '',
  buttonsComponent: null,
  size: null
};
ConfirmModal.propTypes = {
  onClose: _propTypes["default"].func.isRequired,
  message: _propTypes["default"].node,
  title: _propTypes["default"].node,
  confirmText: _propTypes["default"].node,
  cancelText: _propTypes["default"].node,
  confirmColor: _propTypes["default"].string,
  cancelColor: _propTypes["default"].string,
  className: _propTypes["default"].string,
  size: _propTypes["default"].string,
  buttonsComponent: _propTypes["default"].func
};
var _default = ConfirmModal;
exports["default"] = _default;