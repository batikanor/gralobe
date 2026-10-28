import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/tests/fixtures/components.html");
});

test("negative bars keep a visible zero baseline and labels inside the chart", async ({ page }) => {
  await page.evaluate(async () => {
    const { ChartPanel } = await import("/src/components/ChartPanel.ts");
    const panel = new ChartPanel(document.getElementById("host")!);
    panel.render({
      metricName: "Change",
      year: "2023",
      years: ["2023"],
      format: String,
      series: [-100, -50].map((value, i) => ({
        id: String(i),
        name: `Country ${i}`,
        color: "#3987e5",
        values: [value],
        valueAtYear: value,
      })),
    });
    panel.show();
  });
  await page.getByRole("button", { name: "Bar", exact: true }).click();
  const geometry = await page
    .getByTestId("chart-plot")
    .locator("svg")
    .evaluate((svg: SVGSVGElement) => ({
      height: svg.viewBox.baseVal.height,
      bars: Array.from(svg.querySelectorAll("path")).map((path) => {
        const { y, height } = path.getBBox();
        return { y, height };
      }),
      text: Array.from(svg.querySelectorAll("text")).map(
        (text) => text.getBBox().y + text.getBBox().height,
      ),
    }));
  expect(geometry.bars).toHaveLength(2);
  for (const bar of geometry.bars) {
    expect(bar.y).toBeGreaterThanOrEqual(0);
    expect(bar.y + bar.height).toBeLessThanOrEqual(geometry.height);
  }
  expect(Math.max(...geometry.text)).toBeLessThanOrEqual(geometry.height);
  await expect(page.getByTestId("chart-title")).toContainText("2023");
  await page.getByRole("button", { name: "Back to globe view" }).click();
  await expect(page.getByTestId("chart-panel")).toHaveAttribute("aria-hidden", "true");
  expect(await page.getByTestId("chart-panel").evaluate((element) => element.inert)).toBe(true);
});

test("line charts and hover use the actual distance between years", async ({ page }) => {
  await page.evaluate(async () => {
    const { ChartPanel } = await import("/src/components/ChartPanel.ts");
    const panel = new ChartPanel(document.getElementById("host")!);
    panel.render({
      metricName: "Trend",
      year: "2023",
      years: ["1990", "2020", "2023"],
      format: String,
      series: [
        { id: "250", name: "France", color: "#3987e5", values: [10, 20, 30], valueAtYear: 30 },
      ],
    });
    panel.show();
  });
  const points = (await page.locator("polyline").getAttribute("points"))!
    .split(" ")
    .map((point) => point.split(",").map(Number));
  expect((points[1][0] - points[0][0]) / (points[2][0] - points[0][0])).toBeCloseTo(30 / 33, 3);
  const plot = await page.getByTestId("chart-plot").boundingBox();
  await page.mouse.move(plot!.x + points[1][0], plot!.y + 50);
  await expect(page.locator(".gralobe-chart-tip")).toContainText("2020");
  await expect(page.locator(".gralobe-chart-tip")).toContainText("20");
});

test("missing and non-finite chart values stay gaps and all-missing data has an explanation", async ({
  page,
}) => {
  await page.evaluate(async () => {
    const { ChartPanel } = await import("/src/components/ChartPanel.ts");
    const panel = new ChartPanel(document.getElementById("host")!);
    (window as any).testPanel = panel;
    panel.render({
      metricName: "Trend",
      year: "2023",
      years: ["1990", "2000", "2010", "2023"],
      format: String,
      series: [
        {
          id: "250",
          name: "France",
          color: "#3987e5",
          values: [10, null, Infinity, 30],
          valueAtYear: 30,
        },
      ],
    });
    panel.show();
  });
  await expect(page.locator("polyline")).toHaveCount(0);
  const svg = await page.getByTestId("chart-plot").locator("svg").innerHTML();
  expect(svg).not.toMatch(/NaN|Infinity/);
  await page.evaluate(() =>
    (window as any).testPanel.render({
      metricName: "Trend",
      year: "2023",
      years: ["2020", "2023"],
      format: String,
      series: [
        { id: "250", name: "France", color: "#3987e5", values: [null, null], valueAtYear: null },
      ],
    }),
  );
  await expect(page.getByTestId("chart-plot")).toContainText("No data for the selected countries");
});

test("country picker enforces eight series and allows replacing a selected country", async ({
  page,
}) => {
  await page.evaluate(async () => {
    const { ChartPanel } = await import("/src/components/ChartPanel.ts");
    const panel = new ChartPanel(document.getElementById("host")!, {
      onSelectionChange: (ids: string[]) => {
        (window as any).selectedIds = [...ids];
      },
    });
    panel.setCountries(
      Array.from({ length: 9 }, (_, i) => ({ id: String(i), name: `Country ${i}` })),
      ["0", "1", "2", "3", "4", "5", "6", "7"],
      () => "#3987e5",
    );
    panel.show();
  });
  await page.getByTestId("chart-picker").click();
  await expect(page.getByLabel("Country 8", { exact: true })).toBeDisabled();
  await page.getByLabel("Country 0", { exact: true }).uncheck();
  await expect(page.getByLabel("Country 8", { exact: true })).toBeEnabled();
  await page.getByLabel("Country 8", { exact: true }).check();
  expect(await page.evaluate(() => (window as any).selectedIds)).toEqual([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
  ]);
});

test("country profile preserves missing-year gaps and escapes data text", async ({ page }) => {
  await page.evaluate(async () => {
    const { CountryProfile } = await import("/src/components/CountryProfile.ts");
    const panel = new CountryProfile(document.getElementById("host")!);
    panel.show("<France>", "2023", [
      {
        id: "test",
        name: "<Metric>",
        formatted: "<value>",
        rank: 1,
        total: 2,
        series: [10, 20, null, 30, 40],
        trend: "up",
        isActive: true,
      },
    ]);
  });
  await expect(page.getByTestId("cp-name")).toHaveText("<France>");
  await expect(page.locator(".gralobe-cp-metric")).toHaveText("<Metric>");
  await expect(page.locator(".gralobe-cp-value")).toHaveText("<value>");
  await expect(page.locator(".gralobe-cp-spark polyline")).toHaveCount(2);
  await page.getByRole("button", { name: "Close country profile" }).click();
  await expect(page.getByTestId("country-profile")).not.toHaveClass(/visible/);
  await expect(page.getByTestId("country-profile")).toHaveAttribute("aria-hidden", "true");
  expect(await page.getByTestId("country-profile").evaluate((element) => element.inert)).toBe(true);
});
