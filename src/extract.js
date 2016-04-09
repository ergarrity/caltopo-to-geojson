const FEATURE = 'Feature';
const POINT = 'Point';
const LINE_STRING = 'LineString';


export function extractFolders(caltopoJson) {
  return caltopoJson.state.Folder;
}


export function extractMarkers(caltopoJson, folders=extractFolders(caltopoJson)) {
  return caltopoJson.state.Marker
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


export function extractRoutes(caltopoJson, folders=extractFolders(caltopoJson)) {
  function coordinates([lat, lon]) {
    return [ lon, lat ];
  }

  return caltopoJson.state.Shape
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
