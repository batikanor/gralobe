/**
 * WatchlistStrip Component
 *
 * A row of pinned-country chips docked to the bottom of the map. Countries
 * are pinned from the trend panel's "+" button and stay here, each showing
 * its value for whichever statistic is currently active. Click a chip to
 * fly to that country; click its "x" to unpin.
 */

export interface WatchlistItem {
  id: string;
  name: string;
  value?: number;
}

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-watchlist", "true");
  style.textContent = `
    .gralobe-watchlist {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 850;
      display: flex;
      gap: 6px;
      max-width: calc(100% - 24px);
      overflow-x: auto;
      padding-bottom: 2px;
    }

    .gralobe-watchlist-chip {
      flex: 0 0 auto;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(0, 10, 20, 0.9);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 999px;
      padding: 5px 6px 5px 12px;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      font-size: 11.5px;
      color: #ddd;
      cursor: pointer;
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      white-space: nowrap;
    }

    .gralobe-watchlist-chip:hover {
      border-color: rgba(100, 180, 255, 0.6);
    }

    .gralobe-watchlist-name {
      font-weight: 600;
      color: #fff;
    }

    .gralobe-watchlist-value {
      color: #9ab;
      font-variant-numeric: tabular-nums;
    }

    .gralobe-watchlist-unpin {
      background: rgba(255, 255, 255, 0.08);
      border: none;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      color: #999;
      font-size: 12px;
      line-height: 1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .gralobe-watchlist-unpin:hover {
      background: rgba(255, 100, 100, 0.3);
      color: #fff;
    }
  `;
  document.head.appendChild(style);
}

export class WatchlistStrip {
  private element: HTMLElement;
  private onSelect: (id: string) => void;
  private onUnpin: (id: string) => void;

  constructor(parentContainer: HTMLElement, onSelect: (id: string) => void, onUnpin: (id: string) => void) {
    injectGlobalStyles();
    this.onSelect = onSelect;
    this.onUnpin = onUnpin;

    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-watchlist";
    parentContainer.appendChild(this.element);
  }

  update(items: WatchlistItem[], format: (v: number) => string): void {
    this.element.innerHTML = items
      .map(
        (item) => `
        <div class="gralobe-watchlist-chip" data-id="${item.id}">
          <span class="gralobe-watchlist-name">${item.name}</span>
          <span class="gralobe-watchlist-value">${item.value !== undefined ? format(item.value) : "—"}</span>
          <button class="gralobe-watchlist-unpin" data-id="${item.id}" aria-label="Unpin">&times;</button>
        </div>
      `,
      )
      .join("");

    this.element.querySelectorAll<HTMLElement>(".gralobe-watchlist-chip").forEach((chip) => {
      chip.addEventListener("click", (e) => {
        if ((e.target as HTMLElement).classList.contains("gralobe-watchlist-unpin")) return;
        const id = chip.dataset.id;
        if (id) this.onSelect(id);
      });
    });

    this.element.querySelectorAll<HTMLElement>(".gralobe-watchlist-unpin").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        if (id) this.onUnpin(id);
      });
    });
  }

  dispose(): void {
    this.element.remove();
  }
}
