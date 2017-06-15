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

exports.default = function (_ref) {
  var type = _ref.type,
      _ref$i18nNamespace = _ref.i18nNamespace,
      i18nNamespace = _ref$i18nNamespace === undefined ? 'cm.' + type : _ref$i18nNamespace,
      _ref$schema = _ref.schema,
      schemaDef = _ref$schema === undefined ? null : _ref$schema,
      Component = _ref.Component,
      hasCustomHover = _ref.hasCustomHover;
  return function (_ref2) {
    var blockPluginProps = _ref2.blockPluginProps,
        isEditing = _ref2.isEditing;

    var schema = schemaDef && (0, _wrap_in_simpleschema2.default)(schemaDef);

    var blockComponent = function blockComponent(_ref3) {
      var data = _ref3.data,
          container = _ref3.container;

      var dataMap = _immutable2.default.fromJS(data);
      var component = _react2.default.createElement(Component, (0, _extends3.default)({}, blockPluginProps, data, { isEditing: isEditing
      }));
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
    var showDialogInitially = Boolean(schema); // if has schema

    var addPlugin = function addPlugin(_ref4) {
      var onChange = _ref4.onChange,
          editorState = _ref4.editorState;

      var data = (0, _extends3.default)({
        type: type,
        showDialog: showDialogInitially
      }, schema ? schema.clean({}) : {});
      // Calls the onChange method with the new state.
      onChange((0, _megadraft.insertDataBlock)(editorState, data));
    };

    var buttonComponent = function buttonComponent(_ref5) {
      var onChange = _ref5.onChange,
          editorState = _ref5.editorState;
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

    return {
      // A unique plugin name used to identify the plugin and its blocks
      type: type,
      // React component to be rendered in the block sidebar
      buttonComponent: buttonComponent,
      // React component for rendering the content block
      blockComponent: blockComponent
    };
  };
};
//# sourceMappingURL=create_block_plugin.js.map