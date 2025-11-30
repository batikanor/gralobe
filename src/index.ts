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

// Main exports
export { GlobeViz } from './lib/GlobeViz';
export type { GlobeVizConfig, GlobeVizAPI } from './lib/GlobeViz';

// Statistics types and utilities
export type {
  StatisticDefinition,
  StatisticData,
  CountryData,
} from './lib/types';

// Built-in statistics
export { BUILT_IN_STATISTICS } from './lib/statistics';
export { WORLD_STATISTICS } from './data/worldStatistics';

// Label styles
export type { LabelStyle } from './components/CountryLabels';

// Texture presets
export type { TexturePreset } from './lib/types';

// Country code utilities
export { toNumericCode, normalizeCountryValues } from './lib/countryCodes';
