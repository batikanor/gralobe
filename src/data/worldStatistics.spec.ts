import { describe, expect, test } from "vitest";
import { getStatisticById, STATISTICS, WORLD_STATISTICS } from "./worldStatistics";

describe("built-in statistics", () => {
  test("population preserves small-country values instead of rounding to zero", () => {
    const population = getStatisticById("population")!;
    expect(population.format!(0.4)).toBe("0.4M");
    expect(population.format!(83)).toBe("83M");
  });

  test("new population and education statistics read real country fields", () => {
    const country = WORLD_STATISTICS.find((country) => country.code === "DE")!;
    expect(getStatisticById("population")!.accessor(country)).toBe(country.population);
    expect(getStatisticById("educationExpenditure")!.accessor(country)).toBe(
      country.educationExpenditure,
    );
    expect(getStatisticById("educationExpenditure")!.format!(4.5)).toBe("4.5%");
  });

  test("every built-in statistic has unique identity and finite data, without fabricated history", () => {
    expect(new Set(STATISTICS.map((stat) => stat.id)).size).toBe(STATISTICS.length);
    for (const stat of STATISTICS) {
      expect(stat.domain[1]).toBeGreaterThan(stat.domain[0]);
      expect(stat.previousAccessor).toBeUndefined();
      for (const country of WORLD_STATISTICS)
        expect(Number.isFinite(stat.accessor(country))).toBe(true);
    }
  });
});
