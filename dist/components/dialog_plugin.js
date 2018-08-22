'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _shouldUpdate2 = require('recompose/shouldUpdate');

var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);

var _isEqual2 = require('lodash/fp/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _manulI18n = require('@panter/manul-i18n');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _button_group = require('./button_group');

var _button_group2 = _interopRequireDefault(_button_group);

var _form_plugin = require('./form_plugin');

var _form_plugin2 = _interopRequireDefault(_form_plugin);

var _heading_dialog = require('./heading_dialog');

var _heading_dialog2 = _interopRequireDefault(_heading_dialog);

var _component_from_context_or = require('../component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogContentWrapper = function DialogContentWrapper(_ref) {
  var children = _ref.children;
  return _react2.default.createElement(
    'div',
    {
      style: {
        maxHeight: '60vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }
    },
    children
  );
};

var DialogPlugin = (0, _shouldUpdate3.default)(
// we need that because draftjs/megadraft update quite often
// which messes with things like the file-picker-dialog from the browser
function (props, nextProps) {
  return !(0, _isEqual3.default)(props.dataMap, nextProps.dataMap);
})((0, _component_from_context_or2.default)('DialogPlugin', function (_ref2) {
  var i18nNamespace = _ref2.i18nNamespace,
      dataMap = _ref2.dataMap,
      schema = _ref2.schema,
      cancel = _ref2.cancel,
      remove = _ref2.remove,
      updateData = _ref2.updateData;
  return _react2.default.createElement(
    DialogContentWrapper,
    null,
    _react2.default.createElement(
      _heading_dialog2.default,
      null,
      _react2.default.createElement(
        _manulI18n.T,
        null,
        i18nNamespace + '.label'
      )
    ),
    _react2.default.createElement(
      _button_group2.default,
      null,
      _react2.default.createElement(
        _button2.default,
        { onClick: remove },
        'Delete'
      ),
      _react2.default.createElement(
        _button2.default,
        { onClick: cancel },
        'Close'
      )
    ),
    schema && _react2.default.createElement(_form_plugin2.default, {
      i18nNamespace: i18nNamespace,
      autosave: true,
      model: dataMap.toJS(),
      schema: schema,
      onSubmit: updateData
    })
  );
}));

exports.default = DialogPlugin;
//# sourceMappingURL=dialog_plugin.js.map