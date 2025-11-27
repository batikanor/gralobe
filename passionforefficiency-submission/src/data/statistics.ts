/**
 * World Statistics Data
 * Sources: World Bank, UN Data, CIA World Factbook (2023 estimates)
 */

export interface CountryData {
  name: string;
  code: string;
  lat: number;
  lon: number;
  population: number;          // millions
  gdpPerCapita: number;        // USD
  co2PerCapita: number;        // metric tons
  lifeExpectancy: number;      // years
  internetPenetration: number; // percentage
  renewableEnergy: number;     // percentage of total energy
}

export interface StatisticDefinition {
  id: string;
  name: string;
  unit: string;
  description: string;
  colorScale: [string, string, string]; // low, mid, high colors
  domain: [number, number];             // min, max values for normalization
  accessor: (country: CountryData) => number;
}

// Country data with statistics (simplified dataset of major countries)
export const COUNTRY_DATA: CountryData[] = [
  { name: "China", code: "CN", lat: 35.86, lon: 104.19, population: 1412, gdpPerCapita: 12720, co2PerCapita: 7.6, lifeExpectancy: 78.2, internetPenetration: 73, renewableEnergy: 15 },
  { name: "India", code: "IN", lat: 20.59, lon: 78.96, population: 1408, gdpPerCapita: 2389, co2PerCapita: 1.9, lifeExpectancy: 70.8, internetPenetration: 47, renewableEnergy: 38 },
  { name: "United States", code: "US", lat: 37.09, lon: -95.71, population: 332, gdpPerCapita: 76330, co2PerCapita: 14.2, lifeExpectancy: 77.5, internetPenetration: 92, renewableEnergy: 13 },
  { name: "Indonesia", code: "ID", lat: -0.79, lon: 113.92, population: 276, gdpPerCapita: 4788, co2PerCapita: 2.3, lifeExpectancy: 71.9, internetPenetration: 62, renewableEnergy: 12 },
  { name: "Pakistan", code: "PK", lat: 30.37, lon: 69.34, population: 225, gdpPerCapita: 1505, co2PerCapita: 1.0, lifeExpectancy: 67.3, internetPenetration: 21, renewableEnergy: 34 },
  { name: "Brazil", code: "BR", lat: -14.24, lon: -51.93, population: 215, gdpPerCapita: 8917, co2PerCapita: 2.2, lifeExpectancy: 76.0, internetPenetration: 81, renewableEnergy: 47 },
  { name: "Nigeria", code: "NG", lat: 9.08, lon: 8.68, population: 219, gdpPerCapita: 2184, co2PerCapita: 0.6, lifeExpectancy: 53.9, internetPenetration: 36, renewableEnergy: 86 },
  { name: "Bangladesh", code: "BD", lat: 23.68, lon: 90.36, population: 167, gdpPerCapita: 2688, co2PerCapita: 0.6, lifeExpectancy: 73.2, internetPenetration: 39, renewableEnergy: 3 },
  { name: "Russia", code: "RU", lat: 61.52, lon: 105.32, population: 144, gdpPerCapita: 12195, co2PerCapita: 11.4, lifeExpectancy: 72.8, internetPenetration: 85, renewableEnergy: 7 },
  { name: "Mexico", code: "MX", lat: 23.63, lon: -102.55, population: 130, gdpPerCapita: 10046, co2PerCapita: 3.5, lifeExpectancy: 75.1, internetPenetration: 72, renewableEnergy: 9 },
  { name: "Japan", code: "JP", lat: 36.20, lon: 138.25, population: 125, gdpPerCapita: 33815, co2PerCapita: 8.5, lifeExpectancy: 84.6, internetPenetration: 93, renewableEnergy: 12 },
  { name: "Ethiopia", code: "ET", lat: 9.15, lon: 40.49, population: 121, gdpPerCapita: 1027, co2PerCapita: 0.2, lifeExpectancy: 66.6, internetPenetration: 17, renewableEnergy: 93 },
  { name: "Philippines", code: "PH", lat: 12.88, lon: 121.77, population: 115, gdpPerCapita: 3623, co2PerCapita: 1.3, lifeExpectancy: 72.1, internetPenetration: 53, renewableEnergy: 29 },
  { name: "Egypt", code: "EG", lat: 26.82, lon: 30.80, population: 106, gdpPerCapita: 3699, co2PerCapita: 2.4, lifeExpectancy: 72.0, internetPenetration: 72, renewableEnergy: 10 },
  { name: "Vietnam", code: "VN", lat: 14.06, lon: 108.28, population: 99, gdpPerCapita: 4163, co2PerCapita: 3.5, lifeExpectancy: 75.8, internetPenetration: 70, renewableEnergy: 21 },
  { name: "Germany", code: "DE", lat: 51.17, lon: 10.45, population: 84, gdpPerCapita: 48718, co2PerCapita: 8.1, lifeExpectancy: 81.4, internetPenetration: 93, renewableEnergy: 20 },
  { name: "Turkey", code: "TR", lat: 38.96, lon: 35.24, population: 85, gdpPerCapita: 9661, co2PerCapita: 4.8, lifeExpectancy: 78.6, internetPenetration: 83, renewableEnergy: 17 },
  { name: "Iran", code: "IR", lat: 32.43, lon: 53.69, population: 87, gdpPerCapita: 4102, co2PerCapita: 8.3, lifeExpectancy: 76.7, internetPenetration: 78, renewableEnergy: 6 },
  { name: "Thailand", code: "TH", lat: 15.87, lon: 100.99, population: 70, gdpPerCapita: 7295, co2PerCapita: 3.8, lifeExpectancy: 79.3, internetPenetration: 78, renewableEnergy: 15 },
  { name: "United Kingdom", code: "GB", lat: 55.38, lon: -3.44, population: 68, gdpPerCapita: 45850, co2PerCapita: 4.7, lifeExpectancy: 81.8, internetPenetration: 97, renewableEnergy: 15 },
  { name: "France", code: "FR", lat: 46.23, lon: 2.21, population: 68, gdpPerCapita: 42330, co2PerCapita: 4.3, lifeExpectancy: 82.7, internetPenetration: 91, renewableEnergy: 12 },
  { name: "Italy", code: "IT", lat: 41.87, lon: 12.57, population: 59, gdpPerCapita: 34776, co2PerCapita: 5.3, lifeExpectancy: 83.5, internetPenetration: 86, renewableEnergy: 20 },
  { name: "South Africa", code: "ZA", lat: -30.56, lon: 22.94, population: 60, gdpPerCapita: 6001, co2PerCapita: 6.7, lifeExpectancy: 65.3, internetPenetration: 70, renewableEnergy: 6 },
  { name: "Tanzania", code: "TZ", lat: -6.37, lon: 34.89, population: 63, gdpPerCapita: 1136, co2PerCapita: 0.2, lifeExpectancy: 66.2, internetPenetration: 25, renewableEnergy: 85 },
  { name: "Kenya", code: "KE", lat: -0.02, lon: 37.91, population: 55, gdpPerCapita: 2007, co2PerCapita: 0.4, lifeExpectancy: 67.0, internetPenetration: 29, renewableEnergy: 75 },
  { name: "South Korea", code: "KR", lat: 35.91, lon: 127.77, population: 52, gdpPerCapita: 32255, co2PerCapita: 11.5, lifeExpectancy: 83.7, internetPenetration: 97, renewableEnergy: 4 },
  { name: "Colombia", code: "CO", lat: 4.57, lon: -74.30, population: 52, gdpPerCapita: 6131, co2PerCapita: 1.8, lifeExpectancy: 77.3, internetPenetration: 73, renewableEnergy: 27 },
  { name: "Spain", code: "ES", lat: 40.46, lon: -3.75, population: 47, gdpPerCapita: 29674, co2PerCapita: 5.0, lifeExpectancy: 83.6, internetPenetration: 94, renewableEnergy: 21 },
  { name: "Argentina", code: "AR", lat: -38.42, lon: -63.62, population: 46, gdpPerCapita: 10636, co2PerCapita: 3.8, lifeExpectancy: 77.1, internetPenetration: 87, renewableEnergy: 13 },
  { name: "Uganda", code: "UG", lat: 1.37, lon: 32.29, population: 48, gdpPerCapita: 858, co2PerCapita: 0.1, lifeExpectancy: 64.4, internetPenetration: 18, renewableEnergy: 89 },
  { name: "Algeria", code: "DZ", lat: 28.03, lon: 1.66, population: 45, gdpPerCapita: 3765, co2PerCapita: 3.7, lifeExpectancy: 77.1, internetPenetration: 71, renewableEnergy: 1 },
  { name: "Sudan", code: "SD", lat: 12.86, lon: 30.22, population: 46, gdpPerCapita: 595, co2PerCapita: 0.5, lifeExpectancy: 66.1, internetPenetration: 31, renewableEnergy: 62 },
  { name: "Ukraine", code: "UA", lat: 48.38, lon: 31.17, population: 41, gdpPerCapita: 4836, co2PerCapita: 4.5, lifeExpectancy: 72.1, internetPenetration: 75, renewableEnergy: 8 },
  { name: "Iraq", code: "IQ", lat: 33.22, lon: 43.68, population: 43, gdpPerCapita: 5048, co2PerCapita: 4.0, lifeExpectancy: 71.1, internetPenetration: 75, renewableEnergy: 3 },
  { name: "Poland", code: "PL", lat: 51.92, lon: 19.15, population: 38, gdpPerCapita: 17999, co2PerCapita: 8.0, lifeExpectancy: 78.7, internetPenetration: 87, renewableEnergy: 17 },
  { name: "Canada", code: "CA", lat: 56.13, lon: -106.35, population: 39, gdpPerCapita: 52051, co2PerCapita: 14.3, lifeExpectancy: 82.4, internetPenetration: 93, renewableEnergy: 18 },
  { name: "Morocco", code: "MA", lat: 31.79, lon: -7.09, population: 37, gdpPerCapita: 3441, co2PerCapita: 1.9, lifeExpectancy: 77.0, internetPenetration: 84, renewableEnergy: 13 },
  { name: "Saudi Arabia", code: "SA", lat: 23.89, lon: 45.08, population: 36, gdpPerCapita: 23186, co2PerCapita: 15.3, lifeExpectancy: 76.9, internetPenetration: 98, renewableEnergy: 0 },
  { name: "Peru", code: "PE", lat: -9.19, lon: -75.02, population: 34, gdpPerCapita: 6622, co2PerCapita: 1.6, lifeExpectancy: 77.4, internetPenetration: 71, renewableEnergy: 25 },
  { name: "Australia", code: "AU", lat: -25.27, lon: 133.78, population: 26, gdpPerCapita: 64491, co2PerCapita: 15.0, lifeExpectancy: 84.0, internetPenetration: 96, renewableEnergy: 12 },
  { name: "Malaysia", code: "MY", lat: 4.21, lon: 101.98, population: 34, gdpPerCapita: 11993, co2PerCapita: 7.6, lifeExpectancy: 76.9, internetPenetration: 90, renewableEnergy: 8 },
  { name: "Ghana", code: "GH", lat: 7.95, lon: -1.02, population: 33, gdpPerCapita: 2363, co2PerCapita: 0.6, lifeExpectancy: 64.9, internetPenetration: 53, renewableEnergy: 42 },
  { name: "Nepal", code: "NP", lat: 28.39, lon: 84.12, population: 30, gdpPerCapita: 1337, co2PerCapita: 0.5, lifeExpectancy: 71.7, internetPenetration: 48, renewableEnergy: 86 },
  { name: "Venezuela", code: "VE", lat: 6.42, lon: -66.59, population: 29, gdpPerCapita: 3715, co2PerCapita: 3.1, lifeExpectancy: 72.1, internetPenetration: 72, renewableEnergy: 68 },
  { name: "Madagascar", code: "MG", lat: -18.77, lon: 46.87, population: 29, gdpPerCapita: 500, co2PerCapita: 0.2, lifeExpectancy: 67.0, internetPenetration: 10, renewableEnergy: 68 },
  { name: "Cameroon", code: "CM", lat: 7.37, lon: 12.35, population: 28, gdpPerCapita: 1590, co2PerCapita: 0.4, lifeExpectancy: 60.3, internetPenetration: 34, renewableEnergy: 74 },
  { name: "Netherlands", code: "NL", lat: 52.13, lon: 5.29, population: 18, gdpPerCapita: 57025, co2PerCapita: 8.1, lifeExpectancy: 82.3, internetPenetration: 98, renewableEnergy: 13 },
  { name: "Chile", code: "CL", lat: -35.68, lon: -71.54, population: 19, gdpPerCapita: 15356, co2PerCapita: 4.3, lifeExpectancy: 80.7, internetPenetration: 88, renewableEnergy: 27 },
  { name: "Sweden", code: "SE", lat: 60.13, lon: 18.64, population: 10, gdpPerCapita: 55689, co2PerCapita: 3.5, lifeExpectancy: 83.2, internetPenetration: 96, renewableEnergy: 56 },
  { name: "Norway", code: "NO", lat: 60.47, lon: 8.47, population: 5, gdpPerCapita: 89090, co2PerCapita: 7.5, lifeExpectancy: 83.2, internetPenetration: 98, renewableEnergy: 72 },
  { name: "Singapore", code: "SG", lat: 1.35, lon: 103.82, population: 6, gdpPerCapita: 72794, co2PerCapita: 8.9, lifeExpectancy: 84.1, internetPenetration: 96, renewableEnergy: 2 },
  { name: "New Zealand", code: "NZ", lat: -40.90, lon: 174.89, population: 5, gdpPerCapita: 48802, co2PerCapita: 6.8, lifeExpectancy: 82.5, internetPenetration: 95, renewableEnergy: 40 },
  { name: "Ireland", code: "IE", lat: 53.14, lon: -7.69, population: 5, gdpPerCapita: 100172, co2PerCapita: 7.3, lifeExpectancy: 82.8, internetPenetration: 94, renewableEnergy: 14 },
  { name: "Israel", code: "IL", lat: 31.05, lon: 34.85, population: 9, gdpPerCapita: 52170, co2PerCapita: 6.9, lifeExpectancy: 83.5, internetPenetration: 90, renewableEnergy: 6 },
  { name: "UAE", code: "AE", lat: 23.42, lon: 53.85, population: 10, gdpPerCapita: 44316, co2PerCapita: 20.7, lifeExpectancy: 78.7, internetPenetration: 100, renewableEnergy: 1 },
  { name: "Switzerland", code: "CH", lat: 46.82, lon: 8.23, population: 9, gdpPerCapita: 93260, co2PerCapita: 4.0, lifeExpectancy: 84.0, internetPenetration: 96, renewableEnergy: 28 },
  { name: "Austria", code: "AT", lat: 47.52, lon: 14.55, population: 9, gdpPerCapita: 52085, co2PerCapita: 6.8, lifeExpectancy: 82.0, internetPenetration: 93, renewableEnergy: 36 },
  { name: "Portugal", code: "PT", lat: 39.40, lon: -8.22, population: 10, gdpPerCapita: 24568, co2PerCapita: 4.0, lifeExpectancy: 82.6, internetPenetration: 85, renewableEnergy: 34 },
  { name: "Greece", code: "GR", lat: 39.07, lon: 21.82, population: 10, gdpPerCapita: 20192, co2PerCapita: 5.3, lifeExpectancy: 81.4, internetPenetration: 79, renewableEnergy: 22 },
  { name: "Czech Republic", code: "CZ", lat: 49.82, lon: 15.47, population: 11, gdpPerCapita: 27220, co2PerCapita: 9.3, lifeExpectancy: 79.4, internetPenetration: 88, renewableEnergy: 17 },
  { name: "Belgium", code: "BE", lat: 50.50, lon: 4.47, population: 12, gdpPerCapita: 49582, co2PerCapita: 8.0, lifeExpectancy: 82.2, internetPenetration: 94, renewableEnergy: 13 },
  { name: "Hungary", code: "HU", lat: 47.16, lon: 19.50, population: 10, gdpPerCapita: 18728, co2PerCapita: 4.6, lifeExpectancy: 77.0, internetPenetration: 89, renewableEnergy: 14 },
  { name: "Finland", code: "FI", lat: 61.92, lon: 25.75, population: 6, gdpPerCapita: 50872, co2PerCapita: 6.5, lifeExpectancy: 82.2, internetPenetration: 96, renewableEnergy: 44 },
  { name: "Denmark", code: "DK", lat: 56.26, lon: 9.50, population: 6, gdpPerCapita: 67803, co2PerCapita: 4.4, lifeExpectancy: 81.6, internetPenetration: 98, renewableEnergy: 40 },
  { name: "Iceland", code: "IS", lat: 64.96, lon: -19.02, population: 0.4, gdpPerCapita: 68727, co2PerCapita: 9.7, lifeExpectancy: 83.1, internetPenetration: 99, renewableEnergy: 85 },
];

// Available statistics with their display properties
export const STATISTICS: StatisticDefinition[] = [
  {
    id: 'population',
    name: 'Population',
    unit: 'million',
    description: 'Total population in millions',
    colorScale: ['#fee5d9', '#fc9272', '#de2d26'],
    domain: [0, 1500],
    accessor: (c) => c.population,
  },
  {
    id: 'gdpPerCapita',
    name: 'GDP per Capita',
    unit: 'USD',
    description: 'Gross Domestic Product per person',
    colorScale: ['#edf8e9', '#74c476', '#006d2c'],
    domain: [0, 100000],
    accessor: (c) => c.gdpPerCapita,
  },
  {
    id: 'co2PerCapita',
    name: 'CO₂ Emissions',
    unit: 't/person',
    description: 'Carbon dioxide emissions per capita',
    colorScale: ['#f7fbff', '#6baed6', '#08306b'],
    domain: [0, 20],
    accessor: (c) => c.co2PerCapita,
  },
  {
    id: 'lifeExpectancy',
    name: 'Life Expectancy',
    unit: 'years',
    description: 'Average life expectancy at birth',
    colorScale: ['#fee0d2', '#fc9272', '#67000d'],
    domain: [50, 90],
    accessor: (c) => c.lifeExpectancy,
  },
  {
    id: 'internetPenetration',
    name: 'Internet Access',
    unit: '%',
    description: 'Percentage of population with internet',
    colorScale: ['#f2f0f7', '#9e9ac8', '#54278f'],
    domain: [0, 100],
    accessor: (c) => c.internetPenetration,
  },
  {
    id: 'renewableEnergy',
    name: 'Renewable Energy',
    unit: '%',
    description: 'Renewable energy share of total',
    colorScale: ['#fff7bc', '#74c476', '#005a32'],
    domain: [0, 100],
    accessor: (c) => c.renewableEnergy,
  },
];

/**
 * Get normalized value (0-1) for a statistic
 */
export function getNormalizedValue(stat: StatisticDefinition, value: number): number {
  const [min, max] = stat.domain;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Interpolate between colors based on normalized value
 */
export function getColorForValue(stat: StatisticDefinition, value: number): string {
  const t = getNormalizedValue(stat, value);
  const [low, mid, high] = stat.colorScale;

  if (t < 0.5) {
    return interpolateColor(low, mid, t * 2);
  } else {
    return interpolateColor(mid, high, (t - 0.5) * 2);
  }
}

function interpolateColor(color1: string, color2: string, t: number): string {
  const r1 = parseInt(color1.slice(1, 3), 16);
  const g1 = parseInt(color1.slice(3, 5), 16);
  const b1 = parseInt(color1.slice(5, 7), 16);

  const r2 = parseInt(color2.slice(1, 3), 16);
  const g2 = parseInt(color2.slice(3, 5), 16);
  const b2 = parseInt(color2.slice(5, 7), 16);

  const r = Math.round(r1 + (r2 - r1) * t);
  const g = Math.round(g1 + (g2 - g1) * t);
  const b = Math.round(b1 + (b2 - b1) * t);

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
