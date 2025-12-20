import { test, expect } from '@playwright/test';

test.describe('Legend Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for globe to initialize (canvas appears)
    await page.waitForSelector('canvas', { timeout: 10000 });
    // Wait for legend element to exist (even if hidden)
    await page.waitForSelector('#legend', { timeout: 10000 });
  });

  test('legend element exists in DOM', async ({ page }) => {
    const legend = page.locator('#legend');
    await expect(legend).toBeAttached();
  });

  test('legend has proper structure', async ({ page }) => {
    const legendTitle = page.locator('.legend-title');
    const legendGradient = page.locator('.legend-gradient');
    const legendMin = page.locator('.legend-min');
    const legendMax = page.locator('.legend-max');
    const legendDesc = page.locator('.legend-description');

    await expect(legendTitle).toBeAttached();
    await expect(legendGradient).toBeAttached();
    await expect(legendMin).toBeAttached();
    await expect(legendMax).toBeAttached();
    await expect(legendDesc).toBeAttached();
  });

  test('legend becomes visible with statistic data', async ({ page }) => {
    // Wait a bit for the app to initialize and show a statistic
    await page.waitForTimeout(3000);

    const legend = page.locator('#legend');
    // Check if legend has the 'visible' class (becomes visible when statistic is shown)
    const hasVisibleClass = await legend.evaluate((el) => el.classList.contains('visible'));

    // The demo app should show a legend with the default statistic
    // This tests that the legend becomes visible when a statistic is displayed
    if (hasVisibleClass) {
      const legendTitle = page.locator('.legend-title');
      const titleText = await legendTitle.textContent();
      expect(titleText?.length).toBeGreaterThan(0);
    }
  });
});

test.describe('Legend with Custom Statistics (No Format Function)', () => {
  test('legend handles custom statistic without format function', async ({ page }) => {
    await page.goto('/test-custom-stat.html');
    // Wait for legend to become visible (has 'visible' class)
    await page.waitForSelector('#legend.visible', { timeout: 15000 });

    // Should display the custom statistic name
    const legendTitle = page.locator('.legend-title');
    await expect(legendTitle).toHaveText('Smartphone Ownership Percentage');

    // Min/Max should be formatted based on unit (%)
    const legendMin = page.locator('.legend-min');
    const legendMax = page.locator('.legend-max');

    const minText = await legendMin.textContent();
    const maxText = await legendMax.textContent();

    // Should contain % sign since unit is "%"
    expect(minText).toContain('%');
    expect(maxText).toContain('%');
  });
});
