'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _manulI18n = require('@panter/manul-i18n');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _form_entity = require('./form_entity');

var _form_entity2 = _interopRequireDefault(_form_entity);

var _heading = require('./heading');

var _heading2 = _interopRequireDefault(_heading);

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogEntity = function DialogEntity(_ref) {
  var entityType = _ref.entityType,
      setEntity = _ref.setEntity,
      cancelEntity = _ref.cancelEntity,
      removeEntity = _ref.removeEntity,
      schema = _ref.schema,
      props = (0, _objectWithoutProperties3.default)(_ref, ['entityType', 'setEntity', 'cancelEntity', 'removeEntity', 'schema']);

  var dataMap = new _immutable2.default.Map(props);
  var formRef = void 0;
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
        innerRef: function innerRef(el) {
          return formRef = el;
        },
        i18nNamespace: 'cm.entities.' + entityType,
        additionalActions: _react2.default.createElement(
          _button2.default,
          {
            small: true,
            onClick: function onClick() {
              removeEntity();
            }
          },
          'Remove'
        ),
        model: dataMap.toJS(),
        schema: schema,
        autosave: false,
        onClick: function onClick(event) {
          // dirty workaround for https://github.com/globocom/megadraft/issues/188
          event.target.focus();
        },
        onSubmit: function onSubmit(data) {
          cancelEntity();
          setEntity(schema.clean(data));
        }
      })
    )
  );
};

exports.default = DialogEntity;
//# sourceMappingURL=dialog_entity.js.map