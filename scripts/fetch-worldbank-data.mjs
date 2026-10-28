#!/usr/bin/env node
/**
 * Fetches real historical values for the demo's "Data Over Time" statistics
 * from the World Bank Open Data API (free, no key required) and writes them
 * to src/demo/data/worldbank-history.json.
 *
 * This is demo-only data (not part of the published library bundle) -- it
 * exists so the "Data Over Time" showcase can use real numbers instead of a
 * synthetic growth curve. The output uses numeric ISO country ids where
 * available, retaining alpha-2 codes for countries absent from the map.
 *
 * Usage: node scripts/fetch-worldbank-data.mjs
 * Also runs on a schedule via .github/workflows/refresh-worldbank-data.yml.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
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
const OUT_PATH = fileURLToPath(new URL("../src/demo/data/worldbank-history.json", import.meta.url));

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
  return buildAlpha3ToNumeric(await res.json());
}

export function buildAlpha3ToNumeric(geo) {
  if (!Array.isArray(geo.features)) throw new Error("Unexpected Natural Earth response shape");
  const map = new Map();
  for (const feature of geo.features) {
    const p = feature.properties ?? {};
    // France and Norway use -99 in the basic ISO fields; Natural Earth's
    // alternate ISO fields retain their actual country identifiers.
    const n3 = [p.ISO_N3, p.ISO_N3_EH, p.UN_A3].find((id) => /^\d{1,3}$/.test(String(id)));
    if (n3 === undefined) continue;
    for (const a3 of [p.ISO_A3, p.ISO_A3_EH, p.WB_A3]) {
      if (typeof a3 === "string" && /^[A-Z]{3}$/.test(a3)) {
        map.set(a3, String(n3).padStart(3, "0"));
      }
    }
  }
  if (map.size === 0) throw new Error("Natural Earth returned no usable country identifiers");
  return map;
}

/** Read every API page and reject incomplete/error payloads before replacing the cache. */
async function fetchWorldBankRows(url, label) {
  const rows = [];
  let pages = 1;
  let total = 0;
  for (let page = 1; page <= pages; page++) {
    const pageUrl = new URL(url);
    pageUrl.searchParams.set("page", String(page));
    const res = await fetch(pageUrl.href);
    if (!res.ok)
      throw new Error(`World Bank ${label} request failed: ${res.status} ${res.statusText}`);
    const json = await res.json();
    const metadata = json?.[0];
    if (
      !Array.isArray(json?.[1]) ||
      !Number.isInteger(Number(metadata?.pages)) ||
      Number(metadata.pages) < 1 ||
      !Number.isInteger(Number(metadata?.total))
    ) {
      throw new Error(`Unexpected response shape for ${label}`);
    }
    if (page === 1) {
      pages = Number(metadata.pages);
      total = Number(metadata.total);
    }
    if (Number(metadata.pages) !== pages || Number(metadata.total) !== total) {
      throw new Error(`Pagination changed while fetching ${label}; retry the refresh`);
    }
    rows.push(...json[1]);
  }
  if (rows.length !== total)
    throw new Error(`Incomplete response for ${label}: expected ${total} rows, got ${rows.length}`);
  return rows;
}

/**
 * The `country/all` endpoint mixes real countries with ~78 aggregate regions
 * ("Euro area", "World", "Arab World", ...). Those must be excluded or they
 * pollute rankings and choropleth colouring. Aggregates are flagged by
 * `region.value === "Aggregates"`.
 */
export async function fetchRealCountryCodes() {
  const rows = await fetchWorldBankRows(
    "https://api.worldbank.org/v2/country?format=json&per_page=400",
    "country list",
  );

  const codes = new Set();
  for (const row of rows) {
    if (row.region?.value === "Aggregates" || row.region?.id === "NA") continue;
    if (row.id) codes.add(row.id); // alpha-3, used to match countryiso3code
  }
  if (codes.size === 0) throw new Error("World Bank returned no real countries");
  return codes;
}

/**
 * Fetch one indicator across all real countries, grouped by year then by
 * numeric ISO id (falling back to the alpha-2 code for the handful Natural
 * Earth has no numeric id for -- those still count toward world rankings even
 * though the map can't draw them).
 */
export async function fetchIndicator(code, realCountries, alpha3ToNumeric) {
  const url =
    `https://api.worldbank.org/v2/country/all/indicator/${code}` +
    `?date=${START_YEAR}:${END_YEAR}&format=json&per_page=${PER_PAGE}`;

  const rows = await fetchWorldBankRows(url, code);

  const byYear = {};
  for (const row of rows) {
    if (typeof row.value !== "number" || !Number.isFinite(row.value)) continue;
    // Skip aggregate regions -- only real countries belong in the rankings.
    if (!realCountries.has(row.countryiso3code)) continue;
    const year = row.date;
    if (!/^\d{4}$/.test(year) || Number(year) < START_YEAR || Number(year) > END_YEAR) continue;
    const key = alpha3ToNumeric.get(row.countryiso3code) ?? row.country?.id;
    if (!key) continue;
    byYear[year] ??= {};
    byYear[year][key] = row.value;
  }
  if (Object.keys(byYear).length === 0) throw new Error(`No usable country data for ${code}`);
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

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
