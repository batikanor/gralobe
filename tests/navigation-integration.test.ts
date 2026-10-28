import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("https://raw.githubusercontent.com/**/earth_atmos_2048.jpg", (route) => route.fulfill({
    contentType: "image/png",
    headers: { "access-control-allow-origin": "*" },
    body: Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a0ioAAAAASUVORK5CYII=", "base64"),
  }));
  await page.goto("/tests/fixtures/combined.html");
  await page.evaluate(() => (window as any).integrationReady);
  await page.evaluate(async () => {
    // Reuse the exact GSAP module loaded by the app. Waiting for its active
    // navigation tweens catches stale completion callbacks without sleeps.
    const moduleUrl = performance.getEntriesByType("resource")
      .map((entry) => entry.name).find((name) => /\/gsap\.js(?:\?|$)/.test(name));
    if (!moduleUrl) throw new Error("The globe's GSAP module was not loaded");
    const { gsap } = await import(moduleUrl);
    (window as any).navigationGsap = gsap;
  });
});

test("a flat projection request cancels an earlier search's delayed camera focus", async ({ page }) => {
  const idle = () => page.evaluate(() => {
    const { globe, navigationGsap } = window as any;
    return navigationGsap.getTweensOf([
      globe, globe.camera.position, globe.camera.up, globe.controls.target,
      globe.globe.rotation, globe.globe.quaternion,
    ]).length === 0;
  });
  await page.evaluate(() => (window as any).globe.toFlat());
  await expect.poll(idle).toBe(true);
  const baseline = await page.evaluate(() => {
    const { globe } = window as any;
    return { camera: globe.camera.position.toArray(), target: globe.controls.target.toArray() };
  });
  await page.getByRole("combobox", { name: "Search country" }).fill("Norway");
  await page.getByRole("combobox", { name: "Search country" }).press("Enter");
  await page.evaluate(() => (window as any).globe.toFlat());
  await expect.poll(idle, { timeout: 8000 }).toBe(true);
  const final = await page.evaluate(() => {
    const { globe } = window as any;
    return {
      morph: globe.getMorph(), camera: globe.camera.position.toArray(),
      target: globe.controls.target.toArray(), enabled: globe.controls.enabled,
      rotate: globe.controls.enableRotate,
    };
  });
  expect(final.morph).toBe(0);
  expect(final.enabled).toBe(true);
  expect(final.rotate).toBe(false);
  for (let index = 0; index < 3; index++) {
    expect(final.camera[index]).toBeCloseTo(baseline.camera[index], 4);
    expect(final.target[index]).toBeCloseTo(baseline.target[index], 4);
  }
});

test("interrupting a flat transition restores globe controls and real drag navigation", async ({ page }) => {
  await page.evaluate(() => {
    const { globe } = window as any;
    globe.toFlat();
    globe.toGlobe();
  });
  expect(await page.evaluate(() => (window as any).globe.controls.enabled)).toBe(true);
  await expect.poll(() => page.evaluate(() => {
    const { globe, navigationGsap } = window as any;
    return navigationGsap.getTweensOf([globe, globe.camera.position, globe.controls.target]).length;
  })).toBe(0);
  expect(await page.evaluate(() => (window as any).globe.getMorph())).toBe(1);
  const canvas = (await page.locator("#globe > canvas").boundingBox())!;
  await page.mouse.move(canvas.x + canvas.width / 2, canvas.y + canvas.height / 2);
  await page.mouse.down();
  await page.mouse.move(canvas.x + canvas.width / 2 + 80, canvas.y + canvas.height / 2, { steps: 5 });
  await page.mouse.up();
  await expect.poll(() => page.evaluate(() => Math.abs((window as any).globe.camera.position.x))).toBeGreaterThan(1);
});

test("repeated immediate play and pause settles each selected frame and clears missing values", async ({ page }) => {
  await page.locator("#globe > canvas").click({ position: { x: 360, y: 250 } });
  await page.getByRole("button", { name: "Pin to watchlist", exact: true }).click();
  const snapshots = await page.evaluate(() => {
    const { globe } = window as any;
    const snapshots = [];
    for (let index = 0; index < 8; index++) {
      globe.playTimeline({ fps: 60, transitionMs: 850, interpolate: true, loop: true });
      globe.pauseTimeline();
      snapshots.push({ state: globe.getTimelineState(), data: globe.getCurrentData() });
    }
    return snapshots;
  });
  const frames = [{ France: 10, Norway: 20 }, { France: 15, Norway: 25 }, { Norway: 30 }];
  snapshots.forEach((snapshot: any, index: number) => {
    const frame = (index + 1) % 3;
    expect(snapshot.state.currentIndex).toBe(frame);
    expect(snapshot.state.playing).toBe(false);
    expect(snapshot.data).toEqual(frames[frame]);
  });
  await expect(page.locator(".gralobe-trend-value")).toHaveText("No data");
  await expect(page.locator(".gralobe-watchlist-value")).toHaveText("—");
});
