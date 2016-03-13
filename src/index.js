import xml2js from 'xml2js';

import * as extract from './extract';
import parseMetadata from './parse-metadata';


export default function importer(xmlString) {
  return new Promise((resolve, reject) => {

    xml2js.parseString(xmlString, (err, xml) => {
      console.log(xml);

      const rawMetadata = extract.metadata(xml);
      const metadata = parseMetadata(rawMetadata);

      const waypoints = extract.waypoints(xml);
      console.log(waypoints);

      const routes = extract.routes(xml);
      console.log(routes);

      const output = {
        type: 'FeatureCollection',
        features: [].concat(waypoints, routes),
      };

      resolve(output);
    });

  })
    .catch(e => {
      console.log('wtfffffffffffffff');
      console.log(e);
      console.log(e.stack);
    });
}
