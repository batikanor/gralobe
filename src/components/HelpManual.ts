/**
 * HelpManual Component
 *
 * A modal overlay explaining how to use a GlobeViz instance: navigation,
 * data controls, and tips for getting the best results. Opened from the
 * toolbar's "?" button.
 */

// Inject global styles once
let stylesInjected = false;

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
      pointer-events: none;
      transition: opacity 0.3s ease;
    }

    .gralobe-help-overlay.visible {
      opacity: 1;
      pointer-events: auto;
    }

    .gralobe-help-modal {
      width: 90%;
      height: 80%;
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
      overflow-y: auto;
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
const ICON_LIST = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`;
const ICON_MAP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>`;
const ICON_FULLSCREEN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2-2h3"></path></svg>`;
const ICON_HELP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;

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
  ${row("&#128204;", "Click a country", "A small panel appears at the top of the map showing that country's current value and whether it's up, down, or flat compared to last year. Use the download icon in that panel to save a shareable image card of it, or the pin icon to add it to your watchlist.", true)}
  ${row("&#128269;", "Search box (top-left)", "Type a country name and press Enter, or pick from the dropdown, to fly straight to it instead of dragging to find it.", true)}
  ${row("&#128204;", "Watchlist strip (bottom)", "Countries you've pinned stay here, each showing its value for whatever statistic is active. Click a chip to fly back to it, or the &times; to unpin.", true)}

  <h4>The bottom-right toolbar buttons</h4>
  ${row(ICON_LIST, "View Raw Data", "Opens a sortable table of every value currently plotted on the map.")}
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
    <li>The year-over-year trend badge reads from a <code>previousValues</code> map you pass alongside <code>values</code> in a custom <code>StatisticData</code>.</li>
  </ul>
`;

export class HelpManual {
  private element: HTMLElement;

  constructor(parentContainer: HTMLElement) {
    injectGlobalStyles();

    this.element = document.createElement("div");
    this.element.className = "gralobe-help-overlay";
    this.element.innerHTML = `
      <div class="gralobe-help-modal">
        <div class="gralobe-help-header">
          <h3 class="gralobe-help-title">Gralobe &mdash; Quick Manual</h3>
          <button class="gralobe-help-close" aria-label="Close">&times;</button>
        </div>
        <div class="gralobe-help-body">${HELP_CONTENT}</div>
      </div>
    `;

    this.element
      .querySelector(".gralobe-help-close")
      ?.addEventListener("click", () => this.hide());

    this.element.addEventListener("click", (e) => {
      if (e.target === this.element) this.hide();
    });

    parentContainer.appendChild(this.element);
  }

  show(): void {
    this.element.classList.add("visible");
  }

  hide(): void {
    this.element.classList.remove("visible");
  }

  dispose(): void {
    this.element.remove();
  }
}
