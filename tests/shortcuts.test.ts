import { expect, test } from "@playwright/test";

test.describe("Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#globe-stat-life .globe-loader")).toHaveClass(/hidden/);
  });

  test("G key toggles projection", async ({ page }) => {
    const globe = page.locator("#globe-stat-life");
    const projectionBtn = globe.locator('.gralobe-toolbar-btn[data-shortcut="G"]');
    await expect(projectionBtn).toHaveAttribute("title", "View as Flat Map (G)");
    await globe.locator("canvas").first().focus();
    await page.keyboard.press("g");
    await expect(projectionBtn).toHaveAttribute("title", "View as Globe (G)");
    // A second key reverses the requested projection while it is animating.
    await page.keyboard.press("g");
    await expect(projectionBtn).toHaveAttribute("title", "View as Flat Map (G)");
  });

  test("Visual indicators appear when enabled", async ({ page }) => {
    // Check if data-shortcut attributes exist
    const globe = page.locator("#globe-stat-life");
    const projBtn = globe.locator('.gralobe-toolbar-btn[data-shortcut="G"]');
    const fsBtn = globe.locator('.gralobe-toolbar-btn[data-shortcut="F"]');

    await expect(projBtn).toBeVisible();
    await expect(fsBtn).toBeVisible();

    // Check if 'show-shortcut' class is applied by default
    await expect(projBtn).toHaveClass(/show-shortcut/);
    await expect(fsBtn).toHaveClass(/show-shortcut/);
  });

  test("Disabling shortcuts via GUI removes indicators and disables keys", async ({ page }) => {
    const globe = page.locator("#globe-stat-life");
    await globe.locator(".gralobe-gui-toggle").click();
    await globe
      .locator(".gralobe-category-bar")
      .getByRole("button", { name: "Settings", exact: true })
      .click();

    const shortcutToggle = globe.getByRole("checkbox", { name: "Keyboard Shortcuts" });

    // Uncheck it
    await shortcutToggle.uncheck();

    // Verify indicators are gone
    const projBtn = globe.locator('.gralobe-toolbar-btn[data-shortcut="G"]');
    await expect(projBtn).not.toHaveClass(/show-shortcut/);
    await expect(projBtn).toHaveAttribute("title", "View as Flat Map");
    await globe.locator(".gralobe-gui-toggle").click();
    await globe.locator("canvas").first().focus();
    await page.keyboard.press("g");
    await page.waitForTimeout(1200);
    await expect(projBtn).toHaveAttribute("title", "View as Flat Map");
  });
});
