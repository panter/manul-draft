'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _entity_form = require('./components/entity_form');

var _entity_form2 = _interopRequireDefault(_entity_form);

var _wrap_in_simpleschema = require('./utils/wrap_in_simpleschema');

var _wrap_in_simpleschema2 = _interopRequireDefault(_wrap_in_simpleschema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var schema = _ref.schema;

  var FormEntityInput = function FormEntityInput(props) {
    return _react2.default.createElement(_entity_form2.default, (0, _extends3.default)({}, props, { schema: (0, _wrap_in_simpleschema2.default)(schema) }));
  };
  FormEntityInput.displayName = 'FormEntityInput';
  return FormEntityInput;
};
//# sourceMappingURL=create_form_entity_input.js.map