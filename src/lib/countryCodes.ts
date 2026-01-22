/**
 * ISO 3166-1 country code mappings
 * Maps alpha-2, alpha-3, and common names to numeric codes
 */

// Common country mappings: name/alpha2/alpha3 -> numeric
const COUNTRY_MAP: Record<string, string> = {
  // North America
  US: "840",
  USA: "840",
  "UNITED STATES": "840",
  AMERICA: "840",
  CA: "124",
  CAN: "124",
  CANADA: "124",
  MX: "484",
  MEX: "484",
  MEXICO: "484",

  // Europe
  DE: "276",
  DEU: "276",
  GERMANY: "276",
  DEUTSCHLAND: "276",
  FR: "250",
  FRA: "250",
  FRANCE: "250",
  GB: "826",
  GBR: "826",
  UK: "826",
  "UNITED KINGDOM": "826",
  BRITAIN: "826",
  ENGLAND: "826",
  IT: "380",
  ITA: "380",
  ITALY: "380",
  ES: "724",
  ESP: "724",
  SPAIN: "724",
  PT: "620",
  PRT: "620",
  PORTUGAL: "620",
  NL: "528",
  NLD: "528",
  NETHERLANDS: "528",
  HOLLAND: "528",
  BE: "056",
  BEL: "056",
  BELGIUM: "056",
  AT: "040",
  AUT: "040",
  AUSTRIA: "040",
  CH: "756",
  CHE: "756",
  SWITZERLAND: "756",
  PL: "616",
  POL: "616",
  POLAND: "616",
  SE: "752",
  SWE: "752",
  SWEDEN: "752",
  NO: "578",
  NOR: "578",
  NORWAY: "578",
  DK: "208",
  DNK: "208",
  DENMARK: "208",
  FI: "246",
  FIN: "246",
  FINLAND: "246",
  IE: "372",
  IRL: "372",
  IRELAND: "372",
  GR: "300",
  GRC: "300",
  GREECE: "300",
  CZ: "203",
  CZE: "203",
  "CZECH REPUBLIC": "203",
  CZECHIA: "203",
  RO: "642",
  ROU: "642",
  ROMANIA: "642",
  HU: "348",
  HUN: "348",
  HUNGARY: "348",
  UA: "804",
  UKR: "804",
  UKRAINE: "804",
  RU: "643",
  RUS: "643",
  RUSSIA: "643",
  "RUSSIAN FEDERATION": "643",

  // Asia
  CN: "156",
  CHN: "156",
  CHINA: "156",
  JP: "392",
  JPN: "392",
  JAPAN: "392",
  KR: "410",
  KOR: "410",
  "SOUTH KOREA": "410",
  KOREA: "410",
  IN: "356",
  IND: "356",
  INDIA: "356",
  ID: "360",
  IDN: "360",
  INDONESIA: "360",
  TH: "764",
  THA: "764",
  THAILAND: "764",
  VN: "704",
  VNM: "704",
  VIETNAM: "704",
  PH: "608",
  PHL: "608",
  PHILIPPINES: "608",
  MY: "458",
  MYS: "458",
  MALAYSIA: "458",
  SG: "702",
  SGP: "702",
  SINGAPORE: "702",
  PK: "586",
  PAK: "586",
  PAKISTAN: "586",
  BD: "050",
  BGD: "050",
  BANGLADESH: "050",
  TR: "792",
  TUR: "792",
  TURKEY: "792",
  TURKIYE: "792",
  SA: "682",
  SAU: "682",
  "SAUDI ARABIA": "682",
  AE: "784",
  ARE: "784",
  UAE: "784",
  "UNITED ARAB EMIRATES": "784",
  IL: "376",
  ISR: "376",
  ISRAEL: "376",
  IR: "364",
  IRN: "364",
  IRAN: "364",
  IQ: "368",
  IRQ: "368",
  IRAQ: "368",

  // Oceania
  AU: "036",
  AUS: "036",
  AUSTRALIA: "036",
  NZ: "554",
  NZL: "554",
  "NEW ZEALAND": "554",

  // South America
  BR: "076",
  BRA: "076",
  BRAZIL: "076",
  AR: "032",
  ARG: "032",
  ARGENTINA: "032",
  CL: "152",
  CHL: "152",
  CHILE: "152",
  CO: "170",
  COL: "170",
  COLOMBIA: "170",
  PE: "604",
  PER: "604",
  PERU: "604",
  VE: "862",
  VEN: "862",
  VENEZUELA: "862",

  // Africa
  ZA: "710",
  ZAF: "710",
  "SOUTH AFRICA": "710",
  EG: "818",
  EGY: "818",
  EGYPT: "818",
  NG: "566",
  NGA: "566",
  NIGERIA: "566",
  KE: "404",
  KEN: "404",
  KENYA: "404",
  ET: "231",
  ETH: "231",
  ETHIOPIA: "231",
  MA: "504",
  MAR: "504",
  MOROCCO: "504",
  DZ: "012",
  DZA: "012",
  ALGERIA: "012",
  TN: "788",
  TUN: "788",
  TUNISIA: "788",
  GH: "288",
  GHA: "288",
  GHANA: "288",
};

/**
 * Convert any country identifier to ISO 3166-1 numeric code
 * Supports: numeric codes, alpha-2, alpha-3, and common names
 */
export function toNumericCode(input: string): string {
  const upper = input.toUpperCase().trim();

  // If it's already a numeric code (3 digits), return as-is
  if (/^\d{1,3}$/.test(input)) {
    return input.padStart(3, "0");
  }

  // Look up in our mapping
  return COUNTRY_MAP[upper] || input;
}

/**
 * Normalize a values object/map to use numeric codes
 */
export function normalizeCountryValues(
  values: Record<string, number> | Map<string, number>,
): Record<string, number> {
  const result: Record<string, number> = {};

  if (values instanceof Map) {
    values.forEach((value, key) => {
      result[toNumericCode(key)] = value;
    });
  } else {
    Object.entries(values).forEach(([key, value]) => {
      result[toNumericCode(key)] = value;
    });
  }

  return result;
}
