/**
 * ChartPanel Component
 *
 * An overlay view of the same data the globe shows, for comparing specific
 * countries directly:
 *  - a searchable country dropdown whose entries are checkboxes (multi-select)
 *  - a line chart: one line per country across every year of the metric
 *  - a bar chart: one bar per country at the selected year, labelled with value
 *
 * Colours come from a CVD-validated 8-slot categorical palette and are assigned
 * per *country* by GlobeViz (not per row), so unchecking one country never
 * repaints the others. Purely presentational -- GlobeViz owns the data and
 * hands over ready-to-draw series.
 */

/** Dark-mode categorical slots, validated against this panel's #0a1420 surface. */
export const CHART_SERIES_COLORS = [
  "#3987e5", // blue
  "#d95926", // orange
  "#199e70", // aqua
  "#c98500", // yellow
  "#d55181", // magenta
  "#008300", // green
  "#9085e9", // violet
  "#e66767", // red
] as const;

export const MAX_CHART_SERIES = CHART_SERIES_COLORS.length;

let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-chart-panel", "true");
  style.textContent = `
    .gralobe-chart-panel {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      background: #0a1420;
      font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
      color: #e8eef4;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      z-index: 60;
    }
    .gralobe-chart-panel.visible { opacity: 1; pointer-events: auto; }

    .gralobe-chart-head {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 12px;
      border-bottom: 1px solid rgba(255,255,255,0.09);
    }
    .gralobe-chart-title {
      flex: 1 1 auto;
      font-size: 13px;
      font-weight: 600;
      color: #eaf2fa;
      overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    }
    .gralobe-chart-title span { color: #8c9bab; font-weight: 400; }

    .gralobe-chart-types { display: flex; gap: 2px; flex: 0 0 auto; }
    .gralobe-chart-type {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      color: #b9c6d2;
      font: inherit; font-size: 11px;
      padding: 3px 10px; cursor: pointer;
    }
    .gralobe-chart-type:first-child { border-radius: 5px 0 0 5px; }
    .gralobe-chart-type:last-child { border-radius: 0 5px 5px 0; }
    .gralobe-chart-type:hover { background: rgba(255,255,255,0.1); color: #fff; }
    .gralobe-chart-type.active {
      background: rgba(57,135,229,0.22); border-color: #3987e5; color: #cfe4ff;
    }

    .gralobe-chart-close {
      flex: 0 0 auto;
      display: inline-flex; align-items: center; gap: 5px;
      padding: 4px 9px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 5px;
      color: #cfe0f0; font: inherit; font-size: 11px;
      cursor: pointer;
    }
    .gralobe-chart-close:hover {
      color: #fff; border-color: #3987e5; background: rgba(57,135,229,0.18);
    }
    .gralobe-chart-close svg { width: 13px; height: 13px; }

    /* --- country picker ------------------------------------------------- */
    .gralobe-chart-controls {
      flex: 0 0 auto; position: relative;
      display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
      padding: 8px 12px; border-bottom: 1px solid rgba(255,255,255,0.09);
    }
    .gralobe-chart-picker-btn {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 5px; color: #dce7f2; font: inherit; font-size: 11px;
      padding: 4px 9px; cursor: pointer; white-space: nowrap;
    }
    .gralobe-chart-picker-btn:hover { border-color: #3987e5; color: #fff; }

    .gralobe-chart-sel {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 5px; color: #dce7f2; font: inherit; font-size: 11px;
      padding: 4px 6px; cursor: pointer; outline: none; max-width: 12em;
    }
    .gralobe-chart-sel:hover, .gralobe-chart-sel:focus { border-color: #3987e5; color: #fff; }
    .gralobe-chart-sel option { background: #0d1a28; color: #dce7f2; }
    .gralobe-chart-sel.hidden { display: none; }
    .gralobe-chart-lbl {
      font-size: 10px; color: #7f8f9f; text-transform: uppercase; letter-spacing: 0.4px;
    }

    .gralobe-chart-drop {
      position: absolute; top: calc(100% - 2px); left: 12px; z-index: 5;
      width: 244px; max-height: 264px; display: none; flex-direction: column;
      background: #0d1a28; border: 1px solid rgba(255,255,255,0.16);
      border-radius: 6px; box-shadow: 0 10px 28px rgba(0,0,0,0.55);
    }
    .gralobe-chart-drop.open { display: flex; }
    .gralobe-chart-search {
      flex: 0 0 auto; margin: 7px; padding: 5px 7px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 4px; color: #eaf2fa; font: inherit; font-size: 11px; outline: none;
    }
    .gralobe-chart-search:focus { border-color: #3987e5; }
    .gralobe-chart-list { flex: 1 1 auto; overflow-y: auto; padding: 0 3px 6px; }
    .gralobe-chart-list::-webkit-scrollbar { width: 7px; }
    .gralobe-chart-list::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.18); border-radius: 4px;
    }
    .gralobe-chart-opt {
      display: flex; align-items: center; gap: 7px;
      padding: 4px 7px; border-radius: 4px; cursor: pointer; font-size: 11px;
      color: #cdd9e5;
    }
    .gralobe-chart-opt:hover { background: rgba(255,255,255,0.07); }
    .gralobe-chart-opt input { accent-color: #3987e5; cursor: pointer; margin: 0; }
    .gralobe-chart-opt.disabled { opacity: 0.4; cursor: not-allowed; }
    .gralobe-chart-opt.disabled input { cursor: not-allowed; }
    .gralobe-chart-swatch {
      width: 9px; height: 9px; border-radius: 2px; flex: 0 0 auto;
    }

    /* --- legend --------------------------------------------------------- */
    .gralobe-chart-legend { display: flex; flex-wrap: wrap; gap: 4px 12px; }
    .gralobe-chart-leg {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: 11px; color: #c3ced9;
    }
    .gralobe-chart-leg i {
      width: 9px; height: 9px; border-radius: 2px; display: inline-block;
    }

    /* --- plot ----------------------------------------------------------- */
    .gralobe-chart-plot { flex: 1 1 auto; position: relative; min-height: 0; }
    .gralobe-chart-plot svg { display: block; width: 100%; height: 100%; }
    .gralobe-chart-empty {
      position: absolute; inset: 0; display: flex;
      align-items: center; justify-content: center; text-align: center;
      color: #7d8b99; font-size: 12px; padding: 20px; line-height: 1.6;
    }

    .gralobe-chart-tip {
      position: absolute; display: none; pointer-events: none; z-index: 8;
      background: rgba(6,16,26,0.97); border: 1px solid rgba(255,255,255,0.16);
      border-radius: 6px; padding: 7px 9px; font-size: 11px; line-height: 1.5;
      box-shadow: 0 6px 18px rgba(0,0,0,0.5); white-space: nowrap;
    }
    .gralobe-chart-tip b { color: #fff; font-weight: 600; }
    .gralobe-chart-tip .r { display: flex; align-items: center; gap: 6px; color: #c3ced9; }
    .gralobe-chart-tip .r i { width: 8px; height: 8px; border-radius: 2px; }
    .gralobe-chart-tip .r u { text-decoration: none; margin-left: auto; color: #fff; font-variant-numeric: tabular-nums; }
  `;
  document.head.appendChild(style);
}

export interface ChartCountry {
  id: string;
  name: string;
}

export interface ChartSeries {
  id: string;
  name: string;
  color: string;
  /** Values aligned to `years`; null where the country has no data that year. */
  values: Array<number | null>;
  /** Value at the currently selected year (bar chart), null when missing. */
  valueAtYear: number | null;
}

export interface ChartRenderData {
  metricName: string;
  year: string;
  years: string[];
  series: ChartSeries[];
  format: (v: number) => string;
}

export type ChartType = "line" | "bar";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** "Nice" axis bounds so ticks land on readable numbers. */
function niceScale(min: number, max: number): { lo: number; hi: number; ticks: number[] } {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return { lo: 0, hi: 1, ticks: [0, 1] };
  if (min === max) {
    const pad = Math.abs(min) * 0.1 || 1;
    min -= pad;
    max += pad;
  }
  const span = max - min;
  const rawStep = span / 4;
  const mag = 10 ** Math.floor(Math.log10(rawStep));
  const norm = rawStep / mag;
  const step = (norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1) * mag;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step * 0.5; v += step) ticks.push(Number(v.toFixed(10)));
  return { lo, hi, ticks };
}

function shortNum(v: number): string {
  const a = Math.abs(v);
  if (a >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (a >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${(v / 1e3).toFixed(1)}k`;
  if (a >= 100) return v.toFixed(0);
  if (a >= 1) return v.toFixed(1);
  return v.toFixed(2);
}

const INK_MUTED = "#8c9bab";
const GRID = "rgba(255,255,255,0.07)";
const AXIS = "rgba(255,255,255,0.16)";

export class ChartPanel {
  private element: HTMLElement;
  private titleEl: HTMLElement;
  private legendEl: HTMLElement;
  private plotEl: HTMLElement;
  private tipEl: HTMLElement;
  private dropEl: HTMLElement;
  private listEl: HTMLElement;
  private searchEl: HTMLInputElement;
  private pickerBtn: HTMLButtonElement;
  private metricSel: HTMLSelectElement;
  private yearSel: HTMLSelectElement;

  private countries: ChartCountry[] = [];
  private pinnedOrder: string[] | null = null;
  private selected: string[] = [];
  private colorOf: (id: string) => string = () => CHART_SERIES_COLORS[0];
  private chartType: ChartType = "line";
  private data: ChartRenderData | null = null;
  private visible = false;
  private resizeObserver: ResizeObserver | null = null;
  private onSelectionChange?: (ids: string[]) => void;

  constructor(
    parentContainer: HTMLElement,
    callbacks: {
      onSelectionChange?: (ids: string[]) => void;
      onTypeChange?: (t: ChartType) => void;
      onMetricChange?: (id: string) => void;
      onYearChange?: (index: number) => void;
      onClose?: () => void;
    } = {},
  ) {
    injectGlobalStyles();
    this.onSelectionChange = callbacks.onSelectionChange;

    if (getComputedStyle(parentContainer).position === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-chart-panel";
    this.element.setAttribute("data-testid", "chart-panel");
    this.element.innerHTML = `
      <div class="gralobe-chart-head">
        <div class="gralobe-chart-title" data-testid="chart-title"></div>
        <div class="gralobe-chart-types">
          <button class="gralobe-chart-type active" data-type="line" type="button">Line</button>
          <button class="gralobe-chart-type" data-type="bar" type="button">Bar</button>
        </div>
        <button class="gralobe-chart-close" type="button" data-testid="chart-back"
          aria-label="Back to globe view" title="Back to globe view">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="2" y1="12" x2="22" y2="12"></line>
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
          </svg>
          Globe
        </button>
      </div>
      <div class="gralobe-chart-controls">
        <span class="gralobe-chart-lbl">Data</span>
        <select class="gralobe-chart-sel" data-testid="chart-metric" aria-label="Metric"></select>
        <select class="gralobe-chart-sel" data-testid="chart-year" aria-label="Year"></select>
        <button class="gralobe-chart-picker-btn" type="button" data-testid="chart-picker">Countries ▾</button>
        <div class="gralobe-chart-legend" data-testid="chart-legend"></div>
        <div class="gralobe-chart-drop">
          <input class="gralobe-chart-search" type="text" placeholder="Search countries…" />
          <div class="gralobe-chart-list" data-testid="chart-list"></div>
        </div>
      </div>
      <div class="gralobe-chart-plot" data-testid="chart-plot">
        <div class="gralobe-chart-tip"></div>
      </div>
    `;
    parentContainer.appendChild(this.element);

    this.titleEl = this.element.querySelector(".gralobe-chart-title") as HTMLElement;
    this.legendEl = this.element.querySelector(".gralobe-chart-legend") as HTMLElement;
    this.plotEl = this.element.querySelector(".gralobe-chart-plot") as HTMLElement;
    this.tipEl = this.element.querySelector(".gralobe-chart-tip") as HTMLElement;
    this.dropEl = this.element.querySelector(".gralobe-chart-drop") as HTMLElement;
    this.listEl = this.element.querySelector(".gralobe-chart-list") as HTMLElement;
    this.searchEl = this.element.querySelector(".gralobe-chart-search") as HTMLInputElement;
    this.pickerBtn = this.element.querySelector(".gralobe-chart-picker-btn") as HTMLButtonElement;
    this.metricSel = this.element.querySelector('[data-testid="chart-metric"]') as HTMLSelectElement;
    this.yearSel = this.element.querySelector('[data-testid="chart-year"]') as HTMLSelectElement;

    this.metricSel.onchange = () => callbacks.onMetricChange?.(this.metricSel.value);
    this.yearSel.onchange = () => callbacks.onYearChange?.(Number(this.yearSel.value));

    (this.element.querySelector(".gralobe-chart-close") as HTMLButtonElement).onclick = () => {
      this.hide();
      callbacks.onClose?.();
    };

    this.element.querySelectorAll<HTMLButtonElement>(".gralobe-chart-type").forEach((btn) => {
      btn.onclick = () => {
        this.chartType = btn.dataset.type as ChartType;
        this.element.querySelectorAll(".gralobe-chart-type").forEach((b) => {
          b.classList.toggle("active", b === btn);
        });
        callbacks.onTypeChange?.(this.chartType);
        this.draw();
      };
    });

    this.pickerBtn.onclick = (e) => {
      e.stopPropagation();
      const open = this.dropEl.classList.toggle("open");
      if (open) {
        // Float the checked countries to the top only on open, so the boxes
        // already ticked are the first ones you see -- but the list doesn't
        // jump around underneath you while you're toggling.
        this.pinSelectedFirst();
        this.searchEl.focus();
      }
    };
    this.searchEl.addEventListener("input", () => this.renderList());
    // Clicking anywhere else closes the dropdown.
    this.element.addEventListener("click", (e) => {
      if (!this.dropEl.contains(e.target as Node) && this.dropEl.classList.contains("open")) {
        this.dropEl.classList.remove("open");
        this.pinnedOrder = null; // back to plain alphabetical next time
      }
    });
    // The panel sits over the globe canvas; don't let it drive the camera.
    ["wheel", "dblclick", "mousedown"].forEach((evt) =>
      this.element.addEventListener(evt, (e) => e.stopPropagation()),
    );

    this.resizeObserver = new ResizeObserver(() => this.draw());
    this.resizeObserver.observe(this.plotEl);
  }

  /** Supply the full country list plus the colour assignment owned by GlobeViz. */
  setCountries(countries: ChartCountry[], selected: string[], colorOf: (id: string) => string): void {
    this.countries = countries;
    this.selected = selected;
    this.colorOf = colorOf;
    this.renderList();
  }

  /** Metric picker contents (the same statistics the globe's Data panel offers). */
  setMetrics(metrics: Array<{ id: string; name: string }>, activeId: string): void {
    this.metricSel.innerHTML = metrics
      .map((m) => `<option value="${esc(m.id)}">${esc(m.name)}</option>`)
      .join("");
    this.metricSel.value = activeId;
    this.metricSel.classList.toggle("hidden", metrics.length === 0);
  }

  /** Year picker contents; hidden when the active metric has no history. */
  setYears(years: string[], activeIndex: number): void {
    this.yearSel.innerHTML = years
      .map((y, i) => `<option value="${i}">${esc(y)}</option>`)
      .join("");
    this.yearSel.value = String(activeIndex);
    this.yearSel.classList.toggle("hidden", years.length === 0);
  }

  getSelected(): string[] {
    return [...this.selected];
  }

  getChartType(): ChartType {
    return this.chartType;
  }

  /**
   * Snapshot an ordering with the ticked countries first. Held until the
   * dropdown closes, so re-renders triggered by toggling a box don't reshuffle
   * the list under the pointer.
   */
  private pinSelectedFirst(): void {
    const sel = new Set(this.selected);
    this.pinnedOrder = [
      ...this.countries.filter((c) => sel.has(c.id)),
      ...this.countries.filter((c) => !sel.has(c.id)),
    ].map((c) => c.id);
    this.renderList();
  }

  /** Apply the pinned ordering, if one is active. */
  private orderedCountries(): ChartCountry[] {
    if (!this.pinnedOrder) return this.countries;
    const rank = new Map(this.pinnedOrder.map((id, i) => [id, i]));
    return [...this.countries].sort(
      (a, b) => (rank.get(a.id) ?? 1e9) - (rank.get(b.id) ?? 1e9),
    );
  }

  private renderList(): void {
    const q = this.searchEl.value.trim().toLowerCase();
    const ordered = this.orderedCountries();
    const matches = q ? ordered.filter((c) => c.name.toLowerCase().includes(q)) : ordered;
    const atCap = this.selected.length >= MAX_CHART_SERIES;

    this.listEl.innerHTML = matches
      .slice(0, 300)
      .map((c) => {
        const on = this.selected.includes(c.id);
        // Past the palette cap, unchecked entries are disabled rather than
        // cycling hues (a 9th colour would be indistinguishable under CVD).
        const dis = !on && atCap;
        const sw = on
          ? `<span class="gralobe-chart-swatch" style="background:${this.colorOf(c.id)}"></span>`
          : `<span class="gralobe-chart-swatch" style="background:transparent"></span>`;
        return (
          `<label class="gralobe-chart-opt${dis ? " disabled" : ""}">` +
          `<input type="checkbox" value="${esc(c.id)}"${on ? " checked" : ""}${dis ? " disabled" : ""} />` +
          `${sw}<span>${esc(c.name)}</span></label>`
        );
      })
      .join("");

    if (matches.length === 0) {
      this.listEl.innerHTML = `<div style="padding:8px;color:#7d8b99;font-size:11px;">No match</div>`;
    }

    this.listEl.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
      input.onchange = () => {
        const id = input.value;
        this.selected = input.checked
          ? [...this.selected, id].slice(0, MAX_CHART_SERIES)
          : this.selected.filter((s) => s !== id);
        this.onSelectionChange?.(this.selected);
        this.renderList();
      };
    });

    this.pickerBtn.textContent = `Countries (${this.selected.length}) ▾`;
  }

  render(data: ChartRenderData): void {
    this.data = data;
    this.titleEl.innerHTML =
      `${esc(data.metricName)}` +
      (this.chartType === "bar" ? ` <span>· ${esc(data.year)}</span>` : ` <span>· over time</span>`);

    // A legend is always present for >= 2 series; identity is never colour-alone.
    this.legendEl.innerHTML = data.series
      .map(
        (s) =>
          `<span class="gralobe-chart-leg"><i style="background:${s.color}"></i>${esc(s.name)}</span>`,
      )
      .join("");

    this.renderList();
    this.draw();
  }

  private draw(): void {
    if (!this.data) return;
    const w = this.plotEl.clientWidth;
    const h = this.plotEl.clientHeight;
    if (w < 40 || h < 40) return;

    const old = this.plotEl.querySelector("svg");
    if (old) old.remove();
    const oldEmpty = this.plotEl.querySelector(".gralobe-chart-empty");
    if (oldEmpty) oldEmpty.remove();

    if (this.data.series.length === 0) {
      const div = document.createElement("div");
      div.className = "gralobe-chart-empty";
      div.textContent = "Pick one or more countries to compare.";
      this.plotEl.appendChild(div);
      return;
    }

    // A metric with no history has nothing to plot over time -- say so rather
    // than rendering an empty pane.
    if (this.chartType === "line" && this.data.years.length === 0) {
      const div = document.createElement("div");
      div.className = "gralobe-chart-empty";
      div.textContent = `${this.data.metricName} has no year-by-year data — switch to Bar to compare current values.`;
      this.plotEl.appendChild(div);
      return;
    }

    const svg = this.chartType === "line" ? this.lineChart(w, h) : this.barChart(w, h);
    this.plotEl.insertAdjacentHTML("afterbegin", svg);
    this.attachHover(w, h);
  }

  private lineChart(w: number, h: number): string {
    const d = this.data!;
    // Bottom margin includes the x-axis band so labels are never clipped.
    const m = { t: 14, r: 74, b: 30, l: 56 };
    const pw = Math.max(10, w - m.l - m.r);
    const ph = Math.max(10, h - m.t - m.b);

    const all = d.series.flatMap((s) => s.values.filter((v): v is number => v !== null));
    if (all.length === 0) return `<svg viewBox="0 0 ${w} ${h}"></svg>`;
    const { lo, hi, ticks } = niceScale(Math.min(...all), Math.max(...all));

    const x = (i: number) =>
      m.l + (d.years.length === 1 ? pw / 2 : (i / (d.years.length - 1)) * pw);
    const y = (v: number) => m.t + ph - ((v - lo) / (hi - lo || 1)) * ph;

    let g = "";
    ticks.forEach((t) => {
      const yy = y(t);
      g += `<line x1="${m.l}" y1="${yy.toFixed(1)}" x2="${m.l + pw}" y2="${yy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
      g += `<text x="${m.l - 7}" y="${(yy + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${INK_MUTED}" style="font-variant-numeric:tabular-nums">${shortNum(t)}</text>`;
    });
    g += `<line x1="${m.l}" y1="${m.t + ph}" x2="${m.l + pw}" y2="${m.t + ph}" stroke="${AXIS}" stroke-width="1"/>`;

    // Thin out x labels so they never collide.
    const every = Math.max(1, Math.ceil(d.years.length / Math.max(2, Math.floor(pw / 46))));
    d.years.forEach((yr, i) => {
      if (i % every !== 0 && i !== d.years.length - 1) return;
      g += `<text x="${x(i).toFixed(1)}" y="${m.t + ph + 15}" text-anchor="middle" font-size="9.5" fill="${INK_MUTED}" style="font-variant-numeric:tabular-nums">${esc(yr)}</text>`;
    });

    let paths = "";
    let labels = "";
    const direct = d.series.length <= 4; // selective direct labels only
    d.series.forEach((s) => {
      // Break the line across gaps rather than bridging missing years.
      const runs: string[] = [];
      let cur: string[] = [];
      s.values.forEach((v, i) => {
        if (v === null) {
          if (cur.length) runs.push(cur.join(" "));
          cur = [];
        } else {
          cur.push(`${x(i).toFixed(1)},${y(v).toFixed(1)}`);
        }
      });
      if (cur.length) runs.push(cur.join(" "));

      runs.forEach((pts) => {
        if (pts.split(" ").length === 1) {
          const [cx, cy] = pts.split(",");
          paths += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${s.color}"/>`;
        } else {
          paths += `<polyline points="${pts}" fill="none" stroke="${s.color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>`;
        }
      });

      if (direct) {
        let lastI = -1;
        s.values.forEach((v, i) => {
          if (v !== null) lastI = i;
        });
        if (lastI >= 0) {
          const vy = y(s.values[lastI] as number);
          labels +=
            `<circle cx="${x(lastI).toFixed(1)}" cy="${vy.toFixed(1)}" r="3" fill="${s.color}" stroke="#0a1420" stroke-width="2"/>` +
            `<text x="${(x(lastI) + 7).toFixed(1)}" y="${(vy + 3.5).toFixed(1)}" font-size="10" fill="#c3ced9">${esc(s.name.slice(0, 12))}</text>`;
        }
      }
    });

    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(d.metricName)} over time">${g}${paths}${labels}</svg>`;
  }

  private barChart(w: number, h: number): string {
    const d = this.data!;
    const m = { t: 22, r: 14, b: 34, l: 56 };
    const pw = Math.max(10, w - m.l - m.r);
    const ph = Math.max(10, h - m.t - m.b);

    const vals = d.series
      .map((s) => s.valueAtYear)
      .filter((v): v is number => v !== null && Number.isFinite(v));
    if (vals.length === 0) {
      return `<svg viewBox="0 0 ${w} ${h}"><text x="${w / 2}" y="${h / 2}" text-anchor="middle" font-size="12" fill="${INK_MUTED}">No data for ${esc(d.year)}</text></svg>`;
    }

    // Bars are anchored to a zero baseline whenever the data is non-negative.
    const { lo, hi, ticks } = niceScale(Math.min(0, ...vals), Math.max(...vals));
    const y = (v: number) => m.t + ph - ((v - lo) / (hi - lo || 1)) * ph;

    let g = "";
    ticks.forEach((t) => {
      const yy = y(t);
      g += `<line x1="${m.l}" y1="${yy.toFixed(1)}" x2="${m.l + pw}" y2="${yy.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
      g += `<text x="${m.l - 7}" y="${(yy + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${INK_MUTED}" style="font-variant-numeric:tabular-nums">${shortNum(t)}</text>`;
    });
    g += `<line x1="${m.l}" y1="${y(Math.max(lo, 0)).toFixed(1)}" x2="${m.l + pw}" y2="${y(Math.max(lo, 0)).toFixed(1)}" stroke="${AXIS}" stroke-width="1"/>`;

    const n = d.series.length;
    const slot = pw / n;
    const GAP = 2; // 2px surface gap between adjacent bars, not a border
    const bw = Math.max(6, Math.min(54, slot - GAP * 2));
    const base = y(Math.max(lo, 0));

    let bars = "";
    d.series.forEach((s, i) => {
      const cx = m.l + slot * i + slot / 2;
      const nameShort = s.name.length > 11 ? `${s.name.slice(0, 10)}…` : s.name;

      if (s.valueAtYear === null || !Number.isFinite(s.valueAtYear)) {
        bars += `<text x="${cx.toFixed(1)}" y="${(base - 6).toFixed(1)}" text-anchor="middle" font-size="9.5" fill="#6f7d8b">no data</text>`;
      } else {
        const vy = y(s.valueAtYear);
        const top = Math.min(vy, base);
        const bh = Math.max(1, Math.abs(base - vy));
        // 4px rounded data-end; the baseline end stays square.
        const r = Math.min(4, bw / 2, bh);
        bars +=
          `<path d="M${(cx - bw / 2).toFixed(1)},${(top + bh).toFixed(1)} L${(cx - bw / 2).toFixed(1)},${(top + r).toFixed(1)} Q${(cx - bw / 2).toFixed(1)},${top.toFixed(1)} ${(cx - bw / 2 + r).toFixed(1)},${top.toFixed(1)} L${(cx + bw / 2 - r).toFixed(1)},${top.toFixed(1)} Q${(cx + bw / 2).toFixed(1)},${top.toFixed(1)} ${(cx + bw / 2).toFixed(1)},${(top + r).toFixed(1)} L${(cx + bw / 2).toFixed(1)},${(top + bh).toFixed(1)} Z" fill="${s.color}"/>` +
          // Value label sits outside the bar end, so it can never be clipped by a short bar.
          `<text x="${cx.toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" font-size="10" fill="#e8eef4" style="font-variant-numeric:tabular-nums">${esc(d.format(s.valueAtYear))}</text>`;
      }

      bars += `<text x="${cx.toFixed(1)}" y="${(m.t + ph + 15).toFixed(1)}" text-anchor="middle" font-size="9.5" fill="${INK_MUTED}">${esc(nameShort)}</text>`;
    });

    return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(d.metricName)} by country, ${esc(d.year)}">${g}${bars}</svg>`;
  }

  /**
   * Hover layer. Line charts get a crosshair listing every series at the
   * nearest year; bar charts get a per-bar tooltip. Hit areas span the whole
   * column/slot rather than the mark itself, so nothing needs pixel-hunting.
   */
  private attachHover(w: number, h: number): void {
    const d = this.data;
    const svg = this.plotEl.querySelector("svg");
    if (!d || !svg || d.series.length === 0) return;

    const isLine = this.chartType === "line";
    const m = isLine ? { t: 14, r: 74, b: 30, l: 56 } : { t: 22, r: 14, b: 34, l: 56 };
    const pw = Math.max(10, w - m.l - m.r);
    const ph = Math.max(10, h - m.t - m.b);

    const hide = () => {
      this.tipEl.style.display = "none";
      svg.querySelector(".hoverline")?.remove();
    };

    svg.addEventListener("mouseleave", hide);
    svg.addEventListener("mousemove", (ev) => {
      const rect = svg.getBoundingClientRect();
      const px = ((ev.clientX - rect.left) / rect.width) * w;
      const py = ((ev.clientY - rect.top) / rect.height) * h;
      if (px < m.l || px > m.l + pw || py < m.t || py > m.t + ph + 12) return hide();

      let html = "";
      let markX = 0;

      if (isLine) {
        const t = d.years.length === 1 ? 0 : (px - m.l) / pw;
        const i = Math.max(0, Math.min(d.years.length - 1, Math.round(t * (d.years.length - 1))));
        markX = m.l + (d.years.length === 1 ? pw / 2 : (i / (d.years.length - 1)) * pw);

        svg.querySelector(".hoverline")?.remove();
        svg.insertAdjacentHTML(
          "beforeend",
          `<line class="hoverline" x1="${markX.toFixed(1)}" y1="${m.t}" x2="${markX.toFixed(1)}" y2="${m.t + ph}" stroke="rgba(255,255,255,0.28)" stroke-width="1"/>`,
        );

        html = `<b>${esc(d.years[i])}</b>`;
        d.series.forEach((s) => {
          const v = s.values[i];
          html += `<div class="r"><i style="background:${s.color}"></i>${esc(s.name)}<u>${v === null ? "—" : esc(d.format(v))}</u></div>`;
        });
      } else {
        const slot = pw / d.series.length;
        const i = Math.max(0, Math.min(d.series.length - 1, Math.floor((px - m.l) / slot)));
        const s = d.series[i];
        markX = m.l + slot * i + slot / 2;
        html =
          `<b>${esc(s.name)}</b>` +
          `<div class="r"><i style="background:${s.color}"></i>${esc(d.year)}<u>${s.valueAtYear === null ? "—" : esc(d.format(s.valueAtYear))}</u></div>`;
      }

      this.tipEl.innerHTML = html;
      this.tipEl.style.display = "block";
      const tw = this.tipEl.offsetWidth;
      const left = Math.max(4, Math.min(w - tw - 4, (markX / w) * this.plotEl.clientWidth + 12));
      this.tipEl.style.left = `${left}px`;
      this.tipEl.style.top = `${Math.min(h - this.tipEl.offsetHeight - 4, py + 10)}px`;
    });
  }

  show(): void {
    this.element.classList.add("visible");
    this.visible = true;
    this.draw();
  }

  hide(): void {
    this.element.classList.remove("visible");
    this.dropEl.classList.remove("open");
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  dispose(): void {
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.element.remove();
  }
}
