'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

  var dataMap = _immutable2.default.fromJS(data);
  var component = _react2.default.createElement(Component, (0, _extends3.default)({}, blockPluginProps, data, { isEditing: isEditing }));

  // show the render-component when not in editmode or if the plugin has no schema
  if (!isEditing) {
    return component;
  }
  return _react2.default.createElement(
    _plugin_editable_component2.default,
    {
      schema: schema,
      i18nNamespace: i18nNamespace,
      dataMap: dataMap,
      container: container,
      hasCustomHover: hasCustomHover
    },
    component
  );
};

var ButtonComponent = function ButtonComponent(_ref2) {
  var i18nNamespace = _ref2.i18nNamespace,
      showDialogInitially = _ref2.showDialogInitially,
      type = _ref2.type,
      schema = _ref2.schema,
      onChange = _ref2.onChange,
      editorState = _ref2.editorState;

  var addPlugin = function addPlugin() {
    var data = (0, _extends3.default)({
      type: type,
      showDialog: showDialogInitially
    }, schema ? schema.clean({}) : {});

    // Calls the onChange method with the new state.
    onChange((0, _megadraft.insertDataBlock)(editorState, data));
  };
  return _react2.default.createElement(
    _button_add_plugin2.default,
    {
      onClick: function onClick(e) {
        e.preventDefault();
        addPlugin({ onChange: onChange, editorState: editorState });
      }
    },
    _react2.default.createElement(_manulI18n.T, { _id: [i18nNamespace + '.add', i18nNamespace + '.label'] })
  );
};
/* eslint react/display-name: 0*/

exports.default = function (_ref3) {
  var type = _ref3.type,
      _ref3$i18nNamespace = _ref3.i18nNamespace,
      i18nNamespace = _ref3$i18nNamespace === undefined ? 'cm.' + type : _ref3$i18nNamespace,
      _ref3$schema = _ref3.schema,
      schemaDef = _ref3$schema === undefined ? null : _ref3$schema,
      Component = _ref3.Component,
      hasCustomHover = _ref3.hasCustomHover;
  return function (pppp) {
    var blockPluginProps = pppp.blockPluginProps,
        isEditing = pppp.isEditing;

    var schema = schemaDef && (0, _wrap_in_simpleschema2.default)(schemaDef);

    var showDialogInitially = Boolean(schema); // if has schema

    return {
      // A unique plugin name used to identify the plugin and its blocks
      type: type,
      // React component to be rendered in the block sidebar
      buttonComponent: function buttonComponent(_ref4) {
        var onChange = _ref4.onChange,
            editorState = _ref4.editorState;
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
      blockComponent: function blockComponent(_ref5) {
        var data = _ref5.data,
            container = _ref5.container;
        return _react2.default.createElement(BlockComponent, {
          key: isEditing,
          schema: schema,
          isEditing: isEditing,
          data: data,
          container: container,
          Component: Component,
          blockPluginProps: blockPluginProps,
          hasCustomHover: hasCustomHover,
          i18nNamespace: i18nNamespace
        });
      }
    };
  };
};
//# sourceMappingURL=create_block_plugin.js.map