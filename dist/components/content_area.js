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

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _megadraft = require('megadraft');

var _area_actions_toolbar = require('./area_actions_toolbar');

var _area_actions_toolbar2 = _interopRequireDefault(_area_actions_toolbar);

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

var ContentArea = function ContentArea(_ref2) {
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
      copyFromLocale = _ref2.copyFromLocale;

  var styles = Styles({ highlightEditable: highlightEditable, isEditing: isEditing });

  return _react2.default.createElement(
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
        isEditing && _react2.default.createElement(_area_actions_toolbar2.default, {
          saveAndClose: saveAndClose,
          saveAndEdit: saveAndEdit,
          cancelEditing: cancelEditing,
          locale: locale,
          copyLocales: copyLocales,
          copyFromLocale: copyFromLocale
        }),
        _react2.default.createElement(MegadraftEditor, {
          key: 'contentId' + (isEditing ? '_editing' : '') // force rerender
          , actions: megadraftActions,
          plugins: megadraftBlockPlugins,
          readOnly: blockPluginDialogIsActive || !canEdit || !isEditing,
          editorState: editorState,
          entityInputs: entityInputs,
          blockRenderMap: blockRenderMap,
          onChange: function onChange(state) {
            setEditorState(state);
          }
        }),
        _react2.default.createElement('div', { style: { clear: 'both' } })
      )
    )
  );
};

ContentArea.displayName = 'ContentArea';

exports.default = ContentArea;
//# sourceMappingURL=content_area.js.map