'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

var _dialog_plugin = require('./dialog_plugin');

var _dialog_plugin2 = _interopRequireDefault(_dialog_plugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Styles = function Styles(_ref) {
  var windowWidth = _ref.windowWidth,
      showDialog = _ref.showDialog,
      _ref$dimensions = _ref.dimensions,
      dimensions = _ref$dimensions === undefined ? {} : _ref$dimensions;

  var margin = 15;
  var dialogWidth = 320;
  var dialogLeftPositionMax = dimensions.width + margin;
  var dialogLeftPositionMin = windowWidth - dimensions.left - dialogWidth - margin;
  var dialogLeftPosition = Math.min(dialogLeftPositionMax, dialogLeftPositionMin);
  return {
    base: {
      position: 'relative'
      // zIndex: showDialog ? 1000 : null,
    },
    content: {
      // ...theme.misc.defaultTransition,
      // ...(showDialog ? theme.borders.editingHighlightingActive() : {}),
      cursor: 'pointer',
      position: 'relative',

      ':hover': {
        // ...(!hasCustomHover ? { ...theme.borders.editingHighlighting() } : {}),
      }
    },
    dialog: {
      // ...theme.misc.defaultTransition,
      position: 'absolute',
      opacity: showDialog ? 1 : 0,
      zIndex: 10,
      width: dialogWidth,
      left: dialogLeftPosition || 0,
      // ...theme.borders.editingHighlightingActive(),
      border: '1px solid black',
      boxShadow: '2px 2px 8px #333',
      visibility: showDialog ? 'visible' : 'hidden',
      backgroundColor: 'white',
      padding: 10
    }
  };
};

var PluginEditableComponent = function PluginEditableComponent(_ref2) {
  var i18nNamespace = _ref2.i18nNamespace,
      schema = _ref2.schema,
      hasCustomHover = _ref2.hasCustomHover,
      setDimensions = _ref2.setDimensions,
      setShowDialog = _ref2.setShowDialog,
      cancel = _ref2.cancel,
      remove = _ref2.remove,
      updateData = _ref2.updateData,
      dataMap = _ref2.dataMap,
      children = _ref2.children,
      showDialog = _ref2.showDialog,
      _ref2$dimensions = _ref2.dimensions,
      dimensions = _ref2$dimensions === undefined ? {} : _ref2$dimensions,
      windowWidth = _ref2.windowWidth;

  var styles = Styles({
    showDialog: showDialog,
    dimensions: dimensions,
    hasCustomHover: hasCustomHover,
    windowWidth: windowWidth
  });

  if (!children) return null;
  return _react2.default.createElement(
    'div',
    { style: styles.base },
    showDialog && _react2.default.createElement(
      _reactDraggable2.default
      // see https://github.com/mzabriskie/react-draggable/issues/315
      ,
      { enableUserSelectHack: false
      },
      _react2.default.createElement(
        'div',
        { style: styles.dialog },
        _react2.default.createElement(_dialog_plugin2.default, {
          cancel: cancel,
          dataMap: dataMap,
          remove: remove,
          i18nNamespace: i18nNamespace,
          updateData: updateData,
          schema: schema
        })
      )
    ),
    _react2.default.createElement(
      'div',
      {
        style: styles.content,
        onClick: function onClick(e) {
          e.stopPropagation();
          setShowDialog(!showDialog);
        }
      },
      _react2.default.createElement(
        'div',
        {
          style: {
            outline: showDialog && '1px dotted black',
            pointerEvents: !hasCustomHover && 'none'
          }
        },
        _react2.default.createElement(
          _reactMeasure2.default,
          { shouldMeasure: showDialog, onMeasure: setDimensions },
          _react2.default.createElement(
            _react.Fragment,
            null,
            children,
            _react2.default.createElement('div', null)
          )
        )
      )
    )
  );
};

exports.default = PluginEditableComponent;
//# sourceMappingURL=plugin_editable_component.js.map