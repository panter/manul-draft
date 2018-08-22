'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var ContentAreaWrapper = function ContentAreaWrapper(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      canEdit = _ref2.canEdit,
      isEditing = _ref2.isEditing,
      highlightEditable = _ref2.highlightEditable,
      startEditing = _ref2.startEditing,
      children = _ref2.children;

  var styles = Styles({ highlightEditable: highlightEditable, isEditing: isEditing });

  return _react2.default.createElement(
    'div',
    { style: style, className: className },
    _react2.default.createElement(
      'div',
      {
        style: styles.base,
        onClick: canEdit && highlightEditable ? startEditing : null
      },
      _react2.default.createElement(
        'div',
        { style: highlightEditable ? { pointerEvents: 'none' } : null },
        children,
        _react2.default.createElement('div', { style: { clear: 'both' } })
      )
    )
  );
};

ContentAreaWrapper.displayName = 'ContentAreaWrapper';

exports.default = ContentAreaWrapper;
//# sourceMappingURL=content_area_wrapper.js.map