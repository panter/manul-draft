'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.i18nComposer = exports.stateComposer = exports.dataComposer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _mapValues2 = require('lodash/fp/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _keyBy2 = require('lodash/fp/keyBy');

var _keyBy3 = _interopRequireDefault(_keyBy2);

var _get2 = require('lodash/fp/get');

var _get3 = _interopRequireDefault(_get2);

var _flow2 = require('lodash/fp/flow');

var _flow3 = _interopRequireDefault(_flow2);

var _isEmpty2 = require('lodash/fp/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _filter2 = require('lodash/fp/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _keys2 = require('lodash/fp/keys');

var _keys3 = _interopRequireDefault(_keys2);

var _defer2 = require('lodash/fp/defer');

var _defer3 = _interopRequireDefault(_defer2);

var _invoke2 = require('lodash/fp/invoke');

var _invoke3 = _interopRequireDefault(_invoke2);

var _any2 = require('lodash/fp/any');

var _any3 = _interopRequireDefault(_any2);

var _onlyUpdateForKeys2 = require('recompose/onlyUpdateForKeys');

var _onlyUpdateForKeys3 = _interopRequireDefault(_onlyUpdateForKeys2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _withPropsOnChange2 = require('recompose/withPropsOnChange');

var _withPropsOnChange3 = _interopRequireDefault(_withPropsOnChange2);

var _withState2 = require('recompose/withState');

var _withState3 = _interopRequireDefault(_withState2);

var _withProps2 = require('recompose/withProps');

var _withProps3 = _interopRequireDefault(_withProps2);

var _megadraft = require('megadraft');

var _mantraCore = require('@storybook/mantra-core');

var _content_area = require('../components/content_area');

var _content_area2 = _interopRequireDefault(_content_area);

var _composeWithTracker = require('../utils/composeWithTracker');

var _composeWithTracker2 = _interopRequireDefault(_composeWithTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dataComposer = exports.dataComposer = function dataComposer(_ref, onData) {
  var context = _ref.context,
      contentId = _ref.contentId,
      _ref$entities = _ref.entities,
      entities = _ref$entities === undefined ? [] : _ref$entities,
      _ref$sampleContent = _ref.sampleContent,
      sampleContent = _ref$sampleContent === undefined ? null : _ref$sampleContent;

  var _context = context(),
      Meteor = _context.Meteor,
      Collections = _context.Collections,
      i18n = _context.i18n;

  var contentLoaded = Meteor.subscribe('contents.one', contentId).ready();
  var locale = i18n.getLocale();
  var content = Collections.Contents.findOne(contentId);

  if (contentLoaded) {
    var initialEditorState = (0, _megadraft.editorStateFromRaw)(content ? (0, _get3.default)('value.' + locale, content) : sampleContent, new _megadraft.DraftJS.CompositeDecorator(entities || []));
    onData(null, { content: content, locale: locale, initialEditorState: initialEditorState });
  }
};

var stateComposer = exports.stateComposer = function stateComposer(_ref2, onData) {
  var context = _ref2.context,
      contentId = _ref2.contentId;

  var _context2 = context(),
      LocalState = _context2.LocalState,
      Roles = _context2.Roles,
      Meteor = _context2.Meteor;

  var canEdit = Roles.userIsInRole(Meteor.userId(), 'admin');
  var cancelEditing = function cancelEditing() {
    return LocalState.delete('cm.editingMode');
  };
  var isEditing = LocalState.equals('cm.editingMode', contentId);
  var startEditing = function startEditing() {
    return LocalState.set('cm.editingMode', contentId);
  };
  onData(null, { canEdit: canEdit, isEditing: isEditing, cancelEditing: cancelEditing, startEditing: startEditing });
};

var i18nComposer = exports.i18nComposer = function i18nComposer(_ref3, onData) {
  var context = _ref3.context,
      content = _ref3.content,
      editorState = _ref3.editorState,
      setEditorState = _ref3.setEditorState;

  var _context3 = context(),
      manulDraft = _context3.manulDraft;

  var highlightEditable = (0, _invoke3.default)('highlightEditable', manulDraft);
  // keys in value are locales where we can copy from
  var copyLocales = content && (0, _flow3.default)(_keys3.default, (0, _filter3.default)(function (locale) {
    return !(0, _isEmpty3.default)((0, _get3.default)(['value', locale], content));
  }))(content.value);

  var copyFromLocale = function copyFromLocale(fromLocale) {
    // clone the content
    var fromContent = (0, _get3.default)('value.' + fromLocale, content);
    if (fromContent) {
      // some draftjs voodoo to insert the rawContent into the current selection
      var newContentState = _megadraft.DraftJS.convertFromRaw(fromContent);
      var newContent = _megadraft.DraftJS.Modifier.replaceWithFragment(editorState.getCurrentContent(), editorState.getSelection(), newContentState.getBlockMap());
      var newEditorState = _megadraft.DraftJS.EditorState.push(editorState, newContent, 'insert-fragment');
      setEditorState(newEditorState);
    }
  };
  onData(null, { copyLocales: copyLocales, highlightEditable: highlightEditable, copyFromLocale: copyFromLocale });
};

var depsMapper = exports.depsMapper = function depsMapper(_context4, actions) {
  return (0, _extends3.default)({
    context: function context() {
      return _context4;
    },
    save: actions.cm.save
  }, _context4.manulDraft);
};

exports.default = (0, _mantraCore.composeAll)((0, _composeWithTracker2.default)(i18nComposer),
// wait for https://github.com/acdlite/recompose/issues/259
// this here is a dirty workaround
(0, _withPropsOnChange3.default)(['initialEditorState'], function (_ref4) {
  var initialEditorState = _ref4.initialEditorState,
      setEditorState = _ref4.setEditorState;

  /* eslint lodash-fp/no-unused-result: 0*/
  (0, _defer3.default)(function () {
    return setEditorState(initialEditorState);
  });
}), (0, _withHandlers3.default)({
  saveAndClose: function saveAndClose(_ref5) {
    var save = _ref5.save,
        cancelEditing = _ref5.cancelEditing,
        editorState = _ref5.editorState,
        contentId = _ref5.contentId,
        locale = _ref5.locale;
    return function () {
      save({
        contentId: contentId,
        locale: locale,
        editor: _megadraft.DraftJS.convertToRaw(editorState.getCurrentContent())
      }, function (error) {
        return !error && cancelEditing(false);
      });
    };
  },
  saveAndEdit: function saveAndEdit(_ref6) {
    var save = _ref6.save,
        editorState = _ref6.editorState,
        contentId = _ref6.contentId,
        locale = _ref6.locale;
    return function () {
      save({
        contentId: contentId,
        locale: locale,
        editor: _megadraft.DraftJS.convertToRaw(editorState.getCurrentContent())
      });
    };
  },
  cancel: function cancel(_ref7) {
    var cancelEditing = _ref7.cancelEditing,
        setEditorState = _ref7.setEditorState,
        initialEditorState = _ref7.initialEditorState;
    return function () {
      setEditorState(initialEditorState);
      cancelEditing(false);
    };
  }
}), (0, _withProps3.default)(function (_ref8) {
  var editorState = _ref8.editorState;
  return {
    blockPluginDialogIsActive: (0, _any3.default)(function (block) {
      return block.getData().get('showDialog');
    })(editorState.getCurrentContent().getBlocksAsArray())
  };
}), (0, _withState3.default)('editorState', 'setEditorState', function (_ref9) {
  var initialEditorState = _ref9.initialEditorState;
  return initialEditorState;
}), (0, _composeWithTracker2.default)(dataComposer), (0, _withProps3.default)(function (_ref10) {
  var _ref10$blockPluginPro = _ref10.blockPluginProps,
      blockPluginProps = _ref10$blockPluginPro === undefined ? {} : _ref10$blockPluginPro,
      isEditing = _ref10.isEditing,
      _ref10$entities = _ref10.entities,
      entities = _ref10$entities === undefined ? [] : _ref10$entities,
      _ref10$blockPlugins = _ref10.blockPlugins,
      blockPlugins = _ref10$blockPlugins === undefined ? [] : _ref10$blockPlugins;
  return {
    megadraftBlockPlugins: blockPlugins.map(function (plugin) {
      return plugin({ isEditing: isEditing, blockPluginProps: blockPluginProps });
    }),
    entityInputs: (0, _flow3.default)((0, _keyBy3.default)('_id'), (0, _mapValues3.default)(function (e) {
      return e.inputComponent;
    }))(entities)
  };
}), (0, _composeWithTracker2.default)(stateComposer), (0, _mantraCore.useDeps)(depsMapper), (0, _onlyUpdateForKeys3.default)(['contentId']))(_content_area2.default);
//# sourceMappingURL=content_area.js.map