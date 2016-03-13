import xml2js from 'xml2js';

import * as extract from './extract';
import parseMetadata from './parse-metadata';


export default function importer(xmlString) {
  return new Promise((resolve, reject) => {

    xml2js.parseString(xmlString, (err, xml) => {
      const rawMetadata = extract.metadata(xml);
      const metadata = parseMetadata(rawMetadata);

      const waypoints = extract.waypoints(xml, metadata);
      const routes = extract.routes(xml, metadata);

      const output = {
        type: 'FeatureCollection',
        features: [].concat(waypoints, routes),
      };
      resolve(output);
    });

  });
}
