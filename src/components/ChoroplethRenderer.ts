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
  private topologyConfig?: {
    url: string;
    objectName: string;
    disableNormalization: boolean;
  };

  // Static cache to share loaded topology data across instances
  private static cache: Map<string, Promise<CountryFeature[]>> = new Map();

  constructor(topologyConfig?: {
    url?: string;
    objectName?: string;
    disableNormalization?: boolean;
  }) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = TEXTURE_WIDTH;
    this.canvas.height = TEXTURE_HEIGHT;
    // Optimize context for frequent reading if needed, though we mostly write to texture
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })!;

    // Set topology config with defaults
    this.topologyConfig = {
      url:
        topologyConfig?.url ||
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json",
      objectName: topologyConfig?.objectName || "countries",
      disableNormalization: topologyConfig?.disableNormalization || false,
    };

    // Create lookup map for statistics by country ID
    this.statsMap = new Map();
    WORLD_STATISTICS.forEach((stat) => {
      this.statsMap.set(stat.id, stat);
    });

    this.loadCountries();
  }

  private async loadCountries(): Promise<void> {
    const cacheKey = `${this.topologyConfig!.url}|${
      this.topologyConfig!.objectName
    }`;

    if (!ChoroplethRenderer.cache.has(cacheKey)) {
      const loadPromise = (async () => {
        try {
          const response = await fetch(this.topologyConfig!.url);
          if (!response.ok)
            throw new Error(`Failed to fetch ${this.topologyConfig!.url}`);
          const topology = (await response.json()) as any;

          const objects = topology.objects[this.topologyConfig!.objectName];
          if (!objects) {
            throw new Error(
              `Topology object '${
                this.topologyConfig!.objectName
              }' not found in ${this.topologyConfig!.url}`
            );
          }

          const geojson = topojson.feature(topology, objects);
          const features = (geojson as any).features as CountryFeature[];

          // Pre-calculate paths for performance
          // We process this in chunks to avoid blocking the main thread for massive datasets
          // This ensures the UI remains responsive during initial load
          const BATCH_SIZE = 200;
          for (let i = 0; i < features.length; i += BATCH_SIZE) {
            const batch = features.slice(i, i + BATCH_SIZE);
            batch.forEach((feature) => {
              // Store the Path2D object on the feature itself (cast to any to allow dynamic prop)
              (feature as any).path = this.createPath(feature);
            });
            // Yield to main thread every batch
            await new Promise((resolve) => setTimeout(resolve, 0));
          }

          console.log(
            `Loaded and processed ${features.length} boundaries from ${
              this.topologyConfig!.objectName
            }`
          );
          return features;
        } catch (error) {
          console.error("Failed to load map boundaries:", error);
          throw error;
        }
      })();

      ChoroplethRenderer.cache.set(cacheKey, loadPromise);
    }

    try {
      this.countries = await ChoroplethRenderer.cache.get(cacheKey)!;
      this.loaded = true;
    } catch (error) {
      ChoroplethRenderer.cache.delete(cacheKey); // Clear failed cache on error
      console.error("Error loading cached topology:", error);
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

    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";

    // Draw each country
    this.countries.forEach((country) => {
      const countryStats = this.statsMap.get(country.id);
      let color = "#2a2a2a";

      if (countryStats) {
        const value = stat.accessor(countryStats);
        const normalized = getNormalizedValue(stat, value);
        color = this.interpolateColor(stat.colorScale, normalized);
      }

      this.drawFeature(country, color);
    });

    return this.canvas;
  }

  // Optimized draw using cached Path2D
  private drawFeature(country: CountryFeature, color: string): void {
    const path = (country as any).path as Path2D;
    if (path) {
      this.ctx.fillStyle = color;
      this.ctx.fill(path);
      this.ctx.stroke(path);
    }
  }

  // Pre-calculate path for a feature
  private createPath(country: CountryFeature): Path2D {
    const path = new Path2D();
    const { geometry } = country;

    if (geometry.type === "Polygon") {
      this.addPolygonToPath(path, geometry.coordinates as number[][][]);
    } else if (geometry.type === "MultiPolygon") {
      (geometry.coordinates as number[][][][]).forEach((polygon) => {
        this.addPolygonToPath(path, polygon);
      });
    }
    return path;
  }

  private addPolygonToPath(path: Path2D, rings: number[][][]): void {
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
          path.moveTo(x, y);
        } else if (crossesAntimeridian) {
          // Splitting logic for 2D canvas paths across dateline is complex
          // Simple visual hack: move to new point without line
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
        prevLon = lon;
      });
      path.closePath();
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

    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";

    // Normalize country codes (supports alpha-2, alpha-3, names) unless disabled
    const valuesObj = this.topologyConfig?.disableNormalization
      ? values instanceof Map
        ? Object.fromEntries(values)
        : values
      : normalizeCountryValues(values);

    // Draw each country
    this.countries.forEach((country) => {
      const value = valuesObj[country.id];
      let color = "#2a2a2a";

      if (value !== undefined) {
        // Normalize value to 0-1 range
        const normalized = Math.max(
          0,
          Math.min(1, (value - domain[0]) / (domain[1] - domain[0]))
        );
        color = this.interpolateColor(colorScale, normalized);
      }

      this.drawFeature(country, color);
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
