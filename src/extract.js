const util = require('./util.js');

const FEATURE = 'Feature';
const POINT = 'Point';
const LINE_STRING = 'LineString';

function extractFolders (caltopoJson) {
  return caltopoJson.Folder;
}

function extractMarkers (caltopoJson, folders = extractFolders(caltopoJson)) {
  return caltopoJson.Marker
    .map(marker => ({
      type: FEATURE,
      geometry: {
        type: POINT,
        coordinates: [ marker.position.lng, marker.position.lat ]
      },
      properties: {
        name: marker.label,
        folder: folders[marker.folderId] !== undefined ? folders[marker.folderId].label : null,
        folderId: marker.folderId !== undefined ? marker.folderId : null,
        comments: marker.comments,
        iconUrl: util.iconUrl(marker.url)
      }
    }));
}

function extractRoutes (caltopoJson, folders = extractFolders(caltopoJson)) {
  function coordinates ([lat, lon]) {
    return [ lon, lat ];
  }

  return caltopoJson.Shape
    .filter(shape => shape.way.type === 'ROUTE')
    .map(shape => ({
      type: FEATURE,
      geometry: {
        type: LINE_STRING,
        coordinates: shape.way.coordinates.map(coordinates)
      },
      properties: {
        name: shape.label,
        folder: folders[shape.folderId] !== undefined ? folders[shape.folderId].label : null,
        folderId: shape.folderId !== undefined ? shape.folderId : null,
        comments: shape.comments,
        color: shape.color
      }
    }));
}

module.exports = {
  extractFolders,
  extractMarkers,
  extractRoutes
};
