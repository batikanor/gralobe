import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/watchlist-layout.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: '<!doctype html><html><head></head><body style="margin:0"><div id="map" style="position:relative;width:720px;height:400px"></div></body></html>',
    }),
  );
  await page.goto("/watchlist-layout.html");
  await page.evaluate(async () => {
    const [{ Legend }, { Toolbar }, { WatchlistStrip }] = await Promise.all([
      import("/src/components/Legend.ts"),
      import("/src/components/Toolbar.ts"),
      import("/src/components/WatchlistStrip.ts"),
    ]);
    const parent = document.querySelector<HTMLElement>("#map")!;
    const legend = new Legend(parent);
    const unpinned: string[] = [];
    const strip = new WatchlistStrip(
      parent,
      () => {},
      (id: string) => unpinned.push(id),
    );
    // Match GlobeViz's creation order: the toolbar arrives after the strip.
    const toolbar = new Toolbar(parent, {
      onToggleProjection: () => {},
      onToggleFullscreen: () => {},
      onShowChart: () => {},
      onShowHelp: () => {},
    });
    const definition = {
      id: "gdp",
      name: "GDP per Capita (PPP)",
      unit: "$",
      domain: [1000, 80000],
      colorScale: ["#edf8e9", "#74c476", "#006d2c"],
      description: "Purchasing power parity adjusted GDP per person",
    };
    legend.show(definition);
    strip.update(
      [
        "Germany",
        "United States",
        "France",
        "Norway",
        "South Africa",
        "New Zealand",
        "Australia",
        "Argentina",
      ].map((name, index) => ({ name, id: String(index), value: 58.8 })),
      (value: number) => `$${value}k`,
    );
    Object.assign(window, { layoutComponents: { legend, toolbar, strip, unpinned, definition } });
  });
});

for (const width of [320, 453, 720]) {
  test(`pinned countries clear real legend and toolbar at ${width}px`, async ({ page }) => {
    await page.locator("#map").evaluate((element, width) => {
      (element as HTMLElement).style.width = `${width}px`;
    }, width);
    await expect
      .poll(() =>
        page.evaluate(() => {
          const strip = document.querySelector(".gralobe-watchlist")!.getBoundingClientRect();
          const legend = document.querySelector(".gralobe-legend")!.getBoundingClientRect();
          const toolbar = document.querySelector(".gralobe-toolbar")!.getBoundingClientRect();
          return Math.min(legend.top, toolbar.top) - strip.bottom;
        }),
      )
      .toBeGreaterThanOrEqual(7);
    const bounds = (await page.locator(".gralobe-watchlist").boundingBox())!;
    expect(bounds.x).toBeGreaterThanOrEqual(0);
    expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
    expect(
      await page
        .locator(".gralobe-watchlist")
        .evaluate((element) => element.scrollWidth > element.clientWidth),
    ).toBe(true);
    await page.getByRole("button", { name: "Unpin Argentina", exact: true }).click();
    expect(await page.evaluate(() => (window as any).layoutComponents.unpinned)).toEqual(["7"]);
  });
}

test("watchlist follows control resizing and visibility and releases observers on disposal", async ({
  page,
}) => {
  await page.evaluate(() => {
    const { legend, definition } = (window as any).layoutComponents;
    legend.show({
      ...definition,
      description:
        "A longer description that wraps onto multiple lines and increases the legend height ".repeat(
          4,
        ),
    });
    document.querySelector<HTMLElement>("#map")!.style.height = "500px";
  });
  await expect
    .poll(() =>
      page.evaluate(() => {
        const strip = document.querySelector(".gralobe-watchlist")!.getBoundingClientRect();
        const legend = document.querySelector(".gralobe-legend")!.getBoundingClientRect();
        return legend.top - strip.bottom;
      }),
    )
    .toBeGreaterThanOrEqual(7);
  await page.evaluate(() => {
    const { legend, toolbar } = (window as any).layoutComponents;
    legend.hide();
    toolbar.setVisible(false);
  });
  await expect(page.locator(".gralobe-watchlist")).toHaveCSS("bottom", "12px");
  await page.evaluate(() => (window as any).layoutComponents.toolbar.setVisible(true));
  await expect
    .poll(() =>
      page.evaluate(() => {
        const strip = document.querySelector(".gralobe-watchlist")!.getBoundingClientRect();
        const toolbar = document.querySelector(".gralobe-toolbar")!.getBoundingClientRect();
        return toolbar.top - strip.bottom;
      }),
    )
    .toBeGreaterThanOrEqual(7);
  const disconnected = await page.evaluate(() => {
    const { strip } = (window as any).layoutComponents;
    const disconnected: string[] = [];
    for (const name of ["resizeObserver", "mutationObserver"]) {
      const observer = strip[name];
      const disconnect = observer.disconnect.bind(observer);
      observer.disconnect = () => {
        disconnected.push(name);
        disconnect();
      };
    }
    strip.dispose();
    document.querySelector<HTMLElement>("#map")!.style.width = "320px";
    return disconnected;
  });
  expect(disconnected).toEqual(["resizeObserver", "mutationObserver"]);
  await expect(page.locator(".gralobe-watchlist")).toHaveCount(0);
});
