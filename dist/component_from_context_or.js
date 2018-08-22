'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getOr2 = require('lodash/fp/getOr');

var _getOr3 = _interopRequireDefault(_getOr2);

var _mantraCore = require('@storybook/mantra-core');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
helper that returns either the component
from context.manulDraft or one of the given default component
**/

var depsMapper = exports.depsMapper = function depsMapper(context) {
  return {
    components: context.manulDraft.components
  };
};

exports.default = function (componentName, DefaultComponent) {
  return (0, _mantraCore.composeAll)((0, _mantraCore.useDeps)(depsMapper))(function (_ref) {
    var components = _ref.components,
        innerRef = _ref.innerRef,
        props = (0, _objectWithoutProperties3.default)(_ref, ['components', 'innerRef']);

    var Component = (0, _getOr3.default)(DefaultComponent, componentName, components);
    return _react2.default.createElement(Component, (0, _extends3.default)({ ref: innerRef }, props));
  });
};
//# sourceMappingURL=component_from_context_or.js.map