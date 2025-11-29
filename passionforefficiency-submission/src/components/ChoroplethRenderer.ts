import * as topojson from 'topojson-client';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { StatisticDefinition, CountryStatistics } from '../data/worldStatistics';
import { WORLD_STATISTICS, getNormalizedValue } from '../data/worldStatistics';

const TEXTURE_WIDTH = 2048;
const TEXTURE_HEIGHT = 1024;

interface CountryFeature {
  type: 'Feature';
  id: string;
  properties: { name: string };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
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

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = TEXTURE_WIDTH;
    this.canvas.height = TEXTURE_HEIGHT;
    this.ctx = this.canvas.getContext('2d')!;

    // Create lookup map for statistics by country ID
    this.statsMap = new Map();
    WORLD_STATISTICS.forEach(stat => {
      this.statsMap.set(stat.id, stat);
    });

    this.loadCountries();
  }

  private async loadCountries(): Promise<void> {
    try {
      // Load world-atlas TopoJSON (110m resolution for performance)
      const response = await fetch(
        'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
      );
      const topology = await response.json() as Topology<{ countries: GeometryCollection }>;

      // Convert TopoJSON to GeoJSON features
      const geojson = topojson.feature(topology, topology.objects.countries);
      this.countries = (geojson as any).features as CountryFeature[];
      this.loaded = true;

      console.log(`Loaded ${this.countries.length} country boundaries`);
    } catch (error) {
      console.error('Failed to load country boundaries:', error);
    }
  }

  /**
   * Wait for country data to load
   */
  async waitForLoad(): Promise<void> {
    while (!this.loaded) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Render a choropleth texture for the given statistic
   */
  renderTexture(stat: StatisticDefinition): HTMLCanvasElement {
    // Clear canvas with ocean color
    this.ctx.fillStyle = '#1a3a5c';
    this.ctx.fillRect(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);

    if (!this.loaded) {
      return this.canvas;
    }

    // Draw each country
    this.countries.forEach(country => {
      const countryStats = this.statsMap.get(country.id);

      if (countryStats) {
        const value = stat.accessor(countryStats);
        const normalized = getNormalizedValue(stat, value);
        const color = this.interpolateColor(stat.colorScale, normalized);
        this.ctx.fillStyle = color;
      } else {
        // Countries without data - dark gray
        this.ctx.fillStyle = '#2a2a2a';
      }

      this.drawCountry(country);
    });

    // Draw country borders
    this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    this.ctx.lineWidth = 0.5;
    this.countries.forEach(country => {
      this.strokeCountry(country);
    });

    return this.canvas;
  }

  private drawCountry(country: CountryFeature): void {
    const { geometry } = country;

    if (geometry.type === 'Polygon') {
      this.drawPolygon(geometry.coordinates as number[][][]);
    } else if (geometry.type === 'MultiPolygon') {
      (geometry.coordinates as number[][][][]).forEach(polygon => {
        this.drawPolygon(polygon);
      });
    }
  }

  private strokeCountry(country: CountryFeature): void {
    const { geometry } = country;

    if (geometry.type === 'Polygon') {
      this.strokePolygon(geometry.coordinates as number[][][]);
    } else if (geometry.type === 'MultiPolygon') {
      (geometry.coordinates as number[][][][]).forEach(polygon => {
        this.strokePolygon(polygon);
      });
    }
  }

  private drawPolygon(rings: number[][][]): void {
    this.ctx.beginPath();
    rings.forEach((ring, ringIndex) => {
      ring.forEach((point, i) => {
        const [x, y] = this.projectPoint(point[0], point[1]);
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      });
      this.ctx.closePath();
    });
    this.ctx.fill('evenodd');
  }

  private strokePolygon(rings: number[][][]): void {
    rings.forEach(ring => {
      this.ctx.beginPath();
      ring.forEach((point, i) => {
        const [x, y] = this.projectPoint(point[0], point[1]);
        if (i === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
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
   * Get canvas for debugging
   */
  getCanvas(): HTMLCanvasElement {
    return this.canvas;
  }

  /**
   * Get data URL of current texture
   */
  getDataURL(): string {
    return this.canvas.toDataURL('image/png');
  }
}
