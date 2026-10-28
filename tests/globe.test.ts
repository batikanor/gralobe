import { expect, test } from "@playwright/test";

test.describe("GlobeViz Basic Functionality", () => {
  test("page loads without critical errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");
    await page.waitForSelector("canvas", { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Filter out non-critical errors (network failures, etc.)
    const criticalErrors = errors.filter(
      (e) => !e.includes("Failed to fetch") && !e.includes("404") && !e.includes("NetworkError"),
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("canvas is rendered", async ({ page }) => {
    await page.goto("/");
    const canvas = page.locator("canvas");
    await expect(canvas.first()).toBeVisible();
  });

  test("globe renders 3D content", async ({ page }) => {
    await page.goto("/");
    await page.waitForSelector("canvas", { timeout: 10000 });

    const hasContent = await page.evaluate(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return false;
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      return gl !== null;
    });

    expect(hasContent).toBe(true);
  });

  test("pressing G key does not cause errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/");
    await page.waitForSelector("canvas", { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Press G to toggle view
    await page.keyboard.press("g");
    await page.waitForTimeout(1000);

    // Press G again
    await page.keyboard.press("g");
    await page.waitForTimeout(1000);

    const criticalErrors = errors.filter(
      (e) => !e.includes("Failed to fetch") && !e.includes("404"),
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("keeps country globes healthy after scrolling away and back", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    for (const id of ["globe-stat-life", "globe-labels-data"]) {
      const globe = page.locator(`#${id}`);
      await globe.scrollIntoViewIfNeeded();
      await expect(globe.locator(".globe-loader")).toHaveClass(/hidden/);
      await expect(globe.locator("canvas").first()).toBeVisible();
      await expect(globe.locator(".gralobe-legend.visible")).toBeVisible();
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.locator("#globe-stat-life").scrollIntoViewIfNeeded();
    await expect(page.locator("#globe-stat-life canvas").first()).toBeVisible();

    const criticalErrors = errors.filter(
      (e) => !e.includes("Failed to fetch") && !e.includes("404") && !e.includes("NetworkError"),
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
