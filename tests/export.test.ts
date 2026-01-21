import { expect, test } from "@playwright/test";

test.describe("PNG Export with Legend and Labels", () => {
  test.beforeEach(async () => {
    test.setTimeout(60000);
  });

  test("legend is visible and has content", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Legend should be visible with 'visible' class
    const legend = page.locator("#globe-stat-life .gralobe-legend.visible");
    await expect(legend).toBeVisible({ timeout: 10000 });

    // Legend title should have text
    const title = page.locator('#globe-stat-life [data-testid="legend-title"]');
    await expect(title).toBeVisible();
    await expect(title).not.toBeEmpty();

    // Min/max labels should exist
    await expect(
      page.locator('#globe-stat-life [data-testid="legend-min"]'),
    ).toBeVisible();
    await expect(
      page.locator('#globe-stat-life [data-testid="legend-max"]'),
    ).toBeVisible();
  });

  test("legend gradient has colors", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(2000);

    const gradient = page.locator("#globe-stat-life .gralobe-legend-gradient");
    await expect(gradient).toBeVisible({ timeout: 10000 });

    const bg = await gradient.evaluate((el) => el.style.background);
    expect(bg).toContain("linear-gradient");
  });

  test("country labels are rendered", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(2000);

    const labels = page.locator("#globe-stat-life .country-label");
    const count = await labels.count();
    expect(count).toBeGreaterThan(0);
  });

  test("exporter is initialized with legend and labels", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Verify legend element has data-testid for exporter to find
    const legend = page.locator(
      '#globe-stat-life [data-testid="globe-legend"]',
    );
    await expect(legend).toBeVisible({ timeout: 10000 });

    // Verify legend has all required child elements for export
    await expect(
      page.locator('#globe-stat-life [data-testid="legend-title"]'),
    ).toBeVisible();
    await expect(
      page.locator('#globe-stat-life [data-testid="legend-min"]'),
    ).toBeVisible();
    await expect(
      page.locator('#globe-stat-life [data-testid="legend-max"]'),
    ).toBeVisible();

    // Verify gradient element exists with style
    const gradient = page.locator("#globe-stat-life .gralobe-legend-gradient");
    await expect(gradient).toBeVisible();
    const bgStyle = await gradient.evaluate((el) => el.style.background);
    expect(bgStyle).toContain("linear-gradient");
  });

  test("view toggle works without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (err) => errors.push(err.message));

    await page.goto("/");
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(2000);

    // Toggle view multiple times
    await page.keyboard.press("g");
    await page.waitForTimeout(2000);
    await page.keyboard.press("g");
    await page.waitForTimeout(2000);

    // No critical errors
    const criticalErrors = errors.filter(
      (e) =>
        !e.includes("fetch") && !e.includes("404") && !e.includes("Network"),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
