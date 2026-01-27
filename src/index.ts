/**
 * GlobeViz - Interactive 3D Globe Visualization
 *
 * A beautiful, interactive globe visualization for displaying world statistics
 * with smooth flat map ↔ globe transitions.
 *
 * @example
 * ```typescript
 * import { GlobeViz } from 'globeviz';
 *
 * // Simple usage with defaults
 * const globe = new GlobeViz('#container');
 *
 * // With custom configuration
 * const globe = new GlobeViz('#container', {
 *   texture: 'satellite',
 *   labels: 'major',
 *   statistic: 'gdpPerCapita',
 *   autoRotate: true,
 * });
 * ```
 */

// Built-in statistics
export { WORLD_STATISTICS } from "./data/worldStatistics";
// Country code utilities
export { normalizeCountryValues, toNumericCode } from "./lib/countryCodes";
// Formatting utilities
export { createFormatter, formatValue } from "./lib/formatters";
export type { GlobeVizAPI } from "./lib/GlobeViz";
// Main exports
export { GlobeViz } from "./lib/GlobeViz";
export { BUILT_IN_STATISTICS } from "./lib/statistics";
// Statistics types and utilities
// Label styles
// Texture presets
export type {
  CountryData,
  EffectsConfig,
  ExportOptions,
  GlobeVizConfig,
  HoverConfig,
  LabelStyle,
  MarkerConfig,
  MarkerData,
  StatisticData,
  StatisticDefinition,
  TexturePreset,
} from "./lib/types";
