'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _debounce2 = require('lodash/fp/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _delay2 = require('lodash/fp/delay');

var _delay3 = _interopRequireDefault(_delay2);

var _mantraCore = require('@storybook/mantra-core');

var _recompose = require('recompose');

var _reactWindowDimensions = require('react-window-dimensions');

var _reactWindowDimensions2 = _interopRequireDefault(_reactWindowDimensions);

var _plugin_editable_component = require('../components/plugin_editable_component');

var _plugin_editable_component2 = _interopRequireDefault(_plugin_editable_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var depsMapper = exports.depsMapper = function depsMapper(_context, actions) {
  return (0, _extends3.default)({
    context: function context() {
      return _context;
    }
  }, _context.manulDraft);
};

exports.default = (0, _mantraCore.composeAll)((0, _recompose.withState)('dimensions', 'setDimensions', function () {}), (0, _reactWindowDimensions2.default)({
  /* global window */
  take: function take() {
    return { windowWidth: window.innerWidth };
  },
  debounce: (0, _debounce3.default)(300)
}), (0, _recompose.withHandlers)({
  remove: function remove(_ref) {
    var setShowDialog = _ref.setShowDialog,
        container = _ref.container;
    return function () {
      setShowDialog(false);
      // small delay, otherwise megadraft has a focus problem
      /* eslint lodash-fp/no-unused-result: 0*/
      (0, _delay3.default)(100, function () {
        return container.remove();
      });
    };
  },
  cancel: function cancel(_ref2) {
    var dataMap = _ref2.dataMap,
        setShowDialog = _ref2.setShowDialog,
        container = _ref2.container;
    return function () {
      setShowDialog(false);
      // container.updateData(dataMap.set('forceDialog', false));
    };
  },
  updateData: function updateData(_ref3) {
    var container = _ref3.container;
    return function (newData) {
      container.updateData(newData);
    };
  }
}), (0, _recompose.withProps)(function (_ref4) {
  var dataMap = _ref4.dataMap;
  return { showDialog: dataMap.get('showDialog') };
}), (0, _recompose.withHandlers)({
  setShowDialog: function setShowDialog(_ref5) {
    var container = _ref5.container,
        dataMap = _ref5.dataMap;
    return function (show) {
      return container.updateData(dataMap.set('showDialog', show));
    };
  }
}),
// withState('showDialog', 'setShowDialog', ({ dataMap }) => dataMap.get('forceDialog')),
(0, _mantraCore.useDeps)(depsMapper))(_plugin_editable_component2.default);
//# sourceMappingURL=plugin_editable_component.js.map