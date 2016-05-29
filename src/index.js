const extract = require('./extract');


module.exports = function convert(caltopoJson) {
  const markers = extract.extractMarkers(caltopoJson);
  const routes = extract.extractRoutes(caltopoJson);

  const output = {
    type: 'FeatureCollection',
    features: [].concat(markers, routes),
  };
  return output;
};
