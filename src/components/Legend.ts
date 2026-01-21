/**
 * Legend Component
 *
 * Displays color scale and value range for the current statistic.
 * Each instance is scoped to its parent container and scales proportionally.
 */

import { createFormatter } from "../lib/formatters";
import type { StatisticDefinition } from "../lib/types";

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-legend", "true");
  style.textContent = `
    .gralobe-legend {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0, 10, 20, 0.92);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 6px;
      padding: 8px 12px;
      font-family: system-ui, -apple-system, sans-serif;
      color: #ddd;
      opacity: 0;
      transform: translateY(8px) scale(0.95);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      z-index: 10;
      transform-origin: bottom left;
    }

    .gralobe-legend.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    /* Size variants based on container size */
    .gralobe-legend.size-lg {
      padding: 10px 14px;
      min-width: 180px;
      max-width: 280px;
      border-radius: 8px;
      bottom: 15px;
      left: 15px;
    }
    .gralobe-legend.size-lg .gralobe-legend-title { font-size: 13px; margin-bottom: 6px; }
    .gralobe-legend.size-lg .gralobe-legend-gradient { height: 10px; margin-bottom: 4px; }
    .gralobe-legend.size-lg .gralobe-legend-labels { font-size: 10px; margin-bottom: 6px; }
    .gralobe-legend.size-lg .gralobe-legend-description { font-size: 10px; }
    .gralobe-legend.size-lg .gralobe-legend-hint { font-size: 9px; margin-bottom: 6px; padding-bottom: 5px; }

    .gralobe-legend.size-md {
      padding: 7px 10px;
      min-width: 140px;
      max-width: 220px;
      bottom: 10px;
      left: 10px;
    }
    .gralobe-legend.size-md .gralobe-legend-title { font-size: 11px; margin-bottom: 4px; }
    .gralobe-legend.size-md .gralobe-legend-gradient { height: 8px; margin-bottom: 3px; }
    .gralobe-legend.size-md .gralobe-legend-labels { font-size: 9px; margin-bottom: 4px; }
    .gralobe-legend.size-md .gralobe-legend-description { font-size: 9px; }
    .gralobe-legend.size-md .gralobe-legend-hint { font-size: 8px; margin-bottom: 4px; padding-bottom: 4px; }

    .gralobe-legend.size-sm {
      padding: 5px 8px;
      min-width: 100px;
      max-width: 160px;
      border-radius: 4px;
      bottom: 6px;
      left: 6px;
    }
    .gralobe-legend.size-sm .gralobe-legend-title { font-size: 10px; margin-bottom: 3px; }
    .gralobe-legend.size-sm .gralobe-legend-gradient { height: 6px; margin-bottom: 2px; border-radius: 2px; }
    .gralobe-legend.size-sm .gralobe-legend-labels { font-size: 8px; margin-bottom: 0; }
    .gralobe-legend.size-sm .gralobe-legend-description { display: none; }
    .gralobe-legend.size-sm .gralobe-legend-hint { display: none; }

    .gralobe-legend.size-xs {
      padding: 3px 5px;
      min-width: 60px;
      max-width: 100px;
      border-radius: 3px;
      bottom: 4px;
      left: 4px;
    }
    .gralobe-legend.size-xs .gralobe-legend-title { font-size: 7px; margin-bottom: 1px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .gralobe-legend.size-xs .gralobe-legend-gradient { height: 3px; margin-bottom: 1px; border-radius: 1px; }
    .gralobe-legend.size-xs .gralobe-legend-labels { font-size: 6px; margin-bottom: 0; }
    .gralobe-legend.size-xs .gralobe-legend-description { display: none; }
    .gralobe-legend.size-xs .gralobe-legend-hint { display: none; }

    /* Mobile-specific: even smaller for very small screens */
    @media (max-width: 480px) {
      .gralobe-legend.size-sm {
        padding: 4px 6px;
        min-width: 80px;
        max-width: 130px;
      }
      .gralobe-legend.size-sm .gralobe-legend-title { font-size: 8px; }
      .gralobe-legend.size-sm .gralobe-legend-gradient { height: 5px; }
      .gralobe-legend.size-sm .gralobe-legend-labels { font-size: 7px; }
      .gralobe-legend.size-sm .gralobe-legend-description { display: none; }
      .gralobe-legend.size-sm .gralobe-legend-hint { display: none; }
      
      .gralobe-legend.size-md {
        padding: 5px 8px;
        min-width: 100px;
        max-width: 160px;
      }
      .gralobe-legend.size-md .gralobe-legend-title { font-size: 9px; }
      .gralobe-legend.size-md .gralobe-legend-gradient { height: 6px; }
      .gralobe-legend.size-md .gralobe-legend-labels { font-size: 8px; }
      .gralobe-legend.size-md .gralobe-legend-description { display: none; }
      .gralobe-legend.size-md .gralobe-legend-hint { display: none; }
    }

    .gralobe-legend-title {
      font-weight: 600;
      color: #4af;
      line-height: 1.3;
    }

    .gralobe-legend-gradient {
      border-radius: 3px;
    }

    .gralobe-legend-labels {
      display: flex;
      justify-content: space-between;
      color: #aaa;
    }

    .gralobe-legend-description {
      color: #666;
      font-style: italic;
      line-height: 1.3;
    }

    .gralobe-legend-hint {
      color: #444;
      border-bottom: 1px solid rgba(100, 150, 200, 0.15);
    }
  `;
  document.head.appendChild(style);
}

type LegendSize = "xs" | "sm" | "md" | "lg";

export class Legend {
  private element: HTMLElement;
  private parentContainer: HTMLElement;
  private visible: boolean = false;
  private resizeObserver: ResizeObserver | null = null;

  constructor(parentContainer: HTMLElement) {
    injectGlobalStyles();

    this.parentContainer = parentContainer;

    // Ensure parent has relative/absolute positioning
    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-legend";
    this.element.setAttribute("data-testid", "globe-legend");
    this.element.innerHTML = `
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `;

    parentContainer.appendChild(this.element);

    // Set initial size and observe for changes
    this.updateSize();
    this.resizeObserver = new ResizeObserver(() => this.updateSize());
    this.resizeObserver.observe(parentContainer);
  }

  private getSizeClass(width: number, height: number): LegendSize {
    const minDim = Math.min(width, height);
    if (minDim < 200) return "xs";
    if (minDim < 300) return "sm";
    if (minDim < 450) return "md";
    return "lg";
  }

  private updateSize(): void {
    const width = this.parentContainer.clientWidth;
    const height = this.parentContainer.clientHeight;
    const sizeClass = this.getSizeClass(width, height);

    // Remove old size classes and add new one
    this.element.classList.remove("size-xs", "size-sm", "size-md", "size-lg");
    this.element.classList.add(`size-${sizeClass}`);
  }

  show(stat: StatisticDefinition): void {
    const titleEl = this.element.querySelector(
      ".gralobe-legend-title",
    ) as HTMLElement;
    const gradientEl = this.element.querySelector(
      ".gralobe-legend-gradient",
    ) as HTMLElement;
    const minEl = this.element.querySelector(
      ".gralobe-legend-min",
    ) as HTMLElement;
    const maxEl = this.element.querySelector(
      ".gralobe-legend-max",
    ) as HTMLElement;
    const descEl = this.element.querySelector(
      ".gralobe-legend-description",
    ) as HTMLElement;

    titleEl.textContent = stat.name;
    descEl.textContent = stat.description;

    const [low, mid, high] = stat.colorScale;
    gradientEl.style.background = `linear-gradient(to right, ${low}, ${mid}, ${high})`;

    const formatValue = stat.format ?? createFormatter(stat.unit);
    minEl.textContent = formatValue(stat.domain[0]);
    maxEl.textContent = formatValue(stat.domain[1]);

    this.element.classList.add("visible");
    this.visible = true;
  }

  hide(): void {
    this.element.classList.remove("visible");
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  getElement(): HTMLElement {
    return this.element;
  }

  dispose(): void {
    this.resizeObserver?.disconnect();
    this.element.remove();
  }
}
