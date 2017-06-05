const qs = require('querystring');

const customIconFunctions = {
  c: a => `/${a[2]}/${a[3]}.png`,
  // c: a => `/icon.png?cfg=${encodeUriComponent(a[0])}`,
  t: a => `/text/${a[2]}.png?color=${a[3]}`
};

function iconUrl (icon) {
  const base = 'https://caltopo.com/resource/imagery/icon.png';

  // HEX DOT
  const hexDot = icon.match(/^#(\w{6})$/);
  if (hexDot) {
    return withConfig(`point,${hexDot[1]}`);
  }

  // URL
  const url = icon.match(/^https?:\/\//);
  if (url) {
    return icon;
  }

  return withConfig(icon);

  function withConfig (cfg) {
    return `https://caltopo.com/resource/imagery/icon.png?${qs.stringify({ cfg })}`;
  }
}

module.exports = {
  iconUrl
};
