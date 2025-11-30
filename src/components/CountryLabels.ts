import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { WORLD_STATISTICS, type CountryStatistics } from '../data/worldStatistics';

export type LabelStyle = 'none' | 'major' | 'all' | 'capitals' | 'minimal';

interface CountryLabel {
  element: HTMLDivElement;
  object: CSS2DObject;
  country: CountryStatistics;
  // Position data
  lat: number;
  lon: number;
  // Size category for font scaling
  sizeCategory: 'large' | 'medium' | 'small' | 'tiny';
}

// Country center coordinates (approximate centroids)
const COUNTRY_CENTERS: { [code: string]: [number, number] } = {
  // Major economies
  'CN': [35.0, 105.0],
  'IN': [22.0, 78.0],
  'US': [39.0, -98.0],
  'ID': [-2.0, 118.0],
  'PK': [30.0, 70.0],
  'BR': [-10.0, -55.0],
  'NG': [9.0, 8.0],
  'BD': [24.0, 90.0],
  'RU': [60.0, 100.0],
  'MX': [23.0, -102.0],
  'JP': [36.0, 138.0],
  'ET': [9.0, 38.5],
  'PH': [12.0, 122.0],
  'EG': [27.0, 30.0],
  'VN': [16.0, 108.0],
  // Europe
  'DE': [51.0, 10.0],
  'TR': [39.0, 35.0],
  'IR': [32.0, 53.0],
  'TH': [15.0, 101.0],
  'GB': [54.0, -2.0],
  'FR': [46.0, 2.0],
  'IT': [42.5, 12.5],
  'ZA': [-29.0, 24.0],
  'TZ': [-6.0, 35.0],
  'KE': [0.0, 38.0],
  'KR': [36.0, 128.0],
  'CO': [4.0, -72.0],
  'ES': [40.0, -4.0],
  'AR': [-34.0, -64.0],
  'UG': [1.0, 32.0],
  'DZ': [28.0, 3.0],
  'UA': [49.0, 32.0],
  'IQ': [33.0, 44.0],
  'PL': [52.0, 20.0],
  'CA': [56.0, -106.0],
  'MA': [32.0, -5.0],
  'SA': [24.0, 45.0],
  'PE': [-10.0, -76.0],
  'AU': [-25.0, 134.0],
  'MY': [4.0, 109.5],
  'GH': [8.0, -1.0],
  'NP': [28.0, 84.0],
  'VE': [7.0, -66.0],
  'MG': [-19.0, 47.0],
  'CM': [6.0, 12.0],
  // Nordic & small high-HDI
  'NL': [52.5, 5.5],
  'CL': [-34.0, -71.0],
  'SE': [62.0, 15.0],
  'NO': [64.0, 10.0],
  'SG': [1.3, 103.8],
  'NZ': [-42.0, 174.0],
  'IE': [53.0, -8.0],
  'IL': [31.0, 35.0],
  'AE': [24.0, 54.0],
  'CH': [47.0, 8.0],
  'AT': [47.5, 14.5],
  'PT': [39.5, -8.0],
  'GR': [39.0, 22.0],
  'CZ': [49.8, 15.5],
  'BE': [50.8, 4.0],
  'HU': [47.0, 20.0],
  'FI': [64.0, 26.0],
  'DK': [56.0, 10.0],
  'IS': [65.0, -18.0],
  // Africa
  'CD': [-3.0, 22.0],
  'SD': [16.0, 30.0],
  'AO': [-12.5, 18.5],
  'MZ': [-18.0, 35.0],
  'CI': [7.5, -5.5],
  'NE': [17.0, 10.0],
  'BF': [12.0, -1.5],
  'ML': [17.0, -4.0],
  'SN': [14.5, -14.5],
  'ZM': [-15.0, 28.0],
  'ZW': [-19.0, 29.5],
  'RW': [-2.0, 30.0],
  // Asia
  'AF': [33.0, 65.0],
  'MM': [21.0, 96.0],
  'KP': [40.0, 127.0],
  'MN': [46.0, 105.0],
  'LK': [7.8, 80.8],
  'KZ': [48.0, 67.0],
  'UZ': [41.0, 64.0],
  // Latin America
  'CU': [22.0, -79.5],
  'EC': [-1.5, -78.5],
  'GT': [15.5, -90.3],
  'BO': [-17.0, -65.0],
  'HN': [15.0, -86.5],
  'PY': [-23.0, -58.0],
  'UY': [-33.0, -56.0],
  'CR': [10.0, -84.0],
  'PA': [9.0, -80.0],
};

// Major countries to show in "major" mode (top economies + large countries)
const MAJOR_COUNTRIES = new Set([
  'CN', 'IN', 'US', 'BR', 'RU', 'JP', 'DE', 'GB', 'FR', 'AU',
  'CA', 'MX', 'ID', 'SA', 'ZA', 'EG', 'NG', 'AR', 'IT', 'ES',
  'KR', 'TR', 'PL', 'NL', 'CH', 'SE', 'NO', 'PK', 'BD', 'VN'
]);

// Minimal set - just the largest countries visible at any zoom
const MINIMAL_COUNTRIES = new Set([
  'CN', 'IN', 'US', 'BR', 'RU', 'AU', 'CA'
]);

// Country size categories based on land area (for proportional font sizing)
const LARGE_COUNTRIES = new Set(['RU', 'CA', 'US', 'CN', 'BR', 'AU']);
const MEDIUM_COUNTRIES = new Set([
  'IN', 'AR', 'KZ', 'DZ', 'CD', 'SA', 'MX', 'ID', 'SD', 'LY',
  'IR', 'MN', 'PE', 'TD', 'NE', 'AO', 'ML', 'ZA', 'CO', 'ET',
  'BO', 'MR', 'EG', 'TZ', 'NG', 'VE', 'PK', 'TR', 'CL', 'MM'
]);
const SMALL_COUNTRIES = new Set([
  'AF', 'UA', 'MG', 'MZ', 'FR', 'ES', 'TH', 'CM', 'PG', 'JP',
  'DE', 'VN', 'MY', 'CI', 'PL', 'IT', 'PH', 'EC', 'BF', 'NZ',
  'GB', 'GH', 'RO', 'LA', 'GY', 'OM', 'BY', 'KH', 'SN', 'UG',
  'NO', 'SE', 'FI', 'MR', 'ZM', 'ZW', 'NP', 'MA', 'IQ', 'BD'
]);

/**
 * Renders country name labels on the globe/map using CSS2DRenderer
 */
export class CountryLabels {
  private labelRenderer: CSS2DRenderer;
  private labels: CountryLabel[] = [];
  private labelGroup: THREE.Group;
  private currentStyle: LabelStyle = 'none';
  private sphereRadius: number;
  private currentMorph: number = 0;
  private globe: THREE.Mesh | null = null;
  private camera: THREE.Camera | null = null;

  constructor(container: HTMLElement, sphereRadius: number) {
    this.sphereRadius = sphereRadius;

    // Create CSS2D renderer for crisp text
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0';
    this.labelRenderer.domElement.style.left = '0';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    container.appendChild(this.labelRenderer.domElement);

    // Create group to hold label objects
    this.labelGroup = new THREE.Group();

    // Add styles
    this.injectStyles();

    // Create all labels (hidden initially)
    this.createLabels();
  }

  private injectStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .country-label {
        font-family: system-ui, -apple-system, sans-serif;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.65);
        text-shadow:
          0 0 2px rgba(0, 0, 0, 0.9),
          0 0 4px rgba(0, 0, 0, 0.5);
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
        font-weight: 500;
        letter-spacing: 2px;
        color: rgba(255, 255, 255, 0.7);
      }

      .country-label.size-medium {
        font-size: 7px;
        letter-spacing: 1px;
        color: rgba(255, 255, 255, 0.6);
      }

      .country-label.size-small {
        font-size: 6px;
        letter-spacing: 0.5px;
        color: rgba(255, 255, 255, 0.5);
      }

      .country-label.size-tiny {
        font-size: 5px;
        letter-spacing: 0.3px;
        color: rgba(255, 255, 255, 0.4);
      }

      .country-label.hidden {
        opacity: 0 !important;
        visibility: hidden;
      }

      /* Minimal style - slightly bolder for the 7 largest */
      .label-style-minimal .country-label.size-large {
        font-size: 10px;
        font-weight: 600;
        letter-spacing: 3px;
        color: rgba(255, 255, 255, 0.75);
      }

      /* Major style - balanced visibility */
      .label-style-major .country-label.size-large {
        font-size: 8px;
        letter-spacing: 2px;
      }

      .label-style-major .country-label.size-medium {
        font-size: 6px;
      }

      /* All style - keep everything subtle */
      .label-style-all .country-label {
        color: rgba(255, 255, 255, 0.5);
      }

      .label-style-all .country-label.size-large {
        font-size: 8px;
        color: rgba(255, 255, 255, 0.6);
      }

      .label-style-all .country-label.size-tiny {
        font-size: 4px;
        color: rgba(255, 255, 255, 0.35);
      }
    `;
    document.head.appendChild(style);
  }

  private getSizeCategory(code: string): 'large' | 'medium' | 'small' | 'tiny' {
    if (LARGE_COUNTRIES.has(code)) return 'large';
    if (MEDIUM_COUNTRIES.has(code)) return 'medium';
    if (SMALL_COUNTRIES.has(code)) return 'small';
    return 'tiny';
  }

  private createLabels(): void {
    WORLD_STATISTICS.forEach(country => {
      const coords = COUNTRY_CENTERS[country.code];
      if (!coords) return; // Skip countries without coordinates

      const [lat, lon] = coords;
      const sizeCategory = this.getSizeCategory(country.code);

      // Create label element
      const element = document.createElement('div');
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

  private tempVector = new THREE.Vector3();
  private cameraDirection = new THREE.Vector3();

  private updateLabelPosition(object: CSS2DObject, label: CountryLabel, morph: number): void {
    const { lat, lon, element } = label;
    // Convert degrees to radians
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;

    // Spherical position (local coordinates on globe surface)
    const radius = this.sphereRadius + 0.5; // Slightly above surface
    const sphereX = radius * Math.cos(latRad) * Math.sin(lonRad);
    const sphereY = radius * Math.sin(latRad);
    const sphereZ = radius * Math.cos(latRad) * Math.cos(lonRad);

    // Flat position (Mercator-like)
    const flatWidth = 2 * Math.PI * this.sphereRadius;
    const flatHeight = Math.PI * this.sphereRadius;
    // Convert lon (-180 to 180) and lat (-90 to 90) to UV (0 to 1)
    const u = (lon + 180) / 360;
    const v = (lat + 90) / 180;
    const flatX = (u - 0.5) * flatWidth;
    const flatY = (v - 0.5) * flatHeight;
    const flatZ = 0.5;

    // Apply globe rotation to spherical position when morphed
    if (this.globe && morph > 0.01) {
      // For spherical positions, apply the globe's rotation
      this.tempVector.set(sphereX, sphereY, sphereZ);
      this.tempVector.applyEuler(this.globe.rotation);

      // Interpolate between rotated sphere and flat
      object.position.set(
        this.tempVector.x * morph + flatX * (1 - morph),
        this.tempVector.y * morph + flatY * (1 - morph),
        this.tempVector.z * morph + flatZ * (1 - morph)
      );

      // Check if label is facing the camera (dot product with camera direction)
      if (this.camera && morph > 0.5) {
        // Get camera direction (from globe center to camera)
        this.cameraDirection.copy(this.camera.position).normalize();

        // Get label's normal direction (from center to label position, normalized)
        const labelNormal = this.tempVector.clone().normalize();

        // Dot product: positive means facing camera, negative means facing away
        const dot = labelNormal.dot(this.cameraDirection);

        // Hide label if facing away from camera (with small threshold for edge cases)
        const isVisible = dot > -0.1;
        element.style.opacity = isVisible ? '' : '0';
      } else {
        element.style.opacity = '';
      }
    } else {
      object.position.set(
        sphereX * morph + flatX * (1 - morph),
        sphereY * morph + flatY * (1 - morph),
        sphereZ * morph + flatZ * (1 - morph)
      );
      element.style.opacity = '';
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
    this.labels.forEach(label => {
      const code = label.country.code;
      let visible = false;

      switch (style) {
        case 'none':
          visible = false;
          break;
        case 'minimal':
          // Only the 7 largest countries
          visible = MINIMAL_COUNTRIES.has(code);
          break;
        case 'major':
          visible = MAJOR_COUNTRIES.has(code);
          break;
        case 'all':
        case 'capitals':
          visible = true;
          break;
      }

      label.element.classList.toggle('hidden', !visible);
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
   * Update label positions (call every frame to sync with globe rotation)
   */
  update(): void {
    if (this.currentStyle === 'none') return;

    // Update all label positions to match current globe rotation
    this.labels.forEach(label => {
      this.updateLabelPosition(label.object, label, this.currentMorph);
    });
  }

  /**
   * Render labels
   */
  render(scene: THREE.Scene, camera: THREE.Camera): void {
    if (this.currentStyle === 'none') return;
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
  getVisibleLabelsForCanvas(camera: THREE.Camera, canvasWidth: number, canvasHeight: number): Array<{
    text: string;
    x: number;
    y: number;
    opacity: number;
  }> {
    if (this.currentStyle === 'none') return [];

    const result: Array<{ text: string; x: number; y: number; opacity: number }> = [];
    const vector = new THREE.Vector3();

    this.labels.forEach(label => {
      // Check if label is visible (has opacity > 0)
      // Empty string means default opacity (visible), so treat as 1
      const opacityStr = label.element.style.opacity;
      const opacity = opacityStr === '' ? 1 : (parseFloat(opacityStr) || 0);

      // Also check if label has 'hidden' class
      if (opacity < 0.1 || label.element.classList.contains('hidden')) return;

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
          opacity
        });
      }
    });

    return result;
  }

  /**
   * Dispose resources
   */
  dispose(): void {
    this.labels.forEach(label => {
      this.labelGroup.remove(label.object);
      label.element.remove();
    });
    this.labels = [];
    this.labelRenderer.domElement.remove();
  }
}
