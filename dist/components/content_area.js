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

var _pure2 = require('recompose/pure');

var _pure3 = _interopRequireDefault(_pure2);

var _megadraft = require('megadraft');

var _reactOverlays = require('react-overlays');

var _ModalManager = require('react-overlays/lib/ModalManager');

var _ModalManager2 = _interopRequireDefault(_ModalManager);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _area_actions_toolbar = require('./area_actions_toolbar');

var _area_actions_toolbar2 = _interopRequireDefault(_area_actions_toolbar);

var _content_area_wrapper = require('../containers/content_area_wrapper');

var _content_area_wrapper2 = _interopRequireDefault(_content_area_wrapper);

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

var ContentAreaEditor = (0, _pure3.default)(function (_ref) {
  var readOnly = _ref.readOnly,
      contentId = _ref.contentId,
      isEditing = _ref.isEditing,
      entityInputs = _ref.entityInputs,
      editorState = _ref.editorState,
      setEditorState = _ref.setEditorState,
      megadraftActions = _ref.megadraftActions,
      blockRenderMap = _ref.blockRenderMap,
      _ref$megadraftBlockPl = _ref.megadraftBlockPlugins,
      megadraftBlockPlugins = _ref$megadraftBlockPl === undefined ? [] : _ref$megadraftBlockPl,
      saveAndClose = _ref.saveAndClose,
      saveAndEdit = _ref.saveAndEdit,
      cancelEditing = _ref.cancelEditing,
      locale = _ref.locale,
      copyLocales = _ref.copyLocales,
      copyFromLocale = _ref.copyFromLocale;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(MegadraftEditor, {
      key: '' + contentId + (isEditing ? '_editing' : '') // force rerender
      , editorKey: contentId,
      actions: megadraftActions,
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
});

var ContentArea = (0, _pure3.default)(function (_ref2) {
  var isEditing = _ref2.isEditing,
      entityInputs = _ref2.entityInputs,
      editorState = _ref2.editorState,
      setEditorState = _ref2.setEditorState,
      megadraftActions = _ref2.megadraftActions,
      blockRenderMap = _ref2.blockRenderMap,
      _ref2$megadraftBlockP = _ref2.megadraftBlockPlugins,
      megadraftBlockPlugins = _ref2$megadraftBlockP === undefined ? [] : _ref2$megadraftBlockP,
      contentId = _ref2.contentId,
      className = _ref2.className,
      style = _ref2.style,
      canEdit = _ref2.canEdit,
      blockPluginDialogIsActive = _ref2.blockPluginDialogIsActive,
      startEditing = _ref2.startEditing,
      cancelEditing = _ref2.cancelEditing,
      locale = _ref2.locale,
      saveAndClose = _ref2.saveAndClose,
      saveAndEdit = _ref2.saveAndEdit,
      _ref2$copyLocales = _ref2.copyLocales,
      copyLocales = _ref2$copyLocales === undefined ? [] : _ref2$copyLocales,
      copyFromLocale = _ref2.copyFromLocale;

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

  return _react2.default.createElement(
    _content_area_wrapper2.default,
    {
      className: className,
      style: style,
      canEdit: canEdit,
      isEditing: isEditing,
      startEditing: startEditing
    },
    _react2.default.createElement(ContentAreaEditor, (0, _extends3.default)({
      readOnly: blockPluginDialogIsActive || !canEdit || !isEditing
    }, editorProps))
  );
});

ContentArea.displayName = 'ContentArea';

exports.default = ContentArea;
//# sourceMappingURL=content_area.js.map