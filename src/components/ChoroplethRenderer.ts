import type {
  CountryStatistics,
  InternalStatisticDef,
} from "../data/worldStatistics";
import { WORLD_STATISTICS, getNormalizedValue } from "../data/worldStatistics";
import { normalizeCountryValues } from "../lib/countryCodes";

const TEXTURE_WIDTH = 4096;
const TEXTURE_HEIGHT = 2048;

interface CountryFeature {
  type: "Feature";
  id: string;
  properties: { name: string };
  geometry: {
    type: "Polygon" | "MultiPolygon" | "Point";
    coordinates: number[][][] | number[][][][] | number[];
  };
}

/**
 * Worker script for fetching and parsing TopoJSON off the main thread.
 * We use a Blob URL to avoid needing a separate worker file build step.
 */
const WORKER_CODE = `
  importScripts('https://unpkg.com/topojson-client@3.1.0/dist/topojson-client.min.js');

  self.onmessage = async (e) => {
    const { url, objectName, idProperty } = e.data;
    
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed: ' + response.statusText);
      
      const data = await response.json();
      let features;

      // Check if it's already GeoJSON
      if (data.type === 'FeatureCollection') {
        features = data.features;
      } else {
        // Assume TopoJSON
        const topology = data;
        let objects = topology.objects[objectName];
        
        if (!objects) {
          // Fallback to first object if specific name not found
          const firstKey = Object.keys(topology.objects)[0];
          if (firstKey) {
            console.warn('Object "' + objectName + '" not found, falling back to "' + firstKey + '"');
            objects = topology.objects[firstKey];
          } else {
            throw new Error('Object "' + objectName + '" not found and no objects available');
          }
        }

        // Convert to GeoJSON features
        // @ts-ignore - topojson is loaded via importScripts
        const geojson = topojson.feature(topology, objects);
        features = geojson.features;
      }

      // Map custom ID property if specified
      if (idProperty && features) {
        features.forEach(f => {
          if (f.properties && f.properties[idProperty]) {
            f.id = f.properties[idProperty];
          }
        });
      }
      
      self.postMessage({ 
        success: true, 
        features: features 
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

export interface FeatureLabel {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export class ChoroplethRenderer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private countries: CountryFeature[] = [];
  private loaded: boolean = false;
  private statsMap: Map<string, CountryStatistics>;
  private featureLabels: FeatureLabel[] = [];
  private topologyConfig?: {
    url: string;
    objectName: string;
    disableNormalization: boolean;
    idProperty?: string;
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
      idProperty?: string;
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
      idProperty: topologyConfig?.idProperty,
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
    }|${this.topologyConfig!.idProperty || ""}`;

    // Report initial progress
    this.onProgress?.(0.1);

    if (!ChoroplethRenderer.cache.has(cacheKey)) {
      const loadPromise = (async () => {
        try {
          let features: CountryFeature[];

          // Use Worker for fetching and parsing to keep main thread responsive
          features = await this.loadInWorker(
            this.topologyConfig!.url,
            this.topologyConfig!.objectName,
            this.topologyConfig!.idProperty
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

      // Update feature labels for the loaded topology
      this.updateFeatureLabels();

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
    objectName: string,
    idProperty?: string
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
   * manually set features (e.g. for Urban Mapper)
   */
  setFeatures(features: any[]): void {
    // Process features to ensure they have paths
    features.forEach((feature) => {
      if (!(feature as any).path) {
        (feature as any).path = this.createPath(feature as CountryFeature);
      }
    });
    this.countries = features as CountryFeature[];
    this.loaded = true;

    // When custom features are set, disable normalization
    // because these features have custom IDs not matching country codes
    if (this.topologyConfig) {
      this.topologyConfig.disableNormalization = true;
    }

    // Extract feature labels with computed centroids
    // Extract feature labels with computed centroids
    this.updateFeatureLabels();
  }

  /**
   * Update feature labels from current countries
   */
  private updateFeatureLabels(): void {
    this.featureLabels = this.countries
      .map((f: any) => {
        const centroid = this.computeCentroid(f);
        if (!centroid) return null;

        // Smart name extraction: check standard keys first, then search for likely candidates
        let name =
          f.properties?.name ||
          f.properties?.NAME ||
          f.properties?.Name ||
          f.properties?.label ||
          f.properties?.LABEL ||
          "";

        // If no standard name found, look for likely keys in properties
        if (!name && f.properties) {
          const keys = Object.keys(f.properties);
          for (const key of keys) {
            const lowerKey = key.toLowerCase();
            const val = f.properties[key];
            // Check if key contains "name", "label", "title", "desc" and value is a string
            if (
              typeof val === "string" &&
              (lowerKey.includes("name") ||
                lowerKey.includes("label") ||
                lowerKey.includes("title"))
            ) {
              name = val;
              break; // Stop at first likely match
            }
          }
        }

        return {
          id: String(f.id || f.properties?.id || ""),
          name,
          lat: centroid[1],
          lon: centroid[0],
        };
      })
      .filter(
        (l): l is FeatureLabel => l !== null && l.id !== "" && l.name !== ""
      );
  }

  /**
   * Get labels for all custom features (with centroids)
   */
  getFeatureLabels(): FeatureLabel[] {
    return this.featureLabels;
  }

  /**
   * Compute centroid of a GeoJSON feature (simple average for polygons)
   */
  private computeCentroid(feature: any): [number, number] | null {
    const geometry = feature.geometry;
    if (!geometry) return null;

    let coords: number[][] = [];

    if (geometry.type === "Point") {
      return geometry.coordinates as [number, number];
    } else if (geometry.type === "Polygon") {
      // Flatten all rings
      coords = geometry.coordinates.flat();
    } else if (geometry.type === "MultiPolygon") {
      // Flatten all polygons and rings
      coords = geometry.coordinates.flat(2);
    } else {
      return null;
    }

    if (coords.length === 0) return null;

    // Compute average of all coordinates
    let sumLon = 0,
      sumLat = 0;
    for (const coord of coords) {
      sumLon += coord[0];
      sumLat += coord[1];
    }
    return [sumLon / coords.length, sumLat / coords.length];
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
    // Clear canvas immediately - Use dark background for high contrast
    this.ctx.fillStyle = "rgba(10, 20, 30, 0.9)"; // Deep dark blue-black
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
    } else if (geometry.type === "Point") {
      // For Points, we don't create a Path2D in the same way (it's not a fillable shape).
      // We'll handle drawing directly in drawFeature or create a small circle path.
      const [lon, lat] = geometry.coordinates as unknown as number[];
      const [x, y] = this.projectPoint(lon, lat);
      path.arc(x, y, 4, 0, Math.PI * 2); // 4px radius dot
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
    // Simple Equirectangular projection
    const x = ((lon + 180) / 360) * TEXTURE_WIDTH;
    const y = ((90 - lat) / 180) * TEXTURE_HEIGHT; // Invert Y for canvas
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

    this.ctx.fillStyle = "rgba(10, 20, 30, 0.9)";
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

  /**
   * Get the statistics map (for data label mode)
   */
  getStatsMap(): Map<string, any> {
    return this.statsMap;
  }

  getBounds(): [number, number, number, number] | null {
    if (this.countries.length === 0) return null;

    // Track bounds for Western (< 0) and Eastern (>= 0) hemispheres separately
    let wMinLon = Infinity,
      wMaxLon = -Infinity,
      wMinLat = Infinity,
      wMaxLat = -Infinity,
      wCount = 0;
    let eMinLon = Infinity,
      eMaxLon = -Infinity,
      eMinLat = Infinity,
      eMaxLat = -Infinity,
      eCount = 0;

    // Helper to process coords
    const processCoords = (coords: any[]) => {
      // Basic check if it's a [lon, lat] pair or array of them
      if (typeof coords[0] === "number") {
        const lon = coords[0];
        const lat = coords[1];

        if (lon < 0) {
          if (lon < wMinLon) wMinLon = lon;
          if (lon > wMaxLon) wMaxLon = lon;
          if (lat < wMinLat) wMinLat = lat;
          if (lat > wMaxLat) wMaxLat = lat;
          wCount++;
        } else {
          if (lon < eMinLon) eMinLon = lon;
          if (lon > eMaxLon) eMaxLon = lon;
          if (lat < eMinLat) eMinLat = lat;
          if (lat > eMaxLat) eMaxLat = lat;
          eCount++;
        }
      } else {
        coords.forEach(processCoords);
      }
    };

    // Iterate all features
    this.countries.forEach((feature) => {
      if (feature.geometry) {
        processCoords(feature.geometry.coordinates);
      }
    });

    // If one side is empty, return the other
    if (wCount === 0 && eCount === 0) return null;
    if (wCount === 0) return [eMinLon, eMinLat, eMaxLon, eMaxLat];
    if (eCount === 0) return [wMinLon, wMinLat, wMaxLon, wMaxLat];

    // Both have points. Check total width.
    const fullMinLon = Math.min(wMinLon, eMinLon);
    const fullMaxLon = Math.max(wMaxLon, eMaxLon);
    const width = fullMaxLon - fullMinLon;

    // If width is huge (> 180), we likely have a dateline crossing (e.g. US with Aleutian islands).
    // In this case, we pick the "dominant" side to prevent zooming out to the whole world.
    if (width > 180) {
      if (wCount > eCount * 2) {
        // Western is dominant (e.g. US Mainland)
        return [wMinLon, wMinLat, wMaxLon, wMaxLat];
      } else if (eCount > wCount * 2) {
        // Eastern is dominant
        return [eMinLon, eMinLat, eMaxLon, eMaxLat];
      }
    }

    // Otherwise, return combined bounds
    const minLat = Math.min(wMinLat, eMinLat);
    const maxLat = Math.max(wMaxLat, eMaxLat);
    return [fullMinLon, minLat, fullMaxLon, maxLat];
  }
}
