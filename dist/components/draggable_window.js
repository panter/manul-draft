'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactOverlays = require('react-overlays');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRnd = require('react-rnd');

var _reactRnd2 = _interopRequireDefault(_reactRnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ShadowLeft = function ShadowLeft() {
  return _react2.default.createElement('div', {
    style: {
      position: 'absolute',
      width: '40%',
      height: 10,
      left: 12,
      bottom: 12,
      background: 'transparent',

      transform: 'skew(-5deg) rotate(-5deg)',

      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      zIndex: -1
    }
  });
};

var ShadowRight = function ShadowRight() {
  return _react2.default.createElement('div', {
    style: {
      position: 'absolute',
      width: '40%',
      height: 10,
      right: 12,
      bottom: 12,
      background: 'transparent',

      transform: 'skew(5deg) rotate(5deg)',

      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
      zIndex: -1
    }
  });
};

var DraggableWindow = function DraggableWindow(_ref) {
  var children = _ref.children,
      _ref$x = _ref.x,
      x = _ref$x === undefined ? 0 : _ref$x,
      _ref$y = _ref.y,
      y = _ref$y === undefined ? 0 : _ref$y,
      _ref$width = _ref.width,
      width = _ref$width === undefined ? 300 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === undefined ? 300 : _ref$height,
      disableDragging = _ref.disableDragging;
  return _react2.default.createElement(
    _reactOverlays.Modal,
    { show: true },
    _react2.default.createElement(
      'div',
      { style: { position: 'fixed', left: 0, top: 0, bottom: 0, right: 0 } },
      _react2.default.createElement(
        _reactRnd2.default,
        {
          disableDragging: disableDragging,
          'default': {
            x: x, y: y, width: width, height: height
          },
          style: {
            backgroundColor: 'white',
            padding: 20,
            boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1)'
          }
        },
        _react2.default.createElement(ShadowLeft, null),
        _react2.default.createElement(ShadowRight, null),
        children
      )
    )
  );
};

exports.default = DraggableWindow;
//# sourceMappingURL=draggable_window.js.map