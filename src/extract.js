const FEATURE = 'Feature';
const POINT = 'Point';
const LINE_STRING = 'LineString';


export function extractFolders(json) {
  return json.state.Folder;
}


export function extractMarkers(json, folders=extractFolders(json)) {
  return json.state.Marker
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


export function extractRoutes(json, folders=extractFolders(json)) {
  function coordinates([lat, lon]) {
    return [ lon, lat ];
  }

  return json.state.Shape
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
