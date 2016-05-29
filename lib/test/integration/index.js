'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var test = require('tape');

var convert = require('../../index.js');

var input1 = require('./test-1-input.json');
var expected1 = require('./test-1-expected.json');

var tests = [[input1, expected1]];

tests.forEach(function (_ref, i) {
  var _ref2 = _slicedToArray(_ref, 2);

  var input = _ref2[0];
  var expected = _ref2[1];

  test('integration test-' + (i + 1), function (t) {
    var output = convert(input);
    t.deepEqual(output, expected);
    t.end();
  });
});