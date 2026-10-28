import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildAlpha3ToNumeric,
  fetchIndicator,
  fetchRealCountryCodes,
} from "../../scripts/fetch-worldbank-data.mjs";

afterEach(() => vi.unstubAllGlobals());

function response(rows, { page = 1, pages = 1, total = rows.length } = {}) {
  return { ok: true, json: async () => [{ page, pages, total }, rows] };
}

function observation(countryiso3code, value, date = "2020", alpha2 = "FR") {
  return { countryiso3code, country: { id: alpha2 }, value, date };
}

describe("World Bank data refresh", () => {
  it("keeps France, Norway and zero-padded ISO codes in the map", () => {
    const features = [
      { ISO_A3: "-99", ISO_A3_EH: "FRA", ISO_N3: "-99", ISO_N3_EH: "250", WB_A3: "FRA" },
      { ISO_A3: "-99", ISO_A3_EH: "NOR", ISO_N3: "-99", UN_A3: "578" },
      { ISO_A3: "BEL", ISO_N3: "056" },
      { ISO_A3: "-99", ISO_N3: "-99" },
    ].map((properties) => ({ properties }));
    expect(Object.fromEntries(buildAlpha3ToNumeric({ features }))).toEqual({
      FRA: "250",
      NOR: "578",
      BEL: "056",
    });
  });

  it("excludes aggregate regions across every country-list page", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce(
        response(
          [
            { id: "FRA", region: { id: "ECS", value: "Europe & Central Asia" } },
            { id: "WLD", region: { id: "NA", value: "Aggregates" } },
          ],
          { pages: 2, total: 3 },
        ),
      )
      .mockResolvedValueOnce(
        response([{ id: "NOR", region: { id: "ECS", value: "Europe & Central Asia" } }], {
          page: 2,
          pages: 2,
          total: 3,
        }),
      );
    vi.stubGlobal("fetch", fetch);
    expect(await fetchRealCountryCodes()).toEqual(new Set(["FRA", "NOR"]));
    expect(new URL(fetch.mock.calls[1][0]).searchParams.get("page")).toBe("2");
  });

  it("keeps zero, skips invalid observations and aggregates, and reads all indicator pages", async () => {
    const firstPage = [
      observation("FRA", 0),
      observation("WLD", 100),
      observation("FRA", null, "2019"),
      observation("FRA", Number.NaN, "2018"),
      observation("FRA", "12", "2017"),
      observation("FRA", 12, "not-a-year"),
    ];
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValueOnce(response(firstPage, { pages: 2, total: firstPage.length + 2 }))
        .mockResolvedValueOnce(
          response([observation("NOR", 80, "2020", "NO"), observation("AND", 70, "2020", "AD")], {
            page: 2,
            pages: 2,
            total: firstPage.length + 2,
          }),
        ),
    );
    expect(
      await fetchIndicator(
        "TEST",
        new Set(["FRA", "NOR", "AND"]),
        new Map([
          ["FRA", "250"],
          ["NOR", "578"],
        ]),
      ),
    ).toEqual({
      2020: { 250: 0, 578: 80, AD: 70 },
    });
  });

  it("rejects truncated responses instead of replacing data with a partial cache", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(response([observation("FRA", 10)], { total: 2 })),
    );
    await expect(fetchIndicator("TEST", new Set(["FRA"]), new Map())).rejects.toThrow(
      "Incomplete response",
    );
  });

  it("rejects retired indicator error payloads and empty country data", async () => {
    const fetch = vi
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [{ message: [{ value: "Invalid value" }] }],
      })
      .mockResolvedValueOnce(response([observation("FRA", null)]));
    vi.stubGlobal("fetch", fetch);
    await expect(fetchIndicator("RETIRED", new Set(["FRA"]), new Map())).rejects.toThrow(
      "Unexpected response",
    );
    await expect(fetchIndicator("EMPTY", new Set(["FRA"]), new Map())).rejects.toThrow(
      "No usable country data",
    );
  });
});
