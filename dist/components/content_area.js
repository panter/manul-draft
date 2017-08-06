'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _withState2 = require('recompose/withState');

var _withState3 = _interopRequireDefault(_withState2);

var _compose2 = require('recompose/compose');

var _compose3 = _interopRequireDefault(_compose2);

var _megadraft = require('megadraft');

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _area_actions_toolbar = require('./area_actions_toolbar');

var _area_actions_toolbar2 = _interopRequireDefault(_area_actions_toolbar);

var _draggable_window = require('./draggable_window');

var _draggable_window2 = _interopRequireDefault(_draggable_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// quickfix for https://github.com/globocom/megadraft/issues/97
var MegadraftEditor = function (_MegadraftEditorOrg) {
  (0, _inherits3.default)(MegadraftEditor, _MegadraftEditorOrg);

  function MegadraftEditor() {
    (0, _classCallCheck3.default)(this, MegadraftEditor);
    return (0, _possibleConstructorReturn3.default)(this, (MegadraftEditor.__proto__ || (0, _getPrototypeOf2.default)(MegadraftEditor)).apply(this, arguments));
  }

  (0, _createClass3.default)(MegadraftEditor, [{
    key: 'setReadOnly',

    /* eslint class-methods-use-this: 0*/
    value: function setReadOnly() {
      // do nothing
    }
  }]);
  return MegadraftEditor;
}(_megadraft.MegadraftEditor);

var Styles = function Styles(_ref) {
  var highlightEditable = _ref.highlightEditable,
      isEditing = _ref.isEditing;
  return {
    base: (0, _extends3.default)({}, highlightEditable ? {
      outline: '1px dotted black',
      padding: 15,
      margin: -15
    } : {}, isEditing ? {
      outline: '1px dotted black',
      padding: 15,
      margin: -15
    } : {}, {
      cursor: highlightEditable ? 'pointer' : null,
      position: 'relative'
    })
  };
};

var enhance = (0, _compose3.default)((0, _withState3.default)('dimensions', 'setDimensions', function () {
  return { top: 0, left: 0, width: 100, height: 100 };
}), (0, _withState3.default)('editorHasFocus', 'setEditorHasFocus', false));

var ContentArea = enhance(function (_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      canEdit = _ref2.canEdit,
      isEditing = _ref2.isEditing,
      blockPluginDialogIsActive = _ref2.blockPluginDialogIsActive,
      highlightEditable = _ref2.highlightEditable,
      startEditing = _ref2.startEditing,
      cancelEditing = _ref2.cancelEditing,
      entityInputs = _ref2.entityInputs,
      locale = _ref2.locale,
      editorState = _ref2.editorState,
      setEditorState = _ref2.setEditorState,
      saveAndClose = _ref2.saveAndClose,
      saveAndEdit = _ref2.saveAndEdit,
      megadraftActions = _ref2.megadraftActions,
      blockRenderMap = _ref2.blockRenderMap,
      _ref2$megadraftBlockP = _ref2.megadraftBlockPlugins,
      megadraftBlockPlugins = _ref2$megadraftBlockP === undefined ? [] : _ref2$megadraftBlockP,
      _ref2$copyLocales = _ref2.copyLocales,
      copyLocales = _ref2$copyLocales === undefined ? [] : _ref2$copyLocales,
      copyFromLocale = _ref2.copyFromLocale,
      setDimensions = _ref2.setDimensions,
      dimensions = _ref2.dimensions,
      editorHasFocus = _ref2.editorHasFocus,
      setEditorHasFocus = _ref2.setEditorHasFocus;

  var styles = Styles({ highlightEditable: highlightEditable, isEditing: isEditing });

  var renderEditor = function renderEditor(readOnly) {
    return _react2.default.createElement(MegadraftEditor, {
      key: 'contentId' + (isEditing ? '_editing' : '') // force rerender
      , actions: megadraftActions,
      plugins: megadraftBlockPlugins,
      readOnly: readOnly,
      editorState: editorState,
      entityInputs: entityInputs,
      blockRenderMap: blockRenderMap,
      onChange: setEditorState
    });
  };

  return _react2.default.createElement(
    _reactMeasure2.default
    // shouldMeasure={isEditing}
    ,
    { onMeasure: setDimensions
    },
    _react2.default.createElement(
      'div',
      { style: style, className: className },
      _react2.default.createElement(
        'div',
        {
          style: styles.base,
          onClick: function onClick() {
            return canEdit && highlightEditable && startEditing();
          }
        },
        _react2.default.createElement(
          'div',
          { style: highlightEditable ? { pointerEvents: 'none' } : null },
          isEditing && _react2.default.createElement(
            _draggable_window2.default,
            {
              disableDragging: editorHasFocus,
              x: Math.max(20, dimensions.left),
              y: Math.max(20, dimensions.top)
              /* global window*/
              , width: Math.max(280, Math.min(window.innerWidth - 40, dimensions.width)),
              height: Math.max(280, Math.min(window.innerHeight - 40, dimensions.height))
            },
            _react2.default.createElement(
              'div',
              {
                onFocus: function onFocus() {
                  return setEditorHasFocus(true);
                },

                onBlur: function onBlur() {
                  return setEditorHasFocus(false);
                },
                className: 'megadraft-floating-window', style: {
                  display: 'flex',
                  cursor: 'text',
                  flexDirection: 'column',
                  height: 'calc(100% - 50px)'
                }
              },
              renderEditor(blockPluginDialogIsActive || !canEdit || !isEditing),
              _react2.default.createElement(_area_actions_toolbar2.default, {
                saveAndClose: saveAndClose,
                saveAndEdit: saveAndEdit,
                cancelEditing: cancelEditing,
                locale: locale,
                copyLocales: copyLocales,
                copyFromLocale: copyFromLocale
              })
            )
          ),
          renderEditor(true),
          _react2.default.createElement('div', { style: { clear: 'both' } })
        )
      )
    )
  );
});

ContentArea.displayName = 'ContentArea';

exports.default = ContentArea;
//# sourceMappingURL=content_area.js.map