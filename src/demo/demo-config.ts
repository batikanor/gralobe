import type { GlobeViz } from "../lib/GlobeViz";
import type { GlobeVizConfig } from "../lib/types";
import { customStats, worldCitiesCoordinates } from "./data";

export interface DemoConfig {
  id: string; // Unique ID for the DOM element
  title: string; // Display title
  subtitle?: string; // Subtitle/Meta info
  description?: string; // Optional description
  heightClass?: string; // e.g., 'height-400', 'height-320'
  config: GlobeVizConfig; // The config object
  setup?: (globe: GlobeViz) => Promise<void>; // Setup callback
}

export interface DemoSection {
  id: string;
  title: string;
  description: string;
  infoBox?: string; // Optional detailed info box content
  gridClass?: string; // e.g., 'grid-2', 'grid-3'
  demos: DemoConfig[];
}

// Helper to generate US election data
const getUsElectionData = () => {
  if (customStats.us_2020_election) return customStats.us_2020_election;

  const values: Record<string, number> = {};
  for (let fips = 1000; fips < 56046; fips++) {
    const val = (Math.sin(fips * 0.1) + Math.cos(fips * 0.05)) * 0.5 + 0.5;
    const sFips = fips.toString().padStart(5, "0");
    if (fips % 7 !== 0) {
      values[sFips] = val;
      values[fips.toString()] = val;
    }
  }

  customStats.us_2020_election = {
    definition: {
      id: "us_election",
      name: "Vote Share (Sim)",
      unit: "share",
      description: "Simulated 2020 Election Data",
      colorScale: ["#ff0000", "#ffffff", "#0000ff"],
      domain: [0, 1],
    },
    values: values,
  };
  return customStats.us_2020_election;
};

export const sections: DemoSection[] = [
  // 1. COUNTRY LEVEL
  {
    id: "country-level",
    title: "Country Level Maps",
    description: "Standard choropleth maps using ISO codes (Default)",
    infoBox:
      "The default mode loads 110m resolution country borders. Data is mapped using ISO Alpha-2, Alpha-3, or Country Names.",
    gridClass: "grid-2",
    demos: [
      {
        id: "globe-stat-life",
        title: "Life Expectancy",
        subtitle: "Built-in Statistic",
        config: {
          statistic: "lifeExpectancy",
          labels: "data",
          showControls: true,
          topology: {
            url: "/data/countries-110m.json", // Local fallback to prevent network issues
            objectName: "countries",
          },
        },
      },
      {
        id: "globe-labels-data",
        title: "Coffee Consumption",
        subtitle: "labels: 'data' (Sparse)",
        config: {
          statistic: customStats.coffee,
          labels: "data", // Show labels only for countries with data
          effects: { atmosphere: true },
          showControls: true,
        },
      },
    ],
  },

  // 2. STATE / PROVINCE LEVEL
  {
    id: "state-level",
    title: "State & Province Level",
    description: "Using custom TopoJSON/GeoJSON for regional data",
    infoBox:
      "Render high-resolution state or province borders by providing a `topology.url`. Requires `disableNormalization: true` if IDs don't match ISO standards.",
    gridClass: "grid-2",
    demos: [
      {
        id: "globe-us-unemployment",
        title: "US Unemployment",
        subtitle: "US Counties (TopoJSON)",
        config: {
          topology: {
            url: "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",
            objectName: "counties",
            disableNormalization: true,
          },
          statistic: customStats.us_unemployment,
          autoRotate: false,
          labels: "none",
          effects: { atmosphere: false },
          showControls: true,
        },
      },
      {
        id: "globe-germany",
        title: "Germany Population",
        subtitle: "Districts (GeoJSON)",
        config: {
          topology: {
            url: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/2_hoch.geo.json",
            objectName: "counties", // Not used for GeoJSON but safe to keep
            disableNormalization: true,
            labelProperty: "NAME_3",
          },
          statistic: customStats.germany_population,
          autoRotate: false,
          effects: { atmosphere: false },
          showControls: true,
        },
      },
    ],
  },

  // 3. CITY / URBAN LEVEL
  {
    id: "city-level",
    title: "City Level (Polygons)",
    description: "Detailed urban area boundaries",
    infoBox:
      "Display actual city footprints using urban area polygons. Useful for dense, localized data visualization.",
    gridClass: "grid-1", // Full width for detail
    demos: [
      {
        id: "globe-us-election", // Reusing the election demo here as it's dense
        title: "US 2020 Election (Simulated)",
        subtitle: "~3000 Data Points (Counties)",
        description: "Simulates a dense dataset mapped to thousands of county polygons.",
        config: {
          topology: {
            url: "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",
            objectName: "counties",
            disableNormalization: true,
          },
          statistic: getUsElectionData(), // Use helper
          autoRotate: false,
          effects: { atmosphere: false },
          showControls: true,
        },
      },
    ],
  },

  // 4. POINT LEVEL
  {
    id: "point-level",
    title: "Point Level (Synthetic)",
    description: "Lat/Lon points with synthetic geometry",
    infoBox:
      "Perfect for data where you only have coordinates. The system generates synthetic circular boundaries for each point.",
    gridClass: "grid-1",
    demos: [
      {
        id: "globe-cities",
        title: "World Cities",
        subtitle: "Population / Density",
        description: "Generates synthetic circles around city centers using `pointRadius`.",
        config: {
          texture: "dark",
          topology: {
            url: "", // Suppress default world map
            objectName: "urban",
            disableNormalization: true,
          },
          effects: {
            atmosphere: true,
            glowPulse: true,
            cityLights: true,
          },
          pointRadius: 140, // SYSTEM DEFAULT
          statistic: customStats.world_cities_pop,
          labels: "data",
          showControls: true,
        },
        setup: async (globe: GlobeViz) => {
          // Explicitly handle World Cities data injection
          const stats = customStats.world_cities_pop;
          const points = Object.entries(stats.values)
            .map(([name, value]) => {
              const coords = worldCitiesCoordinates[name];
              if (!coords) return null;
              return {
                id: name,
                name: name,
                value: value as number,
                lat: coords.lat,
                lon: coords.lon,
                // radiusKm is now handled by globe config
              };
            })
            .filter((p) => p !== null);

          // Inject urban data
          await globe.setUrbanData(points as any);
        },
      },
    ],
  },

  // 5. FEATURES & APIS
  {
    id: "features",
    title: "Features & APIs",
    description: "Textures, Effects, and Projections",
    gridClass: "grid-3",
    demos: [
      {
        id: "globe-tex-satellite",
        title: "Satellite Texture",
        subtitle: "texture: 'satellite'",
        heightClass: "height-280",
        config: { texture: "satellite", labels: "none", showControls: true },
      },
      {
        id: "globe-tex-natural",
        title: "Natural Texture",
        subtitle: "texture: 'natural'",
        heightClass: "height-280",
        config: { texture: "natural", labels: "none", showControls: true },
      },
      {
        id: "globe-tex-night",
        title: "Night Texture",
        subtitle: "texture: 'night'",
        heightClass: "height-280",
        config: { texture: "night", labels: "none", showControls: true },
      },
      {
        id: "globe-fx-full",
        title: "Full Effects",
        subtitle: "Atmosphere + Clouds",
        heightClass: "height-280",
        config: {
          effects: { atmosphere: true, clouds: true },
          showControls: true,
        },
      },
      {
        id: "globe-fx-clean",
        title: "Clean (No Effects)",
        subtitle: "No Atmosphere/Clouds",
        heightClass: "height-280",
        config: {
          effects: { atmosphere: false, clouds: false },
          showControls: true,
        },
      },
      {
        id: "globe-flat",
        title: "Flat Projection",
        subtitle: "initialView: 'flat'",
        heightClass: "height-280",
        config: {
          initialView: "flat",
          labels: "major",
          showControls: true,
        },
      },
    ],
  },

  // 6. LAYOUT & SIZING
  {
    id: "layout",
    title: "Responsive Sizing",
    description: "Legend scaling and container responsiveness",
    gridClass: "grid-2",
    demos: [
      {
        id: "globe-size-half",
        title: "Half Width",
        subtitle: "responsive legend",
        config: { labels: "major", showControls: true },
      },
      {
        id: "globe-size-third",
        title: "Third Width",
        subtitle: "smaller container",
        heightClass: "height-320",
        config: { labels: "major", showControls: true },
      },
    ],
  },

  // 7. HOVER INFO
  {
    id: "hover-info",
    title: "Hover Information",
    description: "Interactive tooltips on hover with zoom-level control",
    infoBox:
      "Enable hover tooltips to show country/region info on mouse over. Configure minimum zoom level and whether to show data values. Hover detection uses mathematical ray-sphere intersection for accurate front-face detection.",
    gridClass: "grid-2",
    demos: [
      {
        id: "globe-hover-enabled",
        title: "Hover Enabled (Default)",
        subtitle: "hover: { enabled: true }",
        description:
          "Hover over any country to see its name and value. This is the default behavior.",
        config: {
          statistic: "lifeExpectancy",
          labels: "data",
          showControls: true,
          hover: {
            enabled: true,
            minZoom: 0,
            showValue: true,
          },
        },
      },
      {
        id: "globe-hover-disabled",
        title: "Hover Disabled",
        subtitle: "hover: { enabled: false }",
        description: "No tooltip appears on hover. Useful for presentation or embed modes.",
        config: {
          statistic: "gdpPerCapita",
          labels: "data",
          showControls: true,
          hover: {
            enabled: false,
          },
        },
      },
      {
        id: "globe-hover-zoom-gated",
        title: "Zoom-Gated Hover",
        subtitle: "hover: { minZoom: 0.5 }",
        description:
          "Hover only works when zoomed in past 50%. Zoom in (scroll) to activate tooltips.",
        config: {
          statistic: "co2Emissions",
          labels: "data",
          showControls: true,
          hover: {
            enabled: true,
            minZoom: 0.5,
            showValue: true,
          },
        },
      },
      {
        id: "globe-hover-name-only",
        title: "Name Only (No Value)",
        subtitle: "hover: { showValue: false }",
        description: "Shows only the country/region name, without the data value.",
        config: {
          statistic: "internetUsers",
          labels: "data",
          showControls: true,
          hover: {
            enabled: true,
            minZoom: 0,
            showValue: false,
          },
        },
      },
    ],
  },

  // 8. TINY WIDGETS
  {
    id: "tiny-widgets",
    title: "Tiny Widgets",
    description: "Minimal footprint for dashboards (180px height)",
    gridClass: "grid-4",
    demos: [
      {
        id: "globe-tiny-gdp",
        title: "GDP",
        heightClass: "height-180",
        config: {
          statistic: "gdpPerCapita",
          labels: "none",
          showLegend: true,
          effects: { atmosphere: false, clouds: false },
        },
      },
      {
        id: "globe-tiny-co2",
        title: "CO2",
        heightClass: "height-180",
        config: {
          statistic: "co2Emissions",
          labels: "none",
          showLegend: true,
          effects: { atmosphere: false, clouds: false },
        },
      },
      {
        id: "globe-tiny-internet",
        title: "Internet",
        heightClass: "height-180",
        config: {
          statistic: "internetUsers",
          labels: "none",
          showLegend: true,
          effects: { atmosphere: false, clouds: false },
        },
      },
      {
        id: "globe-tiny-forest",
        title: "Forest",
        heightClass: "height-180",
        config: {
          statistic: "forestArea",
          labels: "none",
          showLegend: true,
          effects: { atmosphere: false, clouds: false },
        },
      },
    ],
  },
];
