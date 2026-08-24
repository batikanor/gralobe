/**
 * CountryTrendPanel Component
 *
 * A panel docked to the top of the map that shows, for a clicked country,
 * the current statistic's value and whether it went up, down, or stayed flat
 * compared to a prior period &mdash; when real prior-period data is available.
 * It never fabricates a trend: if no previous value was supplied for the
 * active statistic, it says so plainly instead of guessing.
 *
 * Also offers a "Share" button that downloads a shareable image summarizing
 * the currently displayed country/statistic (see StatCard.ts).
 */

import { downloadStatCard, renderStatCard, type StatCardTrend } from "./StatCard";

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-trend", "true");
  style.textContent = `
    .gralobe-trend {
      position: absolute;
      top: 12px;
      left: 50%;
      transform: translate(-50%, -12px);
      max-width: min(340px, calc(100% - 24px));
      width: 100%;
      background: rgba(0, 10, 20, 0.92);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 8px;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      color: #ddd;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      z-index: 900;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease, transform 0.2s ease;
      padding: 12px 14px;
    }

    .gralobe-trend.visible {
      opacity: 1;
      transform: translate(-50%, 0);
      pointer-events: auto;
    }

    .gralobe-trend-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 6px;
    }

    .gralobe-trend-title {
      font-size: 13px;
      font-weight: 600;
      color: #fff;
    }

    .gralobe-trend-close {
      background: none;
      border: none;
      color: #888;
      font-size: 16px;
      line-height: 1;
      cursor: pointer;
      padding: 0 0 0 12px;
    }

    .gralobe-trend-close:hover {
      color: #fff;
    }

    .gralobe-trend-actions {
      display: flex;
      align-items: center;
    }

    .gralobe-trend-share {
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
    }

    .gralobe-trend-share:hover {
      color: #4af;
    }

    .gralobe-trend-share svg {
      width: 15px;
      height: 15px;
    }

    .gralobe-trend-pin {
      background: none;
      border: none;
      color: #888;
      cursor: pointer;
      padding: 0;
      margin-left: 6px;
      display: flex;
      align-items: center;
    }

    .gralobe-trend-pin:hover {
      color: #4af;
    }

    .gralobe-trend-pin.pinned {
      color: #f5b942;
    }

    .gralobe-trend-pin svg {
      width: 15px;
      height: 15px;
    }

    .gralobe-trend-stat {
      font-size: 11px;
      color: #9ab;
      margin-bottom: 8px;
    }

    .gralobe-trend-value {
      font-size: 20px;
      font-weight: 700;
      color: #fff;
      font-variant-numeric: tabular-nums;
    }

    .gralobe-trend-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      margin-top: 6px;
      padding: 3px 8px;
      border-radius: 10px;
      font-size: 11.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .gralobe-trend-badge.up {
      background: rgba(46, 125, 70, 0.25);
      color: #6fcf8e;
    }

    .gralobe-trend-badge.down {
      background: rgba(168, 31, 29, 0.25);
      color: #f28b8b;
    }

    .gralobe-trend-badge.flat {
      background: rgba(150, 150, 150, 0.2);
      color: #ccc;
    }

    .gralobe-trend-nodata {
      margin-top: 6px;
      font-size: 11px;
      color: #778;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}

const SHARE_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>`;
const PIN_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="17" x2="12" y2="22"></line><path d="M5 10a7 7 0 0 1 14 0c0 4-3 5-3 8H8c0-3-3-4-3-8z"></path></svg>`;

export class CountryTrendPanel {
  private element: HTMLElement;
  private latestCard: { countryName: string; statLabel: string; formattedValue: string; trend: StatCardTrend | null; colorScale: [string, string, string] } | null = null;
  private currentFeatureId: string | null = null;
  private onPin?: (featureId: string) => void;

  constructor(parentContainer: HTMLElement, onPin?: (featureId: string) => void) {
    injectGlobalStyles();
    this.onPin = onPin;

    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-trend";
    this.element.innerHTML = `
      <div class="gralobe-trend-header">
        <span class="gralobe-trend-title"></span>
        <div class="gralobe-trend-actions">
          <button class="gralobe-trend-pin" aria-label="Pin to watchlist" title="Pin to watchlist">${PIN_ICON}</button>
          <button class="gralobe-trend-share" aria-label="Download shareable card" title="Download shareable card">${SHARE_ICON}</button>
          <button class="gralobe-trend-close" aria-label="Close">&times;</button>
        </div>
      </div>
      <div class="gralobe-trend-stat"></div>
      <div class="gralobe-trend-value"></div>
      <div class="gralobe-trend-badge-slot"></div>
    `;

    this.element
      .querySelector(".gralobe-trend-close")
      ?.addEventListener("click", () => this.hide());

    this.element.querySelector(".gralobe-trend-share")?.addEventListener("click", () => {
      if (!this.latestCard) return;
      const canvas = renderStatCard(this.latestCard);
      const filename = `gralobe-${this.latestCard.countryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.png`;
      downloadStatCard(canvas, filename);
    });

    this.element.querySelector(".gralobe-trend-pin")?.addEventListener("click", () => {
      if (this.currentFeatureId) this.onPin?.(this.currentFeatureId);
    });

    parentContainer.appendChild(this.element);
  }

  /**
   * @param featureId Feature id, used for pinning to the watchlist
   * @param featureName Display name for the header
   * @param statLabel Name of the active statistic
   * @param currentValue Current value, formatted for display
   * @param previousValue Prior-period value, if any real data was supplied
   * @param format Formatter used to render both values consistently
   * @param colorScale The active statistic's color scale, used for the shareable card background
   * @param isPinned Whether this country is already on the watchlist
   */
  show(
    featureId: string,
    featureName: string,
    statLabel: string,
    currentValue: number | undefined,
    previousValue: number | undefined,
    format: (v: number) => string,
    colorScale: [string, string, string],
    isPinned = false,
  ): void {
    const titleEl = this.element.querySelector(".gralobe-trend-title") as HTMLElement;
    const statEl = this.element.querySelector(".gralobe-trend-stat") as HTMLElement;
    const valueEl = this.element.querySelector(".gralobe-trend-value") as HTMLElement;
    const badgeSlot = this.element.querySelector(".gralobe-trend-badge-slot") as HTMLElement;
    const shareBtn = this.element.querySelector(".gralobe-trend-share") as HTMLElement;
    const pinBtn = this.element.querySelector(".gralobe-trend-pin") as HTMLElement;

    this.currentFeatureId = featureId;
    pinBtn.classList.toggle("pinned", isPinned);
    pinBtn.title = isPinned ? "Unpin from watchlist" : "Pin to watchlist";
    pinBtn.style.display = currentValue !== undefined ? "flex" : "none";

    titleEl.textContent = featureName;
    statEl.textContent = statLabel;
    valueEl.textContent = currentValue !== undefined ? format(currentValue) : "No data";

    let trend: StatCardTrend | null = null;

    if (currentValue === undefined) {
      badgeSlot.innerHTML = "";
    } else if (previousValue === undefined) {
      badgeSlot.innerHTML = `<div class="gralobe-trend-nodata">No prior-period data available to compare.</div>`;
    } else {
      const diff = currentValue - previousValue;
      const pct = previousValue !== 0 ? (diff / Math.abs(previousValue)) * 100 : 0;
      const sign = diff > 0 ? "+" : "";
      const direction = diff > 0.0001 ? "up" : diff < -0.0001 ? "down" : "flat";
      const arrow = direction === "up" ? "&#9650;" : direction === "down" ? "&#9660;" : "&#9679;";
      const label =
        direction === "flat" ? "No change vs last period" : `${sign}${pct.toFixed(1)}% vs last period`;
      badgeSlot.innerHTML = `<span class="gralobe-trend-badge ${direction}">${arrow} ${label}</span>`;
      trend = { direction, label: label === "No change vs last period" ? "No change" : label };
    }

    shareBtn.style.display = currentValue !== undefined ? "flex" : "none";
    this.latestCard =
      currentValue !== undefined
        ? {
            countryName: featureName,
            statLabel,
            formattedValue: format(currentValue),
            trend,
            colorScale,
          }
        : null;

    this.element.classList.add("visible");
  }

  hide(): void {
    this.element.classList.remove("visible");
  }

  /** Update the pin icon's state without re-showing the whole panel (e.g. unpinned via the watchlist strip). */
  setPinned(featureId: string, isPinned: boolean): void {
    if (this.currentFeatureId !== featureId) return;
    const pinBtn = this.element.querySelector(".gralobe-trend-pin") as HTMLElement;
    pinBtn.classList.toggle("pinned", isPinned);
    pinBtn.title = isPinned ? "Unpin from watchlist" : "Pin to watchlist";
  }

  dispose(): void {
    this.element.remove();
  }
}
