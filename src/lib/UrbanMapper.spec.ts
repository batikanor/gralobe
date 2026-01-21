import { expect, test } from "@playwright/test";
import { UrbanMapper } from "./UrbanMapper";

test.describe("UrbanMapper Unit Tests", () => {
  test("generateSyntheticBoundary creates a Polygon with correct properties", () => {
    const lat = 40.7128; // NYC
    const lon = -74.006;
    const radius = 85;

    const feature = UrbanMapper.generateSyntheticBoundary(lat, lon, radius);

    expect(feature.type).toBe("Feature");
    expect(feature.geometry.type).toBe("Polygon");
    expect(feature.properties.name).toBe("Unknown City");

    // Check coordinate validity
    const ring = feature.geometry.coordinates[0];
    expect(ring.length).toBeGreaterThan(3);

    // Check one point roughly
    const firstPoint = ring[0];
    // Should be near input lat/lon (within a degree or so)
    expect(Math.abs(firstPoint[0] - lon)).toBeLessThan(2.0);
    expect(Math.abs(firstPoint[1] - lat)).toBeLessThan(2.0);
  });

  test("mapPointsToTopology preserves names and creates ids", async () => {
    // Mock the loadBaseTopology to return empty so we rely on synthetic
    // We can't easily mock static method without a library, but we know loadBaseTopology fetches URL
    // We can just rely on the fallback logic since network might fail or we accept synthetic generation
    // Actually, mapPointsToTopology calls loadBaseTopology. In node env, fetch might fail or be mocked.
    // For unit testing here, we primarily care about the logic flow.
    // If urbanFeatures is null, it tries to load. If fetch fails (likely in test env without setup), it catches and returns [].
    // This is perfect for testing synthetic generation logic.

    const points = [
      {
        lat: 35.6762,
        lon: 139.6503,
        value: 100,
        id: "Tokyo",
        name: "Tokyo City",
      },
    ];

    // Mock loadBaseTopology to ensure synthetic path
    (UrbanMapper as any).loadBaseTopology = async () => [];

    const result = await UrbanMapper.mapPointsToTopology(points);

    expect(result.features).toHaveLength(1);
    const feature = result.features[0];

    expect(feature.id).toBe("Tokyo");
    expect(feature.properties.name).toBe("Tokyo City");
    expect(result.statistics["Tokyo"]).toBe(100);
  });

  test("feature geometry is closed ring", () => {
    const feature = UrbanMapper.generateSyntheticBoundary(0, 0, 50);
    const ring = feature.geometry.coordinates[0];
    // First and last point should match (though the heuristic code might not explicit close it?
    // ChoroplethRenderer closes path? "path.closePath()")
    // Let's check if my implementation actually pushes the first point at end or usually polygon defs implies it?
    // GeoJSON spec says first and last should be same.
    // My implementation:
    /*
        for (let i = 0; i <= steps; i++) {
           ...
        }
      */
    // i=0 and i=steps (16) -> 0 and 2*PI. sin(0)=sin(2pi). So it produces same point.
    // Yes, it closes.

    const first = ring[0];
    const last = ring[ring.length - 1];

    expect(first[0]).toBeCloseTo(last[0]);
    expect(first[1]).toBeCloseTo(last[1]);
  });
});
