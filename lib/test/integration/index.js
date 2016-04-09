'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _tape = require('tape');

var _tape2 = _interopRequireDefault(_tape);

var _index = require('../../index.js');

var _index2 = _interopRequireDefault(_index);

var _test = require('./test-1.json');

var _test2 = _interopRequireDefault(_test);

var _test1Expected = require('./test-1-expected.json');

var _test1Expected2 = _interopRequireDefault(_test1Expected);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tests = [[_test2.default, _test1Expected2.default]];

tests.forEach(function (_ref, i) {
  var _ref2 = _slicedToArray(_ref, 2);

  var input = _ref2[0];
  var expected = _ref2[1];

  (0, _tape2.default)('integration test-' + (i + 1), function (t) {
    var output = (0, _index2.default)(input);
    t.deepEqual(output, expected);
    t.end();
  });
});