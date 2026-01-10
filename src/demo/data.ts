import type { StatisticData } from "../lib/types";

export const customStats: Record<string, StatisticData> = {
  coffee: {
    definition: {
      id: "coffee_consumption",
      name: "Coffee Consumption",
      unit: "kg/capita",
      description: "Annual per capita",
      colorScale: ["#f7e6d5", "#c9a87c", "#3d2314"],
      domain: [0, 12],
    },
    values: {
      246: 12.0,
      578: 9.9,
      208: 8.7,
      528: 8.4,
      752: 8.2,
      756: 7.9,
      "056": 6.8,
      276: 6.5,
      124: 6.5,
      "040": 6.1,
      "076": 6.1,
      380: 5.9,
      250: 5.4,
      300: 5.7,
      620: 4.3,
      203: 4.5,
      840: 4.2,
      348: 3.8,
      392: 3.4,
      616: 3.2,
    },
  },
  happiness: {
    definition: {
      id: "happiness_index",
      name: "World Happiness",
      unit: "score",
      description: "UN Report 2024",
      colorScale: ["#fde0dd", "#fa9fb5", "#c51b8a"],
      domain: [3, 8],
    },
    values: {
      246: 7.8,
      208: 7.6,
      352: 7.5,
      756: 7.5,
      528: 7.4,
      578: 7.3,
      752: 7.3,
      "040": 7.2,
      "036": 7.1,
      554: 7.1,
      124: 7.0,
      826: 6.9,
      276: 6.9,
      "056": 6.8,
      840: 6.7,
    },
  },
  us_unemployment: {
    definition: {
      id: "us_unemployment",
      name: "US Unemployment",
      unit: "%",
      description: "BLS 2023 (Sample)",
      colorScale: ["#f7fbff", "#6baed6", "#08306b"],
      domain: [2, 10],
    },
    values: {
      "06037": 5.4, // Los Angeles, CA
      17031: 4.5, // Cook, IL (Chicago)
      48201: 3.8, // Harris, TX (Houston)
      "04013": 2.9, // Maricopa, AZ (Phoenix)
      36061: 4.1, // New York, NY
      12086: 2.6, // Miami-Dade, FL
      53033: 3.4, // King, WA (Seattle)
      "06075": 3.0, // San Francisco, CA
      25025: 2.8, // Suffolk, MA (Boston)
      42101: 4.0, // Philadelphia, PA
      11001: 5.1, // District of Columbia
    },
  },
  germany_population: {
    definition: {
      id: "germany_pop",
      name: "Population (Mock)",
      unit: "people",
      description: "Mock Population Data for German Districts",
      colorScale: ["#f7fbff", "#6baed6", "#08306b"], // Blues
      domain: [0, 100],
    },
    values: {
      100: 95, // Munich (Munich Städte)
      287: 90, // Cologne (Cologne Städte)
      157: 95, // Berlin
      177: 85, // Hamburg (Hamburg Städte)
      8: 80, // Dortmund (Dortmund Städte)
      181: 88, // Frankfurt am Main (Städte)
      20: 87, // Stuttgart (Stuttgart Städte)
      176: 82, // Bremen (Bremen Städte)
      271: 85, // Düsseldorf (Düsseldorf Städte)
      272: 78, // Essen (Essen Städte)
      393: 84, // Leipzig (Leipzig Städte)
      382: 83, // Dresden (Dresden Städte)
      163: 75, // Frankfurt am Oder (Städte)
      7: 76, // Bochum (Städte)
      270: 75, // Duisburg (Städte)
      283: 74, // Wuppertal (Städte)
      262: 72, // Bielefeld (Städte)
      286: 85, // Bonn (Städte)
      300: 82, // Münster (Städte)
    },
  },
  world_cities_pop: {
    definition: {
      id: "world_cities_pop",
      name: "Metro Population",
      unit: "million",
      description: "Major Urban Areas Population",
      colorScale: ["#fee5d9", "#fcae91", "#cb181d"], // Red Heatmap
      domain: [0, 50],
    },
    values: {
      "New York": 20,
      Tokyo: 38,
      London: 14,
      Paris: 12,
      "Los Angeles": 13,
      Chicago: 9,
      Moscow: 17,
      Istanbul: 15,
      Shanghai: 27,
      Beijing: 20,
      Mumbai: 20,
      "Sao Paulo": 22,
      "Mexico City": 21,
      Cairo: 20,
      Lagos: 14,
    },
  },
};
