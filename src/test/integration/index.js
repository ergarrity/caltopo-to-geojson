const test = require('tape');

const convert = require('../../index.js');

const input1 = require('./test-1-input.json');
const expected1 = require('./test-1-expected.json');
const input2 = require('./test-2-input.json');
const expected2 = require('./test-2-expected.json');

const tests = [
  [ input1, expected1 ],
  [ input2, expected2 ],
];

tests.forEach(([ input, expected ], i) => {
  test(`integration test-${i + 1}`, t => {
    const output = convert(input);
    t.deepEqual(output, expected);
    t.end();
  });
});
