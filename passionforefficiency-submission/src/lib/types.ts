/**
 * Type definitions for GlobeViz
 */

/**
 * Available texture presets for the globe
 */
export type TexturePreset =
  | 'satellite'      // NASA Blue Marble (default)
  | 'natural'        // Natural Earth colors
  | 'dark'           // Dark theme
  | 'light'          // Light/minimal theme
  | 'night'          // Night lights view
  | 'topographic';   // Terrain/elevation

/**
 * Country data with a value for visualization
 * Uses ISO 3166-1 numeric codes for country identification
 */
export interface CountryData {
  /** ISO 3166-1 numeric code (e.g., "840" for USA, "156" for China) */
  id: string;
  /** The value to visualize */
  value: number;
  /** Optional: ISO 3166-1 alpha-2 code (e.g., "US", "CN") */
  code?: string;
  /** Optional: Country name for display */
  name?: string;
}

/**
 * Definition of a statistic to visualize
 */
export interface StatisticDefinition {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Unit of measurement (e.g., "%", "years", "$") */
  unit: string;
  /** Description for legend/tooltip */
  description: string;
  /**
   * Color scale as [low, mid, high] hex colors
   * @example ['#fee5d9', '#fcae91', '#cb181d']
   */
  colorScale: [string, string, string];
  /**
   * Value domain [min, max] for color mapping
   * @example [0, 100] for percentages
   */
  domain: [number, number];
  /**
   * Format function for displaying values
   * @example (v) => `${v.toFixed(1)}%`
   */
  format: (value: number) => string;
}

/**
 * Complete statistic data ready for visualization
 */
export interface StatisticData {
  /** The statistic definition */
  definition: StatisticDefinition;
  /** Country values keyed by ISO 3166-1 numeric code */
  values: Map<string, number> | Record<string, number>;
}

/**
 * Visual effects configuration
 */
export interface EffectsConfig {
  /** Show cloud layer */
  clouds?: boolean;
  /** Cloud animation speed (0.1-3) */
  cloudSpeed?: number;
  /** Cloud layer opacity (0-1) */
  cloudOpacity?: number;
  /** Atmosphere glow intensity (0-1) */
  atmosphereIntensity?: number;
  /** Show aurora effect */
  aurora?: boolean;
  /** Show city lights on dark side */
  cityLights?: boolean;
  /** Ocean specular reflection */
  oceanSpecular?: boolean;
  /** Show lat/lon grid lines */
  gridLines?: boolean;
  /** Grid line opacity (0-1) */
  gridOpacity?: number;
  /** Hologram visual mode */
  hologramMode?: boolean;
  /** Vintage/sepia mode */
  vintageMode?: boolean;
  /** Thermal imaging mode */
  thermalMode?: boolean;
  /** Blueprint wireframe mode */
  blueprintMode?: boolean;
  /** Pulsing glow effect */
  glowPulse?: boolean;
  /** Star twinkling animation */
  starTwinkle?: boolean;
}

/**
 * Export options for screenshots, GIFs, and videos
 */
export interface ExportOptions {
  /** Output width in pixels */
  width?: number;
  /** Output height in pixels */
  height?: number;
  /** Animation duration in seconds (for GIF/video) */
  duration?: number;
  /** Frames per second (for GIF/video) */
  fps?: number;
  /** Output filename */
  filename?: string;
}
