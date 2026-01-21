/**
 * GlobeViz - Main class for creating interactive globe visualizations
 */

import { gsap } from "gsap";
import GUI from "lil-gui";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { ChoroplethRenderer } from "../components/ChoroplethRenderer";
import { CountryLabels } from "../components/CountryLabels";
import { DataGrid } from "../components/DataGrid";
import { Exporter } from "../components/Exporter";
import { Legend } from "../components/Legend";
import { MarkerLayer } from "../components/MarkerLayer";
import { Toolbar } from "../components/Toolbar";
import {
  STATISTICS as INTERNAL_STATISTICS,
  WORLD_STATISTICS,
} from "../data/worldStatistics";
import {
  atmosphereFragmentShader,
  atmosphereVertexShader,
  fragmentShader,
  SPHERE_RADIUS,
  starFragmentShader,
  starVertexShader,
  vertexShader,
} from "./shaders";
import { BUILT_IN_STATISTICS } from "./statistics";
import { UrbanMapper } from "./UrbanMapper";

import type {
  CountryData,
  EffectsConfig,
  ExportOptions,
  GlobeVizConfig,
  LabelStyle,
  MarkerConfig,
  MarkerData,
  StatisticData,
  TexturePreset,
  TopologyConfig,
} from "./types";

/**
 * Earth texture URLs
 */
const EARTH_TEXTURES: Record<TexturePreset, string> = {
  satellite:
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
  natural:
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg",
  dark: "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  light:
    "https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg",
  night:
    "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png",
  topographic:
    "https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg",
};

/**
 * Public API for controlling the globe
 */
export interface GlobeVizAPI {
  /** Promise that resolves when globe is fully initialized */
  ready: Promise<void>;
  /** Animate to globe view */
  toGlobe(): void;
  /** Animate to flat map view */
  toFlat(): void;
  /** Set morph value directly (0 = flat, 1 = globe) */
  setMorph(value: number): void;
  /** Get current morph value */
  getMorph(): number;
  /** Change the displayed statistic */
  setStatistic(id: string | StatisticData): void;
  /** Change label style */
  setLabels(style: LabelStyle): void;
  /** Change texture */
  setTexture(preset: TexturePreset): void;
  /** Enable/disable auto-rotation */
  setAutoRotate(enabled: boolean): void;
  /** Take a screenshot */
  screenshot(options?: ExportOptions): void;
  /** Record a GIF animation */
  recordGif(options?: ExportOptions): Promise<void>;
  /** Record a video */
  recordVideo(options?: ExportOptions): Promise<void>;
  /** Update effects configuration */
  setEffects(effects: Partial<EffectsConfig>): void;
  /** Set marker data for city-level visualization */
  setMarkers(data: MarkerData[], config?: MarkerConfig): void;
  /** Set urban city data for visualization */
  setUrbanData(
    points: {
      lat: number;
      lon: number;
      value: number;
      id?: string;
      name?: string;
      label?: string;
    }[],
  ): Promise<void>;
  /** Resize the visualization */
  resize(width: number, height: number): void;
  /** Toggle fullscreen mode */
  toggleFullscreen(): Promise<void>;
  /** Check if currently fullscreen */
  isFullscreen(): boolean;
  /** Toggle between globe and flat projection */
  toggleProjection(): void;
  /** Get current statistical data for grid */
  getCurrentData(): Record<string, number>;
  /** Destroy the instance and clean up */
  destroy(): void;
}

// Default configuration
const DEFAULT_CONFIG: Required<
  Omit<
    GlobeVizConfig,
    | "data"
    | "onCountryClick"
    | "onViewChange"
    | "onLoadProgress"
    | "width"
    | "height"
    | "topology"
  >
> = {
  texture: "satellite",
  labels: "data",
  statistic: "lifeExpectancy",
  autoRotate: false,
  initialView: "globe",
  showControls: false,
  showDebug: false,
  showToolbar: false,
  showLegend: true,
  effects: {
    atmosphereIntensity: 0,
    atmosphere: false,
    clouds: false,
    cloudSpeed: 1.0,
    cloudOpacity: 0.6,
    starTwinkle: true,
    aurora: false,
    cityLights: false,
    oceanSpecular: false,
    gridLines: false,
    gridOpacity: 0.5,
    hologramMode: false,
    vintageMode: false,
    thermalMode: false,
    blueprintMode: false,
    glowPulse: false,
  },
  extrudeHeight: false,
  pointRadius: 140,
};

/**
 * GlobeViz - Interactive 3D Globe Visualization
 *
 * @example
 * ```typescript
 * // Basic usage
 * const globe = new GlobeViz('#container');
 *
 * // With configuration
 * const globe = new GlobeViz('#container', {
 *   texture: 'satellite',
 *   labels: 'all',
 *   statistic: 'lifeExpectancy',
 *   autoRotate: true,
 * });
 *
 * // Control programmatically
 * globe.toFlat();
 * globe.setStatistic('gdpPerCapita');
 * ```
 */
export class GlobeViz implements GlobeVizAPI {
  private container: HTMLElement;
  private config: Required<
    Omit<
      GlobeVizConfig,
      | "data"
      | "onCountryClick"
      | "onViewChange"
      | "width"
      | "height"
      | "topology"
      | "onLoadProgress"
    >
  > & {
    data?: CountryData[];
    onCountryClick?: GlobeVizConfig["onCountryClick"];
    onViewChange?: GlobeVizConfig["onViewChange"];
    onLoadProgress?: GlobeVizConfig["onLoadProgress"];
    width?: number;
    height?: number;
    topology?: TopologyConfig;
  };

  // Three.js core
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;

  // Globe components
  private globe: THREE.Mesh | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private atmosphere: THREE.Mesh | null = null;
  private stars: THREE.Points | null = null;

  // Helper components
  private gui: GUI | null = null;
  private choropleth: ChoroplethRenderer | null = null;
  private legend: Legend | null = null;
  private exporter: Exporter | null = null;
  private countryLabels: CountryLabels | null = null;
  private markerLayer: MarkerLayer | null = null;
  private toolbar: Toolbar | null = null;
  private dataGrid: DataGrid | null = null;
  private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
  private dataTexture: THREE.CanvasTexture | null = null;

  // State
  private morph = 0;
  private currentStatistic: string | null = null;
  private currentValues: Record<string, number> | null = null;
  private animationId: number | null = null;
  private isDestroyed = false;
  private urbanPoints:
    | { lat: number; lon: number; value: number; id?: string }[]
    | null = null;

  /** Promise that resolves when fully initialized */
  public ready: Promise<void>;
  private resolveReady!: () => void;
  private rejectReady!: (reason?: any) => void;

  /**
   * Create a new GlobeViz instance
   * @param container CSS selector or HTMLElement
   * @param config Configuration options
   */
  constructor(container: string | HTMLElement, config: GlobeVizConfig = {}) {
    // Get container element
    if (typeof container === "string") {
      const el = document.querySelector(container);
      if (!el) throw new Error(`Container not found: ${container}`);
      this.container = el as HTMLElement;
    } else {
      this.container = container;
    }

    this.container.classList.add("gralobe-viz-container");

    // Merge config with defaults
    this.config = {
      ...DEFAULT_CONFIG,
      ...config,
      effects: { ...DEFAULT_CONFIG.effects, ...(config.effects || {}) },
    };

    console.log("GlobeViz v5 initialized", this.config.effects);

    // Create ready promise
    this.ready = new Promise((resolve, reject) => {
      this.resolveReady = resolve;
      this.rejectReady = reject;
    });

    // Initialize
    this.init();
  }
  private async init(): Promise<void> {
    try {
      const width = this.config.width || this.container.clientWidth || 800;
      const height = this.config.height || this.container.clientHeight || 600;

      // Setup Three.js
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x000812);

      this.camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      this.camera.position.set(
        0,
        0,
        this.config.initialView === "flat" ? 350 : 150,
      );

      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.container.appendChild(this.renderer.domElement);

      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.minDistance = 2.0;
      this.controls.maxDistance = 400;

      // Initialize components
      this.choropleth = new ChoroplethRenderer(
        this.config.topology,
        (progress, status) => {
          this.config.onLoadProgress?.(progress, status);
        },
        () => {
          // Texture updated
          if (this.material && this.material.uniforms.uDataTexture.value) {
            this.material.uniforms.uDataTexture.value.needsUpdate = true;
            this.material.uniforms.uDataOverlay.value = 1;

            // If we receive an update and data opacity is 0, fade it in
            if (this.material.uniforms.uDataOpacity.value === 0) {
              gsap.to(this.material.uniforms.uDataOpacity, {
                value: 0.7,
                duration: 1.0,
              });
            }
          }
        },
      );

      if (this.config.showLegend) {
        this.legend = new Legend(this.container);
      }

      // Create globe with shaders
      await this.createGlobe();
      this.createStars();
      if (this.config.effects.atmosphere) {
        this.createAtmosphere();
      }

      // Initialize country labels
      this.countryLabels = new CountryLabels(this.container, SPHERE_RADIUS);
      this.scene.add(this.countryLabels.getGroup());
      if (this.globe) {
        this.countryLabels.setGlobe(this.globe);
      }
      this.countryLabels.setCamera(this.camera);
      this.countryLabels.setStyle(this.config.labels);

      // Initialize exporter with overlay elements
      this.exporter = new Exporter(this.renderer, this.scene, this.camera);
      if (this.legend) {
        this.exporter.setLegendElement(this.legend.getElement());
      }
      if (this.countryLabels) {
        this.exporter.setCountryLabels(this.countryLabels);
      }

      // Setup controls GUI if enabled
      if (this.config.showControls || this.config.showDebug) {
        this.createGUI();
      }

      // Setup Interactions
      this.setupInteraction();

      // Wait for choropleth data
      await this.choropleth.waitForLoad();

      // Auto-label custom topology (e.g. for districts, counties)
      const featureLabels = this.choropleth.getFeatureLabels();
      if (featureLabels.length > 0) {
        this.addCustomLabels(featureLabels);
      }

      // Set initial statistic
      this.setStatistic(this.config.statistic);

      // Set initial view
      this.morph = this.config.initialView === "globe" ? 1 : 0;
      if (this.material) {
        this.material.uniforms.uMorph.value = this.morph;
      }
      this.countryLabels?.setMorph(this.morph);

      // Handle resize
      window.addEventListener("resize", this.handleResize);

      // Handle fullscreen changes
      document.addEventListener(
        "fullscreenchange",
        this.handleFullscreenChange,
      );

      // Make canvas focusable for keyboard events
      this.renderer.domElement.tabIndex = 0;
      this.renderer.domElement.style.outline = "none"; // Remove default focus outline

      // Focus on click
      this.renderer.domElement.addEventListener("mousedown", () => {
        this.renderer.domElement.focus();
      });

      // Handle keyboard shortcuts
      this.renderer.domElement.addEventListener("keydown", this.handleKeydown);

      // Start animation loop
      this.animate();

      // Initialize keys for fullscreen/flat

      // Initialize UI components if showToolbar is true (or legacy showControls)
      // We explicitly check both, prioritizing showToolbar
      if (this.config.showToolbar || this.config.showControls) {
        this.toolbar = new Toolbar(this.container, {
          onShowData: () => {
            const stats = this.currentStatistic
              ? this.getStatisticMetadata(this.currentStatistic)
              : null;
            const title = stats?.definition.name || "Current Data";
            this.dataGrid?.show(title, this.getCurrentData());
          },
          onToggleFullscreen: () => this.toggleFullscreen(),
          onToggleProjection: () => this.toggleProjection(),
        });
        this.dataGrid = new DataGrid(this.container);

        // Set initial icon state based on initialView
        this.toolbar.updateProjectionIcon(this.config.initialView === "globe");
      }

      // Signal that initialization is complete
      this.resolveReady();
    } catch (err) {
      console.error("GlobeViz init failed:", err);
      // Explicitly reject the ready promise so listeners know it died
      this.rejectReady(err);
    }
  }

  // ... (existing code)

  private handleKeydown = (e: KeyboardEvent): void => {
    if (this.isDestroyed) return;

    // Only handle events if the canvas is focused
    if (document.activeElement !== this.renderer.domElement) return;

    if (e.key === "g" || e.key === "G") {
      this.toggleProjection();
    }

    if (e.key === "f" || e.key === "F") {
      this.toggleFullscreen();
    }
  };

  private async createGlobe(): Promise<void> {
    // Load base earth texture
    // Load base earth texture with timeout
    const loadTexture = this.textureLoader.loadAsync(
      EARTH_TEXTURES[this.config.texture],
    );

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error("Texture load timed out after 10s")),
        10000,
      ),
    );

    const baseTex = await Promise.race([loadTexture, timeout]);

    // Safety check: if destroyed before load finished
    if (this.isDestroyed || !this.renderer) return;

    baseTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
    baseTex.minFilter = THREE.LinearMipmapLinearFilter;
    baseTex.magFilter = THREE.LinearFilter;

    // Create empty data texture
    const emptyCanvas = document.createElement("canvas");
    emptyCanvas.width = 2048;
    emptyCanvas.height = 1024;
    this.dataTexture = new THREE.CanvasTexture(emptyCanvas);

    // High resolution plane geometry
    const geometry = new THREE.PlaneGeometry(
      Math.PI * 2 * SPHERE_RADIUS,
      Math.PI * SPHERE_RADIUS,
      256,
      128,
    );

    // Shader material
    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        // Core uniforms
        uMorph: { value: 0 },
        uTime: { value: 0 },
        uParchment: { value: 0 },
        uExtremeParchment: { value: 0 },
        uTransitionEffect: { value: 0 },
        uTexture: { value: baseTex },
        uDataTexture: { value: this.dataTexture },
        uCloudTexture: { value: null },
        uNightTexture: { value: null },
        uDataOpacity: { value: 0 },
        uDataOverlay: { value: 0 },
        uExtrudeHeight: { value: this.config.extrudeHeight ? 1 : 0 },
        uSunDir: { value: new THREE.Vector3(1, 0.5, 1).normalize() },

        // Effect uniforms
        uClouds: { value: this.config.effects.clouds ? 1 : 0 },
        uCloudSpeed: { value: this.config.effects.cloudSpeed || 1.0 },
        uCloudOpacity: { value: this.config.effects.cloudOpacity || 0.6 },
        uAtmosphereIntensity: {
          value: this.config.effects.atmosphereIntensity || 0,
        },
        uAurora: { value: this.config.effects.aurora ? 1 : 0 },
        uAuroraIntensity: { value: 1.0 },
        uCityLights: { value: this.config.effects.cityLights ? 1 : 0 },
        uCityLightsIntensity: { value: 1.0 },
        uOceanSpecular: { value: this.config.effects.oceanSpecular ? 1 : 0 },
        uSpecularIntensity: { value: 1.0 },
        uSunGlow: { value: 0 },
        uGridLines: { value: this.config.effects.gridLines ? 1 : 0 },
        uGridOpacity: { value: this.config.effects.gridOpacity || 0.5 },
        uScanEffect: { value: 0 },
        uScanSpeed: { value: 1.0 },
        uHologram: { value: this.config.effects.hologramMode ? 1 : 0 },
        uHologramColor: { value: new THREE.Color(0x00ffff) },
        uVintage: { value: this.config.effects.vintageMode ? 1 : 0 },
        uThermal: { value: this.config.effects.thermalMode ? 1 : 0 },
        uBlueprint: { value: this.config.effects.blueprintMode ? 1 : 0 },
        uGlowPulse: { value: this.config.effects.glowPulse ? 1 : 0 },
        uGlowColor: { value: new THREE.Color(0x4488ff) },
      },
      side: THREE.DoubleSide,
    });

    this.globe = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.globe);
  }

  private createAtmosphere(): void {
    const atmosGeometry = new THREE.PlaneGeometry(
      Math.PI * 2 * SPHERE_RADIUS * 1.15,
      Math.PI * SPHERE_RADIUS * 1.15,
      128,
      64,
    );

    const atmosMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uMorph: { value: 0 },
        uOpacity: { value: 1.0 },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
    this.scene.add(this.atmosphere);
  }

  private createStars(): void {
    const starCount = 3000;
    const starsGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);
    const phases = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const r = 300 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      sizes[i] = 0.5 + Math.random() * 1.5;
      phases[i] = Math.random() * Math.PI * 2;
    }

    starsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    starsGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    starsGeo.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const starsMat = new THREE.ShaderMaterial({
      vertexShader: starVertexShader,
      fragmentShader: starFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uTwinkle: { value: this.config.effects.starTwinkle ? 1 : 0 },
        uOpacity: { value: 1.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.stars = new THREE.Points(starsGeo, starsMat);
    this.scene.add(this.stars);
  }

  private createGUI(): void {
    // Ensure container has relative positioning for GUI
    const containerPosition = getComputedStyle(this.container).position;
    if (containerPosition === "static") {
      this.container.style.position = "relative";
    }

    console.warn("Creating GUI v6 (Two-Stage Navigation)");

    // Force-inject or Update custom styles
    let style = document.querySelector(
      "style#gralobe-gui-style",
    ) as HTMLStyleElement;
    if (!style) {
      style = document.createElement("style");
      style.id = "gralobe-gui-style";
      document.head.appendChild(style);
    }

    style.textContent = `
        /* Root container helper */
        .gralobe-viz-container {
            position: relative;
        }

        /* 1. Main Toggle Button (Top Right) */
        .gralobe-gui-toggle {
          position: absolute !important;
          top: 12px !important;
          right: 12px !important;
          width: 32px !important;
          height: 32px !important;
          background: rgba(0, 5, 15, 0.9) !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          border-radius: 6px !important;
          color: #ddd !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          z-index: 1002 !important;
          backdrop-filter: blur(4px) !important;
          -webkit-backdrop-filter: blur(4px) !important;
          transition: all 0.2s ease !important;
          padding: 0 !important;
        }

        .gralobe-gui-toggle:hover {
          background: rgba(20, 40, 60, 0.95) !important;
          border-color: rgba(100, 180, 255, 0.6) !important;
          color: #fff !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }

        .gralobe-gui-toggle.expanded svg {
          transform: rotate(180deg) !important;
          color: #4af !important;
        }
        
        .gralobe-gui-toggle svg {
           width: 18px !important;
           height: 18px !important;
           stroke: currentColor !important;
           transition: transform 0.3s ease !important;
        }

        /* 2. Category Toolbar (Vertical Stack beneath Toggle) */
        .gralobe-category-bar {
          position: absolute !important;
          top: 50px !important;
          right: 12px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 6px !important;
          z-index: 1001 !important;
          transition: opacity 0.2s ease, transform 0.2s ease !important;
          pointer-events: none !important;
          opacity: 0 !important;
          transform: translateX(20px) !important;
        }

        .gralobe-category-bar.visible {
          pointer-events: auto !important;
          opacity: 1 !important;
          transform: translateX(0) !important;
        }

        .gralobe-category-btn {
          background: rgba(0, 10, 20, 0.85) !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          color: #ddd !important;
          padding: 6px 12px !important;
          border-radius: 4px !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 8px !important;
          text-align: right !important;
          cursor: pointer !important;
          backdrop-filter: blur(8px) !important;
          transition: all 0.2s ease !important;
          min-width: 80px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3) !important;
        }

        .gralobe-category-btn:hover {
          background: rgba(20, 40, 70, 0.9) !important;
          border-color: #4af !important;
          color: #fff !important;
          transform: translateX(-2px) !important;
        }

        .gralobe-category-btn.active {
          background: rgba(0, 60, 120, 0.9) !important;
          border-color: #4af !important;
          color: #4af !important;
          font-weight: 600 !important;
        }

        /* 3. Transient Panels (lil-gui instances) */
        .gralobe-viz-container .lil-gui.root {
          position: absolute !important;
          top: 50px !important; /* Align with top of toolbar */
          right: 100px !important; /* To the left of the toolbar */
          width: 160px !important;
          z-index: 1000 !important;
          
          --background-color: rgba(0, 10, 20, 0.9) !important;
          --text-color: #ddd !important;
          --widget-color: rgba(60, 110, 170, 0.3) !important;
          --hover-color: rgba(70, 160, 255, 0.4) !important;
          --focus-color: #4af !important;
          --number-color: #4af !important;
          
          border-radius: 6px !important;
          border: 1px solid rgba(100, 150, 200, 0.3) !important;
          backdrop-filter: blur(12px) !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
          
          transition: opacity 0.2s ease, transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1) !important;
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translateX(10px) !important;
          display: none !important; /* Hide by default */
        }

        .gralobe-viz-container .lil-gui.root.active-panel {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translateX(0) !important;
          display: flex !important;
        }

        /* 4. Global Font Overrides */
        .gralobe-viz-container .lil-gui,
        .gralobe-viz-container .lil-gui * {
          font-size: 7px !important;
          font-family: 'Inter', system-ui, -apple-system, sans-serif !important;
          line-height: 1.2 !important;
        }
        
        /* Hide internal titles */
        .gralobe-viz-container .lil-gui.root > .title {
            display: none !important;
        }

        /* Compact inputs */
        .gralobe-viz-container .lil-gui input[type="checkbox"] {
          width: 8px !important; height: 8px !important; margin-top: 1px !important;
        }
        .gralobe-viz-container .lil-gui input[type="text"],
        .gralobe-viz-container .lil-gui input[type="number"],
        .gralobe-viz-container .lil-gui select {
            height: 12px !important;
            font-size: 7px !important;
        }
        .gralobe-viz-container .lil-gui .controller {
            margin: 2px 0 !important;
        }
    `;

    // 1. Cleanup existing GUI/Button/Toolbar
    if (this.gui) {
      try {
        this.gui.destroy();
      } catch (e) {}
      this.gui = null;
    }
    const oldBtn = this.container.querySelector(".gralobe-gui-toggle");
    if (oldBtn) oldBtn.remove();
    const oldToolbar = this.container.querySelector(".gralobe-category-bar");
    if (oldToolbar) oldToolbar.remove();

    // Create GUI attached to container - This acts as a factory/manager now
    this.gui = new GUI({
      container: this.container,
      title: "Controls",
    });

    // --- A. Main Toggle Button ---
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "gralobe-gui-toggle";
    toggleBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    `;
    toggleBtn.title = "Toggle Toolbar";
    this.container.appendChild(toggleBtn);

    // --- B. Category Toolbar Container ---
    const toolbar = document.createElement("div");
    toolbar.className = "gralobe-category-bar";
    this.container.appendChild(toolbar);

    // State
    let isToolbarOpen = false;
    let activeCategory: string | null = null;
    const categoryGUIs: { [key: string]: GUI } = {};
    const categoryBtns: { [key: string]: HTMLButtonElement } = {};

    // Helper: Close all panels
    const closeAllPanels = () => {
      Object.keys(categoryGUIs).forEach((key) => {
        categoryGUIs[key].domElement.classList.remove("active-panel");
        categoryBtns[key].classList.remove("active");
      });
      activeCategory = null;
    };

    // Helper: Toggle a specific category
    const toggleCategory = (key: string) => {
      if (activeCategory === key) {
        closeAllPanels();
      } else {
        closeAllPanels();
        activeCategory = key;
        categoryGUIs[key].domElement.classList.add("active-panel");
        categoryBtns[key].classList.add("active");
      }
    };

    // --- C. Logic: Toggle Main Toolbar ---
    const updateToolbarState = (open: boolean) => {
      isToolbarOpen = open;
      if (isToolbarOpen) {
        toolbar.classList.add("visible");
        toggleBtn.classList.add("expanded");
      } else {
        toolbar.classList.remove("visible");
        toggleBtn.classList.remove("expanded");
        closeAllPanels();
      }
    };

    toggleBtn.onclick = (e) => {
      e.stopPropagation();
      updateToolbarState(!isToolbarOpen);
    };

    // Initialize (Closed)
    updateToolbarState(false);

    // Helper: Build a Category
    const createCategory = (name: string, label: string) => {
      // 1. Button
      const btn = document.createElement("button");
      btn.className = "gralobe-category-btn";

      btn.innerText = label;
      btn.onclick = (e) => {
        e.stopPropagation();
        toggleCategory(name);
      };
      toolbar.appendChild(btn);
      categoryBtns[name] = btn;

      // 2. GUI Panel
      const gui = new GUI({ container: this.container, title: name });
      gui.domElement.classList.add("root"); // apply styles
      categoryGUIs[name] = gui;

      return gui;
    };

    // 1. Theme
    const textureFolder = createCategory("texture", "Texture");
    textureFolder
      .add(this.config, "texture", Object.keys(EARTH_TEXTURES))
      .name("Theme")
      .onChange((v: any) => this.setTexture(v));

    // 2. Navigation
    const navGUI = createCategory("nav", "Navigation");
    navGUI.add({ toGlobe: () => this.toGlobe() }, "toGlobe").name("→ Globe");
    navGUI.add({ toFlat: () => this.toFlat() }, "toFlat").name("→ Flat");
    navGUI
      .add({ morph: this.morph }, "morph", 0, 1)
      .name("Morph")
      .listen()
      .onChange((v: number) => this.setMorph(v));

    // 3. Stats
    const statsGUI = createCategory("stats", "Data");

    // Determine initial ID (handle custom object vs string)
    const initialStatId =
      typeof this.config.statistic === "string"
        ? this.config.statistic
        : this.config.statistic.definition.id;

    statsGUI
      .add({ stat: initialStatId }, "stat", Object.keys(BUILT_IN_STATISTICS))
      .name("Metric")
      .onChange((id: string) => this.setStatistic(id));

    // 4. Effects
    const fxGUI = createCategory("fx", "Effects");
    const fx = this.config.effects!;
    fxGUI.add(fx, "clouds").onChange((v: boolean) => {
      if (this.material) this.material.uniforms.uClouds.value = v ? 1 : 0;
    });
    fxGUI.add(fx, "atmosphere").onChange((v: boolean) => {
      if (this.material)
        this.material.uniforms.uAtmosphereIntensity.value = v ? 1 : 0;
    });
    fxGUI
      .add(fx, "cityLights")
      .name("City Lights")
      .onChange((v: boolean) => {
        if (this.material) this.material.uniforms.uCityLights.value = v ? 1 : 0;
      });

    // Sub-folder for special modes in the same panel
    const specialFolder = fxGUI.addFolder("Special Modes");
    specialFolder
      .add(fx, "hologramMode")
      .name("Hologram")
      .onChange((v: boolean) => {
        if (this.material) this.material.uniforms.uHologram.value = v ? 1 : 0;
      });
    specialFolder
      .add(fx, "vintageMode")
      .name("Vintage")
      .onChange((v: boolean) => {
        if (this.material) this.material.uniforms.uVintage.value = v ? 1 : 0;
      });

    // 5. Settings
    const settingsGUI = createCategory("settings", "Settings");
    settingsGUI
      .add({ labels: this.config.labels }, "labels", [
        "none",
        "minimal",
        "all",
        "data",
      ])
      .onChange((v: any) => this.setLabels(v));
    settingsGUI.add(this.config, "autoRotate").name("Auto Rotate");
    settingsGUI
      .add(
        { screenshot: () => this.screenshot({ width: 1920, height: 1080 }) },
        "screenshot",
      )
      .name("Screenshot");
  }

  private handleResize = (): void => {
    if (this.isDestroyed) return;

    const width = this.config.width || this.container.clientWidth;
    const height = this.config.height || this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.countryLabels?.resize(width, height);
  };

  private handleFullscreenChange = (): void => {
    if (this.isDestroyed) return;
    // Resize after fullscreen change
    setTimeout(() => this.handleResize(), 50);
  };

  private animate = (): void => {
    if (this.isDestroyed) return;

    this.animationId = requestAnimationFrame(this.animate);

    const time = performance.now() * 0.001;

    // Update time uniform
    if (this.material) {
      this.material.uniforms.uTime.value = time;
    }
    if (this.stars) {
      (this.stars.material as THREE.ShaderMaterial).uniforms.uTime.value = time;
    }

    this.controls.update();

    // Auto rotation
    if (this.config.autoRotate && this.globe) {
      this.globe.rotation.y += 0.002 * this.morph;
    }

    // Update labels
    this.countryLabels?.update();

    // Update markers
    this.markerLayer?.update(time);

    this.renderer.render(this.scene, this.camera);
    this.countryLabels?.render(this.scene, this.camera);
  };

  // Public API Implementation

  toGlobe(): void {
    // Unlock controls
    this.controls.enableRotate = true;
    this.controls.minAzimuthAngle = -Infinity;
    this.controls.maxAzimuthAngle = Infinity;
    this.controls.minPolarAngle = 0;
    this.controls.maxPolarAngle = Math.PI;

    // Restore Globe Navigation defaults
    this.controls.screenSpacePanning = false;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN,
    };

    // Calculate rotation to center the active region
    let targetRotationY = 0;
    const bounds = this.choropleth?.getBounds();
    if (bounds) {
      const [minLon, _, maxLon, __] = bounds;
      // Center of the visible region
      const centerLon = (minLon + maxLon) / 2;
      // Rotate the globe so the center longitude faces the camera (Z-axis is view)
      // Assuming standard mapping: -Lon brings it to center
      targetRotationY = -centerLon * (Math.PI / 180);
    }

    gsap.to(this, {
      morph: 1,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        if (this.material) {
          this.material.uniforms.uMorph.value = this.morph;
        }
        if (this.atmosphere) {
          (
            this.atmosphere.material as THREE.ShaderMaterial
          ).uniforms.uMorph.value = this.morph;
        }
        this.countryLabels?.setMorph(this.morph);
        this.markerLayer?.setMorph(this.morph);
        this.config.onViewChange?.("globe", this.morph);
      },
    });

    // Reset Camera Position to standard distance
    gsap.to(this.camera.position, {
      x: 0,
      y: 0,
      z: 200,
      duration: 2.5,
      ease: "power2.inOut",
    });

    // Reset Controls Target to world center
    gsap.to(this.controls.target, {
      x: 0,
      y: 0,
      z: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls.update();
      },
    });

    // Rotate Globe to face the region
    if (this.globe) {
      gsap.to(this.globe.rotation, {
        y: targetRotationY,
        x: 0,
        z: 0,
        duration: 2.5,
        ease: "power2.inOut",
      });
    }

    // Restore space elements
    if (this.stars) {
      gsap.to((this.stars.material as THREE.ShaderMaterial).uniforms.uOpacity, {
        value: 1,
        duration: 1.0,
      });
    }
    if (this.atmosphere) {
      gsap.to(
        (this.atmosphere.material as THREE.ShaderMaterial).uniforms.uOpacity,
        {
          value: 1,
          duration: 1.0,
        },
      );
    }

    // Update toolbar icon
    this.toolbar?.updateProjectionIcon(true);
  }

  toFlat(): void {
    // 1. Get Bounds from Choropleth (if region-specific)
    const bounds = this.choropleth?.getBounds();

    // Map dimensions (World)
    const worldWidth = Math.PI * 2 * SPHERE_RADIUS;
    const worldHeight = Math.PI * SPHERE_RADIUS;

    let targetX = 0;
    let targetY = 0;
    let fitWidth = worldWidth;
    let fitHeight = worldHeight;

    if (bounds) {
      const [minLon, minLat, maxLon, maxLat] = bounds;

      // Convert to Map Coordinates
      // Lon (-180 to 180) -> X (-width/2 to width/2)
      // Lat (-90 to 90) -> Y (-height/2 to height/2)
      const minX = (minLon / 180) * (worldWidth / 2);
      const maxX = (maxLon / 180) * (worldWidth / 2);
      const minY = (minLat / 90) * (worldHeight / 2);
      const maxY = (maxLat / 90) * (worldHeight / 2);

      targetX = (minX + maxX) / 2;
      targetY = (minY + maxY) / 2;
      fitWidth = (maxX - minX) * 1.2; // Add 20% padding
      fitHeight = (maxY - minY) * 1.2;
    }

    // Camera FOV calculation
    const fovRad = (this.camera.fov * Math.PI) / 180;
    const aspect = this.camera.aspect;

    // Distance to fit height
    const distFitHeight = fitHeight / 2 / Math.tan(fovRad / 2);

    // Distance to fit width
    const distFitWidth = fitWidth / (2 * Math.tan(fovRad / 2) * aspect);

    // Pick minimum distance to ensuring coverage (or fit if it's a region?)
    // If it's a region, we want to FIT it (see all of it).
    // If it's the world, we want to COVER it (no black bars).
    // But usually for stats, we want to see everything.
    // "Cover" logic (used previously) zooms in. "Fit" logic zooms out.
    // Let's use FIT for regions, COVER for world?
    // Actually, "Constrain the 2d version... to only available places" calls for FIT.
    // So let's use MAX distance to ensure the whole region fits.
    const fitZ = Math.max(distFitHeight, distFitWidth);

    // Disable controls during animation
    this.controls.enabled = false;

    // Animate Morph
    gsap.to(this, {
      morph: 0,
      duration: 2.0,
      ease: "power3.inOut",
      onUpdate: () => {
        if (this.material) {
          this.material.uniforms.uMorph.value = this.morph;
        }
        if (this.atmosphere) {
          (
            this.atmosphere.material as THREE.ShaderMaterial
          ).uniforms.uMorph.value = this.morph;
        }
        this.countryLabels?.setMorph(this.morph);
        this.markerLayer?.setMorph(this.morph);
        this.config.onViewChange?.("flat", this.morph);
      },
      onComplete: () => {
        // Re-enable and lock controls to 2D view
        this.controls.enabled = true;
        this.controls.enableRotate = false;
        this.controls.enableZoom = true;
        this.controls.enablePan = true;

        // Strict Constraints for Front View
        this.controls.minAzimuthAngle = 0;
        this.controls.maxAzimuthAngle = 0;
        this.controls.minPolarAngle = Math.PI / 2;
        this.controls.maxPolarAngle = Math.PI / 2;

        this.controls.target.set(targetX, targetY, 0);
        this.controls.update();
      },
    });

    // Reset rotation
    if (this.globe) {
      gsap.to(this.globe.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.0,
        ease: "power3.inOut",
      });
    }
    if (this.atmosphere) {
      gsap.to(this.atmosphere.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2.0,
        ease: "power3.inOut",
      });
    }

    // Animate Camera Position & Target
    gsap.to(this.camera.position, {
      x: targetX,
      y: targetY,
      z: fitZ,
      duration: 2.0,
      ease: "power3.inOut",
    });

    gsap.to(this.controls.target, {
      x: targetX,
      y: targetY,
      z: 0,
      duration: 2.0,
      ease: "power3.inOut",
    });

    gsap.to(this.camera.up, {
      x: 0,
      y: 1,
      z: 0,
      duration: 2.0,
      ease: "power3.inOut",
    });

    // Setup Flat Map Navigation
    this.controls.screenSpacePanning = true;
    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.ROTATE,
    };

    // Fade out space elements
    if (this.stars) {
      gsap.to((this.stars.material as THREE.ShaderMaterial).uniforms.uOpacity, {
        value: 0,
        duration: 1.0,
      });
    }
    if (this.atmosphere) {
      gsap.to(
        (this.atmosphere.material as THREE.ShaderMaterial).uniforms.uOpacity,
        {
          value: 0,
          duration: 1.0,
        },
      );
    }

    // Update toolbar icon
    this.toolbar?.updateProjectionIcon(false);
  }

  /**
   * Setup mouse interactions (Click to Zoom, etc.)
   */
  private setupInteraction(): void {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const planeIntersect = new THREE.Vector3();

    let isDragging = false;
    let mouseDownPos = new Date().getTime();

    // Track dragging to distinguish from clicking
    this.renderer.domElement.addEventListener("mousedown", () => {
      isDragging = false;
      mouseDownPos = new Date().getTime();
    });

    this.renderer.domElement.addEventListener("mousemove", () => {
      isDragging = true;
    });

    // Handle Click (Zoom In)
    this.renderer.domElement.addEventListener("click", (event) => {
      // If drag occurred or long press, ignore
      if (isDragging && new Date().getTime() - mouseDownPos > 200) return;

      // Calculate mouse position
      const rect = this.renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Only handle interaction in Flat mode
      if (this.morph < 0.1) {
        raycaster.setFromCamera(mouse, this.camera);

        // Raycast against the mathematical plane at Z=0 (where the map is)
        raycaster.ray.intersectPlane(plane, planeIntersect);

        if (planeIntersect) {
          // Check bounds (Map Width/Height from shader)
          const mapLimitX = Math.PI * SPHERE_RADIUS;
          const mapLimitY = (Math.PI * SPHERE_RADIUS) / 2;

          if (
            Math.abs(planeIntersect.x) <= mapLimitX &&
            Math.abs(planeIntersect.y) <= mapLimitY
          ) {
            // Valid Map Click: Zoom to Point
            const targetZ = 50; // Close zoom level

            // Animate Target (Pan to point)
            gsap.to(this.controls.target, {
              x: planeIntersect.x,
              y: planeIntersect.y,
              z: 0,
              duration: 1.5,
              ease: "power2.inOut",
            });

            // Animate Camera (Zoom In)
            gsap.to(this.camera.position, {
              x: planeIntersect.x,
              y: planeIntersect.y,
              z: targetZ,
              duration: 1.5,
              ease: "power2.inOut",
            });
          }
        }
      }
    });
  }

  setMorph(value: number): void {
    this.morph = value;
    if (this.material) this.material.uniforms.uMorph.value = value;
    if (this.atmosphere) {
      (this.atmosphere.material as THREE.ShaderMaterial).uniforms.uMorph.value =
        value;
    }
    this.countryLabels?.setMorph(value);
    this.markerLayer?.setMorph(value);
  }

  getMorph(): number {
    return this.morph;
  }

  setStatistic(idOrData: string | StatisticData): void {
    if (this.isDestroyed) return;

    let customStat: StatisticData | null = null;
    if (typeof idOrData === "string") {
      customStat = this.getStatisticMetadata(idOrData);
      this.currentStatistic = idOrData;
    } else {
      customStat = idOrData;
      this.currentStatistic = customStat.definition.id;
    }

    if (customStat) {
      this.currentValues =
        customStat.values instanceof Map
          ? Object.fromEntries(customStat.values)
          : customStat.values;

      if (this.choropleth) {
        const canvas = this.choropleth.renderCustomTexture(
          customStat.values,
          customStat.definition.colorScale,
          customStat.definition.domain,
        );
        if (this.material && canvas) {
          const texture = new THREE.CanvasTexture(canvas);
          texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
          texture.needsUpdate = true;
          this.material.uniforms.uDataTexture.value = texture;
          this.material.uniforms.uDataOverlay.value = 1;

          // If we receive an update and data opacity is 0, fade it in
          if (this.material.uniforms.uDataOpacity.value === 0) {
            gsap.to(this.material.uniforms.uDataOpacity, {
              value: 0.7,
              duration: 1.0,
            });
          }
        }

        // Update legend with custom stat definition
        if (this.legend) {
          this.legend.show(customStat.definition as any);
        }
      }
    }
  }

  setLabels(style: LabelStyle): void {
    this.countryLabels?.setStyle(style);
  }

  /**
   * Add custom labels for cities, states, or any geographic points
   */
  addCustomLabels(
    labels: Array<{
      id: string;
      name: string;
      lat: number;
      lon: number;
      size?: "large" | "medium" | "small" | "tiny";
    }>,
  ): void {
    this.countryLabels?.addCustomLabels(labels);
  }

  /**
   * Clear all custom labels (keeps country labels)
   */
  clearCustomLabels(): void {
    this.countryLabels?.clearCustomLabels();
  }

  async setTexture(preset: TexturePreset): Promise<void> {
    const url = EARTH_TEXTURES[preset];
    if (!url || !this.material) return;

    try {
      const newTexture = await this.textureLoader.loadAsync(url);
      newTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      newTexture.minFilter = THREE.LinearMipmapLinearFilter;
      newTexture.magFilter = THREE.LinearFilter;
      this.material.uniforms.uTexture.value = newTexture;
    } catch (error) {
      console.error("Failed to load texture:", preset, error);
    }
  }

  setAutoRotate(enabled: boolean): void {
    this.config.autoRotate = enabled;
  }

  screenshot(options?: ExportOptions): void {
    this.exporter?.screenshot(options);
  }

  async recordGif(options?: ExportOptions): Promise<void> {
    if (!this.exporter) return;

    const duration = options?.duration || 5;
    const fps = options?.fps || 20;
    const totalFrames = duration * fps;

    this.exporter.startGifCapture(options);

    // Capture frames over duration
    for (let i = 0; i < totalFrames; i++) {
      this.exporter.captureGifFrame();
      await new Promise((r) => setTimeout(r, 1000 / fps));
    }
  }

  async recordVideo(options?: ExportOptions): Promise<void> {
    if (!this.exporter) return;

    const duration = options?.duration || 5;

    await this.exporter.startVideoRecording(options);

    // Record for specified duration
    await new Promise((r) => setTimeout(r, duration * 1000));

    this.exporter.stopVideoRecording();
  }

  setEffects(effects: Partial<EffectsConfig>): void {
    Object.assign(this.config.effects, effects);

    if (!this.material) return;

    // Apply effects to uniforms
    if (effects.atmosphere !== undefined) {
      if (effects.atmosphere && !this.atmosphere) {
        this.createAtmosphere();
      } else if (!effects.atmosphere && this.atmosphere) {
        this.scene.remove(this.atmosphere);
        this.atmosphere.geometry.dispose();
        (this.atmosphere.material as THREE.Material).dispose();
        this.atmosphere = null;
      }
    }
    if (effects.clouds !== undefined) {
      this.material.uniforms.uClouds.value = effects.clouds ? 1 : 0;
    }
    if (effects.cloudSpeed !== undefined) {
      this.material.uniforms.uCloudSpeed.value = effects.cloudSpeed;
    }
    if (effects.cloudOpacity !== undefined) {
      this.material.uniforms.uCloudOpacity.value = effects.cloudOpacity;
    }
    if (effects.atmosphereIntensity !== undefined) {
      this.material.uniforms.uAtmosphereIntensity.value =
        effects.atmosphereIntensity;
    }
    if (effects.gridLines !== undefined) {
      this.material.uniforms.uGridLines.value = effects.gridLines ? 1 : 0;
    }
    if (effects.gridOpacity !== undefined) {
      this.material.uniforms.uGridOpacity.value = effects.gridOpacity;
    }
    if (effects.glowPulse !== undefined) {
      this.material.uniforms.uGlowPulse.value = effects.glowPulse ? 1 : 0;
    }
    if (effects.starTwinkle !== undefined && this.stars) {
      (this.stars.material as THREE.ShaderMaterial).uniforms.uTwinkle.value =
        effects.starTwinkle ? 1 : 0;
    }
  }

  setMarkers(data: MarkerData[], config?: MarkerConfig): void {
    // Create marker layer if it doesn't exist
    if (!this.markerLayer) {
      this.markerLayer = new MarkerLayer(config);
      this.scene.add(this.markerLayer.getGroup());
      this.markerLayer.setMorph(this.morph);
    } else if (config) {
      this.markerLayer.setConfig(config);
    }

    this.markerLayer.setMarkers(data);
  }

  async setUrbanData(
    points: {
      lat: number;
      lon: number;
      value: number;
      id?: string;
      name?: string;
      label?: string;
    }[],
  ): Promise<void> {
    if (!this.choropleth) return;

    // Save points for regeneration (e.g. radius change)
    this.urbanPoints = points;

    // 1. Map points to urban topology
    const radius = this.config.pointRadius || 140;

    // We force synthetic boundaries to allow user control over radius/visibility
    const urbanData = await UrbanMapper.mapPointsToTopology(
      points,
      radius,
      true,
    );

    // 2. Inject features into ChoroplethRenderer
    // 2. Inject features into ChoroplethRenderer
    // User requested "City Based Gralobe", NOT with all countries.
    // So we REPLACE the existing features with just the cities.
    this.choropleth.setFeatures(urbanData.features);

    // Auto-label the new urban features
    const featureLabels = this.choropleth.getFeatureLabels();
    if (featureLabels.length > 0) {
      this.addCustomLabels(featureLabels);
    }

    // 3. Render the texture with the new data
    // Use the color scale from the current statistic if available, otherwise default heatmap
    let colorScale: [string, string, string] = [
      "#ffffb2",
      "#fd8d3c",
      "#bd0026",
    ];

    if (this.currentStatistic) {
      const stats = this.getStatisticMetadata(this.currentStatistic);
      if (stats && stats.definition.colorScale) {
        colorScale = stats.definition.colorScale as [string, string, string];
      }
    }

    // Calculate max for domain
    const values = Object.values(urbanData.statistics) as number[];
    const max = Math.max(...values, 1); // Avoid 0/0

    this.choropleth.renderCustomTexture(urbanData.statistics, colorScale, [
      0,
      max,
    ]);

    // FORCE Update: changing the texture requires notifying the shader
    if (this.material && this.material.uniforms.uDataTexture.value) {
      this.material.uniforms.uDataTexture.value.needsUpdate = true;
      this.material.uniforms.uDataOverlay.value = 1;
    }

    // Update current values for Data Grid
    // Use names/labels if available for better readability in the grid
    const displayValues: Record<string, number> = {};
    let hasNames = false;

    points.forEach((p) => {
      if (p.name || p.label) {
        hasNames = true;
        const key = p.name || p.label || p.id || "Unknown";
        displayValues[key] = p.value;
      }
    });

    // Fallback to statistics IDs if no names provided
    this.currentValues = hasNames ? displayValues : urbanData.statistics;

    // 4. Set effects
    if (this.material) {
      this.material.uniforms.uCityLights.value = 1;
      this.config.effects.cityLights = true;
    }

    // Hide country labels as they are confusing for city-level data
    // We don't hide the group entirely anymore, relying on style="data" or "none" set by user/config
    // But we might want to default to "data" if not set?
    // For now, let's just ensure custom labels are added to dataIds (happens in addCustomLabels)
    // Ensure labels group is visible
    if (this.countryLabels) {
      this.countryLabels.getGroup().visible = true;
    }

    // Lazy Add GUI Control for Radius if not exists
    if (this.gui) {
      // Check if control already exists by traversing Display folder
      let displayFolder = this.gui.folders.find(
        (f: any) => f._title === "Display",
      );

      if (!displayFolder) {
        displayFolder = this.gui.addFolder("Display");
      }

      // Check if radius control exists
      const controllers = displayFolder.controllers;
      const hasRadius = controllers.some(
        (c: any) => c.property === "pointRadius",
      ); // Check property name bound

      if (!hasRadius) {
        // Create a proxy object for the control since we need to bind to a simple object
        const radiusConfig = { pointRadius: this.config.pointRadius || 140 };

        const radiusCtrl = displayFolder
          .add(radiusConfig, "pointRadius", 10, 500, 5)
          .name("Point Marker Radius")
          .onChange(async (v: number) => {
            this.config.pointRadius = v;
            if (this.urbanPoints) {
              // Re-run the generation
              await this.setUrbanData(this.urbanPoints);
            }
          });

        this.addTooltip(
          radiusCtrl,
          "<b>Synthetic Geometry Radius</b><br><br>" +
            "If our data consists of point locations (like cities) without defined 2D borders, " +
            "we generate synthetic circular boundaries for them.<br><br>" +
            "This control scales the size (in km) of these generated circles. " +
            "Larger values make small cities more visible on the global map.",
        );
      }
    }
  }

  resize(width: number, height: number): void {
    this.config.width = width;
    this.config.height = height;
    this.handleResize();
  }

  toggleProjection(): void {
    if (this.morph > 0.5) {
      this.toFlat();
    } else {
      this.toGlobe();
    }
  }

  async toggleFullscreen(): Promise<void> {
    if (!document.fullscreenElement) {
      await this.container.requestFullscreen();
      // After entering fullscreen, resize to fill screen
      setTimeout(() => this.handleResize(), 100);
    } else {
      await document.exitFullscreen();
      setTimeout(() => this.handleResize(), 100);
    }
  }

  isFullscreen(): boolean {
    return document.fullscreenElement === this.container;
  }

  getCurrentData(): Record<string, number> {
    // 1. If we are displaying a custom statistic (e.g. from main.ts), use that source of truth
    if (this.currentStatistic) {
      // Check if it's a custom stat object passed directly to setStatistic logic
      if (this.currentValues) {
        if (this.choropleth) {
          // Enhanced lookup: Try to find names for IDs
          const result: Record<string, number> = {};
          const entries = Array.isArray(this.currentValues)
            ? this.currentValues // Should not happen with current types but safety
            : Object.entries(this.currentValues);

          for (const [id, value] of entries) {
            // Try to resolve name from topology
            const name = this.choropleth.getFeatureName(id) || id;
            // Handle duplicates if needed? For now simple overwrite
            result[name] = value;
          }
          return result;
        }
        return this.currentValues;
      }

      // Check built-ins
      // Check built-ins
      const internalStat = INTERNAL_STATISTICS.find(
        (s) => s.id === this.currentStatistic,
      );

      if (internalStat) {
        const result: Record<string, number> = {};

        // Use choropleth stats if available, fall back to global data for built-ins
        const statsMap = this.choropleth?.getStatsMap();
        const hasMapData = statsMap && statsMap.size > 0;

        if (hasMapData) {
          statsMap.forEach((countryStats, key) => {
            const val = internalStat.accessor(countryStats);
            const name = countryStats.name || key;
            if (val !== undefined && val !== null) {
              result[name] = val;
            }
          });
        } else {
          // Robust fallback for built-in stats directly from data array
          WORLD_STATISTICS.forEach((country) => {
            const val = internalStat.accessor(country);
            if (val !== undefined && val !== null) {
              result[country.name || country.code] = val;
            }
          });
        }

        return result;
      }
    }

    // Fallback: Empty data
    return {};
  }

  destroy(): void {
    this.isDestroyed = true;

    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener(
      "fullscreenchange",
      this.handleFullscreenChange,
    );

    // Dispose helper components
    this.gui?.destroy();
    this.legend?.dispose();
    this.countryLabels?.dispose();
    this.markerLayer?.dispose();
    this.controls?.dispose();
    this.toolbar?.dispose();
    this.dataGrid?.dispose();

    // Remove tooltips
    document.querySelectorAll(".lil-gui-tooltip").forEach((el) => el.remove());

    // Dispose Three.js objects
    this.globe?.geometry.dispose();
    (this.globe?.material as THREE.Material)?.dispose();
    this.atmosphere?.geometry.dispose();
    (this.atmosphere?.material as THREE.Material)?.dispose();
    this.stars?.geometry.dispose();
    (this.stars?.material as THREE.Material)?.dispose();
    this.dataTexture?.dispose();

    // Clear scene to ensure all meshes are detached
    this.scene?.clear();

    // Force WebGL Context Loss to prevent leaks (limit ~16 contexts)
    // This is critical for dashboards with multiple globes
    try {
      this.renderer?.dispose();
      this.renderer?.forceContextLoss();
      // Also try extension approach for older three.js/browsers if forceContextLoss not exposed directly
      const context = this.renderer?.getContext();
      context?.getExtension("WEBGL_lose_context")?.loseContext();
    } catch (e) {
      console.warn("Error forcing context loss:", e);
    }

    if (
      this.renderer?.domElement &&
      this.container?.contains(this.renderer.domElement)
    ) {
      this.container.removeChild(this.renderer.domElement);
    }

    // Break references
    // @ts-ignore
    this.renderer = null;
    // @ts-ignore
    this.scene = null;
    // @ts-ignore
    this.camera = null;
  }

  private addTooltip(controller: any, text: string) {
    const domElement = controller.domElement;
    if (!domElement) return;

    // Simple title attribute for basic tooltip
    domElement.title = text.replace(/<br>/g, "\n").replace(/<b>|<\/b>/g, "");

    // Enhanced custom tooltip if possible
    // (This requires more CSS/DOM manipulation, but title is a good fallback)
    domElement.parentElement.addEventListener("mouseenter", (e: MouseEvent) => {
      const tooltip = document.createElement("div");
      tooltip.className = "lil-gui-tooltip";
      tooltip.innerHTML = text;
      tooltip.style.position = "fixed";
      tooltip.style.background = "rgba(0, 0, 0, 0.9)";
      tooltip.style.color = "#fff";
      tooltip.style.padding = "8px 12px";
      tooltip.style.borderRadius = "4px";
      tooltip.style.fontSize = "12px";
      tooltip.style.maxWidth = "200px";
      tooltip.style.pointerEvents = "none";
      tooltip.style.zIndex = "10000";
      tooltip.style.border = "1px solid #333";
      tooltip.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";

      document.body.appendChild(tooltip);

      const moveHandler = (moveEvent: MouseEvent) => {
        tooltip.style.left = moveEvent.clientX + 10 + "px";
        tooltip.style.top = moveEvent.clientY + 10 + "px";
      };

      window.addEventListener("mousemove", moveHandler);

      const leaveHandler = () => {
        tooltip.remove();
        window.removeEventListener("mousemove", moveHandler);
        domElement.parentElement.removeEventListener(
          "mouseleave",
          leaveHandler,
        );
      };
      domElement.parentElement.addEventListener("mouseleave", leaveHandler);
    });
  }

  private getStatisticMetadata(id: string): StatisticData | null {
    // Check built-in statistics
    if (BUILT_IN_STATISTICS[id as keyof typeof BUILT_IN_STATISTICS]) {
      const def = BUILT_IN_STATISTICS[id as keyof typeof BUILT_IN_STATISTICS];

      // For built-in stats, we map from WORLD_STATISTICS data
      const internalStat = INTERNAL_STATISTICS.find((s) => s.id === id);
      const values: Record<string, number> = {};

      if (internalStat) {
        WORLD_STATISTICS.forEach((country) => {
          const val = internalStat.accessor(country);
          if (val !== undefined && val !== null) {
            values[country.id] = val;
          }
        });
      }

      return {
        definition: def,
        values,
      };
    }

    // Check world statistics
    const worldStat = INTERNAL_STATISTICS.find((s) => s.id === id);
    if (worldStat) {
      // For these internal stats, we also map from WORLD_STATISTICS
      const values: Record<string, number> = {};
      WORLD_STATISTICS.forEach((country) => {
        const val = worldStat.accessor(country);
        if (val !== undefined && val !== null) {
          values[country.id] = val;
        }
      });

      return {
        definition: {
          id: worldStat.id,
          name: worldStat.name,
          unit: worldStat.unit,
          description: worldStat.description,
          colorScale: worldStat.colorScale as [string, string, string],
          domain: worldStat.domain as [number, number],
          format: worldStat.format,
        },
        values,
      };
    }

    return null;
  }
}
