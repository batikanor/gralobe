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
 * Worker script for fetching and parsing TopoJSON off the main thread.
 * We use a Blob URL to avoid needing a separate worker file build step.
 */
const WORKER_CODE = `
  importScripts('https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js');

  self.onmessage = async (e) => {
    const { url, objectName } = e.data;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
      
      const topology = await response.json();
      const objects = topology.objects[objectName];
      
      if (!objects) {
        throw new Error('Object "' + objectName + '" not found in topology');
      }

      // Convert to GeoJSON features
      // @ts-ignore - topojson is loaded via importScripts
      const geojson = topojson.feature(topology, objects);
      
      self.postMessage({ 
        success: true, 
        features: geojson.features 
      });
    } catch (error) {
      self.postMessage({ 
        success: false, 
        error: error.message 
      });
    }
  };
`;

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

  // State for progressive rendering
  private currentRenderId: number = 0;

  // Callback for loading progress (0-1)
  private onProgress?: (progress: number) => void;
  // Callback when texture has been updated (for progressive rendering)
  private onTextureUpdate?: () => void;

  // Static cache to share loaded topology data across instances
  private static cache: Map<string, Promise<CountryFeature[]>> = new Map();

  constructor(
    topologyConfig?: {
      url?: string;
      objectName?: string;
      disableNormalization?: boolean;
    },
    onProgress?: (progress: number) => void,
    onTextureUpdate?: () => void
  ) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = TEXTURE_WIDTH;
    this.canvas.height = TEXTURE_HEIGHT;
    this.ctx = this.canvas.getContext("2d", { willReadFrequently: true })!;
    this.onProgress = onProgress;
    this.onTextureUpdate = onTextureUpdate;

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

    // Report initial progress
    this.onProgress?.(0.1);

    if (!ChoroplethRenderer.cache.has(cacheKey)) {
      const loadPromise = (async () => {
        try {
          let features: CountryFeature[];

          // Use Worker for fetching and parsing to keep main thread responsive
          features = await this.loadInWorker(
            this.topologyConfig!.url,
            this.topologyConfig!.objectName
          );

          // Report parsing done
          this.onProgress?.(0.4);

          // Pre-calculate paths for performance
          // We process this in chunks to avoid blocking the main thread for massive datasets
          const BATCH_SIZE = 200;
          const totalFeatures = features.length;

          for (let i = 0; i < totalFeatures; i += BATCH_SIZE) {
            const batch = features.slice(i, i + BATCH_SIZE);
            batch.forEach((feature) => {
              // Store the Path2D object on the feature itself
              (feature as any).path = this.createPath(feature);
            });

            // Calculate progress for path generation (0.4 to 1.0)
            const currentProgress =
              0.4 + (0.6 * (i + BATCH_SIZE)) / totalFeatures;
            this.onProgress?.(Math.min(0.99, currentProgress));

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
      this.onProgress?.(1.0);
    } catch (error) {
      ChoroplethRenderer.cache.delete(cacheKey);
      console.error("Error loading cached topology:", error);
      // Ensure we don't hang indefinitely even if load failed
      this.loaded = true;
    }
  }

  /**
   * Run fetch and topojson conversion in a Web Worker
   */
  private loadInWorker(
    url: string,
    objectName: string
  ): Promise<CountryFeature[]> {
    return new Promise((resolve, reject) => {
      const blob = new Blob([WORKER_CODE], { type: "application/javascript" });
      const workerUrl = URL.createObjectURL(blob);
      const worker = new Worker(workerUrl);

      worker.onmessage = (e) => {
        URL.revokeObjectURL(workerUrl);
        worker.terminate();

        if (e.data.success) {
          resolve(e.data.features);
        } else {
          reject(new Error(e.data.error));
        }
      };

      worker.onerror = (e) => {
        URL.revokeObjectURL(workerUrl);
        worker.terminate();
        reject(new Error("Worker error: " + e.message));
      };

      worker.postMessage({ url, objectName });
    });
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
   * Now supporting Progressive Rendering to prevent UI freezes
   */
  renderTexture(stat: InternalStatisticDef): HTMLCanvasElement {
    // Cancel any previous render job
    this.currentRenderId++;
    const renderId = this.currentRenderId;

    // Clear canvas immediately
    this.ctx.fillStyle = "#1a3a5c";
    this.ctx.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

    // Notify update immediately (cleared state)
    this.onTextureUpdate?.();

    if (!this.loaded) {
      return this.canvas;
    }

    // Determine performance settings
    // If we have > 1500 features (like US Counties), stroke is too expensive and crowds the map
    const shouldStroke = this.countries.length < 1500;

    // Start progressive render
    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";

    const BATCH_SIZE = 500;
    const total = this.countries.length;
    let index = 0;

    const renderBatch = () => {
      // If a new render started, stop this one
      if (this.currentRenderId !== renderId) return;

      const end = Math.min(index + BATCH_SIZE, total);

      for (let i = index; i < end; i++) {
        const country = this.countries[i];
        const countryStats = this.statsMap.get(country.id);
        let color = "#2a2a2a";

        if (countryStats) {
          const value = stat.accessor(countryStats);
          const normalized = getNormalizedValue(stat, value);
          color = this.interpolateColor(stat.colorScale, normalized);
        }

        this.drawFeature(country, color, shouldStroke);
      }

      index = end;

      // Notify texture update after this batch
      this.onTextureUpdate?.();

      if (index < total) {
        // Schedule next batch
        requestAnimationFrame(renderBatch);
      }
    };

    // Kick off the rendering loop
    requestAnimationFrame(renderBatch);

    return this.canvas;
  }

  // Optimized draw using cached Path2D
  private drawFeature(
    country: CountryFeature,
    color: string,
    stroke: boolean
  ): void {
    const path = (country as any).path as Path2D;
    if (path) {
      this.ctx.fillStyle = color;
      this.ctx.fill(path);
      if (stroke) {
        this.ctx.stroke(path);
      }
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
          path.moveTo(x, y);
        } else {
          path.lineTo(x, y);
        }
        prevLon = lon;
      });
      path.closePath();
    });
  }

  private projectPoint(lon: number, lat: number): [number, number] {
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
    // Cancel any previous render job
    this.currentRenderId++;
    const renderId = this.currentRenderId;

    this.ctx.fillStyle = "#1a3a5c";
    this.ctx.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
    // Initial notify
    this.onTextureUpdate?.();

    if (!this.loaded) {
      return this.canvas;
    }

    const valuesObj = this.topologyConfig?.disableNormalization
      ? values instanceof Map
        ? Object.fromEntries(values)
        : values
      : normalizeCountryValues(values);

    // Determines if we should stroke borders (performance vs detail)
    const shouldStroke = this.countries.length < 1500;

    this.ctx.lineWidth = 0.5;
    this.ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";

    const BATCH_SIZE = 500;
    const total = this.countries.length;
    let index = 0;

    // Progressive rendering loop
    const renderBatch = () => {
      if (this.currentRenderId !== renderId) return;

      const end = Math.min(index + BATCH_SIZE, total);

      for (let i = index; i < end; i++) {
        const country = this.countries[i];
        const value = valuesObj[country.id];
        let color = "#2a2a2a";

        if (value !== undefined) {
          const normalized = Math.max(
            0,
            Math.min(1, (value - domain[0]) / (domain[1] - domain[0]))
          );
          color = this.interpolateColor(colorScale, normalized);
        }

        this.drawFeature(country, color, shouldStroke);
      }

      index = end;
      this.onTextureUpdate?.();

      if (index < total) {
        requestAnimationFrame(renderBatch);
      }
    };

    requestAnimationFrame(renderBatch);

    return this.canvas;
  }

  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  getDataURL(): string {
    return this.canvas.toDataURL("image/png");
  }
}
