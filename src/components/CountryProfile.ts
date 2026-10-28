/**
 * CountryProfile Component
 *
 * Panel shown when the user double-click-zooms into a country: lists every
 * loaded metric for that country at the selected year, each with a sparkline
 * of its trend across all available years and its world rank for that year.
 *
 * Purely presentational -- GlobeViz computes the values/ranks/series (it owns
 * the time-series data) and hands them over; this component only renders.
 */

let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-country-profile", "true");
  style.textContent = `
    .gralobe-country-profile {
      position: absolute;
      top: 12px;
      left: 12px;
      width: 236px;
      max-height: calc(100% - 24px);
      display: flex;
      flex-direction: column;
      background: rgba(0, 10, 20, 0.94);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 8px;
      font-family: system-ui, -apple-system, sans-serif;
      color: #ddd;
      opacity: 0;
      transform: translateX(-10px);
      transition: opacity 0.25s ease, transform 0.25s ease;
      pointer-events: none;
      z-index: 20;
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.5);
      overflow: hidden;
    }

    .gralobe-country-profile.visible {
      opacity: 1;
      transform: translateX(0);
      pointer-events: auto;
    }

    .gralobe-cp-header {
      flex: 0 0 auto;
      padding: 9px 11px 7px;
      border-bottom: 1px solid rgba(100, 150, 200, 0.18);
      display: flex;
      align-items: baseline;
      gap: 6px;
    }

    .gralobe-cp-name {
      font-size: 13px;
      font-weight: 600;
      color: #4af;
      line-height: 1.2;
      flex: 1 1 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .gralobe-cp-year {
      flex: 0 0 auto;
      font-size: 10px;
      font-variant-numeric: tabular-nums;
      color: #8aa;
    }

    .gralobe-cp-close {
      flex: 0 0 auto;
      width: 16px;
      height: 16px;
      border: none;
      background: transparent;
      color: #778;
      font-size: 14px;
      line-height: 1;
      cursor: pointer;
      padding: 0;
      border-radius: 3px;
      transition: color 0.15s ease, background 0.15s ease;
    }
    .gralobe-cp-close:hover {
      color: #fff;
      background: rgba(255, 255, 255, 0.1);
    }

    .gralobe-cp-body {
      flex: 1 1 auto;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4px 0;
    }
    .gralobe-cp-body::-webkit-scrollbar { width: 6px; }
    .gralobe-cp-body::-webkit-scrollbar-track { background: transparent; }
    .gralobe-cp-body::-webkit-scrollbar-thumb {
      background: rgba(100, 150, 200, 0.3);
      border-radius: 3px;
    }

    .gralobe-cp-row {
      padding: 5px 11px;
      border-left: 2px solid transparent;
      transition: background 0.15s ease;
    }

    .gralobe-cp-row.active {
      border-left-color: #4af;
      background: rgba(68, 170, 255, 0.07);
    }

    .gralobe-cp-metric {
      font-size: 9px;
      text-transform: uppercase;
      letter-spacing: 0.4px;
      color: #7b8a9a;
      margin-bottom: 2px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .gralobe-cp-row.active .gralobe-cp-metric { color: #4af; }

    .gralobe-cp-line {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .gralobe-cp-value {
      flex: 1 1 auto;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: #eee;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .gralobe-cp-value.empty { color: #667; font-style: italic; font-size: 11px; }

    .gralobe-cp-spark {
      flex: 0 0 auto;
      display: block;
    }

    .gralobe-cp-rank {
      flex: 0 0 auto;
      font-size: 9px;
      font-variant-numeric: tabular-nums;
      color: #8c9bab;
      white-space: nowrap;
    }
    .gralobe-cp-rank strong { color: #cfe4f5; font-weight: 600; }

    .gralobe-cp-empty {
      padding: 14px 12px;
      font-size: 11px;
      color: #778;
      line-height: 1.5;
    }

    @media (max-width: 520px) {
      .gralobe-country-profile { width: 190px; top: 8px; left: 8px; }
      .gralobe-cp-name { font-size: 12px; }
    }
  `;
  document.head.appendChild(style);
}

/** One metric's worth of profile data, computed by GlobeViz. */
export interface ProfileMetric {
  id: string;
  name: string;
  /** Preformatted value for the selected year, or null when unavailable. */
  formatted: string | null;
  /** 1-based rank among countries with data this year (1 = highest value). */
  rank: number | null;
  /** How many countries had data this year. */
  total: number;
  /** Values across every year, oldest first; null preserves a missing year's gap. */
  series: Array<number | null>;
  /**
   * Direction of change at the selected year vs. the previous data point --
   * drives the sparkline colour (green up / red down). Null when there's no
   * earlier point to compare against.
   */
  trend: "up" | "down" | "flat" | null;
  /** True for the metric currently driving the choropleth. */
  isActive: boolean;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Inline SVG sparkline, normalized to the series' own min/max so the shape of
 * each metric's trend is visible regardless of its absolute scale.
 */
function sparklineSvg(series: Array<number | null>, trend: ProfileMetric["trend"]): string {
  const width = 46;
  const height = 14;
  const finite = series.filter((v): v is number => v !== null && Number.isFinite(v));
  if (finite.length === 0) {
    return `<svg class="gralobe-cp-spark" width="${width}" height="${height}"></svg>`;
  }

  const min = Math.min(...finite);
  const max = Math.max(...finite);
  const span = max - min;
  const point = (v: number, i: number): [number, number] => [
    series.length === 1 ? width / 2 : 1 + (i / (series.length - 1)) * (width - 2),
    height - 1 - (span === 0 ? 0.5 : (v - min) / span) * (height - 2),
  ];

  // Light green when the selected year is up on the previous point, light
  // red when it's down -- matching the hover tooltip's arrow convention.
  const stroke =
    trend === "up"
      ? "#7fe0a3"
      : trend === "down"
        ? "#ff9a9a"
        : trend === "flat"
          ? "#8c9bab"
          : "#5c7b96";
  let marks = "";
  let run: string[] = [];
  const flush = () => {
    if (run.length === 1) {
      const [x, y] = run[0].split(",");
      marks += `<circle cx="${x}" cy="${y}" r="1.2" fill="${stroke}" />`;
    } else if (run.length > 1) {
      marks += `<polyline points="${run.join(" ")}" fill="none" stroke="${stroke}" stroke-width="1.2" stroke-linejoin="round" stroke-linecap="round" />`;
    }
    run = [];
  };
  series.forEach((v, i) => {
    if (v === null || !Number.isFinite(v)) flush();
    else
      run.push(
        point(v, i)
          .map((n) => n.toFixed(1))
          .join(","),
      );
  });
  flush();

  return (
    `<svg class="gralobe-cp-spark" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" aria-hidden="true">` +
    marks +
    `</svg>`
  );
}

export class CountryProfile {
  private element: HTMLElement;
  private nameEl: HTMLElement;
  private yearEl: HTMLElement;
  private bodyEl: HTMLElement;
  private visible = false;

  constructor(parentContainer: HTMLElement, callbacks: { onClose?: () => void } = {}) {
    injectGlobalStyles();

    if (getComputedStyle(parentContainer).position === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-country-profile";
    this.element.inert = true;
    this.element.setAttribute("aria-hidden", "true");
    this.element.setAttribute("data-testid", "country-profile");
    this.element.innerHTML = `
      <div class="gralobe-cp-header">
        <div class="gralobe-cp-name" data-testid="cp-name"></div>
        <div class="gralobe-cp-year" data-testid="cp-year"></div>
        <button class="gralobe-cp-close" type="button" aria-label="Close country profile">×</button>
      </div>
      <div class="gralobe-cp-body" data-testid="cp-body"></div>
    `;
    parentContainer.appendChild(this.element);

    this.nameEl = this.element.querySelector(".gralobe-cp-name") as HTMLElement;
    this.yearEl = this.element.querySelector(".gralobe-cp-year") as HTMLElement;
    this.bodyEl = this.element.querySelector(".gralobe-cp-body") as HTMLElement;

    const closeBtn = this.element.querySelector(".gralobe-cp-close") as HTMLButtonElement;
    closeBtn.addEventListener("click", () => {
      this.hide();
      callbacks.onClose?.();
    });

    // Let the panel scroll without the globe's OrbitControls stealing the wheel.
    this.element.addEventListener("wheel", (e) => e.stopPropagation());
    // Double-clicking the panel must not toggle the globe's zoom behind it.
    this.element.addEventListener("dblclick", (e) => e.stopPropagation());
  }

  show(countryName: string, year: string, metrics: ProfileMetric[]): void {
    this.nameEl.textContent = countryName;
    this.nameEl.title = countryName;
    this.yearEl.textContent = year;

    if (metrics.length === 0) {
      this.bodyEl.innerHTML = `<div class="gralobe-cp-empty">No metric data loaded for this view.</div>`;
    } else {
      this.bodyEl.innerHTML = metrics
        .map((m) => {
          const valueHtml =
            m.formatted === null
              ? `<div class="gralobe-cp-value empty">no data</div>`
              : `<div class="gralobe-cp-value">${escapeHtml(m.formatted)}</div>`;

          const rankHtml =
            m.rank !== null
              ? `<div class="gralobe-cp-rank">#<strong>${m.rank}</strong>/${m.total}</div>`
              : `<div class="gralobe-cp-rank">—</div>`;

          return (
            `<div class="gralobe-cp-row${m.isActive ? " active" : ""}">` +
            `<div class="gralobe-cp-metric">${escapeHtml(m.name)}</div>` +
            `<div class="gralobe-cp-line">${valueHtml}${sparklineSvg(m.series, m.trend)}${rankHtml}</div>` +
            `</div>`
          );
        })
        .join("");
    }

    this.element.classList.add("visible");
    this.element.inert = false;
    this.element.setAttribute("aria-hidden", "false");
    this.visible = true;
  }

  hide(): void {
    this.element.classList.remove("visible");
    this.element.inert = true;
    this.element.setAttribute("aria-hidden", "true");
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  dispose(): void {
    this.element.remove();
  }
}
