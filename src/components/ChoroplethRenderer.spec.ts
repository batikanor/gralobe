import { expect, test } from "@playwright/test";
import { ChoroplethRenderer } from "./ChoroplethRenderer";

// Mock DOM for Node environment
if (typeof document === "undefined") {
  (globalThis as any).document = {
    createElement: (tag: string) => {
      if (tag === "canvas") {
        return {
          width: 0,
          height: 0,
          getContext: () => ({
            fillRect: () => {},
            fillStyle: "",
            lineWidth: 0,
            strokeStyle: "",
            beginPath: () => {},
            moveTo: () => {},
            lineTo: () => {},
            stroke: () => {},
            fill: () => {},
            closePath: () => {},
            arc: () => {},
          }),
        };
      }
      return {};
    },
  } as any;

  (globalThis as any).Path2D = class {
    arc() {}
    moveTo() {}
    lineTo() {}
    closePath() {}
  } as any;
}

test.describe("ChoroplethRenderer Smart Lookup", () => {
  test("getFeatureName finds exact match", async () => {
    // We can't easily instantiate ChoroplethRenderer without canvas context issues potentially
    // unless the test env provides full DOM. Playwright does.

    // We need to inject featureLabels manually since loading is async/complex
    // But getFeatureName relies on this.featureLabels OR this.countries.

    // We can use "setFeatures" to populate it easily.
    const renderer = new ChoroplethRenderer({ url: "" });

    const mockFeatures: any[] = [
      {
        type: "Feature",
        id: "1001",
        properties: { name: "Autauga County" },
        geometry: { type: "Point", coordinates: [0, 0] },
      },
    ];

    renderer.setFeatures(mockFeatures); // This populates countries AND updateFeatureLabels()

    expect(renderer.getFeatureName("1001")).toBe("Autauga County");
  });

  test("getFeatureName performs smart lookup for padded zeros", async () => {
    const renderer = new ChoroplethRenderer({ url: "" });

    const mockFeatures: any[] = [
      {
        type: "Feature",
        id: "1001", // Stored as number-like string
        properties: { name: "Autauga County" },
        geometry: { type: "Point", coordinates: [0, 0] },
      },
    ];

    renderer.setFeatures(mockFeatures);

    // Query with padded zero (simulating 'sId' from main.ts if it was used)
    // "01001" -> should match "1001"
    expect(renderer.getFeatureName("01001")).toBe("Autauga County");
  });

  test("getFeatureName returns undefined for no match", async () => {
    const renderer = new ChoroplethRenderer({ url: "" });
    renderer.setFeatures([]);
    expect(renderer.getFeatureName("99999")).toBeUndefined();
  });
});
