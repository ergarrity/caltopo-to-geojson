import * as extract from './extract';


export default function importer(calJson) {
  const markers = extract.extractMarkers(calJson);
  const routes = extract.extractRoutes(calJson);

  const output = {
    type: 'FeatureCollection',
    features: [].concat(markers, routes),
  };
  return output;
}
