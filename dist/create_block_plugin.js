'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _pure2 = require('recompose/pure');

var _pure3 = _interopRequireDefault(_pure2);

var _withHandlers2 = require('recompose/withHandlers');

var _withHandlers3 = _interopRequireDefault(_withHandlers2);

var _manulI18n = require('@panter/manul-i18n');

var _megadraft = require('megadraft');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _button_add_plugin = require('./components/button_add_plugin');

var _button_add_plugin2 = _interopRequireDefault(_button_add_plugin);

var _plugin_editable_component = require('./containers/plugin_editable_component');

var _plugin_editable_component2 = _interopRequireDefault(_plugin_editable_component);

var _wrap_in_simpleschema = require('./utils/wrap_in_simpleschema');

var _wrap_in_simpleschema2 = _interopRequireDefault(_wrap_in_simpleschema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlockComponent = function BlockComponent(_ref) {
  var isEditing = _ref.isEditing,
      Component = _ref.Component,
      blockPluginProps = _ref.blockPluginProps,
      data = _ref.data,
      container = _ref.container,
      schema = _ref.schema,
      i18nNamespace = _ref.i18nNamespace,
      hasCustomHover = _ref.hasCustomHover;

  // show the render-component when not in editmode
  if (!isEditing) {
    return _react2.default.createElement(Component, (0, _extends3.default)({}, blockPluginProps, data));
  }
  var dataMap = _immutable2.default.fromJS(data);

  return _react2.default.createElement(
    _plugin_editable_component2.default,
    {
      schema: schema,
      i18nNamespace: i18nNamespace,
      dataMap: dataMap,
      container: container,
      hasCustomHover: hasCustomHover
    },
    _react2.default.createElement(Component, (0, _extends3.default)({}, blockPluginProps, data, { isEditing: true }))
  );
};

var ButtonComponent = (0, _pure3.default)((0, _withHandlers3.default)({
  onClick: function onClick(_ref2) {
    var onChange = _ref2.onChange,
        type = _ref2.type,
        schema = _ref2.schema,
        showDialogInitially = _ref2.showDialogInitially,
        editorState = _ref2.editorState;
    return function (e) {
      e.preventDefault();
      var data = (0, _extends3.default)({
        type: type,
        showDialog: showDialogInitially
      }, schema ? schema.clean({}) : {});

      // Calls the onChange method with the new state.
      onChange((0, _megadraft.insertDataBlock)(editorState, data));
    };
  }
})(function (_ref3) {
  var i18nNamespace = _ref3.i18nNamespace,
      onClick = _ref3.onClick;
  return _react2.default.createElement(
    _button_add_plugin2.default,
    { onClick: onClick },
    _react2.default.createElement(_manulI18n.T, { _id: [i18nNamespace + '.add', i18nNamespace + '.label'] })
  );
}));
/* eslint react/display-name: 0*/

exports.default = function (_ref4) {
  var type = _ref4.type,
      _ref4$i18nNamespace = _ref4.i18nNamespace,
      i18nNamespace = _ref4$i18nNamespace === undefined ? 'cm.' + type : _ref4$i18nNamespace,
      _ref4$schema = _ref4.schema,
      schemaDef = _ref4$schema === undefined ? null : _ref4$schema,
      Component = _ref4.Component,
      hasCustomHover = _ref4.hasCustomHover;
  return function (_ref5) {
    var blockPluginProps = _ref5.blockPluginProps,
        isEditing = _ref5.isEditing;

    var schema = schemaDef && (0, _wrap_in_simpleschema2.default)(schemaDef);
    var PureComponent = (0, _pure3.default)(Component);
    var showDialogInitially = Boolean(schema); // if has schema

    return {
      // A unique plugin name used to identify the plugin and its blocks
      type: type,
      // React component to be rendered in the block sidebar
      buttonComponent: function buttonComponent(_ref6) {
        var onChange = _ref6.onChange,
            editorState = _ref6.editorState;
        return _react2.default.createElement(ButtonComponent, {
          showDialogInitially: showDialogInitially,
          i18nNamespace: i18nNamespace,
          onChange: onChange,
          editorState: editorState,
          type: type,
          schema: schema
        });
      },
      // React component for rendering the content block
      blockComponent: function blockComponent(_ref7) {
        var data = _ref7.data,
            container = _ref7.container;
        return _react2.default.createElement(BlockComponent, {
          key: isEditing,
          schema: schema,
          isEditing: isEditing,
          data: data,
          container: container,
          Component: PureComponent,
          blockPluginProps: blockPluginProps,
          hasCustomHover: hasCustomHover,
          i18nNamespace: i18nNamespace
        });
      }
    };
  };
};
//# sourceMappingURL=create_block_plugin.js.map