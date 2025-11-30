import type { StatisticDefinition } from '../data/worldStatistics';

/**
 * Legend component for displaying color scales
 */
export class Legend {
  private container: HTMLElement;
  private visible: boolean = false;

  constructor() {
    this.container = document.createElement('div');
    this.container.id = 'legend';
    this.container.innerHTML = `
      <div class="legend-hint">Press G to toggle globe/flat</div>
      <div class="legend-title"></div>
      <div class="legend-gradient"></div>
      <div class="legend-labels">
        <span class="legend-min"></span>
        <span class="legend-max"></span>
      </div>
      <div class="legend-description"></div>
    `;
    this.applyStyles();
    document.body.appendChild(this.container);
  }

  private applyStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      #legend {
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: rgba(0, 10, 20, 0.9);
        border: 1px solid rgba(100, 150, 200, 0.3);
        border-radius: 8px;
        padding: 12px 16px;
        min-width: 180px;
        font-family: system-ui, sans-serif;
        color: #ddd;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none;
        z-index: 100;
      }

      #legend.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      .legend-title {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #4af;
      }

      .legend-gradient {
        height: 12px;
        border-radius: 4px;
        margin-bottom: 4px;
      }

      .legend-labels {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #aaa;
        margin-bottom: 8px;
      }

      .legend-description {
        font-size: 11px;
        color: #888;
        font-style: italic;
      }

      .legend-hint {
        font-size: 10px;
        color: #666;
        margin-bottom: 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid rgba(100, 150, 200, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  show(stat: StatisticDefinition): void {
    const titleEl = this.container.querySelector('.legend-title') as HTMLElement;
    const gradientEl = this.container.querySelector('.legend-gradient') as HTMLElement;
    const minEl = this.container.querySelector('.legend-min') as HTMLElement;
    const maxEl = this.container.querySelector('.legend-max') as HTMLElement;
    const descEl = this.container.querySelector('.legend-description') as HTMLElement;

    titleEl.textContent = stat.name;
    descEl.textContent = stat.description;

    const [low, mid, high] = stat.colorScale;
    gradientEl.style.background = `linear-gradient(to right, ${low}, ${mid}, ${high})`;

    minEl.textContent = stat.format(stat.domain[0]);
    maxEl.textContent = stat.format(stat.domain[1]);

    this.container.classList.add('visible');
    this.visible = true;
  }

  hide(): void {
    this.container.classList.remove('visible');
    this.visible = false;
  }

  isVisible(): boolean {
    return this.visible;
  }

  getContainer(): HTMLElement {
    return this.container;
  }

  dispose(): void {
    this.container.remove();
  }
}
