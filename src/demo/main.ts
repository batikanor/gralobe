import { GlobeViz } from "../lib/GlobeViz";
import type { GlobeVizConfig } from "../lib/types";
import { customStats } from "./data";

const globes = new Map<string, GlobeViz>();
const MAX_ACTIVE_GLOBES = 6;

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
        rect.top + rect.height / 2 - window.innerHeight / 2
      );
      if (dist > furthestDistance) {
        furthestDistance = dist;
        furthestId = id;
      }
    }
    if (furthestId) destroyGlobe(furthestId);
  }
}

async function createGlobe(containerId: string) {
  const container = document.getElementById(containerId);
  if (!container || globes.has(containerId)) return;

  const loader = container.querySelector(".globe-loader") as HTMLElement;
  const error = container.querySelector(".globe-error");
  const progressBar = container.querySelector(
    ".globe-progress-bar"
  ) as HTMLElement;
  const progressText = container.querySelector(".globe-progress-text");

  try {
    enforceLimit();

    const config = JSON.parse(container.dataset.config || "{}");
    const fullConfig: GlobeVizConfig = {
      autoRotate: true,
      showControls: false,
      showLegend: true,
      labels: "major",
      effects: { atmosphere: false, clouds: false },
      ...config,
      onLoadProgress: (progress: number) => {
        if (progressBar)
          progressBar.style.width = `${Math.round(progress * 100)}%`;
        if (progressText)
          progressText.textContent = `${Math.round(progress * 100)}%`;
      },
    };

    // Handle Custom Topology
    if (container.dataset.customTopology === "us_counties") {
      fullConfig.topology = {
        url: "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",
        objectName: "counties",
        disableNormalization: true,
      };
      fullConfig.autoRotate = false;
      fullConfig.statistic = customStats.us_unemployment;
    } else if (container.dataset.customTopology === "germany_districts") {
      fullConfig.topology = {
        // Now using GeoJSON directly (supported by updated ChoroplethRenderer)
        url: "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/2_hoch.geo.json",
        objectName: "counties",
        disableNormalization: true,
        // Removed idProperty: "NAME_3". Using default root "id" (Integers) for stability.
      };
      fullConfig.autoRotate = false;
      fullConfig.statistic = customStats.germany_population;
    } else if (container.dataset.customTopology === "world_cities") {
      // City-Based Demo (Urban Areas Polygons)
      fullConfig.texture = "dark";
      fullConfig.topology = {
        url: "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_urban_areas.geojson",
        objectName: "urban_areas",
        disableNormalization: true,
        idProperty: "name_conve", // Property in NE Urban Areas containing the city name
      };

      fullConfig.effects = {
        atmosphere: true,
        glowPulse: false,
        cityLights: true,
      };
      fullConfig.statistic = customStats.world_cities_pop;
    } else if (container.dataset.customTopology === "us_election_2020") {
      fullConfig.topology = {
        url: "https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json",
        objectName: "counties",
        disableNormalization: true,
      };
      fullConfig.autoRotate = false;

      if (!customStats.us_2020_election) {
        // Generate massive dataset
        const values: Record<string, number> = {};
        // Approx FIPS range
        for (let fips = 1000; fips < 56046; fips++) {
          // Bias towards red/blue based on arbitrary math to create clusters
          const val =
            (Math.sin(fips * 0.1) + Math.cos(fips * 0.05)) * 0.5 + 0.5;
          // Pad FIPS to 5 digits
          const sFips = fips.toString().padStart(5, "0");
          if (fips % 7 !== 0) {
            // Skip some to simulate real world sparsity/boundaries
            values[sFips] = val; // 0-1 (Dem % or similar)
          }
        }

        customStats.us_2020_election = {
          definition: {
            id: "us_election",
            name: "Vote Share (Sim)",
            unit: "share",
            description: "Simulated 2020 Election Data",
            colorScale: ["#ff0000", "#ffffff", "#0000ff"], // Red -> White -> Blue
            domain: [0, 1],
          },
          values: values,
        };
      }
      fullConfig.statistic = customStats.us_2020_election;
    }

    const globe = new GlobeViz(container, fullConfig);
    globes.set(containerId, globe);
    updateCounter();

    await globe.ready;

    // If we just loaded the US topology, rotate to it
    if (container.dataset.customTopology === "us_counties") {
      // Rough approximation for US view
      // globe.controls.autoRotate = false;
    }

    const customStatKey = container.dataset.customStat;
    if (customStatKey && customStats[customStatKey]) {
      globe.setStatistic(customStats[customStatKey]);
    }

    loader?.classList.add("hidden");
  } catch (err) {
    console.error(`Failed: ${containerId}`, err);
    loader?.classList.add("hidden");
    error?.classList.add("visible");
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

// Make globally accessible for inline onclick handlers
(window as any).toggleFullscreen = async (containerId: string) => {
  if (!globes.has(containerId)) await createGlobe(containerId);
  globes.get(containerId)?.toggleFullscreen();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !globes.has(entry.target.id)) {
        createGlobe(entry.target.id);
      }
    });
  },
  { rootMargin: "100px", threshold: 0.1 }
);

// Generate stats gallery
const stats = [
  "lifeExpectancy",
  "humanDevIndex",
  "gdpPerCapita",
  "co2Emissions",
  "renewableEnergy",
  "internetUsers",
  "urbanPopulation",
  "healthExpenditure",
  "forestArea",
  "population",
  "accessElectricity",
  "educationExpenditure",
];

const gallery = document.getElementById("stats-gallery");
if (gallery) {
  stats.forEach((id, i) => {
    const showControls = i % 3 === 0; // Every 3rd one has controls
    gallery.insertAdjacentHTML(
      "beforeend",
      `
    <div class="variant">
      <div class="variant-header">
        <span class="variant-title">${id}</span>
        <span class="variant-meta">${showControls ? "⚙" : ""}</span>
      </div>
      <div class="variant-container height-250 globe-container" id="globe-stat-${id}" 
           data-config='{"statistic":"${id}","labels":"none","effects":{"atmosphere":false,"clouds":false},"showControls":${showControls}}'>
        <div class="globe-loader"></div>
        <div class="globe-toolbar">
          ${showControls ? `` : ""}
          <button class="toolbar-btn" onclick="toggleFullscreen('globe-stat-${id}')" title="Fullscreen">⛶</button>
        </div>
      </div>
    </div>
  `
    );
  });
}

document
  .querySelectorAll(".globe-container")
  .forEach((c) => observer.observe(c));
