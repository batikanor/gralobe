/**
 * Toolbar Component
 *
 * Provides quick access buttons for Fullscreen and Raw Data viewing.
 * Floating in the bottom right corner of the container.
 */

// Inject global styles once
let stylesInjected = false;

function injectGlobalStyles(): void {
  if (stylesInjected) return;
  stylesInjected = true;

  const style = document.createElement("style");
  style.setAttribute("data-gralobe-toolbar", "true");
  style.textContent = `
    .gralobe-toolbar {
      position: absolute;
      bottom: 12px;
      right: 12px;
      display: flex;
      gap: 8px;
      z-index: 100;
      pointer-events: auto;
    }

    .gralobe-toolbar-btn {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      background: rgba(0, 10, 20, 0.85);
      border: 1px solid rgba(100, 150, 200, 0.3);
      color: #ddd;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 16px;
      padding: 0;
      backdrop-filter: blur(4px);
      -webkit-backdrop-filter: blur(4px);
    }

    .gralobe-toolbar-btn:hover {
      background: rgba(20, 40, 60, 0.95);
      border-color: rgba(100, 180, 255, 0.6);
      color: #fff;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }

    .gralobe-toolbar-btn:active {
      transform: translateY(0);
    }

    .gralobe-toolbar-btn svg {
      width: 18px;
      height: 18px;
    }
  `;
  document.head.appendChild(style);
}

export interface ToolbarConfig {
  onShowData: () => void;
  onToggleFullscreen: () => void;
  onToggleProjection: () => void;
}

export class Toolbar {
  private element: HTMLElement;
  private parentContainer: HTMLElement;
  private projectionBtn: HTMLButtonElement;

  // SVG icons for projection button
  private static GLOBE_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  `;

  private static MAP_ICON = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
      <line x1="8" y1="2" x2="8" y2="18"></line>
      <line x1="16" y1="6" x2="16" y2="22"></line>
    </svg>
  `;

  constructor(parentContainer: HTMLElement, config: ToolbarConfig) {
    injectGlobalStyles();
    this.parentContainer = parentContainer;

    this.element = document.createElement("div");
    this.element.className = "gralobe-toolbar";

    // View Data Button
    const dataBtn = document.createElement("button");
    dataBtn.className = "gralobe-toolbar-btn";
    dataBtn.title = "View Raw Data";
    dataBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="8" y1="6" x2="21" y2="6"></line>
        <line x1="8" y1="12" x2="21" y2="12"></line>
        <line x1="8" y1="18" x2="21" y2="18"></line>
        <line x1="3" y1="6" x2="3.01" y2="6"></line>
        <line x1="3" y1="12" x2="3.01" y2="12"></line>
        <line x1="3" y1="18" x2="3.01" y2="18"></line>
      </svg>
    `;
    dataBtn.onclick = (e) => {
      e.stopPropagation();
      config.onShowData();
    };

    // Projection Toggle Button (Globe/Flat Map)
    this.projectionBtn = document.createElement("button");
    this.projectionBtn.className = "gralobe-toolbar-btn";
    this.projectionBtn.title = "Toggle Projection (G)";
    this.projectionBtn.innerHTML = Toolbar.MAP_ICON; // Default: show Map icon to go to Flat
    this.projectionBtn.onclick = (e) => {
      e.stopPropagation();
      config.onToggleProjection();
    };

    // Fullscreen Button
    const fsBtn = document.createElement("button");
    fsBtn.className = "gralobe-toolbar-btn";
    fsBtn.title = "Toggle Fullscreen";
    fsBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
      </svg>
    `;
    fsBtn.onclick = (e) => {
      e.stopPropagation();
      config.onToggleFullscreen();
    };

    this.element.appendChild(dataBtn);
    this.element.appendChild(this.projectionBtn);
    this.element.appendChild(fsBtn);

    // Ensure parent has relative/absolute positioning
    const parentPosition = getComputedStyle(parentContainer).position;
    if (parentPosition === "static") {
      parentContainer.style.position = "relative";
    }

    parentContainer.appendChild(this.element);
  }

  /**
   * Update the projection button icon based on current view state
   * @param isGlobe - true if currently in globe view, false if flat
   */
  updateProjectionIcon(isGlobe: boolean): void {
    if (isGlobe) {
      // Currently globe, so show Map icon to go to flat
      this.projectionBtn.innerHTML = Toolbar.MAP_ICON;
      this.projectionBtn.title = "View as Flat Map (G)";
    } else {
      // Currently flat, so show Globe icon to go to globe
      this.projectionBtn.innerHTML = Toolbar.GLOBE_ICON;
      this.projectionBtn.title = "View as Globe (G)";
    }
  }

  dispose(): void {
    this.element.remove();
  }
}
