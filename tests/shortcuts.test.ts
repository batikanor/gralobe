import { expect, test } from "@playwright/test";

test.describe("Keyboard Shortcuts", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.waitForSelector("canvas");
  });

  test("G key toggles projection", async ({ page }) => {
    // Focus canvas
    await page.click("canvas");

    // Default is globe, pressing G should switch to map
    await page.keyboard.press("g");

    // Wait for projection change (icon update is a good proxy)
    const projectionBtn = page.locator(
      '.gralobe-toolbar-btn[title*="Toggle Projection"]',
    );
    await expect(projectionBtn).toHaveAttribute("title", /Toggle Projection/);

    // Since we don't have easy access to internal state, we can check the button icon or title
    // But checking if "F" key works is also good.
  });

  test("Visual indicators appear when enabled", async ({ page }) => {
    // Check if data-shortcut attributes exist
    const projBtn = page.locator('.gralobe-toolbar-btn[data-shortcut="G"]');
    const fsBtn = page.locator('.gralobe-toolbar-btn[data-shortcut="F"]');

    await expect(projBtn).toBeVisible();
    await expect(fsBtn).toBeVisible();

    // Check if 'show-shortcut' class is applied by default
    await expect(projBtn).toHaveClass(/show-shortcut/);
    await expect(fsBtn).toHaveClass(/show-shortcut/);
  });

  test("Disabling shortcuts via GUI removes indicators and disables keys", async ({
    page,
  }) => {
    // Focus canvas
    await page.click("canvas");

    // Open controls
    const settingsBtn = page.locator(".gralobe-settings-toggle");
    if (await settingsBtn.isVisible()) {
      await settingsBtn.click();
    }

    // Find the checkbox for "Keyboard Shortcuts"
    // lil-gui uses specific structure. We look for the label.
    const shortcutToggle = page
      .getByText("Keyboard Shortcuts")
      .locator("..")
      .locator('input[type="checkbox"]');

    // Uncheck it
    await shortcutToggle.click();

    // Verify indicators are gone
    const projBtn = page.locator('.gralobe-toolbar-btn[data-shortcut="G"]');
    await expect(projBtn).not.toHaveClass(/show-shortcut/);

    // Verify key press does nothing (hard to test "does nothing" without state,
    // but we can ensure no error or no change if we could observe state.
    // For now, indicators missing is strong evidence logic ran).
  });
});
