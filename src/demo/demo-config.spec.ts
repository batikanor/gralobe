import { describe, expect, it } from "vitest";
import type { GlobeViz } from "../lib/GlobeViz";
import type { TimeSeriesData } from "../lib/types";
import history from "./data/worldbank-history.json";
import { sections } from "./demo-config";

describe("real historical demo data", () => {
  it("uses the same numeric country ids in every demo's maps, profiles and charts", async () => {
    const countryDemos = sections.find((section) => section.id === "country-level")!.demos;
    for (const demo of countryDemos) {
      let options: Record<string, TimeSeriesData> = {};
      const globe = {
        ready: Promise.resolve(),
        setTimeSeriesOptions(value: Record<string, TimeSeriesData>) {
          options = value;
        },
      } as unknown as GlobeViz;
      await demo.setup!(globe);
      const values = options.lifeExpectancy.frames["2020"] as Record<string, number>;
      expect(values["250"]).toBe(history.lifeExpectancy["2020"].FR);
      expect(values["578"]).toBe(history.lifeExpectancy["2020"].NO);
      expect(values.FR).toBeUndefined();
      expect(values.NO).toBeUndefined();
      expect(Object.keys(options)).toHaveLength(11);
      expect(options.gdpPerCapita.definition.name).toContain("PPP");
    }
  });
});
