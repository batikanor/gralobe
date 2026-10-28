import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Exercise the real DOM components in Chromium without loading the demo's
  // remote textures, datasets, or a WebGL context.
  await page.route("**/component-test.html", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: `<!doctype html><html><head></head><body style="margin:0">
      <button id="opener">Open help</button>
      <div id="map" style="position:relative;width:640px;max-width:100vw;height:480px"></div>
      </body></html>`,
    }),
  );
  await page.goto("/component-test.html");
  await page.evaluate(async () => {
    const [{ SearchBar }, { WatchlistStrip }, { CountryTrendPanel }, { HelpManual }] =
      await Promise.all([
        import("/src/components/SearchBar.ts"),
        import("/src/components/WatchlistStrip.ts"),
        import("/src/components/CountryTrendPanel.ts"),
        import("/src/components/HelpManual.ts"),
      ]);
    const map = document.querySelector<HTMLElement>("#map")!;
    const selected: string[] = [];
    const unpinned: string[] = [];
    const pinned: string[] = [];
    const search = new SearchBar(map, (id: string) => selected.push(id));
    const watchlist = new WatchlistStrip(
      map,
      (id: string) => selected.push(id),
      (id: string) => unpinned.push(id),
    );
    const trend = new CountryTrendPanel(map, (id: string) => pinned.push(id));
    const help = new HelpManual(map);
    Object.assign(window, {
      testComponents: { search, watchlist, trend, help, selected, unpinned, pinned },
    });
  });
});

test("country search treats custom names as text and supports keyboard selection", async ({
  page,
}) => {
  const unsafeName = '<img src=x onerror="window.injected=true"> Country';
  await page.evaluate((name) => {
    (window as any).testComponents.search.setCountries([{ id: 'id" data-x="injected', name }]);
  }, unsafeName);
  const search = page.getByRole("combobox", { name: "Search country" });
  await search.fill("Country");
  await expect(page.getByRole("option")).toHaveText(unsafeName);
  await expect(page.locator(".gralobe-search img")).toHaveCount(0);
  await search.press("ArrowDown");
  await expect(page.getByRole("option")).toHaveAttribute("aria-selected", "true");
  await expect(search).toHaveAttribute("aria-activedescendant", /gralobe-search-/);
  await search.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual([
    'id" data-x="injected',
  ]);
  await expect(search).toHaveAttribute("aria-expanded", "false");
  expect(await page.evaluate(() => (window as any).injected)).toBeUndefined();
});

test("search clears stale suggestions on no match, Escape, and country replacement", async ({
  page,
}) => {
  await page.evaluate(() =>
    (window as any).testComponents.search.setCountries([
      { id: "FR", name: "France" },
      { id: "DE", name: "Germany" },
    ]),
  );
  const search = page.getByRole("combobox", { name: "Search country" });
  await search.fill("Fra");
  await expect(page.getByRole("option")).toHaveText("France");
  await search.press("Escape");
  await search.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual([]);
  await search.fill("zzz");
  await search.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual([]);
  await search.fill("Fra");
  await page.evaluate(() =>
    (window as any).testComponents.search.setCountries([{ id: "DE", name: "Germany" }]),
  );
  await expect(search).toHaveAttribute("aria-expanded", "false");
  await search.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual([]);
  await search.fill("Ger");
  await search.press("Escape");
  await search.press("ArrowDown");
  await expect(page.getByRole("option")).toHaveText("Germany");
  await search.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual(["DE"]);
});

test("watchlist escapes IDs, country names and custom formatter output and supports keyboard actions", async ({
  page,
}) => {
  const unsafeName = '<img src=x onerror="window.injected=true"> Country';
  const unsafeId = '"><img src=x onerror="window.injected=true">';
  await page.evaluate(
    ({ name, id }) =>
      (window as any).testComponents.watchlist.update(
        [
          { id, name, value: 12 },
          { id: "DE", name: "Germany", value: Number.NaN },
        ],
        () => "<b>12 units</b>",
      ),
    { name: unsafeName, id: unsafeId },
  );
  await expect(page.locator(".gralobe-watchlist-name").first()).toHaveText(unsafeName);
  await expect(page.locator(".gralobe-watchlist-value").first()).toHaveText("<b>12 units</b>");
  await expect(page.locator(".gralobe-watchlist-value").last()).toHaveText("—");
  await expect(page.locator(".gralobe-watchlist img, .gralobe-watchlist b")).toHaveCount(0);
  await page.getByRole("button", { name: `Show ${unsafeName}`, exact: true }).press("Enter");
  await page.getByRole("button", { name: `Unpin ${unsafeName}`, exact: true }).press("Space");
  expect(await page.evaluate(() => (window as any).testComponents.selected)).toEqual([unsafeId]);
  expect(await page.evaluate(() => (window as any).testComponents.unpinned)).toEqual([unsafeId]);
  expect(await page.evaluate(() => (window as any).injected)).toBeUndefined();
});

test("watchlist refreshes active values while preserving keyboard focus", async ({ page }) => {
  await page.evaluate(() =>
    (window as any).testComponents.watchlist.update(
      [{ id: "DE", name: "Germany", value: 80 }],
      (value: number) => `${value}%`,
    ),
  );
  await page.getByRole("button", { name: "Unpin Germany", exact: true }).focus();
  await page.evaluate(() =>
    (window as any).testComponents.watchlist.update(
      [{ id: "DE", name: "Germany", value: 45 }],
      (value: number) => `$${value}`,
    ),
  );
  await expect(page.locator(".gralobe-watchlist-value")).toHaveText("$45");
  await expect(page.getByRole("button", { name: "Unpin Germany", exact: true })).toBeFocused();
});

test("trends distinguish percent changes, percentage points, zero baselines and missing data", async ({
  page,
}) => {
  const show = async (current: number | null, previous: number | null, unit = "") =>
    page.evaluate(
      ({ current, previous, unit }) =>
        (window as any).testComponents.trend.show(
          "DE",
          "Germany",
          "Metric",
          current ?? undefined,
          previous ?? undefined,
          (value: number) => `${value}`,
          ["#fff", "#ddd", "#000"],
          false,
          unit,
        ),
      { current, previous, unit },
    );
  const badge = page.locator(".gralobe-trend-badge");
  await show(80, 75, "%");
  await expect(badge).toHaveText("▲ +5.0 percentage points vs last period");
  await show(12, 10, "% GDP");
  await expect(badge).toHaveText("▲ +2.0 percentage points vs last period");
  await show(80, 100);
  await expect(badge).toHaveText("▼ -20.0% vs last period");
  await show(-5, -10);
  await expect(badge).toHaveText("▲ +50.0% vs last period");
  await show(5, 0);
  await expect(badge).toHaveText("▲ Increased from 0 vs last period");
  await show(0.00001, 0);
  await expect(badge).toHaveClass(/up/);
  await show(100.00001, 100);
  await expect(badge).toContainText("<0.1%");
  await show(0, 0);
  await expect(badge).toHaveText("● No change vs last period");
  await show(5, null);
  await expect(page.locator(".gralobe-trend-nodata")).toContainText("No prior-period data");
  await show(null, 2);
  await expect(page.locator(".gralobe-trend-value")).toHaveText("No data");
  await expect(page.locator(".gralobe-trend-share")).toBeHidden();
  await page.evaluate(() =>
    (window as any).testComponents.trend.show(
      "DE",
      "Germany",
      "Metric",
      Number.NaN,
      Number.POSITIVE_INFINITY,
      String,
      ["#fff", "#ddd", "#000"],
    ),
  );
  await expect(page.locator(".gralobe-trend-value")).toHaveText("No data");
});

test("trend pin state, current selection and hidden focusability stay in sync", async ({
  page,
}) => {
  await page.evaluate(() =>
    (window as any).testComponents.trend.show(
      "DE",
      "Germany",
      "Population",
      83,
      undefined,
      String,
      ["#fff", "#ddd", "#000"],
    ),
  );
  const pin = page.getByRole("button", { name: "Pin to watchlist", exact: true });
  await pin.press("Enter");
  expect(await page.evaluate(() => (window as any).testComponents.pinned)).toEqual(["DE"]);
  await page.evaluate(() => (window as any).testComponents.trend.setPinned("DE", true));
  await expect(
    page.getByRole("button", { name: "Unpin from watchlist", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(await page.evaluate(() => (window as any).testComponents.trend.getFeatureId())).toBe("DE");
  await page.getByRole("button", { name: "Close", exact: true }).click();
  expect(await page.evaluate(() => (window as any).testComponents.trend.isVisible())).toBe(false);
  expect(
    await page.locator(".gralobe-trend").evaluate((element) => (element as HTMLElement).inert),
  ).toBe(true);
});

test("help traps keyboard focus, closes with Escape, and restores the opener", async ({ page }) => {
  const opener = page.getByRole("button", { name: "Open help", exact: true });
  await opener.focus();
  await page.evaluate(() => (window as any).testComponents.help.show());
  const close = page.getByRole("button", { name: "Close help", exact: true });
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(close).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.locator(".gralobe-help-body")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.locator(".gralobe-help-body")).toBeFocused();
  await page.keyboard.press("PageDown");
  await expect
    .poll(() => page.locator(".gralobe-help-body").evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toBeHidden();
  await expect(opener).toBeFocused();
  expect(
    await page
      .locator(".gralobe-help-overlay")
      .evaluate((element) => (element as HTMLElement).inert),
  ).toBe(true);
  await page.evaluate(() => {
    const { search, watchlist, trend, help } = (window as any).testComponents;
    search.dispose();
    watchlist.dispose();
    trend.dispose();
    help.dispose();
  });
  await expect(page.locator("#map > *")).toHaveCount(0);
});

test("search and trend fit a narrow map without overlapping", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.evaluate(() =>
    (window as any).testComponents.trend.show(
      "DE",
      "A very long country name that must wrap safely",
      "Metric",
      12345,
      12300,
      String,
      ["#fff", "#ddd", "#000"],
    ),
  );
  await expect(page.locator(".gralobe-trend")).toBeVisible();
  const search = (await page.locator(".gralobe-search").boundingBox())!;
  const trend = (await page.locator(".gralobe-trend").boundingBox())!;
  expect(trend.x).toBeGreaterThanOrEqual(0);
  expect(trend.x + trend.width).toBeLessThanOrEqual(320);
  expect(trend.y).toBeGreaterThanOrEqual(search.y + search.height);
});

test("share downloads a real 1200 by 630 PNG", async ({ page }) => {
  await page.evaluate(() =>
    (window as any).testComponents.trend.show(
      "DE",
      "Germany",
      "Population",
      83,
      undefined,
      (value: number) => `${value}M`,
      ["#fff7bc", "#fec44f", "#d95f0e"],
    ),
  );
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download shareable card", exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("gralobe-germany.png");
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream) chunks.push(chunk);
  const png = Buffer.concat(chunks);
  expect(png.subarray(0, 8)).toEqual(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
});
