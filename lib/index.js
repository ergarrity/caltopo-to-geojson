'use strict';

var extract = require('./extract');

module.exports = function convert(caltopoJson) {
  var markers = extract.extractMarkers(caltopoJson);
  var routes = extract.extractRoutes(caltopoJson);

  var output = {
    type: 'FeatureCollection',
    features: [].concat(markers, routes)
  };
  return output;
};