'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _dialog_entity = require('./components/dialog_entity');

var _dialog_entity2 = _interopRequireDefault(_dialog_entity);

var _wrap_in_simpleschema = require('./utils/wrap_in_simpleschema');

var _wrap_in_simpleschema2 = _interopRequireDefault(_wrap_in_simpleschema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var schema = _ref.schema;

  var FormEntityInput = function FormEntityInput(props) {
    return _react2.default.createElement(
      _reactDraggable2.default,
      null,
      _react2.default.createElement(_dialog_entity2.default, (0, _extends3.default)({}, props, { schema: (0, _wrap_in_simpleschema2.default)(schema) }))
    );
  };
  FormEntityInput.displayName = 'FormEntityInput';
  return FormEntityInput;
};
//# sourceMappingURL=create_form_entity_input.js.map