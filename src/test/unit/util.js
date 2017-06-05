const test = require('tape');

const util = require('../../util.js');

test('iconUrl', t => {
  t.equal(util.iconUrl('https://yolo.com/img.png'), 'https://yolo.com/img.png');
  t.equal(util.iconUrl('http://yolo.com/img.png'), 'http://yolo.com/img.png');

  t.equal(util.iconUrl('#FF0000'), 'https://caltopo.com/resource/imagery/icon.png?cfg=point%2CFF0000');
  t.equal(util.iconUrl('c:target,A200FF'), 'https://caltopo.com/resource/imagery/icon.png?cfg=c%3Atarget%2CA200FF');
  t.equal(util.iconUrl('a:1,A200FF'), 'https://caltopo.com/resource/imagery/icon.png?cfg=a%3A1%2CA200FF');

  t.end();
});
