'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _simplSchema = require('simpl-schema');

var _simplSchema2 = _interopRequireDefault(_simplSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (schema) {
  return schema instanceof _simplSchema2.default ? schema : new _simplSchema2.default(schema);
};
//# sourceMappingURL=wrap_in_simpleschema.js.map