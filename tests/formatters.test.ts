import { expect, test } from "@playwright/test";

test.describe("Formatter Integration", () => {
  test("legend formats values correctly", async ({ page }) => {
    await page.goto("/");

    // Wait for hero globe and its legend
    await page.waitForSelector("#globe-stat-life canvas", { timeout: 15000 });
    await page.waitForTimeout(3000);

    const heroLegend = page.locator("#globe-stat-life .gralobe-legend.visible");
    await expect(heroLegend).toBeAttached();

    const legendMin = heroLegend.locator(".gralobe-legend-min");
    const legendMax = heroLegend.locator(".gralobe-legend-max");

    const minText = await legendMin.textContent();
    const maxText = await legendMax.textContent();

    // Values should be properly formatted (not empty)
    expect(minText?.length).toBeGreaterThan(0);
    expect(maxText?.length).toBeGreaterThan(0);
  });
});
