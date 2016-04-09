'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = importer;

var _extract = require('./extract');

var extract = _interopRequireWildcard(_extract);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function importer(calJson) {
  var markers = extract.extractMarkers(calJson);
  var routes = extract.extractRoutes(calJson);

  var output = {
    type: 'FeatureCollection',
    features: [].concat(markers, routes)
  };
  return output;
}