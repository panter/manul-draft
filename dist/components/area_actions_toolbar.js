'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button_action_bar = require('./button_action_bar');

var _button_action_bar2 = _interopRequireDefault(_button_action_bar);

var _button_group = require('./button_group');

var _button_group2 = _interopRequireDefault(_button_group);

var _component_from_context_or = require('../component_from_context_or');

var _component_from_context_or2 = _interopRequireDefault(_component_from_context_or);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AreaActionsToolbar = (0, _component_from_context_or2.default)('AreaActionsToolbar', function (_ref) {
  var saveAndClose = _ref.saveAndClose,
      saveAndEdit = _ref.saveAndEdit,
      cancelEditing = _ref.cancelEditing,
      locale = _ref.locale,
      copyLocales = _ref.copyLocales,
      copyFromLocale = _ref.copyFromLocale;
  return _react2.default.createElement(
    'div',
    {
      style: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        padding: 5,
        minHeight: 50,
        borderTop: '1px solid black'
      }
    },
    _react2.default.createElement(
      _button_group2.default,
      null,
      _react2.default.createElement(
        _button_action_bar2.default,
        { black: true, onClick: saveAndClose },
        'Save and close'
      ),
      _react2.default.createElement(
        _button_action_bar2.default,
        { onClick: saveAndEdit },
        'Save'
      ),
      _react2.default.createElement(
        _button_action_bar2.default,
        { onClick: cancelEditing },
        'cancel'
      )
    ),
    _react2.default.createElement(
      'div',
      {
        style: {
          marginLeft: 'auto'
        }
      },
      _react2.default.createElement(
        _button_group2.default,
        null,
        copyLocales.map(function (aLocale) {
          return aLocale !== locale && _react2.default.createElement(
            _button_action_bar2.default,
            {
              variant: 'primary',
              key: aLocale,
              onClick: function onClick() {
                return copyFromLocale(aLocale);
              }
            },
            _react2.default.createElement(
              'span',
              null,
              '\uD83D\uDCD1 ',
              aLocale
            )
          );
        })
      )
    )
  );
});

exports.default = AreaActionsToolbar;
//# sourceMappingURL=area_actions_toolbar.js.map