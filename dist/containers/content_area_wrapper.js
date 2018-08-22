'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.depsMapper = exports.composer = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _invoke2 = require('lodash/fp/invoke');

var _invoke3 = _interopRequireDefault(_invoke2);

var _pure2 = require('recompose/pure');

var _pure3 = _interopRequireDefault(_pure2);

var _mantraCore = require('@storybook/mantra-core');

var _content_area_wrapper = require('../components/content_area_wrapper');

var _content_area_wrapper2 = _interopRequireDefault(_content_area_wrapper);

var _composeWithTracker = require('../utils/composeWithTracker');

var _composeWithTracker2 = _interopRequireDefault(_composeWithTracker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composer = exports.composer = function composer(_ref, onData) {
  var context = _ref.context,
      content = _ref.content;

  var _context = context(),
      manulDraft = _context.manulDraft;

  var highlightEditable = (0, _invoke3.default)('highlightEditable', manulDraft);

  onData(null, { highlightEditable: highlightEditable });
};

var depsMapper = exports.depsMapper = function depsMapper(_context2) {
  return (0, _extends3.default)({
    context: function context() {
      return _context2;
    }
  }, _context2.manulDraft);
};

exports.default = (0, _mantraCore.composeAll)(_pure3.default, (0, _composeWithTracker2.default)(composer), (0, _mantraCore.useDeps)(depsMapper), _pure3.default)(_content_area_wrapper2.default);
//# sourceMappingURL=content_area_wrapper.js.map