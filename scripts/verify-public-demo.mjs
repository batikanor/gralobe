import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { chromium, expect } from "@playwright/test";

// Run with the browser Docker image against the actual compiled deployment.
// This deliberately uses only public UI and network behavior: no fixtures,
// substituted assets, application imports, or private globe state.
const target = new URL(process.argv[2] ?? "https://gralobe.maptheory.org/");
const evidenceDir = process.env.EVIDENCE_DIR ?? "/evidence";
const reports = [];
await mkdir(evidenceDir, { recursive: true });

const browser = await chromium.launch({
  args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
});

async function readyGlobe(page, id) {
  const globe = page.locator(`#${id}`);
  await globe.scrollIntoViewIfNeeded();
  await expect(globe.locator(":scope > canvas")).toBeVisible({ timeout: 45000 });
  await expect(globe.locator(".globe-loader")).toHaveClass(/hidden/, { timeout: 45000 });
  await expect(globe.locator(".globe-error")).not.toHaveClass(/visible/);
  const dimensions = await globe.locator(":scope > canvas").evaluate((canvas) => ({
    width: canvas.width,
    height: canvas.height,
  }));
  assert(dimensions.width > 200 && dimensions.height >= 280, `${id} has a full-size canvas`);
  return globe;
}

async function capture(page, name) {
  await page.screenshot({ path: path.join(evidenceDir, `${name}.png`), animations: "disabled" });
}

async function checkHistoricalData(page, report) {
  const globe = await readyGlobe(page, "globe-stat-life");
  await expect(globe.getByTestId("legend-title")).toContainText("Life Expectancy");
  await expect.poll(() => globe.locator(".country-label").count()).toBeGreaterThan(20);
  await capture(page, `${report.device}-landing`);

  await globe.getByTestId("toolbar-chart").click();
  const chart = globe.getByTestId("chart-panel");
  await expect(chart).toHaveAttribute("aria-hidden", "false");
  await expect(chart.getByTestId("chart-metric")).toHaveValue("lifeExpectancy");
  const years = await chart.getByTestId("chart-year").locator("option").allTextContents();
  assert.deepEqual(years, ["1990", "1995", "2000", "2005", "2010", "2015", "2020", "2023"]);

  await chart.getByTestId("chart-picker").click();
  const checked = chart.locator('.gralobe-chart-list input[type="checkbox"]:checked');
  while (await checked.count()) {
    const id = await checked.first().getAttribute("value");
    await chart.locator(`.gralobe-chart-list input[value="${id}"]`).uncheck();
  }
  await chart.getByPlaceholder("Search countries…").fill("France");
  await chart.getByLabel("France", { exact: true }).check();
  await chart.getByTestId("chart-picker").click();
  await expect(chart.getByTestId("chart-legend")).toHaveText("France");
  const line = chart.getByTestId("chart-plot").locator("svg polyline");
  await expect(line).toHaveCount(1);
  const coordinates = (await line.getAttribute("points"))
    .split(" ")
    .map((point) => point.split(",").map(Number));
  assert.equal(coordinates.length, 8, "France has a real value at every curated historical year");
  assert(
    coordinates.every((point) => point.every(Number.isFinite)),
    "Historical chart geometry is finite",
  );
  assert(
    coordinates.at(-1)[1] < coordinates[0][1],
    "France life expectancy increased over the series",
  );
  const ratio = (coordinates[6][0] - coordinates[0][0]) / (coordinates[7][0] - coordinates[0][0]);
  assert(Math.abs(ratio - 30 / 33) < 0.01, "2020 is positioned by actual elapsed years");

  await chart.getByRole("button", { name: "Bar", exact: true }).click();
  await chart.getByTestId("chart-year").selectOption({ label: "1990" });
  await expect(chart.getByTestId("chart-plot")).toContainText("76.6 years");
  await chart.getByTestId("chart-year").selectOption({ label: "2023" });
  await expect(chart.getByTestId("chart-plot")).toContainText("82.832 years");
  await capture(page, `${report.device}-life-expectancy-2023`);

  await chart.getByTestId("chart-metric").selectOption("population");
  await chart.getByTestId("chart-year").selectOption({ label: "2023" });
  await expect(chart.getByTestId("chart-title")).toContainText("Population");
  await expect(chart.getByTestId("chart-plot")).toContainText("68.4M");
  await chart.getByTestId("chart-year").selectOption({ label: "1990" });
  await expect(chart.getByTestId("chart-plot")).toContainText("58.3M");
  await chart.getByTestId("chart-back").click();
  await expect(chart).toHaveAttribute("aria-hidden", "true");
  await expect(globe.getByTestId("legend-title")).toContainText("Population");
  await globe.getByTitle("Toggle Toolbar", { exact: true }).click();
  await globe.getByRole("button", { name: "Data", exact: true }).click();
  const dataSelects = globe.locator(".lil-gui.root.active-panel select");
  await expect(dataSelects).toHaveCount(2);
  await expect(dataSelects.nth(0)).toHaveValue("population");
  await expect(dataSelects.nth(1)).toHaveValue("1990");
  await globe.getByRole("button", { name: "Data", exact: true }).click();
  report.historicalData = {
    country: "France",
    years,
    lifeExpectancy: { 1990: "76.6 years", 2023: "82.832 years" },
    population: { 1990: "58.3M", 2023: "68.4M" },
    historicalLinePoints: coordinates.length,
    chartAndGlobeControlsSynchronized: true,
  };
}

async function checkFeatureDemo(page, report) {
  await page.locator("#features .section-header").click();
  await expect(page.locator("#content-features")).not.toHaveClass(/collapsed/);
  const globe = await readyGlobe(page, "globe-trend-help");
  const canvas = globe.locator(":scope > canvas");
  const search = globe.getByRole("combobox", { name: "Search country" });
  await search.fill("Germany");
  await expect(globe.getByRole("option", { name: "Germany", exact: true })).toBeVisible();
  await search.press("Enter");
  await expect(search).toHaveAttribute("aria-expanded", "false");
  const size = await canvas.boundingBox();
  assert(size, "Feature globe is on screen");
  const center = { x: size.width / 2, y: size.height / 2 };
  let probe = 0;
  // The real hover hit is the readiness signal for the search camera flight.
  await expect
    .poll(
      async () => {
        await canvas.hover({ position: { x: center.x + (probe++ % 2), y: center.y } });
        return globe.locator(".gralobe-hover-tooltip").textContent();
      },
      { timeout: 15000, intervals: [100, 200, 400] },
    )
    .toMatch(/^Germany\b/);
  await canvas.click({ position: center });
  const trend = globe.getByRole("region", { name: "Country statistic" });
  await expect(trend.locator(".gralobe-trend-title")).toHaveText("Germany");
  await expect(trend.locator(".gralobe-trend-stat")).toHaveText("GDP per Capita (PPP)");
  await expect(trend.locator(".gralobe-trend-value")).toHaveText("$58.8k");
  await trend.getByRole("button", { name: "Pin to watchlist", exact: true }).click();
  await expect(
    trend.getByRole("button", { name: "Unpin from watchlist", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const watchlist = globe.locator(".gralobe-watchlist");
  await expect(watchlist.getByRole("button", { name: "Show Germany", exact: true })).toBeVisible();
  await expect(watchlist.locator(".gralobe-watchlist-value")).toHaveText("$58.8k");

  const bounds = await globe.evaluate((container) => {
    const box = (selector) => {
      const { left, top, right, bottom, width, height } = container
        .querySelector(selector)
        .getBoundingClientRect();
      return { left, top, right, bottom, width, height };
    };
    return {
      container: (() => {
        const { left, right } = container.getBoundingClientRect();
        return { left, right };
      })(),
      search: box(".gralobe-search"),
      trend: box(".gralobe-trend"),
      watchlist: box(".gralobe-watchlist"),
      legend: box(".gralobe-legend"),
      toolbar: box(".gralobe-toolbar"),
    };
  });
  for (const key of ["search", "trend", "watchlist"]) {
    assert(
      bounds[key].left >= bounds.container.left - 1 &&
        bounds[key].right <= bounds.container.right + 1,
      `${key} fits the ${report.device} globe`,
    );
  }
  assert(bounds.trend.top >= bounds.search.bottom - 1, "Trend clears the country search");
  await expect
    .poll(async () =>
      globe.evaluate((container) => {
        const strip = container.querySelector(".gralobe-watchlist").getBoundingClientRect();
        return (
          Math.min(
            ...[".gralobe-legend", ".gralobe-toolbar"].map(
              (selector) => container.querySelector(selector).getBoundingClientRect().top,
            ),
          ) - strip.bottom
        );
      }),
    )
    .toBeGreaterThanOrEqual(7);
  await capture(page, `${report.device}-country-trend-and-watchlist`);

  const downloadPromise = page.waitForEvent("download");
  await trend.getByRole("button", { name: "Download shareable card", exact: true }).click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "gralobe-germany.png");
  const stream = await download.createReadStream();
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  const png = Buffer.concat(chunks);
  assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert(png.length > 15000, "Shareable PNG contains rendered content");
  await writeFile(path.join(evidenceDir, `${report.device}-gralobe-germany.png`), png);

  const helpButton = globe.getByTitle("Help / Manual", { exact: true });
  await helpButton.click();
  const help = globe.getByRole("dialog");
  await expect(help).toBeVisible();
  await expect(help).toContainText(/search/i);
  await expect(globe.getByRole("button", { name: "Close help", exact: true })).toBeFocused();
  await capture(page, `${report.device}-help`);
  await page.keyboard.press("Escape");
  await expect(help).toBeHidden();
  await expect(helpButton).toBeFocused();
  await watchlist.getByRole("button", { name: "Unpin Germany", exact: true }).click();
  await expect(watchlist.getByRole("button", { name: "Show Germany", exact: true })).toHaveCount(0);
  await expect(
    trend.getByRole("button", { name: "Pin to watchlist", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  report.features = {
    country: "Germany",
    gdpPerCapita: "$58.8k",
    searchAndCanvasHit: true,
    pinAndUnpin: true,
    sharePng: { width: 1200, height: 630, bytes: png.length },
    helpKeyboardAndFocus: true,
    responsiveBounds: bounds,
  };
}

try {
  for (const [device, viewport] of [
    ["desktop", { width: 1440, height: 1050 }],
    ["mobile", { width: 390, height: 844 }],
  ]) {
    const context = await browser.newContext({ viewport, locale: "en-US", acceptDownloads: true });
    const page = await context.newPage();
    page.setDefaultTimeout(20000);
    const report = {
      device,
      target: target.href,
      viewport,
      requests: [],
      pageErrors: [],
      consoleErrors: [],
      requestFailures: [],
      httpErrors: [],
    };
    const pendingRequests = new Set();
    reports.push(report);
    page.on("pageerror", (error) => report.pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") report.consoleErrors.push(message.text());
    });
    page.on("request", (request) => {
      if (/^https?:/.test(request.url())) {
        pendingRequests.add(request);
        report.requests.push({ url: request.url(), type: request.resourceType() });
      }
    });
    page.on("requestfinished", (request) => pendingRequests.delete(request));
    page.on("requestfailed", (request) => {
      pendingRequests.delete(request);
      report.requestFailures.push({ url: request.url(), error: request.failure()?.errorText });
    });
    page.on("response", (response) => {
      if (response.status() >= 400)
        report.httpErrors.push({ url: response.url(), status: response.status() });
    });
    console.log(`[${device}] Opening anonymous public deployment ${target.href}`);
    const response = await page.goto(target.href, {
      waitUntil: "domcontentloaded",
      timeout: 45000,
    });
    assert.equal(response.status(), 200, "Anonymous deployment responds successfully");
    assert.equal(new URL(page.url()).origin, target.origin, "No authentication redirect");
    await expect(page.locator(".logo")).toHaveText("gralobe");
    await checkHistoricalData(page, report);
    console.log(`[${device}] Historical charts and globe controls passed`);
    await checkFeatureDemo(page, report);
    console.log(`[${device}] Search, country click, pinning, PNG and help passed`);
    await expect.poll(() => pendingRequests.size, { timeout: 45000 }).toBe(0);
    const offOrigin = report.requests.filter(
      (request) => new URL(request.url).origin !== target.origin,
    );
    assert.deepEqual(
      offOrigin,
      [],
      "Every actual fetched asset is delivered from the deployment origin",
    );
    assert(
      report.requests.some(
        ({ url, type }) => type === "script" && new URL(url).pathname.startsWith("/assets/"),
      ),
      "Runs the compiled application bundle",
    );
    assert(
      !report.requests.some(({ url }) => /\/(src|tests\/fixtures)\//.test(new URL(url).pathname)),
      "No development source or test fixtures were requested",
    );
    assert(
      report.requests.some(({ url }) => /countries-110m\.json/.test(url)),
      "Loaded real country topology",
    );
    assert(
      report.requests.some(({ type }) => type === "image"),
      "Loaded real globe texture assets",
    );
    assert.deepEqual(report.pageErrors, [], "No uncaught browser errors");
    assert.deepEqual(report.consoleErrors, [], "No browser console errors");
    assert.deepEqual(report.requestFailures, [], "No failed asset requests");
    assert.deepEqual(report.httpErrors, [], "No HTTP asset errors");
    report.assetOrigins = [...new Set(report.requests.map(({ url }) => new URL(url).origin))];
    report.success = true;
    await context.close();
    await writeFile(
      path.join(evidenceDir, "verification.json"),
      JSON.stringify(
        {
          target: target.href,
          verifiedAt: new Date().toISOString(),
          success: reports.every((item) => item.success),
          reports,
        },
        null,
        2,
      ),
    );
  }
  console.log(`PASS: desktop and mobile public deployment verification. Evidence: ${evidenceDir}`);
} catch (error) {
  const page = browser.contexts().at(-1)?.pages().at(-1);
  if (page) {
    await capture(page, "failure").catch(() => {});
    await writeFile(path.join(evidenceDir, "failure-dom.html"), await page.content()).catch(
      () => {},
    );
  }
  await writeFile(
    path.join(evidenceDir, "verification.json"),
    JSON.stringify(
      {
        target: target.href,
        verifiedAt: new Date().toISOString(),
        success: false,
        error: error.stack ?? String(error),
        reports,
      },
      null,
      2,
    ),
  );
  throw error;
} finally {
  await browser.close();
}
