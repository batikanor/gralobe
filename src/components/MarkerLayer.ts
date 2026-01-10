/**
 * MarkerLayer - Renders 3D markers (spikes/dots/pins) on the globe
 * Supports city-level visualization with glowing animated markers
 */

import * as THREE from "three";
import { SPHERE_RADIUS } from "../lib/shaders";
import type { MarkerConfig, MarkerData } from "../lib/types";

const DEG_TO_RAD = Math.PI / 180;

/**
 * Convert latitude/longitude to 3D position on sphere
 */
function latLngToVector3(
  lat: number,
  lng: number,
  radius: number = SPHERE_RADIUS
): THREE.Vector3 {
  const phi = (90 - lat) * DEG_TO_RAD;
  const theta = (lng + 180) * DEG_TO_RAD;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/**
 * Convert latitude/longitude to flat map position
 */
function latLngToFlat(lat: number, lng: number): THREE.Vector3 {
  const flatWidth = 2 * Math.PI * SPHERE_RADIUS;
  const flatHeight = Math.PI * SPHERE_RADIUS;

  return new THREE.Vector3(
    (lng / 180) * (flatWidth / 2),
    (lat / 90) * (flatHeight / 2),
    0
  );
}

/**
 * Default marker configuration
 */
const DEFAULT_CONFIG: Required<Omit<MarkerConfig, "onMarkerClick">> = {
  style: "spike",
  color: "#0ea5e9", // Cyan/teal
  maxHeight: 15,
  pulseAnimation: true,
  opacity: 0.9,
};

/**
 * MarkerLayer component for GlobeViz
 */
export class MarkerLayer {
  private group: THREE.Group;
  private markers: MarkerData[] = [];
  private config: Required<Omit<MarkerConfig, "onMarkerClick">> & {
    onMarkerClick?: MarkerConfig["onMarkerClick"];
  };
  private markerMeshes: THREE.Mesh[] = [];
  private glowMeshes: THREE.Mesh[] = [];
  private morph: number = 1;
  private time: number = 0;

  // Cached materials
  private markerMaterial: THREE.MeshBasicMaterial;
  private glowMaterial: THREE.ShaderMaterial;

  constructor(config: MarkerConfig = {}) {
    this.group = new THREE.Group();
    this.config = { ...DEFAULT_CONFIG, ...config };

    // Create shared marker material
    this.markerMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.config.color),
      transparent: true,
      opacity: this.config.opacity,
    });

    // Create glow shader material
    this.glowMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(this.config.color) },
        uTime: { value: 0 },
        uPulse: { value: this.config.pulseAnimation ? 1 : 0 },
      },
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uPulse;
        varying vec3 vNormal;
        
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          float pulse = 1.0 + sin(uTime * 3.0) * 0.3 * uPulse;
          vec3 glow = uColor * intensity * pulse;
          float alpha = intensity * 0.6 * pulse;
          gl_FragColor = vec4(glow, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
  }

  /**
   * Get the Three.js group containing all markers
   */
  getGroup(): THREE.Group {
    return this.group;
  }

  /**
   * Set marker data and rebuild meshes
   */
  setMarkers(markers: MarkerData[]): void {
    this.markers = markers;
    this.rebuild();
  }

  /**
   * Update configuration
   */
  setConfig(config: Partial<MarkerConfig>): void {
    this.config = { ...this.config, ...config };

    // Update materials
    if (config.color) {
      this.markerMaterial.color.set(config.color);
      this.glowMaterial.uniforms.uColor.value.set(config.color);
    }
    if (config.opacity !== undefined) {
      this.markerMaterial.opacity = config.opacity;
    }
    if (config.pulseAnimation !== undefined) {
      this.glowMaterial.uniforms.uPulse.value = config.pulseAnimation ? 1 : 0;
    }

    this.rebuild();
  }

  /**
   * Set morph value (0 = flat, 1 = globe)
   */
  setMorph(value: number): void {
    this.morph = value;
    this.updatePositions();
  }

  /**
   * Update animation time
   */
  update(time: number): void {
    this.time = time;
    this.glowMaterial.uniforms.uTime.value = time;
  }

  /**
   * Clear and rebuild all marker meshes
   */
  private rebuild(): void {
    // Clear existing meshes
    this.group.clear();
    this.markerMeshes = [];
    this.glowMeshes = [];

    if (this.markers.length === 0) return;

    // Find value range for scaling
    const values = this.markers.map((m) => m.value);
    const maxValue = Math.max(...values, 1);

    // Create meshes for each marker
    for (const marker of this.markers) {
      const normalizedValue = marker.value / maxValue;
      const mesh = this.createMarkerMesh(marker, normalizedValue);
      this.markerMeshes.push(mesh);
      this.group.add(mesh);

      // Add glow effect for spike/pin styles
      if (this.config.style !== "dot") {
        const glow = this.createGlowMesh(marker, normalizedValue);
        this.glowMeshes.push(glow);
        this.group.add(glow);
      }
    }

    this.updatePositions();
  }

  /**
   * Create a single marker mesh
   */
  private createMarkerMesh(
    marker: MarkerData,
    normalizedValue: number
  ): THREE.Mesh {
    let geometry: THREE.BufferGeometry;
    const height = 2 + normalizedValue * this.config.maxHeight;

    switch (this.config.style) {
      case "dot":
        geometry = new THREE.SphereGeometry(1 + normalizedValue * 2, 16, 12);
        break;
      case "pin":
        geometry = new THREE.ConeGeometry(1.5, height, 8);
        break;
      case "spike":
      default:
        geometry = new THREE.CylinderGeometry(0.3, 1.2, height, 8);
        break;
    }

    // Use custom color if provided
    const material = marker.color
      ? new THREE.MeshBasicMaterial({
          color: new THREE.Color(marker.color),
          transparent: true,
          opacity: this.config.opacity,
        })
      : this.markerMaterial;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { marker, height };

    return mesh;
  }

  /**
   * Create glow mesh for marker
   */
  private createGlowMesh(
    marker: MarkerData,
    normalizedValue: number
  ): THREE.Mesh {
    const size = 2 + normalizedValue * 3;
    const geometry = new THREE.SphereGeometry(size, 16, 12);

    // Use custom color if provided
    const material = marker.color
      ? new THREE.ShaderMaterial({
          ...this.glowMaterial,
          uniforms: {
            ...this.glowMaterial.uniforms,
            uColor: { value: new THREE.Color(marker.color) },
          },
        })
      : this.glowMaterial;

    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = { marker };

    return mesh;
  }

  /**
   * Update marker positions based on morph value
   */
  private updatePositions(): void {
    for (let i = 0; i < this.markerMeshes.length; i++) {
      const mesh = this.markerMeshes[i];
      const marker = mesh.userData.marker as MarkerData;
      const height = mesh.userData.height as number;

      // Calculate positions
      const spherePos = latLngToVector3(marker.lat, marker.lng, SPHERE_RADIUS);
      const flatPos = latLngToFlat(marker.lat, marker.lng);

      // Smooth morph interpolation
      const t = this.morph * this.morph * (3 - 2 * this.morph);
      mesh.position.lerpVectors(flatPos, spherePos, t);

      // Orient marker
      if (t > 0.01) {
        // On globe: point outward from center
        mesh.lookAt(mesh.position.clone().multiplyScalar(2));

        // Adjust for spike/pin to point outward
        if (this.config.style === "spike" || this.config.style === "pin") {
          mesh.rotateX(Math.PI / 2);
          // Offset to sit on surface
          const offset = spherePos
            .clone()
            .normalize()
            .multiplyScalar(height / 2);
          mesh.position.add(offset.multiplyScalar(t));
        }
      } else {
        // On flat map: point up (Z axis)
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        if (this.config.style === "spike" || this.config.style === "pin") {
          mesh.position.z = height / 2;
        }
      }

      // Update glow position
      if (this.glowMeshes[i]) {
        const glow = this.glowMeshes[i];
        glow.position.copy(mesh.position);
      }
    }
  }

  /**
   * Find marker at screen position (for click/hover)
   */
  getMarkerAtPosition(
    raycaster: THREE.Raycaster,
    camera: THREE.Camera,
    screenPos: THREE.Vector2
  ): MarkerData | null {
    raycaster.setFromCamera(screenPos, camera);
    const intersects = raycaster.intersectObjects(this.markerMeshes);

    if (intersects.length > 0) {
      return intersects[0].object.userData.marker as MarkerData;
    }
    return null;
  }

  /**
   * Dispose of all resources
   */
  dispose(): void {
    this.group.clear();
    this.markerMaterial.dispose();
    this.glowMaterial.dispose();

    for (const mesh of this.markerMeshes) {
      mesh.geometry.dispose();
      if (mesh.material !== this.markerMaterial) {
        (mesh.material as THREE.Material).dispose();
      }
    }
    for (const mesh of this.glowMeshes) {
      mesh.geometry.dispose();
      if (mesh.material !== this.glowMaterial) {
        (mesh.material as THREE.Material).dispose();
      }
    }

    this.markerMeshes = [];
    this.glowMeshes = [];
  }
}

// Export utility function
export { latLngToVector3 };
