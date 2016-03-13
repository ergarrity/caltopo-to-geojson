import fs from 'fs';
import path from 'path';
import test from 'tape';

import importer from '../../lib';
import expected1 from './test-1.json';


const expecteds = [
  expected1,
];


expecteds.forEach((expected, i) => {
  const n = i + 1;

  test(`integration test-${n}`, t => {
    const file = path.join(__dirname, `test-${n}.gpx`);
    const input = fs.readFileSync(file, 'utf8');
    console.log(input);

    importer(input)
      .then(output => {
        console.log(output);
        t.deepEqual(output, expected);
        t.end();
      });
  });
});
