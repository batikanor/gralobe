interface GeoPoint {
  lat: number;
  lon: number;
  value: number;
  id?: string;
  name?: string;
}

interface UrbanTopologyResult {
  features: any[];
  statistics: Record<string, number>;
}

const URBAN_AREAS_URL =
  "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_urban_areas.geojson";

export class UrbanMapper {
  private static urbanFeatures: any[] | null = null;
  private static isLoading = false;
  private static loadPromise: Promise<any[]> | null = null;

  /**
   * Load the base urban areas topology
   */
  static async loadBaseTopology(): Promise<any[]> {
    if (this.urbanFeatures) return this.urbanFeatures;
    if (this.loadPromise) return this.loadPromise;

    this.isLoading = true;
    this.loadPromise = (async () => {
      try {
        const response = await fetch(URBAN_AREAS_URL);
        if (!response.ok) throw new Error("Failed to load urban areas");
        const data = await response.json();
        this.urbanFeatures = data.features;
        return this.urbanFeatures || [];
      } catch (e) {
        console.error("UrbanMapper load error:", e);
        return [];
      } finally {
        this.isLoading = false;
      }
    })();

    return this.loadPromise;
  }

  /**
   * Generate a synthetic circular polygon (approximate) for a point
   * @param lat Latitude
   * @param lon Longitude
   * @param radiusKm Radius in km (default 5km)
   */
  static generateSyntheticBoundary(
    lat: number,
    lon: number,
    radiusKm: number = 85,
  ): any {
    // console.log("Generating synthetic boundary with radius:", radiusKm);
    const steps = 16; // Low polygon count for performance
    const coordinates: number[][] = [];

    // Simple equirectangular approximation (good enough for small visual circles)
    const R = 6371; // Earth radius km
    const dLat = (radiusKm / R) * (180 / Math.PI);
    const dLon = dLat / Math.cos((lat * Math.PI) / 180);

    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * 2 * Math.PI;
      const pLat = lat + dLat * Math.sin(angle);
      const pLon = lon + dLon * Math.cos(angle);
      coordinates.push([pLon, pLat]);
    }

    return {
      type: "Feature",
      id: `synthetic_${lat.toFixed(4)}_${lon.toFixed(4)}_${radiusKm}`,
      properties: {
        name: "Unknown City",
        featurecla: "Synthetic Urban Area",
      },
      geometry: {
        type: "Polygon",
        coordinates: [coordinates],
      },
    };
  }

  /**
   * Map points to urban areas or generate synthetic ones
   */
  static async mapPointsToTopology(
    points: GeoPoint[],
    radiusKm: number = 85,
    forceSynthetic: boolean = false,
  ): Promise<UrbanTopologyResult> {
    console.log(
      "UrbanMapper.mapPointsToTopology called with radius:",
      radiusKm,
      "forceSynthetic:",
      forceSynthetic,
    );

    // Only load base topology if we are NOT forcing synthetic
    const urbanFeatures = !forceSynthetic ? await this.loadBaseTopology() : [];
    const resultFeatures: any[] = [];
    const statistics: Record<string, number> = {};
    const usedFeatureIds = new Set<string>();

    for (const point of points) {
      let match = null;

      if (!forceSynthetic) {
        // Try to match with existing urban areas
        // Heuristic: Check against features named in the point if available?
        // Or strictly spatial? Spatial is better but slower.
        // Let's do a quick BBox search.
        for (const feature of urbanFeatures) {
          if (this.isPointInFeature(point, feature)) {
            match = feature;
            break;
          }
        }
      }

      if (match) {
        // Use specific ID logic
        // NE Urban Areas usually don't have stable numeric IDs, we try to use a property
        // Property 'scalerank' 'featurecla' 'area_sqkm' ... none are unique IDs really.
        // We'll construct an ID based on index or properties.
        // Actually NE GeoJSON usually has indices. Let's assume we can assign a temp ID.
        const featureId =
          match.properties.name_conve ||
          match.properties.name ||
          `ua_${Math.random()}`; // Fallback

        // Avoid mutating the cached original feature heavily, or clone it?
        // Cloning is safer.
        const clone = usedFeatureIds.has(featureId)
          ? null
          : JSON.parse(JSON.stringify(match));

        if (clone) {
          clone.id = featureId;
          // Ensure name is consistent, prioritizing point name if provided
          if (point.name) {
            clone.properties.name = point.name;
          } else if (!clone.properties.name) {
            clone.properties.name = featureId;
          }
          resultFeatures.push(clone);
          usedFeatureIds.add(featureId);
        }

        // Aggregate stats
        statistics[featureId] = (statistics[featureId] || 0) + point.value;
      } else {
        // Synthetic
        const synthetic = this.generateSyntheticBoundary(
          point.lat,
          point.lon,
          radiusKm,
        );
        // Check if we already have a synthetic nearby? (Cluster logic)
        // For now, simple 1-to-1 or simple overlap.
        // Let's just push it.

        // Use the point's ID/name if available for the feature ID to allow specific targeting
        if (point.id) synthetic.id = point.id;
        if (point.name) synthetic.properties.name = point.name;

        resultFeatures.push(synthetic);
        statistics[synthetic.id] = point.value;
      }
    }

    return {
      features: resultFeatures,
      statistics,
    };
  }

  // Minimal Ray-Casting algorithm for Polygon/MultiPolygon
  private static isPointInFeature(point: GeoPoint, feature: any): boolean {
    const { lat, lon } = point;
    const geom = feature.geometry;
    if (!geom) return false;

    // Quick BBox check would be here if we had precomputed bboxes.

    const coords = geom.coordinates;
    if (geom.type === "Polygon") {
      return this.pointInPolygon([lon, lat], coords);
    } else if (geom.type === "MultiPolygon") {
      for (const poly of coords) {
        if (this.pointInPolygon([lon, lat], poly)) return true;
      }
    }
    return false;
  }

  private static pointInPolygon(point: number[], vs: number[][][]): boolean {
    // vs is Array of rings. First is exterior.
    // We check if inside exterior ring AND NOT inside interior rings (holes).
    // Simplification: Just check exterior ring[0] for basic hit.
    // Ideally check holes too but mostly urban areas are positive shapes.

    const x = point[0],
      y = point[1];

    let inside = false;
    const ring = vs[0]; // Outer ring
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const xi = ring[i][0],
        yi = ring[i][1];
      const xj = ring[j][0],
        yj = ring[j][1];

      const intersect =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  }
}
