/**
 * HelpManual Component
 *
 * A modal overlay explaining how to use a GlobeViz instance: navigation,
 * data controls, and tips for getting the best results. Opened from the
 * toolbar's "?" button.
 */

// Inject global styles once
let stylesInjected = false;
let nextHelpId = 0;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-help", "true");
  style.textContent = `
    .gralobe-help-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 5, 10, 0.85);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1100;
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .gralobe-help-overlay.visible {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .gralobe-help-modal {
      width: 90%;
      height: 80%;
      box-sizing: border-box;
      min-height: 0;
      max-width: 520px;
      background: #0d1117;
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
      transform: scale(0.95) translateY(10px);
      transition: transform 0.3s ease;
      color: #ccc;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    .gralobe-help-overlay.visible .gralobe-help-modal {
      transform: scale(1) translateY(0);
    }

    .gralobe-help-header {
      padding: 16px 20px;
      border-bottom: 1px solid rgba(100, 150, 200, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }

    .gralobe-help-title {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #4af;
    }

    .gralobe-help-close {
      background: none;
      border: none;
      color: #666;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      transition: color 0.2s ease;
    }

    .gralobe-help-close:hover {
      color: #fff;
    }

    .gralobe-help-body {
      flex: 1;
      min-height: 0;
      overflow-y: auto;
      overscroll-behavior: contain;
      padding: 4px 20px 20px;
      font-size: 13px;
      line-height: 1.6;
    }

    .gralobe-help-body h4 {
      color: #fff;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 18px 0 8px;
      color: #6ac;
    }

    .gralobe-help-body p {
      margin: 0 0 8px;
    }

    .gralobe-help-body ul {
      margin: 0 0 8px;
      padding-left: 18px;
    }

    .gralobe-help-body li {
      margin-bottom: 4px;
    }

    .gralobe-help-body kbd {
      background: rgba(100, 150, 200, 0.15);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 3px;
      padding: 1px 5px;
      font-size: 11px;
      font-family: monospace;
      color: #fff;
    }

    .gralobe-help-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 8px 0;
    }

    .gralobe-help-icon {
      flex: 0 0 30px;
      width: 30px;
      height: 30px;
      border-radius: 6px;
      background: rgba(0, 10, 20, 0.85);
      border: 1px solid rgba(100, 150, 200, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ddd;
    }

    .gralobe-help-icon svg {
      width: 16px;
      height: 16px;
    }

    .gralobe-help-icon.text {
      font-family: monospace;
      font-size: 11px;
      font-weight: 700;
      color: #4af;
    }

    .gralobe-help-row-text {
      flex: 1;
      padding-top: 4px;
    }

    .gralobe-help-row-title {
      color: #fff;
      font-weight: 600;
      font-size: 12.5px;
      margin-bottom: 2px;
    }

    .gralobe-help-row-desc {
      color: #aab;
      font-size: 12px;
      line-height: 1.5;
    }

    .gralobe-help-pill {
      flex: 0 0 auto;
      background: rgba(0, 10, 20, 0.85);
      border: 1px solid rgba(100, 150, 200, 0.3);
      border-radius: 6px;
      padding: 6px 12px;
      font-size: 11px;
      color: #ddd;
      white-space: nowrap;
      min-width: 78px;
      text-align: center;
    }
  `;
  document.head.appendChild(style);
}

// Icons reused verbatim from Toolbar.ts / GlobeViz.ts so the manual matches what's on screen
const ICON_MAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`;
const ICON_FULLSCREEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2-2h3"></path></svg>`;
const ICON_HELP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
const ICON_CHART = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18M6 15l5-6 4 3 6-8"></path></svg>`;

function row(icon: string, title: string, desc: string, isText = false): string {
  return `
    <div class="gralobe-help-row">
      <div class="gralobe-help-icon${isText ? " text" : ""}">${icon}</div>
      <div class="gralobe-help-row-text">
        <div class="gralobe-help-row-title">${title}</div>
        <div class="gralobe-help-row-desc">${desc}</div>
      </div>
    </div>
  `;
}

// For the side-panel category buttons, which are plain text pills (no icons) in the actual UI
function pillRow(label: string, desc: string): string {
  return `
    <div class="gralobe-help-row">
      <div class="gralobe-help-pill">${label}</div>
      <div class="gralobe-help-row-text">
        <div class="gralobe-help-row-desc">${desc}</div>
      </div>
    </div>
  `;
}

const HELP_CONTENT = `
  <h4>Moving around</h4>
  ${row("&#8942;", "Drag the map", "Click and drag anywhere on the globe to rotate it (or pan, in flat map view).", true)}
  ${row("&#43;", "Scroll or pinch", "Zoom in and out.", true)}
  ${row("&#128204;", "Click a country", "A single click opens a small panel showing that country's current value. A trend appears when real prior-period data is available; percentage statistics show changes in percentage points. Use the download icon to save a shareable image card, or the pin icon to add the country to your watchlist.", true)}
  ${row("&#8853;", "Double-click a country", "Zoom in and open its country profile with metric values and history. Double-click again anywhere on the map, or close the profile, to return to the full view.", true)}
  ${row("&#128269;", "Search box (top-left)", "Type a country name and press Enter, or pick from the dropdown, to fly straight to it instead of dragging to find it.", true)}
  ${row("&#128204;", "Watchlist strip (bottom)", "Countries you've pinned stay here, each showing its value for whatever statistic is active. Click a chip to fly back to it, or the &times; to unpin.", true)}

  <h4>The bottom-right toolbar buttons</h4>
  ${row(ICON_CHART, "Compare countries in a chart", "Open the chart view and choose Line to compare countries over time, or Bar to compare values in the selected year. Change the metric and year with the dropdowns; open Countries and search to select the countries to compare. Use Globe to return to the map with the selected metric and year.")}
  ${row(ICON_MAP, "Switch to Flat Map / Switch to Globe", "This icon changes depending on the current view: a map icon means you're on the globe and this switches to the flat map; a globe icon means you're on the flat map and this switches back. Same as pressing <kbd>G</kbd>.")}
  ${row(ICON_FULLSCREEN, "Toggle Fullscreen", "Expands the view to fill your whole screen. Same as pressing <kbd>F</kbd>.")}
  ${row(ICON_HELP, "Help", "Opens this manual.")}

  <h4>The side panel (top-right)</h4>
  <p>Click the arrow button in the very top-right corner of the map to open a column of buttons. Each one opens a small panel of controls:</p>
  ${pillRow("Texture", "Changes the base Earth image &mdash; satellite photo, night lights, terrain, and more.")}
  ${pillRow("Navigation", "Jump straight to the globe or flat view, or drag the Morph slider to stop partway between the two.")}
  ${pillRow("Data", "Switch which statistic is colored on the map (life expectancy, GDP, CO&#8322; emissions, etc).")}
  ${pillRow("Effects", "Turn on visual extras &mdash; clouds, atmosphere glow, city lights, grid lines, and a few stylized modes (hologram, thermal, blueprint).")}
  ${pillRow("Settings", "Country label density, auto-rotate, a one-click screenshot button, and a switch for keyboard shortcuts.")}
  ${pillRow("Hover Info", "Turn the hover tooltip on or off, and control how close you need to zoom in before it appears.")}

  <h4>Keyboard shortcuts</h4>
  <p>Click the globe once so it has focus, then: <kbd>G</kbd> switches between globe and flat map, <kbd>F</kbd> toggles fullscreen. They only apply to the globe you last clicked &mdash; handy when a page has more than one.</p>

  <h4>For developers embedding Gralobe</h4>
  <ul>
    <li>Await <code>globe.ready</code> before calling other methods.</li>
    <li>Call <code>globe.destroy()</code> when removing a globe from the page &mdash; browsers cap how many can run at once.</li>
    <li>The trend badge compares values with the prior period supplied by a timeline, or a <code>previousValues</code> map you pass alongside <code>values</code> in a custom <code>StatisticData</code>.</li>
  </ul>
`;

export class HelpManual {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null = null;

  constructor(parentContainer: HTMLElement) {
    injectGlobalStyles();

    if (getComputedStyle(parentContainer).position === "static") {
      parentContainer.style.position = "relative";
    }

    this.element = document.createElement("div");
    this.element.className = "gralobe-help-overlay";
    this.element.inert = true;
    this.element.setAttribute("aria-hidden", "true");
    const titleId = `gralobe-help-title-${nextHelpId++}`;
    this.element.innerHTML = `
      <div class="gralobe-help-modal" role="dialog" aria-modal="true" aria-labelledby="${titleId}">
        <div class="gralobe-help-header">
          <h3 class="gralobe-help-title" id="${titleId}">Gralobe &mdash; Quick Manual</h3>
          <button type="button" class="gralobe-help-close" aria-label="Close help">&times;</button>
        </div>
        <div class="gralobe-help-body" tabindex="0" aria-label="Manual content">${HELP_CONTENT}</div>
      </div>
    `;

    this.element.querySelector(".gralobe-help-close")?.addEventListener("click", () => this.hide());

    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) this.hide();
    });
    this.element.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        this.hide();
      } else if (event.key === "Tab") {
        const focusable = this.element.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    });

    parentContainer.appendChild(this.element);
  }

  show(): void {
    if (this.element.classList.contains("visible")) return;
    this.previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    this.element.classList.add("visible");
    this.element.inert = false;
    this.element.setAttribute("aria-hidden", "false");
    this.element.querySelector<HTMLButtonElement>(".gralobe-help-close")?.focus();
  }

  hide(): void {
    this.element.classList.remove("visible");
    this.element.inert = true;
    this.element.setAttribute("aria-hidden", "true");
    if (this.previousFocus?.isConnected) this.previousFocus.focus();
    this.previousFocus = null;
  }

  dispose(): void {
    this.hide();
    this.element.remove();
  }
}
