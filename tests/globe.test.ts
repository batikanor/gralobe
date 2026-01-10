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
      (e) =>
        !e.includes("Failed to fetch") &&
        !e.includes("404") &&
        !e.includes("NetworkError")
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
      (e) => !e.includes("Failed to fetch") && !e.includes("404")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("loads all globes by scrolling without errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await page.goto("/");

    // Scroll to bottom to trigger all IntersectionObservers
    await page.evaluate(async () => {
      const distance = 100;
      const delay = 50;
      // Scroll to bottom
      while (
        document.scrollingElement!.scrollTop + window.innerHeight <
        document.scrollingElement!.scrollHeight
      ) {
        document.scrollingElement!.scrollBy(0, distance);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    });

    // Wait for a bit for globes to init
    await page.waitForTimeout(3000);

    const criticalErrors = errors.filter(
      (e) =>
        !e.includes("Failed to fetch") &&
        !e.includes("404") &&
        !e.includes("NetworkError")
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
