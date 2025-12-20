import { test, expect } from '@playwright/test';

test.describe('Formatter Integration', () => {
  test('legend formats percentage values correctly', async ({ page }) => {
    await page.goto('/test-custom-stat.html');
    await page.waitForSelector('#legend.visible', { timeout: 15000 });

    const legendMin = page.locator('.legend-min');
    const legendMax = page.locator('.legend-max');

    const minText = await legendMin.textContent();
    const maxText = await legendMax.textContent();

    // Unit is "%" so values should be formatted with %
    expect(minText).toMatch(/\d+\.?\d*%/);
    expect(maxText).toMatch(/\d+\.?\d*%/);
  });
});
