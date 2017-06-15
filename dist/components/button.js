'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _component_from_context_or = require('../component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _component_from_context_or2.default)('Button', function (_ref) {
  var children = _ref.children,
      onClick = _ref.onClick;
  return _react2.default.createElement(
    'button',
    { type: 'button', onClick: onClick },
    children
  );
});
//# sourceMappingURL=button.js.map