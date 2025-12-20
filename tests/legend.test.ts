import { test, expect } from '@playwright/test';

test.describe('Legend Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for globe to initialize (canvas appears)
    await page.waitForSelector('canvas', { timeout: 15000 });
  });

  test('legend element exists in DOM', async ({ page }) => {
    // Wait a bit for initialization
    await page.waitForTimeout(2000);
    const legends = page.locator('.gralobe-legend');
    const count = await legends.count();
    expect(count).toBeGreaterThan(0);
  });

  test('legend has proper structure', async ({ page }) => {
    // Wait a bit for initialization
    await page.waitForTimeout(2000);
    
    // Check that the first legend has proper structure
    const legend = page.locator('.gralobe-legend').first();
    await expect(legend).toBeAttached();

    // Check structure elements exist
    const legendTitle = legend.locator('.gralobe-legend-title');
    const legendGradient = legend.locator('.gralobe-legend-gradient');
    const legendLabels = legend.locator('.gralobe-legend-labels');

    await expect(legendTitle).toBeAttached();
    await expect(legendGradient).toBeAttached();
    await expect(legendLabels).toBeAttached();
  });

  test('legend becomes visible with statistic data', async ({ page }) => {
    // Wait for the hero globe to initialize
    await page.waitForSelector('#hero-globe canvas', { timeout: 15000 });
    
    // Wait for legend to become visible in hero section
    const heroSection = page.locator('#hero-globe');
    const heroLegend = heroSection.locator('.gralobe-legend');
    
    // Wait for visible class
    await page.waitForTimeout(3000);
    
    const hasVisibleClass = await heroLegend.evaluate((el) => el.classList.contains('visible'));
    expect(hasVisibleClass).toBe(true);
    
    // Check title has content
    const legendTitle = heroLegend.locator('.gralobe-legend-title');
    const titleText = await legendTitle.textContent();
    expect(titleText?.length).toBeGreaterThan(0);
  });
});

test.describe('Legend Scoped to Container', () => {
  test('each globe has its own legend inside its container', async ({ page }) => {
    await page.goto('/');
    
    // Wait for multiple globes to initialize
    await page.waitForSelector('#hero-globe canvas', { timeout: 15000 });
    await page.waitForTimeout(5000);
    
    // Check that legends are inside their respective containers
    const heroLegend = page.locator('#hero-globe .gralobe-legend');
    await expect(heroLegend).toBeAttached();
    
    // Count total legends - should match number of globes with showLegend: true
    const legends = page.locator('.gralobe-legend');
    const legendCount = await legends.count();
    expect(legendCount).toBeGreaterThan(1);
  });
});
