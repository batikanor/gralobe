/**
 * Legend Component
 *
 * Displays color scale and value range for the current statistic.
 * Each instance is scoped to its parent container.
 */

import type { StatisticDefinition } from '../lib/types';
import { createFormatter } from '../lib/formatters';

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement('style');
  style.setAttribute('data-gralobe-legend', 'true');
  style.textContent = `
    .gralobe-legend {
      position: absolute;
      bottom: 15px;
      left: 15px;
      background: rgba(0, 10, 20, 0.92);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 8px;
      padding: 10px 14px;
      min-width: 160px;
      max-width: 280px;
      font-family: system-ui, -apple-system, sans-serif;
      color: #ddd;
      opacity: 0;
      transform: translateY(8px);
      transition: opacity 0.3s ease, transform 0.3s ease;
      pointer-events: none;
      z-index: 50;
    }

    .gralobe-legend.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .gralobe-legend-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #4af;
      line-height: 1.3;
    }

    .gralobe-legend-gradient {
      height: 10px;
      border-radius: 3px;
      margin-bottom: 4px;
    }

    .gralobe-legend-labels {
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      color: #aaa;
      margin-bottom: 6px;
    }

    .gralobe-legend-description {
      font-size: 10px;
      color: #777;
      font-style: italic;
      line-height: 1.4;
    }

    .gralobe-legend-hint {
      font-size: 9px;
      color: #555;
      margin-bottom: 6px;
      padding-bottom: 5px;
      border-bottom: 1px solid rgba(100, 150, 200, 0.15);
    }
  `;
  document.head.appendChild(style);
}

export class Legend {
  private element: HTMLElement;
  private parentContainer: HTMLElement;
  private visible: boolean = false;

  constructor(parentContainer: HTMLElement) {
    injectGlobalStyles();

    this.parentContainer = parentContainer;

    // Ensure parent has relative/absolute positioning for legend to position correctly
    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === 'static') {
      parentContainer.style.position = 'relative';
    }

    this.element = document.createElement('div');
    this.element.className = 'gralobe-legend';
    this.element.setAttribute('data-testid', 'globe-legend');
    this.element.innerHTML = `
      <div class="gralobe-legend-hint">G: toggle view · F: fullscreen</div>
      <div class="gralobe-legend-title" data-testid="legend-title"></div>
      <div class="gralobe-legend-gradient"></div>
      <div class="gralobe-legend-labels">
        <span class="gralobe-legend-min" data-testid="legend-min"></span>
        <span class="gralobe-legend-max" data-testid="legend-max"></span>
      </div>
      <div class="gralobe-legend-description" data-testid="legend-description"></div>
    `;

    parentContainer.appendChild(this.element);
  }

  show(stat: StatisticDefinition): void {
    const titleEl = this.element.querySelector('.gralobe-legend-title') as HTMLElement;
    const gradientEl = this.element.querySelector('.gralobe-legend-gradient') as HTMLElement;
    const minEl = this.element.querySelector('.gralobe-legend-min') as HTMLElement;
    const maxEl = this.element.querySelector('.gralobe-legend-max') as HTMLElement;
    const descEl = this.element.querySelector('.gralobe-legend-description') as HTMLElement;

    titleEl.textContent = stat.name;
    descEl.textContent = stat.description;

    const [low, mid, high] = stat.colorScale;
    gradientEl.style.background = `linear-gradient(to right, ${low}, ${mid}, ${high})`;

    const formatValue = stat.format ?? createFormatter(stat.unit);
    minEl.textContent = formatValue(stat.domain[0]);
    maxEl.textContent = formatValue(stat.domain[1]);

    this.element.classList.add('visible');
    this.visible = true;
  }

  hide(): void {
    this.element.classList.remove('visible');
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
