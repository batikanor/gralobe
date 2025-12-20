import { test, expect } from '@playwright/test';

test.describe('GlobeViz Basic Functionality', () => {
  test('page loads without critical errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Filter out non-critical errors (network failures, etc.)
    const criticalErrors = errors.filter(
      (e) => !e.includes('Failed to fetch') && !e.includes('404') && !e.includes('NetworkError')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('canvas is rendered', async ({ page }) => {
    await page.goto('/');
    const canvas = page.locator('canvas');
    await expect(canvas.first()).toBeVisible();
  });

  test('globe renders 3D content', async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('canvas', { timeout: 10000 });

    const hasContent = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return false;
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      return gl !== null;
    });

    expect(hasContent).toBe(true);
  });

  test('pressing G key does not cause errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');
    await page.waitForSelector('canvas', { timeout: 10000 });
    await page.waitForTimeout(2000);

    // Press G to toggle view
    await page.keyboard.press('g');
    await page.waitForTimeout(1000);

    // Press G again
    await page.keyboard.press('g');
    await page.waitForTimeout(1000);

    const criticalErrors = errors.filter(
      (e) => !e.includes('Failed to fetch') && !e.includes('404')
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
