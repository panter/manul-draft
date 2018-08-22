'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _compose2 = require('recompose/compose');

var _compose3 = _interopRequireDefault(_compose2);

var _shouldUpdate2 = require('recompose/shouldUpdate');

var _shouldUpdate3 = _interopRequireDefault(_shouldUpdate2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _manulI18n = require('@panter/manul-i18n');

var _form_entity = require('./form_entity');

var _form_entity2 = _interopRequireDefault(_form_entity);

var _heading = require('./heading');

var _heading2 = _interopRequireDefault(_heading);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var enhance = (0, _compose3.default)((0, _shouldUpdate3.default)(function () {
  return false;
}), // not perfect, but avoids some big troubles with file upload entities or so
(0, _withHandlers3.default)({
  onSubmit: function onSubmit(_ref) {
    var cancelEntity = _ref.cancelEntity,
        setEntity = _ref.setEntity,
        schema = _ref.schema;
    return function (data) {
      cancelEntity();
      setEntity(schema.clean(data));
    };
  }
}));
var FOCUS_FIX = function FOCUS_FIX(event) {
  // dirty workaround for https://github.com/globocom/megadraft/issues/188
  event.target.focus();
};
var DialogEntity = enhance(function (_ref2) {
  var entityType = _ref2.entityType,
      onSubmit = _ref2.onSubmit,
      removeEntity = _ref2.removeEntity,
      schema = _ref2.schema,
      cancelError = _ref2.cancelError,
      cancelEntity = _ref2.cancelEntity,
      setEntity = _ref2.setEntity,
      editorState = _ref2.editorState,
      entity = _ref2.entity,
      onChange = _ref2.onChange,
      setError = _ref2.setError,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['entityType', 'onSubmit', 'removeEntity', 'schema', 'cancelError', 'cancelEntity', 'setEntity', 'editorState', 'entity', 'onChange', 'setError']);

  var formData = schema.clean(props);

  return _react2.default.createElement(
    'div',
    {
      style: {
        padding: 5,
        minWidth: 300
      }
    },
    _react2.default.createElement(
      'div',
      {
        style: {
          backgroundColor: '#ffffff',
          padding: 15
        }
      },
      _react2.default.createElement(
        _heading2.default,
        { style: { marginTop: 0 }, level: 3 },
        _react2.default.createElement(
          _manulI18n.T,
          null,
          'cm.entities.' + entityType + '.label'
        )
      ),
      _react2.default.createElement(_form_entity2.default, {
        i18nNamespace: 'cm.entities.' + entityType,
        additionalActions: _react2.default.createElement(
          _button2.default,
          { small: true, onClick: removeEntity },
          'Remove'
        ),
        model: formData,
        schema: schema,
        autosave: false,
        onClick: FOCUS_FIX,
        onSubmit: onSubmit
      })
    )
  );
});

exports.default = DialogEntity;
//# sourceMappingURL=dialog_entity.js.map