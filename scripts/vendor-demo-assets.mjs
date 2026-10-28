import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// This is the demonstration site's asset closure, separate from the npm library.
// Committed checksums make normal builds offline and reject changed upstream bytes.
const root = fileURLToPath(new URL("../", import.meta.url));
const vendor = resolve(root, "public/vendor");
const manifestPath = resolve(vendor, "manifest.json");
const refresh = process.argv.includes("--refresh");
const threeTextures =
  "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/";
const globeTextures = "https://unpkg.com/three-globe@2.45.0/example/img/";
const assets = [
  ["textures/earth_atmos_2048.jpg", `${threeTextures}earth_atmos_2048.jpg`, "jpeg"],
  ["textures/earth-blue-marble.jpg", `${globeTextures}earth-blue-marble.jpg`, "jpeg"],
  ["textures/earth_lights_2048.png", `${threeTextures}earth_lights_2048.png`, "png"],
  [
    "textures/2_no_clouds_4k.jpg",
    "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
    "jpeg",
  ],
  ["textures/earth-topology.png", `${globeTextures}earth-topology.png`, "png"],
  ["textures/earth_day_4096.jpg", `${threeTextures}earth_day_4096.jpg`, "jpeg"],
  ["textures/earth-water.png", `${globeTextures}earth-water.png`, "png"],
  [
    "textures/BlankMap-World-Sovereign_Nations.svg",
    "https://upload.wikimedia.org/wikipedia/commons/5/5e/BlankMap-World-Sovereign_Nations.svg",
    "svg",
  ],
  [
    "data/counties-10m.json",
    "https://cdn.jsdelivr.net/npm/us-atlas@3.0.1/counties-10m.json",
    "topology",
    "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",
  ],
  [
    "data/germany-districts.geo.json",
    "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/2_hoch.geo.json",
    "geojson",
  ],
  [
    "data/countries-110m.json",
    "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json",
    "topology",
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
    "public/data/countries-110m.json",
  ],
  [
    "lib/topojson-client.min.js",
    "https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js",
    "script",
    "https://unpkg.com/topojson-client@3/dist/topojson-client.min.js",
  ],
  [
    "licenses/topojson-client-ISC.txt",
    "https://raw.githubusercontent.com/topojson/topojson-client/v3.1.0/LICENSE",
    "text",
  ],
  [
    "licenses/world-atlas-ISC.txt",
    "https://raw.githubusercontent.com/topojson/world-atlas/v2.0.2/LICENSE",
    "text",
  ],
  [
    "licenses/us-atlas-ISC.txt",
    "https://raw.githubusercontent.com/topojson/us-atlas/v3.0.1/LICENSE",
    "text",
  ],
  [
    "licenses/germany-Unlicense.txt",
    "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/LICENSE.md",
    "text",
  ],
  [
    "licenses/three-MIT.txt",
    "https://raw.githubusercontent.com/mrdoob/three.js/r182/LICENSE",
    "text",
  ],
  [
    "licenses/three-globe-MIT.txt",
    "https://raw.githubusercontent.com/vasturiano/three-globe/v2.45.0/LICENSE",
    "text",
  ],
];

function hash(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function validate(bytes, kind, path) {
  if (bytes.length < 100) throw new Error(`Empty or incomplete asset: ${path}`);
  if (kind === "jpeg" && bytes.readUInt16BE(0) !== 0xffd8) throw new Error(`Invalid JPEG: ${path}`);
  if (kind === "png" && bytes.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a")
    throw new Error(`Invalid PNG: ${path}`);
  if (kind === "svg" && !/<svg\b/.test(bytes.toString())) throw new Error(`Invalid SVG: ${path}`);
  if (kind === "topology" && JSON.parse(bytes).type !== "Topology")
    throw new Error(`Invalid TopoJSON: ${path}`);
  if (kind === "geojson" && JSON.parse(bytes).type !== "FeatureCollection")
    throw new Error(`Invalid GeoJSON: ${path}`);
  if (kind === "script" && !bytes.toString().includes("topojson"))
    throw new Error(`Invalid worker dependency: ${path}`);
  if (kind === "text" && /<!doctype html/i.test(bytes.toString()))
    throw new Error(`Expected license text: ${path}`);
}

let previous;
try {
  previous = JSON.parse(await readFile(manifestPath, "utf8"));
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}
const files = [];
for (const [path, sourceUrl, kind, replacementUrl = sourceUrl, input] of assets) {
  const destination = resolve(vendor, path);
  const expected = previous?.files.find((file) => file.path === path);
  let bytes;
  try {
    bytes = await readFile(destination);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
  const hadLocalCopy = Boolean(bytes);
  if (!bytes || refresh) {
    if (input) {
      bytes = await readFile(resolve(root, input));
    } else {
      const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(60000) });
      if (!response.ok) throw new Error(`${response.status} fetching ${sourceUrl}`);
      bytes = Buffer.from(await response.arrayBuffer());
    }
  }
  validate(bytes, kind, path);
  const sha256 = hash(bytes);
  if (expected && !refresh && sha256 !== expected.sha256) {
    throw new Error(
      `Checksum mismatch for ${path}. Review upstream changes before using --refresh.`,
    );
  }
  if (!hadLocalCopy || refresh) {
    await mkdir(dirname(destination), { recursive: true });
    await writeFile(destination, bytes);
  }
  files.push({
    path,
    sourceUrl,
    ...(input ? { input } : {}),
    ...(kind !== "text" ? { replacementUrl, publicUrl: `/vendor/${path}` } : {}),
    bytes: bytes.length,
    sha256,
  });
  console.log(`Verified ${path} (${bytes.length} bytes)`);
}
const manifest = { version: 1, files };
if (JSON.stringify(previous) !== JSON.stringify(manifest)) {
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
console.log(
  `Verified ${files.length} demo assets; ${files.reduce((sum, file) => sum + file.bytes, 0)} bytes.`,
);
