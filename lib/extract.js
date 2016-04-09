'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.extractFolders = extractFolders;
exports.extractMarkers = extractMarkers;
exports.extractRoutes = extractRoutes;
var FEATURE = 'Feature';
var POINT = 'Point';
var LINE_STRING = 'LineString';

function extractFolders(caltopoJson) {
  return caltopoJson.state.Folder;
}

function extractMarkers(caltopoJson) {
  var folders = arguments.length <= 1 || arguments[1] === undefined ? extractFolders(caltopoJson) : arguments[1];

  return caltopoJson.state.Marker.map(function (marker) {
    return {
      type: FEATURE,
      geometry: {
        type: POINT,
        coordinates: [marker.position.lng, marker.position.lat]
      },
      properties: {
        name: marker.label,
        folder: folders[marker.folderId].label,
        folderId: marker.folderId,
        comments: marker.comments
      }
    };
  });
}

function extractRoutes(caltopoJson) {
  var folders = arguments.length <= 1 || arguments[1] === undefined ? extractFolders(caltopoJson) : arguments[1];

  function coordinates(_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var lat = _ref2[0];
    var lon = _ref2[1];

    return [lon, lat];
  }

  return caltopoJson.state.Shape.filter(function (shape) {
    return shape.way.type === 'ROUTE';
  }).map(function (shape) {
    return {
      type: FEATURE,
      geometry: {
        type: LINE_STRING,
        coordinates: shape.way.coordinates.map(coordinates)
      },
      properties: {
        name: shape.label,
        folder: folders[shape.folderId].label,
        folderId: shape.folderId,
        comments: shape.comments
      }
    };
  });
}