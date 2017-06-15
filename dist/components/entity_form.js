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

var EntityForm = function EntityForm(_ref) {
  var entityType = _ref.entityType,
      setEntity = _ref.setEntity,
      cancelEntity = _ref.cancelEntity,
      removeEntity = _ref.removeEntity,
      schema = _ref.schema,
      props = (0, _objectWithoutProperties3.default)(_ref, ['entityType', 'setEntity', 'cancelEntity', 'removeEntity', 'schema']);

  var dataMap = new _immutable2.default.Map(props);
  return _react2.default.createElement(
    'div',
    {
      style: {
        padding: 5,
        minWidth: 240
      }
    },
    _react2.default.createElement(
      'div',
      {
        style: {
          backgroundColor: 'white',
          padding: 15
        }
      },
      _react2.default.createElement(
        _heading2.default,
        { style: { marginTop: 0 }, level: 3 },
        _react2.default.createElement(
          _manulI18n.T,
          null,
          'cm.entities.' + entityType
        )
      ),
      _react2.default.createElement(_form_entity2.default, {
        additionalActions: _react2.default.createElement(
          _button2.default,
          { small: true, onClick: removeEntity },
          'Remove'
        ),
        dataMap: dataMap.toJS(),
        schema: schema,
        autosave: false,
        onSubmit: function onSubmit(data) {
          cancelEntity();
          setEntity(schema.clean(data));
        }
      })
    )
  );
};

exports.default = EntityForm;
//# sourceMappingURL=entity_form.js.map