import { expect, test } from "@playwright/test";

test.describe("Country Labels", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    // Wait for globe to initialize
    await page.waitForSelector("canvas", { timeout: 10000 });
  });

  test("canvas is rendered", async ({ page }) => {
    const canvas = page.locator("canvas");
    await expect(canvas.first()).toBeVisible();
  });

  test("WebGL context is available", async ({ page }) => {
    const hasWebGL = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return false;
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      return gl !== null;
    });
    expect(hasWebGL).toBe(true);
  });

  test("globe application initializes without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForSelector("canvas", { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Filter out non-critical errors
    const criticalErrors = errors.filter(
      (e) => !e.includes("Failed to fetch") && !e.includes("404"),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});

test.describe("Labels Visibility", () => {
  test("labels exist when configured", async ({ page }) => {
    await page.goto("/");
    const globe = page.locator("#globe-stat-life");
    await expect(globe.locator(".globe-loader")).toHaveClass(/hidden/);
    expect(await globe.locator(".country-label").count()).toBeGreaterThan(0);
  });
});
