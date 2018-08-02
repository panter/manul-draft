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

var _reactOverlays = require('react-overlays');

var _ModalManager = require('react-overlays/lib/ModalManager');

var _ModalManager2 = _interopRequireDefault(_ModalManager);

var _reactMeasure = require('react-measure');

var _reactMeasure2 = _interopRequireDefault(_reactMeasure);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

var enhance = (0, _compose3.default)((0, _withState3.default)('dimensions', 'setDimensions', function () {
  return {
    top: 0,
    left: 0,
    width: 100,
    height: 100
  };
}), (0, _withState3.default)('editorHasFocus', 'setEditorHasFocus', false));

var ContentAreaWrapper = function ContentAreaWrapper(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      canEdit = _ref2.canEdit,
      isEditing = _ref2.isEditing,
      blockPluginDialogIsActive = _ref2.blockPluginDialogIsActive,
      highlightEditable = _ref2.highlightEditable,
      startEditing = _ref2.startEditing,
      cancelEditing = _ref2.cancelEditing,
      locale = _ref2.locale,
      saveAndClose = _ref2.saveAndClose,
      saveAndEdit = _ref2.saveAndEdit,
      _ref2$copyLocales = _ref2.copyLocales,
      copyLocales = _ref2$copyLocales === undefined ? [] : _ref2$copyLocales,
      copyFromLocale = _ref2.copyFromLocale,
      setDimensions = _ref2.setDimensions,
      dimensions = _ref2.dimensions,
      editorHasFocus = _ref2.editorHasFocus,
      setEditorHasFocus = _ref2.setEditorHasFocus,
      editorReadOnly = _ref2.editorReadOnly,
      editor = _ref2.editor;

  var styles = Styles({ highlightEditable: highlightEditable, isEditing: isEditing });

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
          !blockPluginDialogIsActive && canEdit && isEditing ? editor : editorReadOnly,
          _react2.default.createElement('div', { style: { clear: 'both' } })
        )
      )
    )
  );
};

var ContentAreaEditor = function ContentAreaEditor(_ref3) {
  var readOnly = _ref3.readOnly,
      contentId = _ref3.contentId,
      isEditing = _ref3.isEditing,
      entityInputs = _ref3.entityInputs,
      editorState = _ref3.editorState,
      setEditorState = _ref3.setEditorState,
      megadraftActions = _ref3.megadraftActions,
      blockRenderMap = _ref3.blockRenderMap,
      _ref3$megadraftBlockP = _ref3.megadraftBlockPlugins,
      megadraftBlockPlugins = _ref3$megadraftBlockP === undefined ? [] : _ref3$megadraftBlockP,
      saveAndClose = _ref3.saveAndClose,
      saveAndEdit = _ref3.saveAndEdit,
      cancelEditing = _ref3.cancelEditing,
      locale = _ref3.locale,
      copyLocales = _ref3.copyLocales,
      copyFromLocale = _ref3.copyFromLocale;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(MegadraftEditor, {
      key: '' + contentId + (isEditing ? '_editing' : '') // force rerender
      , actions: megadraftActions,
      plugins: megadraftBlockPlugins,
      readOnly: readOnly,
      editorState: editorState,
      entityInputs: entityInputs,
      blockRenderMap: blockRenderMap,
      onChange: setEditorState

    }),
    isEditing && _react2.default.createElement(
      _reactOverlays.Modal,
      {
        manager: new _ModalManager2.default({ handleContainerOverflow: false }),
        backdrop: false,
        show: true,
        autoFocus: false,
        style: {
          position: 'fixed',
          backgroundColor: '#ffffff99',
          zIndex: 100,
          bottom: 0,
          left: 0,
          right: 0
        }
      },
      _react2.default.createElement(_area_actions_toolbar2.default, {
        saveAndClose: saveAndClose,
        saveAndEdit: saveAndEdit,
        cancelEditing: cancelEditing,
        locale: locale,
        copyLocales: copyLocales,
        copyFromLocale: copyFromLocale
      })
    )
  );
};

var ContentArea = enhance(function (_ref4) {
  var isEditing = _ref4.isEditing,
      entityInputs = _ref4.entityInputs,
      editorState = _ref4.editorState,
      setEditorState = _ref4.setEditorState,
      megadraftActions = _ref4.megadraftActions,
      blockRenderMap = _ref4.blockRenderMap,
      _ref4$megadraftBlockP = _ref4.megadraftBlockPlugins,
      megadraftBlockPlugins = _ref4$megadraftBlockP === undefined ? [] : _ref4$megadraftBlockP,
      contentId = _ref4.contentId,
      className = _ref4.className,
      style = _ref4.style,
      canEdit = _ref4.canEdit,
      blockPluginDialogIsActive = _ref4.blockPluginDialogIsActive,
      highlightEditable = _ref4.highlightEditable,
      startEditing = _ref4.startEditing,
      cancelEditing = _ref4.cancelEditing,
      locale = _ref4.locale,
      saveAndClose = _ref4.saveAndClose,
      saveAndEdit = _ref4.saveAndEdit,
      _ref4$copyLocales = _ref4.copyLocales,
      copyLocales = _ref4$copyLocales === undefined ? [] : _ref4$copyLocales,
      copyFromLocale = _ref4.copyFromLocale,
      setDimensions = _ref4.setDimensions,
      dimensions = _ref4.dimensions,
      editorHasFocus = _ref4.editorHasFocus,
      setEditorHasFocus = _ref4.setEditorHasFocus;

  var editorProps = {
    contentId: contentId,
    isEditing: isEditing,
    entityInputs: entityInputs,
    editorState: editorState,
    setEditorState: setEditorState,
    megadraftActions: megadraftActions,
    blockRenderMap: blockRenderMap,
    megadraftBlockPlugins: megadraftBlockPlugins,
    saveAndClose: saveAndClose,
    saveAndEdit: saveAndEdit,
    cancelEditing: cancelEditing,
    locale: locale,
    copyLocales: copyLocales,
    copyFromLocale: copyFromLocale
  };
  var wrapperProps = {
    className: className,
    style: style,
    canEdit: canEdit,
    isEditing: isEditing,
    blockPluginDialogIsActive: blockPluginDialogIsActive,
    highlightEditable: highlightEditable,
    startEditing: startEditing,
    cancelEditing: cancelEditing,

    locale: locale,

    saveAndClose: saveAndClose,
    saveAndEdit: saveAndEdit,
    copyLocales: copyLocales,
    copyFromLocale: copyFromLocale,
    setDimensions: setDimensions,
    dimensions: dimensions,
    editorHasFocus: editorHasFocus,
    setEditorHasFocus: setEditorHasFocus
  };

  return _react2.default.createElement(ContentAreaWrapper, (0, _extends3.default)({}, wrapperProps, {
    editor: _react2.default.createElement(ContentAreaEditor, editorProps),
    editorReadOnly: _react2.default.createElement(ContentAreaEditor, (0, _extends3.default)({ readOnly: true }, editorProps))
  }));
});

ContentArea.displayName = 'ContentArea';

exports.default = ContentArea;
//# sourceMappingURL=content_area.js.map