import qs from 'querystring';


export default function parseDescription(description) {
  return qs.parse(description);
}
