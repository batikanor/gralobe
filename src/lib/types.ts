/**
 * Core Type Definitions for GlobeViz
 *
 * This is the SINGLE SOURCE OF TRUTH for all public types.
 * Internal modules should import from here.
 */

/**
 * Available texture presets for the globe
 */
export type TexturePreset =
  | "satellite" // NASA Blue Marble (default)
  | "natural" // Natural Earth colors
  | "dark" // Dark theme
  | "light" // Light/minimal theme
  | "night" // Night lights view
  | "topographic"; // Terrain/elevation

/**
 * Country data with a value for visualization.
 * Uses ISO 3166-1 numeric codes for country identification.
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
 * Definition of a statistic to visualize.
 *
 * This is the canonical type for statistic definitions.
 * The `format` function is optional - if not provided, a default
 * formatter will be created based on the `unit` field.
 */
export interface StatisticDefinition {
  /** Unique identifier (snake_case recommended) */
  id: string;

  /** Human-readable display name */
  name: string;

  /** Unit of measurement (e.g., "%", "years", "$", "per capita") */
  unit: string;

  /** Description shown in legend/tooltip */
  description: string;

  /**
   * Color scale as [low, mid, high] hex colors.
   * Used for choropleth rendering.
   * @example ['#fee5d9', '#fcae91', '#cb181d'] // Red scale
   * @example ['#e5f5e0', '#a1d99b', '#31a354'] // Green scale
   */
  colorScale: [string, string, string];

  /**
   * Value domain [min, max] for color mapping.
   * Values outside this range are clamped.
   * @example [0, 100] // For percentages
   * @example [1000, 80000] // For GDP per capita
   */
  domain: [number, number];

  /**
   * Optional custom formatter for displaying values.
   * If not provided, a default formatter is created based on `unit`.
   *
   * NOTE: This function cannot be serialized to JSON.
   * When sending statistics over the wire, omit this field
   * and the renderer will create a default formatter.
   *
   * @example (v) => `${v.toFixed(1)}%`
   * @example (v) => `$${(v/1000).toFixed(1)}k`
   */
  format?: (value: number) => string;
}

/**
 * Complete statistic data ready for visualization.
 * Combines the definition with actual country values.
 */
export interface StatisticData {
  /** The statistic definition */
  definition: StatisticDefinition;

  /**
   * Country values keyed by ISO 3166-1 numeric code.
   * Accepts both Map and plain object for flexibility.
   * @example { "840": 85, "156": 68 } // USA: 85, China: 68
   */
  values: Map<string, number> | Record<string, number>;
}

/**
 * Visual effects configuration
 */
export interface EffectsConfig {
  /** Show atmosphere glow around globe */
  atmosphere?: boolean;
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

/**
 * Data for a single marker point on the globe
 */
export interface MarkerData {
  /** Latitude in degrees (-90 to 90) */
  lat: number;
  /** Longitude in degrees (-180 to 180) */
  lng: number;
  /** Value for sizing/coloring the marker */
  value: number;
  /** Optional label to show on hover */
  label?: string;
  /** Optional custom color (hex) */
  color?: string;
  /** Optional unique identifier */
  id?: string;
}

/**
 * Configuration for marker layer rendering
 */
export interface MarkerConfig {
  /** Marker visual style */
  style?: "spike" | "dot" | "pin";
  /** Default marker color (hex) */
  color?: string;
  /** Maximum spike height (for 'spike' style) */
  maxHeight?: number;
  /** Enable pulsing glow animation */
  pulseAnimation?: boolean;
  /** Marker opacity (0-1) */
  opacity?: number;
  /** Callback when marker is clicked */
  onMarkerClick?: (marker: MarkerData) => void;
}

/**
 * Configuration for custom map topology (GeoJSON/TopoJSON)
 */
export interface TopologyConfig {
  /** URL to the TopoJSON/GeoJSON file */
  url?: string;
  /** Name of the object in TopoJSON objects (files can containing multiple) */
  objectName?: string;
  /** Property key to use as ID (default: "id" or "ISO_A3") */
  idProperty?: string;
  /** Disable value normalization (for pre-calculated stats) */
  disableNormalization?: boolean;
}

/**
 * Country label display styles
 */
export type LabelStyle =
  | "none"
  | "major"
  | "all"
  | "all-countries"
  | "capitals"
  | "minimal"
  | "data";

/**
 * Configuration options for GlobeViz
 */
export interface GlobeVizConfig {
  /**
   * Earth texture preset
   * @default 'satellite' (NASA Blue Marble)
   */
  texture?: TexturePreset;

  /**
   * Custom map topology configuration
   * Allows loading custom borders (cities, states) instead of countries
   */
  topology?: TopologyConfig;

  /**
   * Country label display style
   * @default 'all'
   */
  labels?: LabelStyle;

  /**
   * Initial statistic to display
   * Can be a built-in statistic ID or a custom StatisticData object
   * @default 'lifeExpectancy'
   */
  statistic?: string | StatisticData;

  /**
   * Custom statistics data (country values)
   * If not provided, uses built-in world statistics
   */
  data?: CountryData[];

  /**
   * Enable auto-rotation
   * @default false
   */
  autoRotate?: boolean;

  /**
   * Initial view: 'globe' or 'flat'
   * @default 'globe'
   */
  initialView?: "globe" | "flat";

  /**
   * Show control panel (lil-gui)
   * @default true
   */
  showControls?: boolean;

  /**
   * Show legend
   * @default true
   */
  showLegend?: boolean;

  /**
   * Visual effects configuration
   */
  effects?: EffectsConfig;

  /**
   * Enable 3D height extrusion based on data values
   * @default false
   */
  extrudeHeight?: boolean;

  /**
   * Width of the container (defaults to container's width)
   */
  width?: number;

  /**
   * Height of the container (defaults to container's height)
   */
  height?: number;

  /**
   * Callback when a country is clicked
   */
  onCountryClick?: (
    countryId: string,
    countryName: string,
    value?: number
  ) => void;

  /**
   * Callback when view changes between flat and globe
   */
  onViewChange?: (view: "globe" | "flat", morph: number) => void;

  /**
   * Callback for loading progress (0-1)
   */
  onLoadProgress?: (progress: number) => void;
}
