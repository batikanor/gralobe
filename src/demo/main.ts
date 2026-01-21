import { GlobeViz } from "../lib/GlobeViz";
import type { DemoConfig, DemoSection } from "./demo-config";
import { sections } from "./demo-config";

// Registry of active globes
const globes = new Map<string, GlobeViz>();
const MAX_ACTIVE_GLOBES = 6;

// --- DOM Generation Helpers ---

function createSectionHTML(section: DemoSection, index: number): string {
  const infoBox = section.infoBox
    ? `<div class="info-box">${section.infoBox}</div>`
    : "";

  // Collapse all except the first one by default
  const isCollapsed = index !== 0; // First one open, rest closed
  const collapsedClass = isCollapsed ? "collapsed" : "";
  const iconClass = isCollapsed
    ? "section-toggle-icon collapsed"
    : "section-toggle-icon";

  return `
    <section id="${section.id}">
      <div class="section-header" onclick="toggleSection('${section.id}')">
        <div class="section-header-content">
          <h2 class="section-title">${section.title}</h2>
          <p class="section-desc">${section.description}</p>
        </div>
        <svg class="${iconClass}" id="icon-${section.id}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </div>
      <div class="section-content ${collapsedClass}" id="content-${section.id}">
        ${infoBox}
        <div class="grid ${section.gridClass || "grid-2"}" id="grid-${section.id}">
          <!-- Demos injected here -->
        </div>
      </div>
    </section>
  `;
}

function createDemoHTML(demo: DemoConfig): string {
  // Use config.showControls to determine if we show the gear icon logic or similar,
  // but for now we just render the container.

  return `
    <div class="variant">
      <div class="variant-header">
        <span class="variant-title">${demo.title}</span>
        <span class="variant-meta">${demo.subtitle || ""}</span>
      </div>
      <div class="variant-container ${demo.heightClass || "height-400"} globe-container" id="${demo.id}">
        <div class="globe-loader">
          <div class="globe-spinner"></div>
          <div class="globe-progress-track"><div class="globe-progress-bar"></div></div>
          <div class="globe-progress-text">0%</div>
          <div class="globe-debug-text" style="font-size: 10px; color: #666; margin-top: 4px;">Initializing...</div>
        </div>
        <div class="globe-error">Failed to load</div>
      </div>
      ${demo.description ? `<div style="padding: 8px 12px; font-size: 11px; color: #666; border-top: 1px solid #1a1a25; background: #0a0a0f;">${demo.description}</div>` : ""}
    </div>
  `;
}

// --- Lifecycle Management ---

function updateCounter() {
  const el = document.getElementById("webgl-count");
  if (el) el.textContent = globes.size.toString();
}

function enforceLimit() {
  if (globes.size >= MAX_ACTIVE_GLOBES) {
    let furthestId: string | null = null;
    let furthestDistance = -Infinity;

    for (const [id] of globes) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      const dist = Math.abs(
        rect.top + rect.height / 2 - window.innerHeight / 2,
      );
      if (dist > furthestDistance) {
        furthestDistance = dist;
        furthestId = id;
      }
    }
    if (furthestId) destroyGlobe(furthestId);
  }
}

function destroyGlobe(containerId: string) {
  const globe = globes.get(containerId);
  if (!globe) return;

  globe.destroy();
  globes.delete(containerId);
  updateCounter();

  const container = document.getElementById(containerId);
  if (container) {
    const loader = container.querySelector(".globe-loader");
    loader?.classList.remove("hidden");
  }
}

// --- Initialization ---

async function initGlobe(demo: DemoConfig) {
  const containerId = demo.id;
  const container = document.getElementById(containerId);
  if (!container || globes.has(containerId)) return;

  const loader = container.querySelector(".globe-loader") as HTMLElement;
  const error = container.querySelector(".globe-error") as HTMLElement;
  const progressBar = container.querySelector(
    ".globe-progress-bar",
  ) as HTMLElement;
  const progressText = container.querySelector(".globe-progress-text");
  const debugText = container.querySelector(".globe-debug-text");

  try {
    enforceLimit();

    const config = {
      ...demo.config,
      onLoadProgress: (progress: number, status?: string) => {
        if (progressBar)
          progressBar.style.width = `${Math.round(progress * 100)}%`;
        if (progressText)
          progressText.textContent = `${Math.round(progress * 100)}%`;
        if (debugText && status) debugText.textContent = status;
        // console.log(`[${containerId}] Progress: ${progress}, Status: ${status}`);
      },
    };

    const globe = new GlobeViz(container, config);
    globes.set(containerId, globe);
    updateCounter();

    // Run custom setup if defined (e.g. data injection)
    if (demo.setup) {
      await demo.setup(globe);
    }

    await globe.ready;

    loader?.classList.add("hidden");
  } catch (err) {
    console.error(`Failed to init ${containerId}:`, err);
    loader?.classList.add("hidden");
    error?.classList.add("visible");
  }
}

// --- Intersection Observer for Lazy Loading ---

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        // Find the demo config that matches this ID
        for (const section of sections) {
          const demo = section.demos.find((d) => d.id === id);
          if (demo) {
            initGlobe(demo);
            break;
          }
        }
      }
    });
  },
  { rootMargin: "200px", threshold: 0.1 },
);

// --- Toggle Logic ---

function toggleSection(sectionId: string) {
  const content = document.getElementById(`content-${sectionId}`);
  const icon = document.getElementById(`icon-${sectionId}`);

  if (content && icon) {
    const isCollapsed = content.classList.contains("collapsed");

    if (isCollapsed) {
      // Opening
      content.classList.remove("collapsed");
      icon.classList.remove("collapsed");

      // Trigger observers immediately just in case
      // The IntersectionObserver loop will pick this up automatically as they become visible
    } else {
      // Closing
      content.classList.add("collapsed");
      icon.classList.add("collapsed");
    }
  }
}

// --- Main Entry ---

function renderApp() {
  const root = document.getElementById("demo-container");
  if (!root) return;

  // 1. Render Sections
  let html = "";
  sections.forEach((section, index) => {
    html += createSectionHTML(section, index);
  });
  root.innerHTML = html;

  // 2. Render Demos into Grids
  sections.forEach((section) => {
    const grid = document.getElementById(`grid-${section.id}`);
    if (grid) {
      section.demos.forEach((demo) => {
        grid.insertAdjacentHTML("beforeend", createDemoHTML(demo));
      });
    }
  });

  // 3. Attach Observer
  document
    .querySelectorAll(".globe-container")
    .forEach((el) => observer.observe(el));
}

// --- Global Exports (for inline onclicks) ---
(window as any).toggleFullscreen = async (containerId: string) => {
  // Check if globe exists, if not try to init it (should be handled by observer but for safety)
  if (!globes.has(containerId)) {
    // Find config
    for (const section of sections) {
      const demo = section.demos.find((d) => d.id === containerId);
      if (demo) {
        await initGlobe(demo);
        break;
      }
    }
  }
  globes.get(containerId)?.toggleFullscreen();
};
(window as any).toggleSection = toggleSection;

// --- Event Listeners ---
document.addEventListener("DOMContentLoaded", () => {
  renderApp();
});
