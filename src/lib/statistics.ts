/**
 * Built-in statistics definitions
 * These can be used with the included WORLD_STATISTICS_DATA
 */

import type { StatisticDefinition } from "./types";

/**
 * Built-in statistics available out of the box
 */
export const BUILT_IN_STATISTICS: Record<string, StatisticDefinition> = {
  lifeExpectancy: {
    id: "lifeExpectancy",
    name: "Life Expectancy",
    unit: "years",
    description: "Average life expectancy at birth",
    colorScale: ["#feedde", "#fdbe85", "#d94701"],
    domain: [55, 85],
    format: (v) => `${v.toFixed(1)} years`,
  },

  humanDevIndex: {
    id: "humanDevIndex",
    name: "Human Development Index",
    unit: "",
    description: "UN composite index of life expectancy, education, and income",
    colorScale: ["#fee5d9", "#fcae91", "#cb181d"],
    domain: [0.4, 1.0],
    format: (v) => v.toFixed(3),
  },

  gdpPerCapita: {
    id: "gdpPerCapita",
    name: "GDP per Capita (PPP)",
    unit: "$",
    description: "Purchasing power parity adjusted GDP per person",
    colorScale: ["#edf8e9", "#74c476", "#006d2c"],
    domain: [1000, 80000],
    format: (v) => `$${(v / 1000).toFixed(1)}k`,
  },

  co2Emissions: {
    id: "co2Emissions",
    name: "CO₂ Emissions",
    unit: "t/capita",
    description: "Carbon dioxide emissions per capita",
    colorScale: ["#f7fbff", "#6baed6", "#08306b"],
    domain: [0, 20],
    format: (v) => `${v.toFixed(1)}t`,
  },

  renewableEnergy: {
    id: "renewableEnergy",
    name: "Renewable Energy",
    unit: "%",
    description: "Share of renewable energy in total energy consumption",
    colorScale: ["#f7fcf5", "#74c476", "#00441b"],
    domain: [0, 100],
    format: (v) => `${v.toFixed(0)}%`,
  },

  internetUsers: {
    id: "internetUsers",
    name: "Internet Penetration",
    unit: "%",
    description: "Percentage of population using the internet",
    colorScale: ["#f2f0f7", "#9e9ac8", "#54278f"],
    domain: [0, 100],
    format: (v) => `${v.toFixed(0)}%`,
  },

  urbanPopulation: {
    id: "urbanPopulation",
    name: "Urbanization",
    unit: "%",
    description: "Percentage of population living in urban areas",
    colorScale: ["#fff5eb", "#fd8d3c", "#7f2704"],
    domain: [15, 100],
    format: (v) => `${v.toFixed(0)}%`,
  },

  healthExpenditure: {
    id: "healthExpenditure",
    name: "Health Spending",
    unit: "% GDP",
    description: "Total health expenditure as percentage of GDP",
    colorScale: ["#fff5f0", "#fb6a4a", "#99000d"],
    domain: [2, 18],
    format: (v) => `${v.toFixed(1)}%`,
  },

  forestArea: {
    id: "forestArea",
    name: "Forest Coverage",
    unit: "%",
    description: "Forest area as percentage of total land area",
    colorScale: ["#f7fcf5", "#41ab5d", "#00441b"],
    domain: [0, 75],
    format: (v) => `${v.toFixed(0)}%`,
  },

  population: {
    id: "population",
    name: "Population",
    unit: "millions",
    description: "Total population",
    colorScale: ["#fff7bc", "#fec44f", "#d95f0e"],
    domain: [1, 1500],
    format: (v) => `${v.toFixed(0)}M`,
  },

  accessElectricity: {
    id: "accessElectricity",
    name: "Electricity Access",
    unit: "%",
    description: "Percentage of population with access to electricity",
    colorScale: ["#ffeda0", "#feb24c", "#f03b20"],
    domain: [20, 100],
    format: (v) => `${v.toFixed(0)}%`,
  },

  educationExpenditure: {
    id: "educationExpenditure",
    name: "Education Spending",
    unit: "% GDP",
    description: "Government expenditure on education as percentage of GDP",
    colorScale: ["#edf8fb", "#7bccc4", "#0868ac"],
    domain: [1, 10],
    format: (v) => `${v.toFixed(1)}%`,
  },
};

/**
 * Default statistic shown when no statistic is specified
 */
export const DEFAULT_STATISTIC = BUILT_IN_STATISTICS.lifeExpectancy;

/**
 * Get a built-in statistic by ID
 */
export function getBuiltInStatistic(id: string): StatisticDefinition | undefined {
  return BUILT_IN_STATISTICS[id];
}

/**
 * Get all available built-in statistic IDs
 */
export function getAvailableStatistics(): string[] {
  return Object.keys(BUILT_IN_STATISTICS);
}
