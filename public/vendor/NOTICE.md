# Gralobe demonstration: asset sources and credits

These exact source images, geographic datasets and worker dependency are served
from the same Hetzner origin as this demonstration. `manifest.json` records each
upstream URL, byte count and SHA-256 checksum. Files are mirrored unchanged;
rendering textures onto the interactive globe does not change their source files.
The npm library's defaults are independent of this demonstration packaging.

## Earth imagery

- NASA Earth Observatory / Blue Marble imagery, distributed by Three.js and
  Three Globe: `earth_atmos_2048.jpg`, `earth-blue-marble.jpg`,
  `earth_lights_2048.png`, `earth-topology.png` and `earth-water.png`.
  NASA imagery is used for this informational geographic visualization with no
  suggestion of NASA endorsement. NASA's official media guidelines describe the
  permitted uses and exceptions for third-party material:
  https://www.nasa.gov/nasa-brand-center/images-and-media/
  The distributor notices are retained in `licenses/three-MIT.txt` and
  `licenses/three-globe-MIT.txt`; those software notices do not relicense imagery.
- Tom Patterson, Natural Earth III: `2_no_clouds_4k.jpg`, resized by Bjørn
  Sandvik and distributed with his WebGL Earth example. The original author
  releases Natural Earth III data and images into the public domain:
  https://www.shadedrelief.com/natural3/pages/use.html
  The example author's source description identifies the map and resizing:
  https://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html
- Solar System Scope / INOVE: `earth_day_4096.jpg`, resized and merged by the
  Three.js example contributors. Distributed under Creative Commons Attribution
  4.0 International. The mirrored file retains the Three.js distribution's bytes.
  https://www.solarsystemscope.com/textures/
  https://creativecommons.org/licenses/by/4.0/
  Three.js credits this source in its Earth example:
  https://github.com/mrdoob/three.js/blob/dev/examples/webgpu_tsl_earth.html
- RedGolpe, with later changes by Wikimedia Commons contributors:
  `BlankMap-World-Sovereign_Nations.svg`. Creative Commons Attribution-ShareAlike
  4.0 International; this mirror makes no modifications. Any adapted copy must
  retain attribution, indicate changes and use the same or a compatible license.
  https://commons.wikimedia.org/wiki/File:BlankMap-World-Sovereign_Nations.svg
  https://creativecommons.org/licenses/by-sa/4.0/

## Boundaries and worker code

- World Atlas 2.0.2: Natural Earth 1:110m country boundaries. The exact existing
  `public/data/countries-110m.json` copy is retained, including its labels.
  Natural Earth data is public domain; the World Atlas ISC notice is retained in
  `licenses/world-atlas-ISC.txt`.
  https://github.com/topojson/world-atlas/tree/v2.0.2
  https://www.naturalearthdata.com/about/terms-of-use/
- US Atlas 3.0.1: US Census Bureau 2017 county geometry, distributed under the
  retained ISC notice in `licenses/us-atlas-ISC.txt`.
  https://github.com/topojson/us-atlas/tree/v3.0.1
- Germany districts: isellsoap/deutschlandGeoJSON, high-resolution district
  GeoJSON; the repository names DIVA-GIS as its data source. The published
  repository notice is retained in `licenses/germany-Unlicense.txt`.
  https://github.com/isellsoap/deutschlandGeoJSON
- TopoJSON Client 3.1.0: Michael Bostock; exact official minified worker helper,
  with ISC notice retained in `licenses/topojson-client-ISC.txt`.
  https://github.com/topojson/topojson-client/tree/v3.1.0

## Rebuilding

Run `node scripts/vendor-demo-assets.mjs` inside the documented Docker image.
Committed files are checked locally without requiring an upstream connection.
Missing assets may be downloaded only when their bytes match the committed
checksums. Use `--refresh` solely for a deliberate, reviewed asset update.
