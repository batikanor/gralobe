/**
 * Real World Statistics Data
 * Sources: World Bank Open Data, UN Data, WHO (2022-2023 estimates)
 * Country codes follow ISO 3166-1 numeric standard
 */

export interface CountryStatistics {
  id: string;           // ISO 3166-1 numeric code (for matching with TopoJSON)
  code: string;         // ISO 3166-1 alpha-2
  name: string;
  population: number;           // Total population (millions)
  gdpPerCapita: number;         // GDP per capita, PPP (current international $)
  co2Emissions: number;         // CO2 emissions (metric tons per capita)
  lifeExpectancy: number;       // Life expectancy at birth (years)
  humanDevIndex: number;        // Human Development Index (0-1)
  internetUsers: number;        // Internet users (% of population)
  renewableEnergy: number;      // Renewable energy (% of total energy)
  urbanPopulation: number;      // Urban population (% of total)
  healthExpenditure: number;    // Health expenditure (% of GDP)
  educationExpenditure: number; // Education expenditure (% of GDP)
  forestArea: number;           // Forest area (% of land)
  accessElectricity: number;    // Access to electricity (% of population)
}

// Real data from World Bank, UN, and WHO databases
export const WORLD_STATISTICS: CountryStatistics[] = [
  // Major economies and populous nations
  { id: "156", code: "CN", name: "China", population: 1412, gdpPerCapita: 21476, co2Emissions: 8.0, lifeExpectancy: 78.2, humanDevIndex: 0.768, internetUsers: 73.0, renewableEnergy: 15.0, urbanPopulation: 64.7, healthExpenditure: 5.4, educationExpenditure: 3.6, forestArea: 23.3, accessElectricity: 100 },
  { id: "356", code: "IN", name: "India", population: 1408, gdpPerCapita: 8379, co2Emissions: 1.9, lifeExpectancy: 70.8, humanDevIndex: 0.633, internetUsers: 47.0, renewableEnergy: 38.0, urbanPopulation: 35.9, healthExpenditure: 3.0, educationExpenditure: 4.5, forestArea: 24.3, accessElectricity: 99.6 },
  { id: "840", code: "US", name: "United States", population: 332, gdpPerCapita: 76399, co2Emissions: 14.4, lifeExpectancy: 77.5, humanDevIndex: 0.921, internetUsers: 92.0, renewableEnergy: 13.0, urbanPopulation: 83.1, healthExpenditure: 18.3, educationExpenditure: 6.1, forestArea: 33.9, accessElectricity: 100 },
  { id: "360", code: "ID", name: "Indonesia", population: 276, gdpPerCapita: 14535, co2Emissions: 2.3, lifeExpectancy: 71.9, humanDevIndex: 0.705, internetUsers: 62.0, renewableEnergy: 12.0, urbanPopulation: 57.9, healthExpenditure: 2.9, educationExpenditure: 3.5, forestArea: 49.1, accessElectricity: 99.0 },
  { id: "586", code: "PK", name: "Pakistan", population: 225, gdpPerCapita: 6470, co2Emissions: 1.0, lifeExpectancy: 67.3, humanDevIndex: 0.544, internetUsers: 21.0, renewableEnergy: 34.0, urbanPopulation: 37.4, healthExpenditure: 2.8, educationExpenditure: 2.3, forestArea: 1.9, accessElectricity: 95.0 },
  { id: "076", code: "BR", name: "Brazil", population: 215, gdpPerCapita: 16154, co2Emissions: 2.2, lifeExpectancy: 76.0, humanDevIndex: 0.754, internetUsers: 81.0, renewableEnergy: 47.0, urbanPopulation: 87.6, healthExpenditure: 10.3, educationExpenditure: 6.3, forestArea: 59.4, accessElectricity: 100 },
  { id: "566", code: "NG", name: "Nigeria", population: 219, gdpPerCapita: 5860, co2Emissions: 0.6, lifeExpectancy: 53.9, humanDevIndex: 0.535, internetUsers: 36.0, renewableEnergy: 86.0, urbanPopulation: 53.0, healthExpenditure: 3.0, educationExpenditure: 0.5, forestArea: 7.2, accessElectricity: 59.5 },
  { id: "050", code: "BD", name: "Bangladesh", population: 167, gdpPerCapita: 7066, co2Emissions: 0.6, lifeExpectancy: 73.2, humanDevIndex: 0.661, internetUsers: 39.0, renewableEnergy: 3.0, urbanPopulation: 39.4, healthExpenditure: 2.3, educationExpenditure: 1.8, forestArea: 11.2, accessElectricity: 99.4 },
  { id: "643", code: "RU", name: "Russia", population: 144, gdpPerCapita: 30820, co2Emissions: 11.4, lifeExpectancy: 72.8, humanDevIndex: 0.822, internetUsers: 85.0, renewableEnergy: 7.0, urbanPopulation: 75.1, healthExpenditure: 5.6, educationExpenditure: 3.7, forestArea: 49.8, accessElectricity: 100 },
  { id: "484", code: "MX", name: "Mexico", population: 130, gdpPerCapita: 20824, co2Emissions: 3.5, lifeExpectancy: 75.1, humanDevIndex: 0.758, internetUsers: 72.0, renewableEnergy: 9.0, urbanPopulation: 81.0, healthExpenditure: 5.4, educationExpenditure: 4.3, forestArea: 33.6, accessElectricity: 100 },
  { id: "392", code: "JP", name: "Japan", population: 125, gdpPerCapita: 45546, co2Emissions: 8.5, lifeExpectancy: 84.6, humanDevIndex: 0.925, internetUsers: 93.0, renewableEnergy: 12.0, urbanPopulation: 91.9, healthExpenditure: 11.0, educationExpenditure: 3.4, forestArea: 68.4, accessElectricity: 100 },
  { id: "231", code: "ET", name: "Ethiopia", population: 121, gdpPerCapita: 2771, co2Emissions: 0.2, lifeExpectancy: 66.6, humanDevIndex: 0.498, internetUsers: 17.0, renewableEnergy: 93.0, urbanPopulation: 22.2, healthExpenditure: 3.5, educationExpenditure: 4.5, forestArea: 12.5, accessElectricity: 51.1 },
  { id: "608", code: "PH", name: "Philippines", population: 115, gdpPerCapita: 9746, co2Emissions: 1.3, lifeExpectancy: 72.1, humanDevIndex: 0.699, internetUsers: 53.0, renewableEnergy: 29.0, urbanPopulation: 47.7, healthExpenditure: 5.1, educationExpenditure: 3.6, forestArea: 27.0, accessElectricity: 97.2 },
  { id: "818", code: "EG", name: "Egypt", population: 106, gdpPerCapita: 14927, co2Emissions: 2.4, lifeExpectancy: 72.0, humanDevIndex: 0.731, internetUsers: 72.0, renewableEnergy: 10.0, urbanPopulation: 42.8, healthExpenditure: 4.6, educationExpenditure: 4.0, forestArea: 0.1, accessElectricity: 100 },
  { id: "704", code: "VN", name: "Vietnam", population: 99, gdpPerCapita: 12756, co2Emissions: 3.5, lifeExpectancy: 75.8, humanDevIndex: 0.703, internetUsers: 70.0, renewableEnergy: 21.0, urbanPopulation: 38.1, healthExpenditure: 4.7, educationExpenditure: 4.2, forestArea: 47.6, accessElectricity: 100 },

  // Europe
  { id: "276", code: "DE", name: "Germany", population: 84, gdpPerCapita: 58780, co2Emissions: 8.1, lifeExpectancy: 81.4, humanDevIndex: 0.942, internetUsers: 93.0, renewableEnergy: 20.0, urbanPopulation: 77.6, healthExpenditure: 12.8, educationExpenditure: 4.9, forestArea: 32.7, accessElectricity: 100 },
  { id: "792", code: "TR", name: "Turkey", population: 85, gdpPerCapita: 36879, co2Emissions: 4.8, lifeExpectancy: 78.6, humanDevIndex: 0.838, internetUsers: 83.0, renewableEnergy: 17.0, urbanPopulation: 76.6, healthExpenditure: 4.3, educationExpenditure: 3.1, forestArea: 28.6, accessElectricity: 100 },
  { id: "364", code: "IR", name: "Iran", population: 87, gdpPerCapita: 16261, co2Emissions: 8.3, lifeExpectancy: 76.7, humanDevIndex: 0.774, internetUsers: 78.0, renewableEnergy: 6.0, urbanPopulation: 76.3, healthExpenditure: 5.2, educationExpenditure: 3.6, forestArea: 6.6, accessElectricity: 100 },
  { id: "764", code: "TH", name: "Thailand", population: 70, gdpPerCapita: 19169, co2Emissions: 3.8, lifeExpectancy: 79.3, humanDevIndex: 0.800, internetUsers: 78.0, renewableEnergy: 15.0, urbanPopulation: 52.2, healthExpenditure: 3.8, educationExpenditure: 2.9, forestArea: 38.8, accessElectricity: 100 },
  { id: "826", code: "GB", name: "United Kingdom", population: 68, gdpPerCapita: 49675, co2Emissions: 4.7, lifeExpectancy: 81.8, humanDevIndex: 0.929, internetUsers: 97.0, renewableEnergy: 15.0, urbanPopulation: 84.2, healthExpenditure: 12.0, educationExpenditure: 5.5, forestArea: 13.2, accessElectricity: 100 },
  { id: "250", code: "FR", name: "France", population: 68, gdpPerCapita: 50728, co2Emissions: 4.3, lifeExpectancy: 82.7, humanDevIndex: 0.903, internetUsers: 91.0, renewableEnergy: 12.0, urbanPopulation: 81.5, healthExpenditure: 12.2, educationExpenditure: 5.5, forestArea: 31.4, accessElectricity: 100 },
  { id: "380", code: "IT", name: "Italy", population: 59, gdpPerCapita: 45936, co2Emissions: 5.3, lifeExpectancy: 83.5, humanDevIndex: 0.895, internetUsers: 86.0, renewableEnergy: 20.0, urbanPopulation: 71.3, healthExpenditure: 8.7, educationExpenditure: 4.3, forestArea: 32.1, accessElectricity: 100 },
  { id: "710", code: "ZA", name: "South Africa", population: 60, gdpPerCapita: 15000, co2Emissions: 6.7, lifeExpectancy: 65.3, humanDevIndex: 0.713, internetUsers: 70.0, renewableEnergy: 6.0, urbanPopulation: 68.0, healthExpenditure: 8.1, educationExpenditure: 6.6, forestArea: 7.6, accessElectricity: 85.0 },
  { id: "834", code: "TZ", name: "Tanzania", population: 63, gdpPerCapita: 2990, co2Emissions: 0.2, lifeExpectancy: 66.2, humanDevIndex: 0.549, internetUsers: 25.0, renewableEnergy: 85.0, urbanPopulation: 37.0, healthExpenditure: 3.8, educationExpenditure: 3.4, forestArea: 48.1, accessElectricity: 42.7 },
  { id: "404", code: "KE", name: "Kenya", population: 55, gdpPerCapita: 5494, co2Emissions: 0.4, lifeExpectancy: 67.0, humanDevIndex: 0.575, internetUsers: 29.0, renewableEnergy: 75.0, urbanPopulation: 28.5, healthExpenditure: 4.3, educationExpenditure: 5.1, forestArea: 7.8, accessElectricity: 75.0 },
  { id: "410", code: "KR", name: "South Korea", population: 52, gdpPerCapita: 50071, co2Emissions: 11.5, lifeExpectancy: 83.7, humanDevIndex: 0.925, internetUsers: 97.0, renewableEnergy: 4.0, urbanPopulation: 81.4, healthExpenditure: 8.4, educationExpenditure: 5.1, forestArea: 63.4, accessElectricity: 100 },
  { id: "170", code: "CO", name: "Colombia", population: 52, gdpPerCapita: 17063, co2Emissions: 1.8, lifeExpectancy: 77.3, humanDevIndex: 0.752, internetUsers: 73.0, renewableEnergy: 27.0, urbanPopulation: 81.7, healthExpenditure: 7.7, educationExpenditure: 4.5, forestArea: 52.7, accessElectricity: 100 },
  { id: "724", code: "ES", name: "Spain", population: 47, gdpPerCapita: 42190, co2Emissions: 5.0, lifeExpectancy: 83.6, humanDevIndex: 0.905, internetUsers: 94.0, renewableEnergy: 21.0, urbanPopulation: 81.1, healthExpenditure: 10.7, educationExpenditure: 4.8, forestArea: 37.4, accessElectricity: 100 },
  { id: "032", code: "AR", name: "Argentina", population: 46, gdpPerCapita: 24678, co2Emissions: 3.8, lifeExpectancy: 77.1, humanDevIndex: 0.842, internetUsers: 87.0, renewableEnergy: 13.0, urbanPopulation: 92.2, healthExpenditure: 10.0, educationExpenditure: 5.0, forestArea: 10.5, accessElectricity: 100 },
  { id: "800", code: "UG", name: "Uganda", population: 48, gdpPerCapita: 2566, co2Emissions: 0.1, lifeExpectancy: 64.4, humanDevIndex: 0.525, internetUsers: 18.0, renewableEnergy: 89.0, urbanPopulation: 25.6, healthExpenditure: 3.8, educationExpenditure: 2.7, forestArea: 9.7, accessElectricity: 46.0 },
  { id: "012", code: "DZ", name: "Algeria", population: 45, gdpPerCapita: 12667, co2Emissions: 3.7, lifeExpectancy: 77.1, humanDevIndex: 0.745, internetUsers: 71.0, renewableEnergy: 1.0, urbanPopulation: 74.3, healthExpenditure: 5.3, educationExpenditure: 5.6, forestArea: 0.8, accessElectricity: 100 },
  { id: "804", code: "UA", name: "Ukraine", population: 41, gdpPerCapita: 14220, co2Emissions: 4.5, lifeExpectancy: 72.1, humanDevIndex: 0.773, internetUsers: 75.0, renewableEnergy: 8.0, urbanPopulation: 69.6, healthExpenditure: 7.0, educationExpenditure: 5.4, forestArea: 16.7, accessElectricity: 100 },
  { id: "368", code: "IQ", name: "Iraq", population: 43, gdpPerCapita: 10474, co2Emissions: 4.0, lifeExpectancy: 71.1, humanDevIndex: 0.686, internetUsers: 75.0, renewableEnergy: 3.0, urbanPopulation: 71.1, healthExpenditure: 4.6, educationExpenditure: 4.7, forestArea: 1.9, accessElectricity: 100 },
  { id: "616", code: "PL", name: "Poland", population: 38, gdpPerCapita: 40343, co2Emissions: 8.0, lifeExpectancy: 78.7, humanDevIndex: 0.876, internetUsers: 87.0, renewableEnergy: 17.0, urbanPopulation: 60.0, healthExpenditure: 6.5, educationExpenditure: 4.6, forestArea: 30.9, accessElectricity: 100 },
  { id: "124", code: "CA", name: "Canada", population: 39, gdpPerCapita: 54966, co2Emissions: 14.3, lifeExpectancy: 82.4, humanDevIndex: 0.936, internetUsers: 93.0, renewableEnergy: 18.0, urbanPopulation: 81.8, healthExpenditure: 12.8, educationExpenditure: 5.3, forestArea: 38.7, accessElectricity: 100 },
  { id: "504", code: "MA", name: "Morocco", population: 37, gdpPerCapita: 9339, co2Emissions: 1.9, lifeExpectancy: 77.0, humanDevIndex: 0.683, internetUsers: 84.0, renewableEnergy: 13.0, urbanPopulation: 64.6, healthExpenditure: 5.3, educationExpenditure: 6.8, forestArea: 12.8, accessElectricity: 100 },
  { id: "682", code: "SA", name: "Saudi Arabia", population: 36, gdpPerCapita: 56817, co2Emissions: 15.3, lifeExpectancy: 76.9, humanDevIndex: 0.875, internetUsers: 98.0, renewableEnergy: 0.0, urbanPopulation: 84.7, healthExpenditure: 6.4, educationExpenditure: 5.1, forestArea: 0.5, accessElectricity: 100 },
  { id: "604", code: "PE", name: "Peru", population: 34, gdpPerCapita: 14225, co2Emissions: 1.6, lifeExpectancy: 77.4, humanDevIndex: 0.762, internetUsers: 71.0, renewableEnergy: 25.0, urbanPopulation: 78.6, healthExpenditure: 5.2, educationExpenditure: 4.0, forestArea: 57.3, accessElectricity: 97.0 },
  { id: "036", code: "AU", name: "Australia", population: 26, gdpPerCapita: 59934, co2Emissions: 15.0, lifeExpectancy: 84.0, humanDevIndex: 0.951, internetUsers: 96.0, renewableEnergy: 12.0, urbanPopulation: 86.4, healthExpenditure: 10.7, educationExpenditure: 6.1, forestArea: 17.4, accessElectricity: 100 },
  { id: "458", code: "MY", name: "Malaysia", population: 34, gdpPerCapita: 33550, co2Emissions: 7.6, lifeExpectancy: 76.9, humanDevIndex: 0.803, internetUsers: 90.0, renewableEnergy: 8.0, urbanPopulation: 78.0, healthExpenditure: 3.8, educationExpenditure: 3.9, forestArea: 57.7, accessElectricity: 100 },
  { id: "288", code: "GH", name: "Ghana", population: 33, gdpPerCapita: 6754, co2Emissions: 0.6, lifeExpectancy: 64.9, humanDevIndex: 0.632, internetUsers: 53.0, renewableEnergy: 42.0, urbanPopulation: 58.0, healthExpenditure: 3.4, educationExpenditure: 4.0, forestArea: 34.5, accessElectricity: 85.9 },
  { id: "524", code: "NP", name: "Nepal", population: 30, gdpPerCapita: 4199, co2Emissions: 0.5, lifeExpectancy: 71.7, humanDevIndex: 0.602, internetUsers: 48.0, renewableEnergy: 86.0, urbanPopulation: 21.0, healthExpenditure: 4.4, educationExpenditure: 4.2, forestArea: 25.4, accessElectricity: 90.0 },
  { id: "862", code: "VE", name: "Venezuela", population: 29, gdpPerCapita: 7045, co2Emissions: 3.1, lifeExpectancy: 72.1, humanDevIndex: 0.691, internetUsers: 72.0, renewableEnergy: 68.0, urbanPopulation: 88.3, healthExpenditure: 3.9, educationExpenditure: 6.9, forestArea: 52.1, accessElectricity: 99.9 },
  { id: "450", code: "MG", name: "Madagascar", population: 29, gdpPerCapita: 1724, co2Emissions: 0.2, lifeExpectancy: 67.0, humanDevIndex: 0.501, internetUsers: 10.0, renewableEnergy: 68.0, urbanPopulation: 39.5, healthExpenditure: 3.9, educationExpenditure: 2.9, forestArea: 21.4, accessElectricity: 34.0 },
  { id: "120", code: "CM", name: "Cameroon", population: 28, gdpPerCapita: 3977, co2Emissions: 0.4, lifeExpectancy: 60.3, humanDevIndex: 0.576, internetUsers: 34.0, renewableEnergy: 74.0, urbanPopulation: 58.4, healthExpenditure: 3.3, educationExpenditure: 3.2, forestArea: 45.6, accessElectricity: 65.0 },

  // Nordic & small high-HDI
  { id: "528", code: "NL", name: "Netherlands", population: 18, gdpPerCapita: 64654, co2Emissions: 8.1, lifeExpectancy: 82.3, humanDevIndex: 0.941, internetUsers: 98.0, renewableEnergy: 13.0, urbanPopulation: 92.5, healthExpenditure: 11.2, educationExpenditure: 5.3, forestArea: 11.2, accessElectricity: 100 },
  { id: "152", code: "CL", name: "Chile", population: 19, gdpPerCapita: 28526, co2Emissions: 4.3, lifeExpectancy: 80.7, humanDevIndex: 0.855, internetUsers: 88.0, renewableEnergy: 27.0, urbanPopulation: 87.9, healthExpenditure: 9.3, educationExpenditure: 5.4, forestArea: 24.4, accessElectricity: 100 },
  { id: "752", code: "SE", name: "Sweden", population: 10, gdpPerCapita: 60239, co2Emissions: 3.5, lifeExpectancy: 83.2, humanDevIndex: 0.947, internetUsers: 96.0, renewableEnergy: 56.0, urbanPopulation: 88.2, healthExpenditure: 11.4, educationExpenditure: 7.6, forestArea: 68.9, accessElectricity: 100 },
  { id: "578", code: "NO", name: "Norway", population: 5, gdpPerCapita: 82236, co2Emissions: 7.5, lifeExpectancy: 83.2, humanDevIndex: 0.961, internetUsers: 98.0, renewableEnergy: 72.0, urbanPopulation: 83.4, healthExpenditure: 11.4, educationExpenditure: 7.9, forestArea: 33.2, accessElectricity: 100 },
  { id: "702", code: "SG", name: "Singapore", population: 6, gdpPerCapita: 116527, co2Emissions: 8.9, lifeExpectancy: 84.1, humanDevIndex: 0.939, internetUsers: 96.0, renewableEnergy: 2.0, urbanPopulation: 100.0, healthExpenditure: 6.1, educationExpenditure: 2.9, forestArea: 22.5, accessElectricity: 100 },
  { id: "554", code: "NZ", name: "New Zealand", population: 5, gdpPerCapita: 48249, co2Emissions: 6.8, lifeExpectancy: 82.5, humanDevIndex: 0.937, internetUsers: 95.0, renewableEnergy: 40.0, urbanPopulation: 86.7, healthExpenditure: 9.7, educationExpenditure: 6.3, forestArea: 38.6, accessElectricity: 100 },
  { id: "372", code: "IE", name: "Ireland", population: 5, gdpPerCapita: 106998, co2Emissions: 7.3, lifeExpectancy: 82.8, humanDevIndex: 0.945, internetUsers: 94.0, renewableEnergy: 14.0, urbanPopulation: 64.2, healthExpenditure: 7.1, educationExpenditure: 3.5, forestArea: 11.0, accessElectricity: 100 },
  { id: "376", code: "IL", name: "Israel", population: 9, gdpPerCapita: 52170, co2Emissions: 6.9, lifeExpectancy: 83.5, humanDevIndex: 0.919, internetUsers: 90.0, renewableEnergy: 6.0, urbanPopulation: 92.8, healthExpenditure: 7.5, educationExpenditure: 7.1, forestArea: 7.6, accessElectricity: 100 },
  { id: "784", code: "AE", name: "United Arab Emirates", population: 10, gdpPerCapita: 77272, co2Emissions: 20.7, lifeExpectancy: 78.7, humanDevIndex: 0.911, internetUsers: 100.0, renewableEnergy: 1.0, urbanPopulation: 87.4, healthExpenditure: 5.0, educationExpenditure: 3.9, forestArea: 4.5, accessElectricity: 100 },
  { id: "756", code: "CH", name: "Switzerland", population: 9, gdpPerCapita: 81867, co2Emissions: 4.0, lifeExpectancy: 84.0, humanDevIndex: 0.962, internetUsers: 96.0, renewableEnergy: 28.0, urbanPopulation: 74.0, healthExpenditure: 11.3, educationExpenditure: 5.0, forestArea: 31.9, accessElectricity: 100 },
  { id: "040", code: "AT", name: "Austria", population: 9, gdpPerCapita: 58013, co2Emissions: 6.8, lifeExpectancy: 82.0, humanDevIndex: 0.916, internetUsers: 93.0, renewableEnergy: 36.0, urbanPopulation: 59.0, healthExpenditure: 10.4, educationExpenditure: 5.4, forestArea: 47.3, accessElectricity: 100 },
  { id: "620", code: "PT", name: "Portugal", population: 10, gdpPerCapita: 38147, co2Emissions: 4.0, lifeExpectancy: 82.6, humanDevIndex: 0.866, internetUsers: 85.0, renewableEnergy: 34.0, urbanPopulation: 66.8, healthExpenditure: 10.6, educationExpenditure: 5.0, forestArea: 36.1, accessElectricity: 100 },
  { id: "300", code: "GR", name: "Greece", population: 10, gdpPerCapita: 33393, co2Emissions: 5.3, lifeExpectancy: 81.4, humanDevIndex: 0.887, internetUsers: 79.0, renewableEnergy: 22.0, urbanPopulation: 80.1, healthExpenditure: 7.8, educationExpenditure: 4.4, forestArea: 32.5, accessElectricity: 100 },
  { id: "203", code: "CZ", name: "Czech Republic", population: 11, gdpPerCapita: 45499, co2Emissions: 9.3, lifeExpectancy: 79.4, humanDevIndex: 0.889, internetUsers: 88.0, renewableEnergy: 17.0, urbanPopulation: 74.1, healthExpenditure: 9.2, educationExpenditure: 4.4, forestArea: 34.7, accessElectricity: 100 },
  { id: "056", code: "BE", name: "Belgium", population: 12, gdpPerCapita: 55521, co2Emissions: 8.0, lifeExpectancy: 82.2, humanDevIndex: 0.937, internetUsers: 94.0, renewableEnergy: 13.0, urbanPopulation: 98.1, healthExpenditure: 11.1, educationExpenditure: 6.4, forestArea: 22.8, accessElectricity: 100 },
  { id: "348", code: "HU", name: "Hungary", population: 10, gdpPerCapita: 37935, co2Emissions: 4.6, lifeExpectancy: 77.0, humanDevIndex: 0.846, internetUsers: 89.0, renewableEnergy: 14.0, urbanPopulation: 72.3, healthExpenditure: 6.4, educationExpenditure: 4.6, forestArea: 22.9, accessElectricity: 100 },
  { id: "246", code: "FI", name: "Finland", population: 6, gdpPerCapita: 53654, co2Emissions: 6.5, lifeExpectancy: 82.2, humanDevIndex: 0.940, internetUsers: 96.0, renewableEnergy: 44.0, urbanPopulation: 85.5, healthExpenditure: 9.6, educationExpenditure: 6.3, forestArea: 73.7, accessElectricity: 100 },
  { id: "208", code: "DK", name: "Denmark", population: 6, gdpPerCapita: 67803, co2Emissions: 4.4, lifeExpectancy: 81.6, humanDevIndex: 0.948, internetUsers: 98.0, renewableEnergy: 40.0, urbanPopulation: 88.2, healthExpenditure: 10.5, educationExpenditure: 6.9, forestArea: 14.7, accessElectricity: 100 },
  { id: "352", code: "IS", name: "Iceland", population: 0.4, gdpPerCapita: 68727, co2Emissions: 9.7, lifeExpectancy: 83.1, humanDevIndex: 0.959, internetUsers: 99.0, renewableEnergy: 85.0, urbanPopulation: 93.9, healthExpenditure: 8.9, educationExpenditure: 7.7, forestArea: 0.5, accessElectricity: 100 },

  // Africa
  { id: "180", code: "CD", name: "DR Congo", population: 99, gdpPerCapita: 1099, co2Emissions: 0.04, lifeExpectancy: 60.7, humanDevIndex: 0.479, internetUsers: 9.0, renewableEnergy: 97.0, urbanPopulation: 46.2, healthExpenditure: 3.3, educationExpenditure: 1.5, forestArea: 67.3, accessElectricity: 19.1 },
  { id: "729", code: "SD", name: "Sudan", population: 46, gdpPerCapita: 4232, co2Emissions: 0.5, lifeExpectancy: 66.1, humanDevIndex: 0.508, internetUsers: 31.0, renewableEnergy: 62.0, urbanPopulation: 35.6, healthExpenditure: 4.5, educationExpenditure: 2.2, forestArea: 9.7, accessElectricity: 55.5 },
  { id: "024", code: "AO", name: "Angola", population: 35, gdpPerCapita: 6938, co2Emissions: 0.8, lifeExpectancy: 62.0, humanDevIndex: 0.586, internetUsers: 36.0, renewableEnergy: 55.0, urbanPopulation: 68.1, healthExpenditure: 2.6, educationExpenditure: 2.4, forestArea: 46.3, accessElectricity: 46.0 },
  { id: "508", code: "MZ", name: "Mozambique", population: 33, gdpPerCapita: 1346, co2Emissions: 0.2, lifeExpectancy: 60.9, humanDevIndex: 0.456, internetUsers: 10.0, renewableEnergy: 79.0, urbanPopulation: 38.0, healthExpenditure: 7.5, educationExpenditure: 5.5, forestArea: 48.2, accessElectricity: 31.0 },
  { id: "384", code: "CI", name: "Ivory Coast", population: 28, gdpPerCapita: 5972, co2Emissions: 0.4, lifeExpectancy: 59.3, humanDevIndex: 0.550, internetUsers: 45.0, renewableEnergy: 68.0, urbanPopulation: 52.7, healthExpenditure: 3.3, educationExpenditure: 3.4, forestArea: 9.3, accessElectricity: 70.0 },
  { id: "562", code: "NE", name: "Niger", population: 26, gdpPerCapita: 1318, co2Emissions: 0.1, lifeExpectancy: 63.0, humanDevIndex: 0.400, internetUsers: 5.0, renewableEnergy: 80.0, urbanPopulation: 16.8, healthExpenditure: 5.2, educationExpenditure: 3.5, forestArea: 0.9, accessElectricity: 19.3 },
  { id: "854", code: "BF", name: "Burkina Faso", population: 22, gdpPerCapita: 2445, co2Emissions: 0.2, lifeExpectancy: 62.7, humanDevIndex: 0.449, internetUsers: 18.0, renewableEnergy: 79.0, urbanPopulation: 31.5, healthExpenditure: 5.6, educationExpenditure: 5.4, forestArea: 19.3, accessElectricity: 19.0 },
  { id: "466", code: "ML", name: "Mali", population: 22, gdpPerCapita: 2462, co2Emissions: 0.2, lifeExpectancy: 59.3, humanDevIndex: 0.428, internetUsers: 27.0, renewableEnergy: 76.0, urbanPopulation: 44.6, healthExpenditure: 3.8, educationExpenditure: 3.8, forestArea: 3.9, accessElectricity: 53.0 },
  { id: "686", code: "SN", name: "Senegal", population: 17, gdpPerCapita: 3942, co2Emissions: 0.7, lifeExpectancy: 68.6, humanDevIndex: 0.511, internetUsers: 58.0, renewableEnergy: 47.0, urbanPopulation: 48.6, healthExpenditure: 3.5, educationExpenditure: 5.5, forestArea: 42.5, accessElectricity: 70.4 },
  { id: "894", code: "ZM", name: "Zambia", population: 20, gdpPerCapita: 3574, co2Emissions: 0.4, lifeExpectancy: 65.0, humanDevIndex: 0.565, internetUsers: 16.0, renewableEnergy: 88.0, urbanPopulation: 45.2, healthExpenditure: 4.9, educationExpenditure: 4.6, forestArea: 59.8, accessElectricity: 43.0 },
  { id: "716", code: "ZW", name: "Zimbabwe", population: 16, gdpPerCapita: 2622, co2Emissions: 0.8, lifeExpectancy: 61.5, humanDevIndex: 0.593, internetUsers: 35.0, renewableEnergy: 78.0, urbanPopulation: 32.2, healthExpenditure: 3.4, educationExpenditure: 5.0, forestArea: 36.4, accessElectricity: 49.0 },
  { id: "646", code: "RW", name: "Rwanda", population: 14, gdpPerCapita: 2359, co2Emissions: 0.1, lifeExpectancy: 69.6, humanDevIndex: 0.534, internetUsers: 30.0, renewableEnergy: 84.0, urbanPopulation: 17.6, healthExpenditure: 7.5, educationExpenditure: 3.1, forestArea: 28.8, accessElectricity: 48.0 },

  // Asia
  { id: "004", code: "AF", name: "Afghanistan", population: 41, gdpPerCapita: 2065, co2Emissions: 0.2, lifeExpectancy: 62.0, humanDevIndex: 0.478, internetUsers: 18.0, renewableEnergy: 45.0, urbanPopulation: 26.3, healthExpenditure: 18.2, educationExpenditure: 4.1, forestArea: 1.9, accessElectricity: 97.7 },
  { id: "104", code: "MM", name: "Myanmar", population: 55, gdpPerCapita: 5699, co2Emissions: 0.6, lifeExpectancy: 67.8, humanDevIndex: 0.585, internetUsers: 44.0, renewableEnergy: 51.0, urbanPopulation: 31.4, healthExpenditure: 4.8, educationExpenditure: 2.0, forestArea: 42.2, accessElectricity: 70.0 },
  { id: "408", code: "KP", name: "North Korea", population: 26, gdpPerCapita: 1800, co2Emissions: 2.0, lifeExpectancy: 72.6, humanDevIndex: 0.733, internetUsers: 0.0, renewableEnergy: 12.0, urbanPopulation: 63.0, healthExpenditure: 6.0, educationExpenditure: 4.0, forestArea: 41.0, accessElectricity: 26.0 },
  { id: "496", code: "MN", name: "Mongolia", population: 3.4, gdpPerCapita: 12896, co2Emissions: 14.0, lifeExpectancy: 70.9, humanDevIndex: 0.739, internetUsers: 84.0, renewableEnergy: 7.0, urbanPopulation: 68.8, healthExpenditure: 4.0, educationExpenditure: 4.7, forestArea: 7.1, accessElectricity: 100 },
  { id: "144", code: "LK", name: "Sri Lanka", population: 22, gdpPerCapita: 14509, co2Emissions: 1.0, lifeExpectancy: 77.4, humanDevIndex: 0.782, internetUsers: 47.0, renewableEnergy: 51.0, urbanPopulation: 18.9, healthExpenditure: 3.8, educationExpenditure: 2.1, forestArea: 29.4, accessElectricity: 100 },
  { id: "398", code: "KZ", name: "Kazakhstan", population: 19, gdpPerCapita: 30500, co2Emissions: 13.2, lifeExpectancy: 74.4, humanDevIndex: 0.811, internetUsers: 91.0, renewableEnergy: 2.0, urbanPopulation: 57.8, healthExpenditure: 2.8, educationExpenditure: 2.9, forestArea: 1.2, accessElectricity: 100 },
  { id: "860", code: "UZ", name: "Uzbekistan", population: 35, gdpPerCapita: 9127, co2Emissions: 3.5, lifeExpectancy: 73.8, humanDevIndex: 0.727, internetUsers: 71.0, renewableEnergy: 11.0, urbanPopulation: 50.4, healthExpenditure: 6.8, educationExpenditure: 5.3, forestArea: 7.7, accessElectricity: 100 },

  // Latin America
  { id: "192", code: "CU", name: "Cuba", population: 11, gdpPerCapita: 9478, co2Emissions: 2.3, lifeExpectancy: 79.0, humanDevIndex: 0.764, internetUsers: 71.0, renewableEnergy: 32.0, urbanPopulation: 77.2, healthExpenditure: 11.7, educationExpenditure: 12.8, forestArea: 33.0, accessElectricity: 100 },
  { id: "218", code: "EC", name: "Ecuador", population: 18, gdpPerCapita: 12171, co2Emissions: 2.3, lifeExpectancy: 77.9, humanDevIndex: 0.740, internetUsers: 70.0, renewableEnergy: 31.0, urbanPopulation: 64.2, healthExpenditure: 8.3, educationExpenditure: 4.4, forestArea: 50.1, accessElectricity: 100 },
  { id: "320", code: "GT", name: "Guatemala", population: 18, gdpPerCapita: 9547, co2Emissions: 1.0, lifeExpectancy: 74.3, humanDevIndex: 0.627, internetUsers: 51.0, renewableEnergy: 62.0, urbanPopulation: 52.4, healthExpenditure: 5.8, educationExpenditure: 3.4, forestArea: 33.0, accessElectricity: 98.0 },
  { id: "068", code: "BO", name: "Bolivia", population: 12, gdpPerCapita: 9484, co2Emissions: 1.8, lifeExpectancy: 72.1, humanDevIndex: 0.692, internetUsers: 66.0, renewableEnergy: 24.0, urbanPopulation: 70.4, healthExpenditure: 6.9, educationExpenditure: 7.3, forestArea: 50.1, accessElectricity: 99.3 },
  { id: "340", code: "HN", name: "Honduras", population: 10, gdpPerCapita: 6289, co2Emissions: 1.0, lifeExpectancy: 75.3, humanDevIndex: 0.621, internetUsers: 48.0, renewableEnergy: 61.0, urbanPopulation: 59.0, healthExpenditure: 7.9, educationExpenditure: 6.1, forestArea: 38.1, accessElectricity: 94.0 },
  { id: "600", code: "PY", name: "Paraguay", population: 7, gdpPerCapita: 15030, co2Emissions: 1.1, lifeExpectancy: 74.3, humanDevIndex: 0.717, internetUsers: 77.0, renewableEnergy: 78.0, urbanPopulation: 62.5, healthExpenditure: 7.6, educationExpenditure: 3.4, forestArea: 38.6, accessElectricity: 100 },
  { id: "858", code: "UY", name: "Uruguay", population: 3.5, gdpPerCapita: 25041, co2Emissions: 2.0, lifeExpectancy: 78.4, humanDevIndex: 0.830, internetUsers: 87.0, renewableEnergy: 55.0, urbanPopulation: 95.6, healthExpenditure: 9.3, educationExpenditure: 5.0, forestArea: 10.5, accessElectricity: 100 },
  { id: "188", code: "CR", name: "Costa Rica", population: 5, gdpPerCapita: 23101, co2Emissions: 1.5, lifeExpectancy: 80.8, humanDevIndex: 0.809, internetUsers: 81.0, renewableEnergy: 73.0, urbanPopulation: 81.4, healthExpenditure: 7.3, educationExpenditure: 6.7, forestArea: 59.0, accessElectricity: 100 },
  { id: "591", code: "PA", name: "Panama", population: 4.4, gdpPerCapita: 35317, co2Emissions: 2.5, lifeExpectancy: 79.2, humanDevIndex: 0.805, internetUsers: 68.0, renewableEnergy: 35.0, urbanPopulation: 68.4, healthExpenditure: 7.3, educationExpenditure: 3.2, forestArea: 62.1, accessElectricity: 95.0 },
];

import type { StatisticDefinition as BaseStatisticDefinition } from '../lib/types';

/**
 * Internal statistic definition that extends the public type
 * with an accessor function for extracting values from CountryStatistics.
 *
 * NOTE: This is for internal use only. Public API uses StatisticDefinition from lib/types.
 */
export interface InternalStatisticDef extends BaseStatisticDefinition {
  /** Accessor function to extract value from CountryStatistics */
  accessor: (country: CountryStatistics) => number;
}

// Re-export the base type for backwards compatibility
export type { BaseStatisticDefinition as StatisticDefinition };

export const STATISTICS: InternalStatisticDef[] = [
  {
    id: 'humanDevIndex',
    name: 'Human Development Index',
    unit: '',
    description: 'UN composite index of life expectancy, education, and income',
    colorScale: ['#fee5d9', '#fcae91', '#cb181d'],
    domain: [0.4, 1.0],
    accessor: (c) => c.humanDevIndex,
    format: (v) => v.toFixed(3),
  },
  {
    id: 'gdpPerCapita',
    name: 'GDP per Capita (PPP)',
    unit: '$',
    description: 'Purchasing power parity adjusted GDP per person',
    colorScale: ['#edf8e9', '#74c476', '#006d2c'],
    domain: [1000, 80000],
    accessor: (c) => c.gdpPerCapita,
    format: (v) => `$${(v/1000).toFixed(1)}k`,
  },
  {
    id: 'co2Emissions',
    name: 'CO₂ Emissions',
    unit: 't/capita',
    description: 'Carbon dioxide emissions per capita',
    colorScale: ['#f7fbff', '#6baed6', '#08306b'],
    domain: [0, 20],
    accessor: (c) => c.co2Emissions,
    format: (v) => `${v.toFixed(1)}t`,
  },
  {
    id: 'lifeExpectancy',
    name: 'Life Expectancy',
    unit: 'years',
    description: 'Average life expectancy at birth',
    colorScale: ['#feedde', '#fdbe85', '#d94701'],
    domain: [55, 85],
    accessor: (c) => c.lifeExpectancy,
    format: (v) => `${v.toFixed(1)} yrs`,
  },
  {
    id: 'renewableEnergy',
    name: 'Renewable Energy',
    unit: '%',
    description: 'Share of renewable energy in total energy consumption',
    colorScale: ['#f7fcf5', '#74c476', '#00441b'],
    domain: [0, 100],
    accessor: (c) => c.renewableEnergy,
    format: (v) => `${v.toFixed(0)}%`,
  },
  {
    id: 'internetUsers',
    name: 'Internet Penetration',
    unit: '%',
    description: 'Percentage of population using the internet',
    colorScale: ['#f2f0f7', '#9e9ac8', '#54278f'],
    domain: [0, 100],
    accessor: (c) => c.internetUsers,
    format: (v) => `${v.toFixed(0)}%`,
  },
  {
    id: 'urbanPopulation',
    name: 'Urbanization',
    unit: '%',
    description: 'Percentage of population living in urban areas',
    colorScale: ['#fff5eb', '#fd8d3c', '#7f2704'],
    domain: [15, 100],
    accessor: (c) => c.urbanPopulation,
    format: (v) => `${v.toFixed(0)}%`,
  },
  {
    id: 'healthExpenditure',
    name: 'Health Spending',
    unit: '% GDP',
    description: 'Total health expenditure as percentage of GDP',
    colorScale: ['#fff5f0', '#fb6a4a', '#99000d'],
    domain: [2, 18],
    accessor: (c) => c.healthExpenditure,
    format: (v) => `${v.toFixed(1)}%`,
  },
  {
    id: 'forestArea',
    name: 'Forest Coverage',
    unit: '%',
    description: 'Forest area as percentage of total land area',
    colorScale: ['#f7fcf5', '#41ab5d', '#00441b'],
    domain: [0, 75],
    accessor: (c) => c.forestArea,
    format: (v) => `${v.toFixed(0)}%`,
  },
  {
    id: 'accessElectricity',
    name: 'Electricity Access',
    unit: '%',
    description: 'Percentage of population with access to electricity',
    colorScale: ['#ffffd4', '#fed98e', '#cc4c02'],
    domain: [15, 100],
    accessor: (c) => c.accessElectricity,
    format: (v) => `${v.toFixed(0)}%`,
  },
];

/**
 * Normalize a value to 0-1 range based on statistic domain.
 */
export function getNormalizedValue(stat: Pick<BaseStatisticDefinition, 'domain'>, value: number): number {
  const [min, max] = stat.domain;
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

/**
 * Get a built-in statistic by ID.
 */
export function getStatisticById(id: string): InternalStatisticDef | undefined {
  return STATISTICS.find(s => s.id === id);
}
