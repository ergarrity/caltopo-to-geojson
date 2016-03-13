export default function parseMetadata(metadata) {
  const decoded = decodeURIComponent(metadata);
  const folderPairs = decoded
    .replace(/^Folder=/, '')
    .split('&')
    .map(pair => pair.split('='));
  const folders = folderPairs.reduce((acc, p) => Object.assign(acc, { [parseInt(p[0])]: p[1] }), {});
  return { folders };
}

// Folder=3=Water&2=Peaks&1=Trails&0=Trailheads&4=Hidden
