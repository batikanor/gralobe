import * as THREE from "three";
import type { StatisticDefinition } from "../data/statistics";
import { COUNTRY_DATA, getNormalizedValue, STATISTICS } from "../data/statistics";

const SPHERE_RADIUS = 50;
const PI = Math.PI;

/**
 * Statistics overlay that renders country markers on the globe.
 * Added directly to scene and syncs rotation with globe manually.
 */
export class StatisticsOverlay {
  private group: THREE.Group;
  private markers: THREE.Points | null = null;
  private material: THREE.ShaderMaterial | null = null;
  private currentStat: StatisticDefinition | null = null;
  private visible: boolean = false;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();
    scene.add(this.group);
    this.createMarkers();
  }

  private createMarkers(): void {
    const count = COUNTRY_DATA.length;

    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const latitudes = new Float32Array(count);
    const longitudes = new Float32Array(count);

    COUNTRY_DATA.forEach((country, i) => {
      // Convert lat/lon from degrees to radians
      const latRad = (country.lat * PI) / 180;
      const lonRad = (country.lon * PI) / 180;

      latitudes[i] = latRad;
      longitudes[i] = lonRad;

      // Initialize position (computed in shader)
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      // Default color
      colors[i * 3] = 1;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;

      // Size based on data importance
      sizes[i] = 5 + Math.sqrt(country.population) * 0.25;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aLat", new THREE.BufferAttribute(latitudes, 1));
    geometry.setAttribute("aLon", new THREE.BufferAttribute(longitudes, 1));

    // Vertex shader that matches the globe's coordinate system exactly
    const vertexShader = `
      uniform float uMorph;
      uniform float uOpacity;

      attribute vec3 color;
      attribute float size;
      attribute float aLat;
      attribute float aLon;

      varying vec3 vColor;
      varying float vOpacity;

      const float PI = 3.14159265359;
      const float R = ${SPHERE_RADIUS.toFixed(1)};

      void main() {
        vColor = color;
        vOpacity = uOpacity;

        // Get lat/lon in radians
        float lat = aLat;
        float lon = aLon;

        // === SPHERE POSITION ===
        // Match the globe shader exactly:
        // spherePos = (R * cos(lat) * sin(lon), R * sin(lat), R * cos(lat) * cos(lon))
        float r = R + 1.0; // Slightly above surface
        vec3 spherePos = vec3(
          r * cos(lat) * sin(lon),
          r * sin(lat),
          r * cos(lat) * cos(lon)
        );

        // === FLAT POSITION ===
        // The globe's flat position maps UV to position:
        // flatPos.x = (uv.x - 0.5) * 2 * PI * R
        // flatPos.y = (uv.y - 0.5) * PI * R
        //
        // UV coordinates relate to lat/lon:
        // uv.x = (lon + PI) / (2 * PI) => lon = (uv.x - 0.5) * 2 * PI
        // uv.y = (lat + PI/2) / PI     => lat = (uv.y - 0.5) * PI
        //
        // So: flatPos.x = lon * R, flatPos.y = lat * R
        vec3 flatPos = vec3(
          lon * R,
          lat * R,
          1.0  // Slightly in front
        );

        // Smooth morph
        float t = uMorph;
        t = t * t * (3.0 - 2.0 * t);

        vec3 pos = mix(flatPos, spherePos, t);

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mvPosition;
        gl_PointSize = size * (200.0 / -mvPosition.z);
      }
    `;

    const fragmentShader = `
      varying vec3 vColor;
      varying float vOpacity;

      void main() {
        vec2 cxy = gl_PointCoord * 2.0 - 1.0;
        float dist = length(cxy);

        if (dist > 1.0) discard;

        // Soft circular marker with glow
        float alpha = 1.0 - smoothstep(0.5, 1.0, dist);
        alpha *= vOpacity;

        // Bright center
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        vec3 col = mix(vColor, vec3(1.0), glow * 0.3);

        gl_FragColor = vec4(col, alpha * 0.9);
      }
    `;

    this.material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uMorph: { value: 0 },
        uOpacity: { value: 0 },
      },
      transparent: true,
      depthWrite: false,
      depthTest: true,
      blending: THREE.AdditiveBlending,
    });

    this.markers = new THREE.Points(geometry, this.material);
    this.markers.visible = false;
    this.markers.renderOrder = 10;
    this.group.add(this.markers);
  }

  /**
   * Sync rotation with the globe (call this in animation loop)
   */
  syncRotation(globeRotationY: number): void {
    this.group.rotation.y = globeRotationY;
  }

  /**
   * Show statistics overlay with a specific statistic
   */
  show(statId: string): void {
    const stat = STATISTICS.find((s) => s.id === statId);
    if (!stat || !this.markers || !this.material) return;

    this.currentStat = stat;
    this.visible = true;

    const colors = this.markers.geometry.getAttribute("color");
    const colorsArray = colors.array as Float32Array;

    COUNTRY_DATA.forEach((country, i) => {
      const value = stat.accessor(country);
      const normalized = getNormalizedValue(stat, value);
      const color = this.getColorFromScale(stat.colorScale, normalized);

      colorsArray[i * 3] = color.r;
      colorsArray[i * 3 + 1] = color.g;
      colorsArray[i * 3 + 2] = color.b;
    });

    colors.needsUpdate = true;
    this.markers.visible = true;
    this.animateOpacity(1, 0.5);
  }

  /**
   * Hide the statistics overlay
   */
  hide(): void {
    if (!this.markers || !this.material) return;

    this.visible = false;
    this.currentStat = null;

    this.animateOpacity(0, 0.3, () => {
      if (this.markers) this.markers.visible = false;
    });
  }

  /**
   * Update morph value
   */
  setMorph(value: number): void {
    if (this.material) {
      this.material.uniforms.uMorph.value = value;
    }
  }

  getCurrentStat(): StatisticDefinition | null {
    return this.currentStat;
  }

  isVisible(): boolean {
    return this.visible;
  }

  private getColorFromScale(
    scale: [string, string, string],
    t: number,
  ): { r: number; g: number; b: number } {
    const parseHex = (hex: string) => ({
      r: parseInt(hex.slice(1, 3), 16) / 255,
      g: parseInt(hex.slice(3, 5), 16) / 255,
      b: parseInt(hex.slice(5, 7), 16) / 255,
    });

    const [low, mid, high] = scale.map(parseHex);

    if (t < 0.5) {
      const s = t * 2;
      return {
        r: low.r + (mid.r - low.r) * s,
        g: low.g + (mid.g - low.g) * s,
        b: low.b + (mid.b - low.b) * s,
      };
    } else {
      const s = (t - 0.5) * 2;
      return {
        r: mid.r + (high.r - mid.r) * s,
        g: mid.g + (high.g - mid.g) * s,
        b: mid.b + (high.b - mid.b) * s,
      };
    }
  }

  private animateOpacity(target: number, duration: number, onComplete?: () => void): void {
    if (!this.material) return;

    const startOpacity = this.material.uniforms.uOpacity.value;
    const startTime = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;

      if (this.material) {
        this.material.uniforms.uOpacity.value = startOpacity + (target - startOpacity) * eased;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (onComplete) {
        onComplete();
      }
    };

    animate();
  }

  dispose(): void {
    if (this.markers) {
      this.markers.geometry.dispose();
      this.group.remove(this.markers);
    }
    if (this.material) {
      this.material.dispose();
    }
  }
}
