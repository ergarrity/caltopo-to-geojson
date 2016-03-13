import test from 'tape';

import parseMetadata from '../../src/parse-metadata';


test('parses folders', t => {
  const raw = 'Folder=3%3DWater%262%3DPeaks%261%3DTrails%260%3DTrailheads%264%3DHidden';
  const expected = {
    folders: {
      0: 'Trailheads',
      1: 'Trails',
      2: 'Peaks',
      3: 'Water',
      4: 'Hidden',
    }
  };

  const metadata = parseMetadata(raw);
  t.deepEqual(metadata, expected);
  t.end();
});
