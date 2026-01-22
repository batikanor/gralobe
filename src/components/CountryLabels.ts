import * as THREE from "three";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { type CountryStatistics, WORLD_STATISTICS } from "../data/worldStatistics";
import type { LabelStyle } from "../lib/types";

interface CountryLabel {
  element: HTMLDivElement;
  object: CSS2DObject;
  country: CountryStatistics;
  // Position data
  lat: number;
  lon: number;
  // Size category for font scaling
  sizeCategory: "large" | "medium" | "small" | "tiny";
}

// Country center coordinates (approximate centroids)
const COUNTRY_CENTERS: { [code: string]: [number, number] } = {
  // Major economies
  CN: [35.0, 105.0],
  IN: [22.0, 78.0],
  US: [39.0, -98.0],
  ID: [-2.0, 118.0],
  PK: [30.0, 70.0],
  BR: [-10.0, -55.0],
  NG: [9.0, 8.0],
  BD: [24.0, 90.0],
  RU: [60.0, 100.0],
  MX: [23.0, -102.0],
  JP: [36.0, 138.0],
  ET: [9.0, 38.5],
  PH: [12.0, 122.0],
  EG: [27.0, 30.0],
  VN: [16.0, 108.0],
  // Europe
  DE: [51.0, 10.0],
  TR: [39.0, 35.0],
  IR: [32.0, 53.0],
  TH: [15.0, 101.0],
  GB: [54.0, -2.0],
  FR: [46.0, 2.0],
  IT: [42.5, 12.5],
  ZA: [-29.0, 24.0],
  TZ: [-6.0, 35.0],
  KE: [0.0, 38.0],
  KR: [36.0, 128.0],
  CO: [4.0, -72.0],
  ES: [40.0, -4.0],
  AR: [-34.0, -64.0],
  UG: [1.0, 32.0],
  DZ: [28.0, 3.0],
  UA: [49.0, 32.0],
  IQ: [33.0, 44.0],
  PL: [52.0, 20.0],
  CA: [56.0, -106.0],
  MA: [32.0, -5.0],
  SA: [24.0, 45.0],
  PE: [-10.0, -76.0],
  AU: [-25.0, 134.0],
  MY: [4.0, 109.5],
  GH: [8.0, -1.0],
  NP: [28.0, 84.0],
  VE: [7.0, -66.0],
  MG: [-19.0, 47.0],
  CM: [6.0, 12.0],
  // Nordic & small high-HDI
  NL: [52.5, 5.5],
  CL: [-34.0, -71.0],
  SE: [62.0, 15.0],
  NO: [64.0, 10.0],
  SG: [1.3, 103.8],
  NZ: [-42.0, 174.0],
  IE: [53.0, -8.0],
  IL: [31.0, 35.0],
  AE: [24.0, 54.0],
  CH: [47.0, 8.0],
  AT: [47.5, 14.5],
  PT: [39.5, -8.0],
  GR: [39.0, 22.0],
  CZ: [49.8, 15.5],
  BE: [50.8, 4.0],
  HU: [47.0, 20.0],
  FI: [64.0, 26.0],
  DK: [56.0, 10.0],
  IS: [65.0, -18.0],
  // Africa
  CD: [-3.0, 22.0],
  SD: [16.0, 30.0],
  AO: [-12.5, 18.5],
  MZ: [-18.0, 35.0],
  CI: [7.5, -5.5],
  NE: [17.0, 10.0],
  BF: [12.0, -1.5],
  ML: [17.0, -4.0],
  SN: [14.5, -14.5],
  ZM: [-15.0, 28.0],
  ZW: [-19.0, 29.5],
  RW: [-2.0, 30.0],
  // Asia
  AF: [33.0, 65.0],
  MM: [21.0, 96.0],
  KP: [40.0, 127.0],
  MN: [46.0, 105.0],
  LK: [7.8, 80.8],
  KZ: [48.0, 67.0],
  UZ: [41.0, 64.0],
  // Latin America
  CU: [22.0, -79.5],
  EC: [-1.5, -78.5],
  GT: [15.5, -90.3],
  BO: [-17.0, -65.0],
  HN: [15.0, -86.5],
  PY: [-23.0, -58.0],
  UY: [-33.0, -56.0],
  CR: [10.0, -84.0],
  PA: [9.0, -80.0],
};

// Major countries to show in "major" mode (top economies + large countries)
const MAJOR_COUNTRIES = new Set([
  "CN",
  "IN",
  "US",
  "BR",
  "RU",
  "JP",
  "DE",
  "GB",
  "FR",
  "AU",
  "CA",
  "MX",
  "ID",
  "SA",
  "ZA",
  "EG",
  "NG",
  "AR",
  "IT",
  "ES",
  "KR",
  "TR",
  "PL",
  "NL",
  "CH",
  "SE",
  "NO",
  "PK",
  "BD",
  "VN",
]);

// Minimal set - just the largest countries visible at any zoom
const MINIMAL_COUNTRIES = new Set(["CN", "IN", "US", "BR", "RU", "AU", "CA"]);

// Country size categories based on land area (for proportional font sizing)
const LARGE_COUNTRIES = new Set(["RU", "CA", "US", "CN", "BR", "AU"]);
const MEDIUM_COUNTRIES = new Set([
  "IN",
  "AR",
  "KZ",
  "DZ",
  "CD",
  "SA",
  "MX",
  "ID",
  "SD",
  "LY",
  "IR",
  "MN",
  "PE",
  "TD",
  "NE",
  "AO",
  "ML",
  "ZA",
  "CO",
  "ET",
  "BO",
  "MR",
  "EG",
  "TZ",
  "NG",
  "VE",
  "PK",
  "TR",
  "CL",
  "MM",
]);
const SMALL_COUNTRIES = new Set([
  "AF",
  "UA",
  "MG",
  "MZ",
  "FR",
  "ES",
  "TH",
  "CM",
  "PG",
  "JP",
  "DE",
  "VN",
  "MY",
  "CI",
  "PL",
  "IT",
  "PH",
  "EC",
  "BF",
  "NZ",
  "GB",
  "GH",
  "RO",
  "LA",
  "GY",
  "OM",
  "BY",
  "KH",
  "SN",
  "UG",
  "NO",
  "SE",
  "FI",
  "MR",
  "ZM",
  "ZW",
  "NP",
  "MA",
  "IQ",
  "BD",
]);

/**
 * Renders country name labels on the globe/map using CSS2DRenderer
 */
export class CountryLabels {
  private labelRenderer: CSS2DRenderer;
  private labels: CountryLabel[] = [];
  private labelGroup: THREE.Group;
  private currentStyle: LabelStyle = "none";
  private sphereRadius: number;
  private currentMorph: number = 0;
  private globe: THREE.Mesh | null = null;
  private camera: THREE.Camera | null = null;
  private dataIds: Set<string> = new Set();

  constructor(container: HTMLElement, sphereRadius: number) {
    this.sphereRadius = sphereRadius;

    // Create CSS2D renderer for crisp text - use CONTAINER dimensions, not window
    this.labelRenderer = new CSS2DRenderer();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    this.labelRenderer.setSize(width, height);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0";
    this.labelRenderer.domElement.style.left = "0";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    this.labelRenderer.domElement.style.zIndex = "5"; // Below legend (10) and UI controls
    container.appendChild(this.labelRenderer.domElement);

    // Create group to hold label objects
    this.labelGroup = new THREE.Group();

    // Add styles
    this.injectStyles();

    // Create all labels (hidden initially)
    this.createLabels();
  }

  private injectStyles(): void {
    const style = document.createElement("style");
    style.textContent = `
      .country-label {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.9);
        text-shadow:
          0 1px 2px rgba(0, 0, 0, 1),
          0 0 3px rgba(0, 0, 0, 0.9),
          0 0 5px rgba(0, 0, 0, 0.7);
        white-space: nowrap;
        pointer-events: none;
        user-select: none;
        transform: translateX(-50%);
        transition: opacity 0.3s ease;
        letter-spacing: 0.5px;
        text-transform: uppercase;
      }

      /* Size categories - proportional to country size */
      .country-label.size-large {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 1.5px;
        color: rgba(255, 255, 255, 0.95);
      }

      .country-label.size-medium {
        font-size: 7px;
        font-weight: 500;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.9);
      }

      .country-label.size-small {
        font-size: 6px;
        font-weight: 500;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.8);
      }

      .country-label.size-tiny {
        font-size: 5px;
        letter-spacing: 0.2px;
        color: rgba(255, 255, 255, 0.7);
      }

      .country-label.hidden {
        opacity: 0 !important;
        visibility: hidden;
      }

      /* Minimal style - bold for the 7 largest */
      .label-style-minimal .country-label.size-large {
        font-size: 10px;
        font-weight: 700;
        letter-spacing: 2px;
        color: #fff;
      }

      /* Major style - balanced visibility */
      .label-style-major .country-label.size-large {
        font-size: 9px;
        font-weight: 600;
      }

      .label-style-major .country-label.size-medium {
        font-size: 7px;
      }

      /* All style - harmonized visibility */
      .label-style-all .country-label {
        color: rgba(255, 255, 255, 0.85);
      }

      .label-style-all .country-label.size-large {
        font-size: 8px;
        color: rgba(255, 255, 255, 0.95);
      }

      .label-style-all .country-label.size-tiny {
        font-size: 4.5px;
        color: rgba(255, 255, 255, 0.8);
      }
    `;
    document.head.appendChild(style);
  }

  private getSizeCategory(code: string): "large" | "medium" | "small" | "tiny" {
    if (LARGE_COUNTRIES.has(code)) return "large";
    if (MEDIUM_COUNTRIES.has(code)) return "medium";
    if (SMALL_COUNTRIES.has(code)) return "small";
    return "tiny";
  }

  private createLabels(): void {
    WORLD_STATISTICS.forEach((country) => {
      const coords = COUNTRY_CENTERS[country.code];
      if (!coords) return; // Skip countries without coordinates

      const [lat, lon] = coords;
      const sizeCategory = this.getSizeCategory(country.code);

      // Create label element
      const element = document.createElement("div");
      element.className = `country-label hidden size-${sizeCategory}`;
      element.textContent = country.name;

      // Create CSS2D object
      const labelObject = new CSS2DObject(element);

      const labelData: CountryLabel = {
        element,
        object: labelObject,
        country,
        lat,
        lon,
        sizeCategory,
      };

      this.labelGroup.add(labelObject);
      this.labels.push(labelData);

      // Calculate initial position
      this.updateLabelPosition(labelObject, labelData, this.currentMorph);
    });
  }

  /**
   * Add custom labels (for cities, states, or any geographic points)
   * These are added to the existing country labels
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
    labels.forEach((customLabel) => {
      // Duplication check: skip if label with same ID or Name already exists
      // Normalize IDs (remove leading zeros from "036") and Names (remove "The " prefix)
      const normalizeId = (id: string) => String(parseInt(id) || id).toLowerCase();
      const normalizeName = (name: string) =>
        name
          .toLowerCase()
          .replace(/^the\s+/, "")
          .trim();

      const customId = normalizeId(customLabel.id);
      const customName = normalizeName(customLabel.name);

      const exists = this.labels.some((l) => {
        // Built-in ID might be "036", custom might be "36"
        const lId = normalizeId(l.country.id);
        const lName = normalizeName(l.country.name);
        return lId === customId || lName === customName;
      });

      if (exists) return;

      const sizeCategory = customLabel.size || "small";

      // Create label element
      const element = document.createElement("div");
      element.className = `country-label hidden size-${sizeCategory} custom-label`;
      element.textContent = customLabel.name;

      // Create CSS2D object
      const labelObject = new CSS2DObject(element);

      // Create a minimal CountryStatistics-like object for compatibility
      const pseudoCountry = {
        id: customLabel.id,
        code: customLabel.id,
        name: customLabel.name,
      } as any;

      const labelData: CountryLabel = {
        element,
        object: labelObject,
        country: pseudoCountry,
        lat: customLabel.lat,
        lon: customLabel.lon,
        sizeCategory,
      };

      this.labelGroup.add(labelObject);
      this.labels.push(labelData);

      // Add to dataIds so it shows in "data" mode
      this.dataIds.add(customLabel.id);

      // Calculate initial position
      this.updateLabelPosition(labelObject, labelData, this.currentMorph);
    });

    // Reapply current style to update visibility
    this.setStyle(this.currentStyle);
  }

  /**
   * Clear all custom labels (keeps country labels)
   */
  clearCustomLabels(): void {
    const toRemove = this.labels.filter((l) => l.element.classList.contains("custom-label"));
    toRemove.forEach((label) => {
      this.labelGroup.remove(label.object);
      label.element.remove();
      this.dataIds.delete(label.country.code);
    });
    this.labels = this.labels.filter((l) => !l.element.classList.contains("custom-label"));
  }

  private localPos = new THREE.Vector3();
  private worldPos = new THREE.Vector3();
  private cameraDirection = new THREE.Vector3();
  private labelNormal = new THREE.Vector3();

  private updateLabelPosition(object: CSS2DObject, label: CountryLabel, morph: number): void {
    const { lat, lon, element } = label;

    // Convert lat/lon to UV (same as shader)
    const u = (lon + 180) / 360;
    const v = (lat + 90) / 180;

    // Calculate lat/lon in radians (same as shader)
    const lonRad = (u - 0.5) * 2 * Math.PI;
    const latRad = (v - 0.5) * Math.PI;

    // Spherical position (same formula as shader, slightly above surface for labels)
    const radius = this.sphereRadius + 0.3;
    const sphereX = radius * Math.cos(latRad) * Math.sin(lonRad);
    const sphereY = radius * Math.sin(latRad);
    const sphereZ = radius * Math.cos(latRad) * Math.cos(lonRad);

    // Flat position (exactly matching shader)
    const flatWidth = 2 * Math.PI * this.sphereRadius;
    const flatHeight = Math.PI * this.sphereRadius;
    const flatX = (u - 0.5) * flatWidth;
    const flatY = (v - 0.5) * flatHeight;
    const flatZ = 0.3; // Slightly above flat surface

    // Apply smoothstep easing to morph (same as shader: t * t * (3 - 2 * t))
    const t = morph * morph * (3 - 2 * morph);

    // Interpolate between flat and sphere (same as shader's mix())
    this.localPos.set(
      flatX + t * (sphereX - flatX),
      flatY + t * (sphereY - flatY),
      flatZ + t * (sphereZ - flatZ),
    );

    // Transform local position to world position using globe's matrix
    if (this.globe) {
      this.worldPos.copy(this.localPos);
      this.worldPos.applyMatrix4(this.globe.matrixWorld);
      object.position.copy(this.worldPos);

      // Hide labels facing away from camera (only in globe mode)
      let backfaceOpacity = 1;
      if (this.camera && t > 0.5) {
        // Get camera direction
        this.cameraDirection.copy(this.camera.position).normalize();

        // Get label normal in world space
        this.labelNormal.set(sphereX, sphereY, sphereZ).normalize();
        this.labelNormal.applyMatrix4(this.globe.matrixWorld).normalize();

        const dot = this.labelNormal.dot(this.cameraDirection);
        backfaceOpacity = dot > 0.15 ? 1 : 0;
      }

      // Distance-based decluttering (Zoom filtering)
      let distanceOpacity = 1;
      // We need to check both globe mode (distance from center) and flat mode (distance from plane)
      if (this.camera) {
        let dist = 150; // Default fallback
        if (t > 0.5) {
          // Globe mode: distance from center
          dist = this.camera.position.length();
        } else {
          // Flat mode: distance from Z-plane (0)
          dist = Math.abs(this.camera.position.z);
        }

        // Adjust distance scale for Flat mode if needed, but usually cameras are similar distance

        // Thresholds for fading out labels based on size
        // Zoomed in: dist ~ 50-100
        // Zoomed out default: dist ~ 200
        // Far out: dist > 300

        switch (label.sizeCategory) {
          case "tiny":
            // Hide tiny labels quickly when zooming out
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 120) / 30)); // Fade 120->150
            break;
          case "small":
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 150) / 40)); // Fade 150->190
            break;
          case "medium":
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 200) / 50)); // Fade 200->250
            break;
          case "large":
            // Large labels stay visible much longer
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 300) / 100)); // Fade 300->400
            break;
        }
      }

      // Combine opacities
      const finalOpacity = backfaceOpacity * distanceOpacity;

      // Optimization: Toggle visibility
      if (finalOpacity < 0.05) {
        element.style.opacity = "0";
      } else {
        element.style.opacity = String(finalOpacity);
      }
    } else {
      // No globe - use local position directly (Flat Mode when globe is null? rare)
      object.position.copy(this.localPos);

      // Also apply decluttering
      let distanceOpacity = 1;
      if (this.camera) {
        const dist = Math.abs(this.camera.position.z);
        switch (label.sizeCategory) {
          case "tiny":
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 120) / 30));
            break;
          case "small":
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 150) / 40));
            break;
          case "medium":
            distanceOpacity = 1 - Math.min(1, Math.max(0, (dist - 200) / 50));
            break;
        }
      }
      element.style.opacity = distanceOpacity < 0.05 ? "0" : String(distanceOpacity);
    }
  }

  /**
   * Get the label group to add to scene
   */
  getGroup(): THREE.Group {
    return this.labelGroup;
  }

  /**
   * Set the label display style
   */
  setStyle(style: LabelStyle): void {
    this.currentStyle = style;

    // Update visibility based on style
    this.labels.forEach((label) => {
      const code = label.country.code;
      let visible = false;

      switch (style) {
        case "none":
          visible = false;
          break;
        case "minimal":
          // Only the 7 largest countries
          visible = MINIMAL_COUNTRIES.has(code);
          break;
        case "major":
          visible = MAJOR_COUNTRIES.has(code);
          break;
        case "all":
        case "capitals":
          visible = true;
          break;
        case "all-countries":
          // Show all official countries, but we will filter out custom labels below
          visible = true;
          break;
        case "data":
          // Only show labels for entities that have data
          visible = this.dataIds.has(code);
          break;
      }

      // Special handling for "all-countries": hide custom labels
      if (style === "all-countries" && label.element.classList.contains("custom-label")) {
        visible = false;
      }

      label.element.classList.toggle("hidden", !visible);
    });

    // Update container class for style-specific styling
    this.labelRenderer.domElement.className = `label-style-${style}`;
  }

  /**
   * Update morph value to sync label positions with globe
   */
  setMorph(morph: number): void {
    this.currentMorph = morph;
  }

  /**
   * Set globe reference to sync rotation
   */
  setGlobe(globe: THREE.Mesh): void {
    this.globe = globe;
  }

  /**
   * Set camera reference for backface culling
   */
  setCamera(camera: THREE.Camera): void {
    this.camera = camera;
  }

  /**
   * Set which entity IDs have data (for "data" label mode)
   */
  setDataIds(ids: string[]): void {
    this.dataIds = new Set(ids);
    // If currently in "data" mode, reapply to update visibility
    if (this.currentStyle === "data") {
      this.setStyle("data");
    }
  }

  /**
   * Update label positions (call every frame to sync with globe rotation)
   */
  update(): void {
    if (this.currentStyle === "none") return;

    // Update all label positions to match current globe rotation
    this.labels.forEach((label) => {
      this.updateLabelPosition(label.object, label, this.currentMorph);
    });
  }

  /**
   * Render labels
   */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (this.currentStyle === "none") return;
    this.labelRenderer.render(scene, camera);
  }

  /**
   * Handle window resize
   */
  resize(width: number, height: number): void {
    this.labelRenderer.setSize(width, height);
  }

  /**
   * Get current style
   */
  getStyle(): LabelStyle {
    return this.currentStyle;
  }

  /**
   * Get visible labels with their screen positions for canvas rendering
   */
  getVisibleLabelsForCanvas(
    camera: THREE.Camera,
    canvasWidth: number,
    canvasHeight: number,
  ): Array<{
    text: string;
    x: number;
    y: number;
    opacity: number;
  }> {
    if (this.currentStyle === "none") return [];

    const result: Array<{
      text: string;
      x: number;
      y: number;
      opacity: number;
    }> = [];
    const vector = new THREE.Vector3();

    this.labels.forEach((label) => {
      // Check if label is visible (has opacity > 0)
      // Empty string means default opacity (visible), so treat as 1
      const opacityStr = label.element.style.opacity;
      const opacity = opacityStr === "" ? 1 : parseFloat(opacityStr) || 0;

      // Also check if label has 'hidden' class
      if (opacity < 0.1 || label.element.classList.contains("hidden")) return;

      // Get world position of the label
      label.object.getWorldPosition(vector);

      // Project to screen coordinates
      vector.project(camera);

      // Convert to canvas coordinates
      const x = (vector.x * 0.5 + 0.5) * canvasWidth;
      const y = (-vector.y * 0.5 + 0.5) * canvasHeight;

      // Only include if on screen
      if (x >= 0 && x <= canvasWidth && y >= 0 && y <= canvasHeight && vector.z < 1) {
        result.push({
          text: label.country.name,
          x,
          y,
          opacity,
        });
      }
    });

    return result;
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.labels.forEach((label) => {
      this.labelGroup.remove(label.object);
      label.element.remove();
    });
    this.labels = [];
    this.labelRenderer.domElement.remove();
  }
}
