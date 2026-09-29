#!/usr/bin/env node
/**
 * Fetches real historical values for the demo's "Data Over Time" statistics
 * from the World Bank Open Data API (free, no key required) and writes them
 * to src/demo/data/worldbank-history.json.
 *
 * This is demo-only data (not part of the published library bundle) -- it
 * exists so the "Data Over Time" showcase can use real numbers instead of a
 * synthetic growth curve. The output is a raw cache keyed by the World
 * Bank's own alpha-2 country codes; src/demo/demo-config.ts maps those onto
 * our internal country ids and picks a curated subset of years for display.
 *
 * Usage: node scripts/fetch-worldbank-data.mjs
 * Also runs on a schedule via .github/workflows/refresh-worldbank-data.yml.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const INDICATORS = {
  gdpPerCapita: "NY.GDP.PCAP.PP.CD",
  // EN.ATM.CO2E.PC was retired by World Bank; this AR5-based per-capita
  // series is the maintained replacement (units: t CO2e/capita).
  co2Emissions: "EN.GHG.CO2.PC.CE.AR5",
  lifeExpectancy: "SP.DYN.LE00.IN",
  internetUsers: "IT.NET.USER.ZS",
  renewableEnergy: "EG.FEC.RNEW.ZS",
  urbanPopulation: "SP.URB.TOTL.IN.ZS",
  healthExpenditure: "SH.XPD.CHEX.GD.ZS",
  educationExpenditure: "SE.XPD.TOTL.GD.ZS",
  forestArea: "AG.LND.FRST.ZS",
  population: "SP.POP.TOTL",
  accessElectricity: "EG.ELC.ACCS.ZS",
};

const START_YEAR = 1990;
const END_YEAR = new Date().getFullYear();
const PER_PAGE = 20000;
const OUT_PATH = fileURLToPath(
  new URL("../src/demo/data/worldbank-history.json", import.meta.url),
);

const NATURAL_EARTH_COUNTRIES =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson";

/**
 * Build an ISO alpha-3 -> zero-padded numeric map (e.g. DEU -> "276",
 * BEL -> "056"). The numeric form is what the TopoJSON the globe renders
 * keys its features by, and its ids ARE zero-padded, so the padding matters.
 *
 * Natural Earth is used rather than a hand-maintained table because the
 * in-repo `countryCodes` map only covers ~59 countries -- far short of the
 * ~199 the World Bank reports on.
 */
async function fetchAlpha3ToNumeric() {
  const res = await fetch(NATURAL_EARTH_COUNTRIES);
  if (!res.ok) {
    throw new Error(`Natural Earth request failed: ${res.status} ${res.statusText}`);
  }
  const geo = await res.json();
  const map = new Map();
  for (const feature of geo.features ?? []) {
    const p = feature.properties ?? {};
    const a3 = p.ISO_A3;
    const n3 = p.ISO_N3;
    if (!a3 || a3 === "-99" || !n3 || n3 === "-99") continue;
    map.set(a3, String(n3).padStart(3, "0"));
  }
  return map;
}

/**
 * The `country/all` endpoint mixes real countries with ~78 aggregate regions
 * ("Euro area", "World", "Arab World", ...). Those must be excluded or they
 * pollute rankings and choropleth colouring. Aggregates are flagged by
 * `region.value === "Aggregates"`.
 */
async function fetchRealCountryCodes() {
  const res = await fetch("https://api.worldbank.org/v2/country?format=json&per_page=400");
  if (!res.ok) {
    throw new Error(`World Bank country list request failed: ${res.status} ${res.statusText}`);
  }
  const json = await res.json();
  const rows = json[1];
  if (!Array.isArray(rows)) throw new Error("Unexpected country-list response shape");

  const codes = new Set();
  for (const row of rows) {
    if (row.region?.value === "Aggregates") continue;
    if (row.id) codes.add(row.id); // alpha-3, used to match countryiso3code
  }
  return codes;
}

/**
 * Fetch one indicator across all real countries, grouped by year then by
 * numeric ISO id (falling back to the alpha-2 code for the handful Natural
 * Earth has no numeric id for -- those still count toward world rankings even
 * though the map can't draw them).
 */
async function fetchIndicator(code, realCountries, alpha3ToNumeric) {
  const url =
    `https://api.worldbank.org/v2/country/all/indicator/${code}` +
    `?date=${START_YEAR}:${END_YEAR}&format=json&per_page=${PER_PAGE}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`World Bank API request failed for ${code}: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const rows = json[1];
  if (!Array.isArray(rows)) {
    throw new Error(`Unexpected response shape for ${code}: ${JSON.stringify(json).slice(0, 200)}`);
  }

  const byYear = {};
  for (const row of rows) {
    if (row.value === null || row.value === undefined) continue;
    // Skip aggregate regions -- only real countries belong in the rankings.
    if (!realCountries.has(row.countryiso3code)) continue;
    const year = row.date;
    const key = alpha3ToNumeric.get(row.countryiso3code) ?? row.country?.id;
    if (!key) continue;
    (byYear[year] ??= {})[key] = row.value;
  }
  return byYear;
}

async function main() {
  process.stdout.write("Fetching country list (to exclude aggregates)... ");
  const realCountries = await fetchRealCountryCodes();
  console.log(`${realCountries.size} real countries`);

  process.stdout.write("Fetching ISO alpha-3 -> numeric map... ");
  const alpha3ToNumeric = await fetchAlpha3ToNumeric();
  console.log(`${alpha3ToNumeric.size} codes`);

  const result = {};
  for (const [key, code] of Object.entries(INDICATORS)) {
    process.stdout.write(`Fetching ${key} (${code})... `);
    result[key] = await fetchIndicator(code, realCountries, alpha3ToNumeric);
    const years = Object.keys(result[key]);
    console.log(`${years.length} years fetched`);
  }

  await mkdir(fileURLToPath(new URL("../src/demo/data/", import.meta.url)), { recursive: true });
  await writeFile(OUT_PATH, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
