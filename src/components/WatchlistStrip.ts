/**
 * WatchlistStrip Component
 *
 * A row of pinned-country chips docked to the bottom of the map. Countries
 * are pinned from the trend panel's pin button and stay here, each showing
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

    .gralobe-watchlist-select {
      display: flex;
      align-items: center;
      gap: 6px;
      border: 0;
      padding: 0;
      background: transparent;
      color: inherit;
      font: inherit;
      cursor: pointer;
      white-space: nowrap;
    }

    .gralobe-watchlist-select:focus-visible,
    .gralobe-watchlist-unpin:focus-visible {
      outline: 2px solid #4af;
      outline-offset: 3px;
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
  private parentContainer: HTMLElement;
  private onSelect: (id: string) => void;
  private onUnpin: (id: string) => void;
  private resizeObserver: ResizeObserver;
  private mutationObserver: MutationObserver;
  private bottomControls: HTMLElement[] = [];

  constructor(
    parentContainer: HTMLElement,
    onSelect: (id: string) => void,
    onUnpin: (id: string) => void,
  ) {
    injectGlobalStyles();
    this.parentContainer = parentContainer;
    this.onSelect = onSelect;
    this.onUnpin = onUnpin;

    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-watchlist";
    this.element.setAttribute("role", "group");
    this.element.setAttribute("aria-label", "Pinned countries");
    parentContainer.appendChild(this.element);

    this.resizeObserver = new ResizeObserver(() => this.updateDock());
    this.resizeObserver.observe(parentContainer);
    this.mutationObserver = new MutationObserver((records) => {
      if (records.some((record) => record.type === "childList")) this.observeBottomControls();
      this.updateDock();
    });
    this.observeBottomControls();
    this.updateDock();
  }

  /** Controls can be created after this strip, or replaced by an embedding app. */
  private observeBottomControls(): void {
    for (const control of this.bottomControls) this.resizeObserver.unobserve(control);
    this.bottomControls = Array.from(this.parentContainer.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element.matches(".gralobe-legend, .gralobe-toolbar"),
    );
    this.mutationObserver.disconnect();
    this.mutationObserver.observe(this.parentContainer, {
      childList: true,
      attributes: true,
      attributeFilter: ["class", "style"],
    });
    for (const control of this.bottomControls) {
      this.resizeObserver.observe(control);
      this.mutationObserver.observe(control, {
        attributes: true,
        attributeFilter: ["class", "style"],
      });
    }
  }

  /** Keep the entire scrollable row above the actual bottom controls. */
  private updateDock(): void {
    let bottom = 12;
    for (const control of this.bottomControls) {
      const style = getComputedStyle(control);
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (control.matches(".gralobe-legend") && !control.classList.contains("visible")) continue;
      // offsetTop reserves the final layout box, independent of the legend's
      // entry animation, so chips cannot cover it while it fades into view.
      bottom = Math.max(bottom, this.parentContainer.clientHeight - control.offsetTop + 8);
    }
    this.element.style.bottom = `${bottom}px`;
  }

  update(items: WatchlistItem[], format: (v: number) => string): void {
    const focused = this.element.contains(document.activeElement)
      ? (document.activeElement as HTMLElement)
      : null;
    const fragment = document.createDocumentFragment();
    for (const item of items) {
      const chip = document.createElement("div");
      chip.className = "gralobe-watchlist-chip";
      chip.dataset.id = item.id;

      const select = document.createElement("button");
      select.type = "button";
      select.className = "gralobe-watchlist-select";
      select.dataset.id = item.id;
      select.dataset.action = "select";
      select.setAttribute("aria-label", `Show ${item.name}`);
      select.addEventListener("click", () => this.onSelect(item.id));
      const name = document.createElement("span");
      name.className = "gralobe-watchlist-name";
      name.textContent = item.name;
      const value = document.createElement("span");
      value.className = "gralobe-watchlist-value";
      value.textContent =
        item.value !== undefined && Number.isFinite(item.value) ? format(item.value) : "—";
      select.append(name, value);

      const unpin = document.createElement("button");
      unpin.type = "button";
      unpin.className = "gralobe-watchlist-unpin";
      unpin.dataset.id = item.id;
      unpin.dataset.action = "unpin";
      unpin.setAttribute("aria-label", `Unpin ${item.name}`);
      unpin.textContent = "×";
      unpin.addEventListener("click", () => this.onUnpin(item.id));
      chip.append(select, unpin);
      fragment.appendChild(chip);
    }
    this.element.replaceChildren(fragment);
    this.updateDock();

    if (focused) {
      const buttons = Array.from(this.element.querySelectorAll<HTMLButtonElement>("button"));
      const replacement = buttons.find(
        (button) =>
          button.dataset.id === focused.dataset.id &&
          button.dataset.action === focused.dataset.action,
      );
      (replacement ?? buttons[0])?.focus();
    }
  }

  dispose(): void {
    this.resizeObserver.disconnect();
    this.mutationObserver.disconnect();
    this.bottomControls = [];
    this.element.remove();
  }
}
