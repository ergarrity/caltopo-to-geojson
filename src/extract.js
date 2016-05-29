const FEATURE = 'Feature';
const POINT = 'Point';
const LINE_STRING = 'LineString';


function extractFolders(caltopoJson) {
  return caltopoJson.Folder;
}


function extractMarkers(caltopoJson, folders=extractFolders(caltopoJson)) {
  return caltopoJson.Marker
    .map(marker => ({
        type: FEATURE,
        geometry: {
          type: POINT,
          coordinates: [ marker.position.lng, marker.position.lat ],
        },
        properties: {
          name: marker.label,
          folder: folders[marker.folderId].label,
          folderId: marker.folderId,
          comments: marker.comments,
        },
    }));
}


function extractRoutes(caltopoJson, folders=extractFolders(caltopoJson)) {
  function coordinates([lat, lon]) {
    return [ lon, lat ];
  }

  return caltopoJson.Shape
    .filter(shape => shape.way.type === 'ROUTE')
    .map(shape => ({
      type: FEATURE,
      geometry: {
        type: LINE_STRING,
        coordinates: shape.way.coordinates.map(coordinates),
      },
      properties: {
        name: shape.label,
        folder: folders[shape.folderId].label,
        folderId: shape.folderId,
        comments: shape.comments,
      },
    }));
}

module.exports = {
  extractFolders,
  extractMarkers,
  extractRoutes,
};
