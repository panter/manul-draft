'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _megadraft = require('megadraft');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (Component) {
  var EntityComponent = function EntityComponent(_ref) {
    var entityKey = _ref.entityKey,
        props = (0, _objectWithoutProperties3.default)(_ref, ['entityKey']);
    return _react2.default.createElement(Component, (0, _extends3.default)({}, props, _megadraft.DraftJS.Entity.get(entityKey).getData()));
  };
  EntityComponent.displayName = 'EntityComponent(' + Component.displayName + ')';
  return EntityComponent;
};
//# sourceMappingURL=create_entity_component.js.map