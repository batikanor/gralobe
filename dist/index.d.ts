/**
 * Built-in statistics available out of the box
 */
export declare const BUILT_IN_STATISTICS: Record<string, StatisticDefinition>;

/**
 * Country data with a value for visualization.
 * Uses ISO 3166-1 numeric codes for country identification.
 */
export declare interface CountryData {
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
 * Real World Statistics Data
 * Sources: World Bank Open Data, UN Data, WHO (2022-2023 estimates)
 * Country codes follow ISO 3166-1 numeric standard
 */
declare interface CountryStatistics {
    id: string;
    code: string;
    name: string;
    population: number;
    gdpPerCapita: number;
    co2Emissions: number;
    lifeExpectancy: number;
    humanDevIndex: number;
    internetUsers: number;
    renewableEnergy: number;
    urbanPopulation: number;
    healthExpenditure: number;
    educationExpenditure: number;
    forestArea: number;
    accessElectricity: number;
}

/**
 * Value Formatters
 *
 * Centralized formatting utilities for statistic values.
 * Used by Legend, tooltips, and any other display components.
 */
/**
 * Create a formatter function based on the unit type.
 *
 * @param unit - The unit string (e.g., "%", "$", "years")
 * @returns A function that formats numeric values with the appropriate unit
 *
 * @example
 * const fmt = createFormatter('%');
 * fmt(42.567); // "42.6%"
 *
 * const currencyFmt = createFormatter('$');
 * currencyFmt(1234567); // "$1,234,567"
 */
export declare function createFormatter(unit: string): (value: number) => string;

/**
 * Visual effects configuration
 */
export declare interface EffectsConfig {
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
export declare interface ExportOptions {
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
 * Format a value using the provided formatter or create a default one.
 *
 * @param value - The numeric value to format
 * @param unit - The unit string
 * @param customFormatter - Optional custom formatter function
 * @returns Formatted string
 */
export declare function formatValue(value: number, unit: string, customFormatter?: (value: number) => string): string;

/**
 * GlobeViz - Interactive 3D Globe Visualization
 *
 * @example
 * ```typescript
 * // Basic usage
 * const globe = new GlobeViz('#container');
 *
 * // With configuration
 * const globe = new GlobeViz('#container', {
 *   texture: 'satellite',
 *   labels: 'all',
 *   statistic: 'lifeExpectancy',
 *   autoRotate: true,
 * });
 *
 * // Control programmatically
 * globe.toFlat();
 * globe.setStatistic('gdpPerCapita');
 * ```
 */
export declare class GlobeViz implements GlobeVizAPI {
    private container;
    private config;
    private scene;
    private camera;
    private renderer;
    private controls;
    private globe;
    private material;
    private atmosphere;
    private stars;
    private gui;
    private choropleth;
    private legend;
    private exporter;
    private countryLabels;
    private markerLayer;
    private textureLoader;
    private dataTexture;
    private morph;
    private currentStatistic;
    private animationId;
    private isDestroyed;
    /** Promise that resolves when fully initialized */
    ready: Promise<void>;
    private resolveReady;
    /**
     * Create a new GlobeViz instance
     * @param container CSS selector or HTMLElement
     * @param config Configuration options
     */
    constructor(container: string | HTMLElement, config?: GlobeVizConfig);
    private init;
    private handleKeydown;
    private createGlobe;
    private createAtmosphere;
    private createStars;
    private createGUI;
    private handleResize;
    private handleFullscreenChange;
    private animate;
    toGlobe(): void;
    toFlat(): void;
    /**
     * Setup mouse interactions (Click to Zoom, etc.)
     */
    private setupInteraction;
    setMorph(value: number): void;
    getMorph(): number;
    setStatistic(id: string | StatisticData): void;
    setLabels(style: LabelStyle): void;
    setTexture(preset: TexturePreset): Promise<void>;
    setAutoRotate(enabled: boolean): void;
    screenshot(options?: ExportOptions): void;
    recordGif(options?: ExportOptions): Promise<void>;
    recordVideo(options?: ExportOptions): Promise<void>;
    setEffects(effects: Partial<EffectsConfig>): void;
    setMarkers(data: MarkerData[], config?: MarkerConfig): void;
    resize(width: number, height: number): void;
    toggleFullscreen(): Promise<void>;
    isFullscreen(): boolean;
    destroy(): void;
}

/**
 * Public API for controlling the globe
 */
export declare interface GlobeVizAPI {
    /** Promise that resolves when globe is fully initialized */
    ready: Promise<void>;
    /** Animate to globe view */
    toGlobe(): void;
    /** Animate to flat map view */
    toFlat(): void;
    /** Set morph value directly (0 = flat, 1 = globe) */
    setMorph(value: number): void;
    /** Get current morph value */
    getMorph(): number;
    /** Change the displayed statistic */
    setStatistic(id: string | StatisticData): void;
    /** Change label style */
    setLabels(style: LabelStyle): void;
    /** Change texture */
    setTexture(preset: TexturePreset): void;
    /** Enable/disable auto-rotation */
    setAutoRotate(enabled: boolean): void;
    /** Take a screenshot */
    screenshot(options?: ExportOptions): void;
    /** Record a GIF animation */
    recordGif(options?: ExportOptions): Promise<void>;
    /** Record a video */
    recordVideo(options?: ExportOptions): Promise<void>;
    /** Update effects configuration */
    setEffects(effects: Partial<EffectsConfig>): void;
    /** Set marker data for city-level visualization */
    setMarkers(data: MarkerData[], config?: MarkerConfig): void;
    /** Resize the visualization */
    resize(width: number, height: number): void;
    /** Toggle fullscreen mode */
    toggleFullscreen(): Promise<void>;
    /** Check if currently fullscreen */
    isFullscreen(): boolean;
    /** Destroy the instance and clean up */
    destroy(): void;
}

/**
 * Configuration options for GlobeViz
 */
export declare interface GlobeVizConfig {
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
    onCountryClick?: (countryId: string, countryName: string, value?: number) => void;
    /**
     * Callback when view changes between flat and globe
     */
    onViewChange?: (view: "globe" | "flat", morph: number) => void;
    /**
     * Callback for loading progress (0-1)
     */
    onLoadProgress?: (progress: number) => void;
}

/**
 * Country label display styles
 */
export declare type LabelStyle = "none" | "major" | "all" | "capitals" | "minimal";

/**
 * Configuration for marker layer rendering
 */
export declare interface MarkerConfig {
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
 * Data for a single marker point on the globe
 */
export declare interface MarkerData {
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
 * Normalize a values object/map to use numeric codes
 */
export declare function normalizeCountryValues(values: Record<string, number> | Map<string, number>): Record<string, number>;

/**
 * Complete statistic data ready for visualization.
 * Combines the definition with actual country values.
 */
export declare interface StatisticData {
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
 * Definition of a statistic to visualize.
 *
 * This is the canonical type for statistic definitions.
 * The `format` function is optional - if not provided, a default
 * formatter will be created based on the `unit` field.
 */
export declare interface StatisticDefinition {
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
 * Core Type Definitions for GlobeViz
 *
 * This is the SINGLE SOURCE OF TRUTH for all public types.
 * Internal modules should import from here.
 */
/**
 * Available texture presets for the globe
 */
export declare type TexturePreset = "satellite" | "natural" | "dark" | "light" | "night" | "topographic";

/**
 * ISO 3166-1 country code mappings
 * Maps alpha-2, alpha-3, and common names to numeric codes
 */
/**
 * Convert any country identifier to ISO 3166-1 numeric code
 * Supports: numeric codes, alpha-2, alpha-3, and common names
 */
export declare function toNumericCode(input: string): string;

/**
 * Configuration for custom map topology (GeoJSON/TopoJSON)
 */
declare interface TopologyConfig {
    /** URL to the TopoJSON/GeoJSON file */
    url?: string;
    /** Name of the object in TopoJSON objects (files can containing multiple) */
    objectName?: string;
    /** Property key to use as ID (default: "id" or "ISO_A3") */
    idProperty?: string;
    /** Disable value normalization (for pre-calculated stats) */
    disableNormalization?: boolean;
}

export declare const WORLD_STATISTICS: CountryStatistics[];

export { }
