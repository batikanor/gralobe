import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Replace only the external texture dependency; the real globe, worker,
  // topology parsing, interaction handlers and UI components run unchanged.
  await page.route("https://raw.githubusercontent.com/**/earth_atmos_2048.jpg", (route) =>
    route.fulfill({
      contentType: "image/png",
      headers: { "access-control-allow-origin": "*" },
      body: Buffer.from(
        "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a0ioAAAAASUVORK5CYII=",
        "base64",
      ),
    }),
  );
  await page.goto("/tests/fixtures/combined.html");
  await page.evaluate(() => (window as any).integrationReady);
});

test("click, year selection, pin, chart and metric changes share the same values", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.locator("#globe > canvas").click({ position: { x: 360, y: 250 } });
  const trend = page.locator(".gralobe-trend");
  await expect(trend).toHaveClass(/visible/);
  await expect(trend.locator(".gralobe-trend-title")).toHaveText("France");
  await expect(trend.locator(".gralobe-trend-value")).toContainText("10");
  expect(await page.evaluate(() => (window as any).countryClicks[0])).toEqual([
    "250",
    "France",
    10,
  ]);
  await trend.getByRole("button", { name: "Pin to watchlist", exact: true }).click();
  const strip = page.locator(".gralobe-watchlist");
  await expect(strip).toContainText("France");
  await page.evaluate(() => (window as any).globe.setTimelineStep(1));
  await expect(trend.locator(".gralobe-trend-value")).toContainText("15");
  await expect(trend.locator(".gralobe-trend-badge")).toContainText("+50.0%");
  await expect(strip).toContainText("15");

  await page.getByTestId("toolbar-chart").click();
  const chart = page.locator(".gralobe-chart-panel");
  await expect(chart).toHaveClass(/visible/);
  await expect(trend).toBeHidden();
  await expect(page.locator(".gralobe-search")).toBeHidden();
  await expect(strip).toBeHidden();
  await expect(chart.getByTestId("chart-metric")).toHaveValue("populationHistory");
  await chart.getByTestId("chart-metric").selectOption("internetHistory");
  await chart.getByTestId("chart-year").selectOption("1");
  await chart.getByRole("button", { name: /Back to globe/i }).click();
  await expect(trend.locator(".gralobe-trend-stat")).toHaveText("Internet");
  await expect(trend.locator(".gralobe-trend-value")).toContainText("35");
  await expect(trend.locator(".gralobe-trend-badge")).toContainText("+5.0 percentage points");
  await expect(strip).toContainText("35");
  expect(errors).toEqual([]);
});

test("missing frame values disappear after interpolation and a plain statistic clears years", async ({
  page,
}) => {
  await page.locator("#globe > canvas").click({ position: { x: 360, y: 250 } });
  await page.evaluate(() => (window as any).globe.setTimelineStep(2));
  await expect(page.locator(".gralobe-trend-value")).toHaveText("No data");
  expect(await page.evaluate(() => (window as any).globe.getCurrentData())).toEqual({ Norway: 30 });
  await page.evaluate(() =>
    (window as any).globe.setStatistic({
      definition: {
        id: "custom",
        name: "Custom measure",
        unit: "years",
        colorScale: ["#111", "#888", "#fff"],
        domain: [0, 100],
      },
      values: { FR: 42 },
      previousValues: { FRA: 40 },
    }),
  );
  await expect(page.locator(".gralobe-trend-stat")).toHaveText("Custom measure");
  await expect(page.locator(".gralobe-trend-value")).toContainText("42");
  expect(await page.evaluate(() => (window as any).globe.getTimelineState())).toBeNull();
  await page.getByTestId("toolbar-chart").click();
  await expect(page.getByTestId("chart-year")).toBeHidden();
});

test("empty time series clears old data and closed trends stay closed", async ({ page }) => {
  await page.locator("#globe > canvas").click({ position: { x: 360, y: 250 } });
  await page.locator(".gralobe-trend-close").click();
  await page.evaluate(() => {
    const globe = (window as any).globe;
    globe.setTimelineStep(1);
    globe.setTimeSeries({
      definition: {
        id: "empty",
        name: "Empty",
        unit: "",
        colorScale: ["#111", "#888", "#fff"],
        domain: [0, 100],
      },
      frames: {},
    });
  });
  await expect(page.locator(".gralobe-trend")).not.toHaveClass(/visible/);
  expect(await page.evaluate(() => (window as any).globe.getCurrentData())).toEqual({});
});

test("hover uses the active custom formatter and treats frame labels as text", async ({ page }) => {
  await page.evaluate(() => {
    const globe = (window as any).globe;
    const definition = {
      id: "custom",
      name: "Custom metric",
      unit: "years",
      colorScale: ["#111", "#888", "#fff"],
      domain: [0, 100],
      format: (value: number) => `<b>${value} custom years</b>`,
    };
    globe.setStatistic({ definition, values: { FR: 42 } });
  });
  await page.locator("#globe > canvas").hover({ position: { x: 360, y: 250 } });
  const tooltip = page.locator(".gralobe-hover-tooltip");
  await expect(tooltip).toContainText("<b>42 custom years</b>");
  await expect(tooltip.locator("b")).toHaveCount(0);
  await page.evaluate(() => {
    const globe = (window as any).globe;
    globe.setTimeSeries({
      definition: {
        id: "same",
        name: "Same",
        unit: "",
        colorScale: ["#111", "#888", "#fff"],
        domain: [0, 100],
      },
      frames: { 'a<img src="x" onerror="window.injected=true">': { FR: 42 }, b: { FR: 42 } },
    });
    globe.setTimelineStep(1);
  });
  await page.locator("#globe > canvas").hover({ position: { x: 370, y: 250 } });
  await expect(tooltip).toContainText('no change vs a<img src="x"');
  await expect(tooltip.locator("img")).toHaveCount(0);
  expect(await page.evaluate(() => (window as any).injected)).toBeUndefined();
});

test("double click opens and resets country profile; search works after flat projection", async ({
  page,
}) => {
  const canvas = page.locator("#globe > canvas");
  await canvas.dblclick({ position: { x: 360, y: 250 } });
  await expect(page.getByTestId("country-profile")).toHaveClass(/visible/);
  await expect(page.getByTestId("country-profile")).toContainText("France");
  await canvas.dblclick({ position: { x: 360, y: 350 } });
  await expect(page.getByTestId("country-profile")).not.toHaveClass(/visible/);
  await page.evaluate(() => (window as any).globe.toFlat());
  await expect.poll(() => page.evaluate(() => (window as any).globe.getMorph())).toBe(0);
  await page.locator(".gralobe-search input").fill("Norway");
  await page.locator(".gralobe-search input").press("Enter");
  await expect.poll(() => page.evaluate(() => (window as any).globe.getMorph())).toBe(1);
  expect(await page.evaluate(() => (window as any).globe.controls.enableRotate)).toBe(true);
  await expect
    .poll(() => page.evaluate(() => Math.round((window as any).globe.camera.position.length())))
    .toBe(75);
  await canvas.click({ position: { x: 360, y: 250 } });
  await expect(page.locator(".gralobe-trend-title")).toHaveText("Norway");
});
