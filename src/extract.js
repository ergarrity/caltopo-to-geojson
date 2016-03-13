import parseDescription from './parse-description';
import parseMetadata from './parse-metadata';


const FEATURE = 'Feature';
const POINT = 'Point';
const LINE_STRING = 'LineString';


export function metadata(xml) {
  return xml.gpx.metadata.find(m => m.desc).desc[0];
}


export function waypoints(xml, meta) {
  meta = meta || parseMetadata(metadata(xml));

  return xml.gpx.wpt
    .map(w => {
      const description = parseDescription(w.desc[0]);

      return {
        type: FEATURE,
        geometry: {
          type: POINT,
          coordinates: [ w.$.lon, w.$.lat ].map(Number),
        },
        properties: {
          name: w.name[0],
          folder: meta.folders[description.folderId],
          folderId: description.folderId,
          comments: description.comments,
        },
      };
    });
}


export function routes(xml, meta) {
  meta = meta || parseMetadata(metadata(xml));

  return xml.gpx.rte
    .map(w => {
      const description = parseDescription(w.desc[0]);

      return {
        type: FEATURE,
        geometry: {
          type: LINE_STRING,
          coordinates: w.rtept.map(points),
        },
        properties: {
          name: w.name[0],
          folder: meta.folders[description.folderId],
          folderId: description.folderId,
          comments: description.comments,
        },
      };
    });

  function points(rtept) {
    return [ rtept.$.lon, rtept.$.lat ].map(Number);
  }
}
