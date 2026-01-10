import * as topojson from "topojson-client";
import type {
  CountryStatistics,
  InternalStatisticDef,
} from "../data/worldStatistics";
import { WORLD_STATISTICS, getNormalizedValue } from "../data/worldStatistics";
import { normalizeCountryValues } from "../lib/countryCodes";

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 1024;

interface CountryFeature {
  type: "Feature";
  id: string;
  properties: { name: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

/**
 * Renders choropleth map textures by coloring countries based on statistics
 */
export class ChoroplethRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private countries: CountryFeature[] = [];
  private loaded: boolean = false;
  private statsMap: Map<string, CountryStatistics>;
  private topologyConfig?: { url: string; objectName: string };

  constructor(topologyConfig?: { url?: string; objectName?: string }) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = TEXTURE_WIDTH;
    this.canvas.height = TEXTURE_HEIGHT;
    this.ctx = this.canvas.getContext("2d")!;

    // Set topology config with defaults
    this.topologyConfig = {
      url:
        topologyConfig?.url ||
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
      objectName: topologyConfig?.objectName || "countries",
    };

    // Create lookup map for statistics by country ID
    this.statsMap = new Map();
    WORLD_STATISTICS.forEach((stat) => {
      this.statsMap.set(stat.id, stat);
    });

    this.loadCountries();
  }

  private async loadCountries(): Promise<void> {
    try {
      // Load TopoJSON from configured URL
      const response = await fetch(this.topologyConfig!.url);
      const topology = (await response.json()) as any;

      // Convert TopoJSON to GeoJSON features using configured object name
      const objects = topology.objects[this.topologyConfig!.objectName];
      if (!objects) {
        throw new Error(
          `Topology object '${this.topologyConfig!.objectName}' not found in ${
            this.topologyConfig!.url
          }`
        );
      }

      const geojson = topojson.feature(topology, objects);
      this.countries = (geojson as any).features as CountryFeature[];
      this.loaded = true;

      console.log(
        `Loaded ${this.countries.length} boundaries from ${
          this.topologyConfig!.objectName
        }`
      );
    } catch (error) {
      console.error("Failed to load map boundaries:", error);
    }
  }

  /**
   * Wait for country data to load
   */
  async waitForLoad(): Promise<void> {
    while (!this.loaded) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  /**
   * Render a choropleth texture for the given statistic
   */
  renderTexture(stat: InternalStatisticDef): HTMLCanvasElement {
    // Clear canvas with ocean color
    this.ctx.fillStyle = "#1a3a5c";
    this.ctx.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

    if (!this.loaded) {
      return this.canvas;
    }

    // Draw each country
    this.countries.forEach((country) => {
      const countryStats = this.statsMap.get(country.id);

      if (countryStats) {
        const value = stat.accessor(countryStats);
        const normalized = getNormalizedValue(stat, value);
        const color = this.interpolateColor(stat.colorScale, normalized);
        this.ctx.fillStyle = color;
      } else {
        // Countries without data - dark gray
        this.ctx.fillStyle = "#2a2a2a";
      }

      this.drawCountry(country);
    });

    // Draw country borders
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    this.ctx.lineWidth = 0.5;
    this.countries.forEach((country) => {
      this.strokeCountry(country);
    });

    return this.canvas;
  }

  private drawCountry(country: CountryFeature): void {
    const { geometry } = country;

    if (geometry.type === "Polygon") {
      this.drawPolygon(geometry.coordinates as number[][][]);
    } else if (geometry.type === "MultiPolygon") {
      (geometry.coordinates as number[][][][]).forEach((polygon) => {
        this.drawPolygon(polygon);
      });
    }
  }

  private strokeCountry(country: CountryFeature): void {
    const { geometry } = country;

    if (geometry.type === "Polygon") {
      this.strokePolygon(geometry.coordinates as number[][][]);
    } else if (geometry.type === "MultiPolygon") {
      (geometry.coordinates as number[][][][]).forEach((polygon) => {
        this.strokePolygon(polygon);
      });
    }
  }

  private drawPolygon(rings: number[][][]): void {
    this.ctx.beginPath();
    rings.forEach((ring) => {
      let prevLon: number | null = null;
      ring.forEach((point, i) => {
        const lon = point[0];
        const lat = point[1];
        const [x, y] = this.projectPoint(lon, lat);

        // Detect antimeridian crossing (large longitude jump)
        const crossesAntimeridian =
          prevLon !== null && Math.abs(lon - prevLon) > 180;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else if (crossesAntimeridian) {
          // Skip drawing line across antimeridian - move instead
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
        prevLon = lon;
      });
      this.ctx.closePath();
    });
    this.ctx.fill("evenodd");
  }

  private strokePolygon(rings: number[][][]): void {
    rings.forEach((ring) => {
      this.ctx.beginPath();
      let prevLon: number | null = null;
      ring.forEach((point, i) => {
        const lon = point[0];
        const lat = point[1];
        const [x, y] = this.projectPoint(lon, lat);

        // Detect antimeridian crossing (large longitude jump)
        const crossesAntimeridian =
          prevLon !== null && Math.abs(lon - prevLon) > 180;

        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else if (crossesAntimeridian) {
          // Don't draw line across antimeridian
          this.ctx.stroke();
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
        prevLon = lon;
      });
      this.ctx.stroke();
    });
  }

  /**
   * Project lat/lon to canvas coordinates (equirectangular projection)
   */
  private projectPoint(lon: number, lat: number): [number, number] {
    // Lon: -180 to 180 -> 0 to width
    // Lat: 90 to -90 -> 0 to height
    const x = ((lon + 180) / 360) * TEXTURE_WIDTH;
    const y = ((90 - lat) / 180) * TEXTURE_HEIGHT;
    return [x, y];
  }

  private interpolateColor(scale: [string, string, string], t: number): string {
    const parseHex = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16),
      g: parseInt(hex.slice(3, 5), 16),
      b: parseInt(hex.slice(5, 7), 16),
    });

    const [low, mid, high] = scale.map(parseHex);
    let r: number, g: number, b: number;

    if (t < 0.5) {
      const s = t * 2;
      r = Math.round(low.r + (mid.r - low.r) * s);
      g = Math.round(low.g + (mid.g - low.g) * s);
      b = Math.round(low.b + (mid.b - low.b) * s);
    } else {
      const s = (t - 0.5) * 2;
      r = Math.round(mid.r + (high.r - mid.r) * s);
      g = Math.round(mid.g + (high.g - mid.g) * s);
      b = Math.round(mid.b + (high.b - mid.b) * s);
    }

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**
   * Render a choropleth texture with custom values
   */
  renderCustomTexture(
    values: Record<string, number> | Map<string, number>,
    colorScale: [string, string, string],
    domain: [number, number]
  ): HTMLCanvasElement {
    // Clear canvas with ocean color
    this.ctx.fillStyle = "#1a3a5c";
    this.ctx.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

    if (!this.loaded) {
      return this.canvas;
    }

    // Normalize country codes (supports alpha-2, alpha-3, names)
    const valuesObj = normalizeCountryValues(values);

    // Draw each country
    this.countries.forEach((country) => {
      const value = valuesObj[country.id];

      if (value !== undefined) {
        // Normalize value to 0-1 range
        const normalized = Math.max(
          0,
          Math.min(1, (value - domain[0]) / (domain[1] - domain[0]))
        );
        const color = this.interpolateColor(colorScale, normalized);
        this.ctx.fillStyle = color;
      } else {
        // Countries without data - dark gray
        this.ctx.fillStyle = "#2a2a2a";
      }

      this.drawCountry(country);
    });

    // Draw country borders
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
    this.ctx.lineWidth = 0.5;
    this.countries.forEach((country) => {
      this.strokeCountry(country);
    });

    return this.canvas;
  }

  /**
   * Get canvas for debugging
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * Get data URL of current texture
   */
  getDataURL(): string {
    return this.canvas.toDataURL("image/png");
  }
}
