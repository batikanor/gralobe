import { gsap } from "gsap";
import * as THREE from "three";

interface City {
  name: string;
  lat: number;
  lon: number;
  importance: number; // 0-1
}

const MAJOR_CITIES: City[] = [
  { name: "New York", lat: 40.7128, lon: -74.006, importance: 1.0 },
  { name: "London", lat: 51.5074, lon: -0.1278, importance: 1.0 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, importance: 1.0 },
  { name: "Shanghai", lat: 31.2304, lon: 121.4737, importance: 0.9 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, importance: 0.85 },
  { name: "Singapore", lat: 1.3521, lon: 103.8198, importance: 0.85 },
  { name: "Hong Kong", lat: 22.3193, lon: 114.1694, importance: 0.85 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, importance: 0.8 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333, importance: 0.8 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777, importance: 0.8 },
  { name: "Paris", lat: 48.8566, lon: 2.3522, importance: 0.9 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437, importance: 0.85 },
  { name: "Berlin", lat: 52.52, lon: 13.405, importance: 0.75 },
  { name: "Moscow", lat: 55.7558, lon: 37.6173, importance: 0.8 },
  { name: "Seoul", lat: 37.5665, lon: 126.978, importance: 0.85 },
  { name: "Shenzhen", lat: 22.5431, lon: 114.0579, importance: 0.9 },
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // NY - London
  [1, 4], // London - Dubai
  [4, 9], // Dubai - Mumbai
  [9, 5], // Mumbai - Singapore
  [5, 6], // Singapore - HK
  [6, 3], // HK - Shanghai
  [3, 2], // Shanghai - Tokyo
  [2, 11], // Tokyo - LA
  [11, 0], // LA - NY
  [0, 8], // NY - São Paulo
  [1, 12], // London - Berlin
  [12, 13], // Berlin - Moscow
  [2, 14], // Tokyo - Seoul
  [14, 15], // Seoul - Shenzhen
  [15, 6], // Shenzhen - HK
  [5, 7], // Singapore - Sydney
  [10, 1], // Paris - London
];

export class ConnectionLines {
  private group: THREE.Group;
  private lines: THREE.Line[] = [];
  private points: THREE.Points | null = null;
  private pulseParticles: THREE.Points | null = null;
  private sphereRadius: number;
  private morphProgress: number = 0;
  private time: number = 0;
  private visible: boolean = true;

  constructor(sphereRadius: number = 50) {
    this.group = new THREE.Group();
    this.sphereRadius = sphereRadius;
    this.createCityPoints();
    this.createConnections();
    this.createPulseParticles();
  }

  private latLonToPosition(
    lat: number,
    lon: number,
    radius: number,
    morphProgress: number,
  ): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    // Spherical position
    const spherePos = new THREE.Vector3(
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta),
    );

    // Flat Mercator position
    const x = (lon / 180) * (Math.PI * radius);
    const mercatorY = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI) / 180 / 2));
    const y = (mercatorY / Math.PI) * ((Math.PI * radius) / 2);
    const flatPos = new THREE.Vector3(x, y, radius * 0.02); // Slight Z offset

    // Interpolate based on morph progress
    return spherePos.lerp(flatPos, 1 - morphProgress);
  }

  private createCityPoints(): void {
    const positions: number[] = [];
    const colors: number[] = [];
    const sizes: number[] = [];

    MAJOR_CITIES.forEach((city) => {
      const pos = this.latLonToPosition(city.lat, city.lon, this.sphereRadius * 1.01, 1);
      positions.push(pos.x, pos.y, pos.z);

      // Color based on importance (more important = brighter cyan)
      const intensity = 0.5 + city.importance * 0.5;
      colors.push(0, intensity, 1);

      sizes.push(3 + city.importance * 4);
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 5,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    this.points = new THREE.Points(geometry, material);
    this.group.add(this.points);
  }

  private createConnections(): void {
    const material = new THREE.LineBasicMaterial({
      color: 0x00aaff,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    CONNECTIONS.forEach(([fromIdx, toIdx]) => {
      const from = MAJOR_CITIES[fromIdx];
      const to = MAJOR_CITIES[toIdx];

      // Create curved line (great circle approximation)
      const points = this.createArcPoints(from, to, 32);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(geometry, material.clone());
      this.lines.push(line);
      this.group.add(line);
    });
  }

  private createArcPoints(from: City, to: City, segments: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    const startPos = this.latLonToPosition(from.lat, from.lon, this.sphereRadius * 1.01, 1);
    const endPos = this.latLonToPosition(to.lat, to.lon, this.sphereRadius * 1.01, 1);

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      // Linear interpolation with height offset for arc effect
      const pos = startPos.clone().lerp(endPos, t);

      // Add arc height (higher in the middle)
      const arcHeight = Math.sin(t * Math.PI) * 5;
      pos.normalize().multiplyScalar(this.sphereRadius * 1.01 + arcHeight);

      points.push(pos);
    }

    return points;
  }

  private createPulseParticles(): void {
    // Particles that travel along the connection lines
    const particleCount = CONNECTIONS.length * 2;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;

      colors[i * 3] = 0;
      colors[i * 3 + 1] = 1;
      colors[i * 3 + 2] = 1;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 3,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.pulseParticles = new THREE.Points(geometry, material);
    this.group.add(this.pulseParticles);
  }

  getObject(): THREE.Group {
    return this.group;
  }

  setMorphProgress(progress: number): void {
    this.morphProgress = progress;
    this.updatePositions();
  }

  setVisible(visible: boolean): void {
    this.visible = visible;
    this.group.visible = visible;
  }

  private updatePositions(): void {
    // Update city points
    if (this.points) {
      const positions = this.points.geometry.attributes.position.array as Float32Array;
      MAJOR_CITIES.forEach((city, i) => {
        const pos = this.latLonToPosition(
          city.lat,
          city.lon,
          this.sphereRadius * 1.01,
          this.morphProgress,
        );
        positions[i * 3] = pos.x;
        positions[i * 3 + 1] = pos.y;
        positions[i * 3 + 2] = pos.z;
      });
      this.points.geometry.attributes.position.needsUpdate = true;
    }

    // Update connection lines
    this.lines.forEach((line, idx) => {
      const [fromIdx, toIdx] = CONNECTIONS[idx];
      const from = MAJOR_CITIES[fromIdx];
      const to = MAJOR_CITIES[toIdx];
      const points = this.createArcPointsWithMorph(from, to, 32, this.morphProgress);

      const positions = line.geometry.attributes.position.array as Float32Array;
      points.forEach((point, i) => {
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      });
      line.geometry.attributes.position.needsUpdate = true;
    });
  }

  private createArcPointsWithMorph(
    from: City,
    to: City,
    segments: number,
    morphProgress: number,
  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;

      // Interpolate lat/lon
      const lat = from.lat + (to.lat - from.lat) * t;
      const lon = from.lon + (to.lon - from.lon) * t;

      // Get position with morph
      const pos = this.latLonToPosition(lat, lon, this.sphereRadius * 1.01, morphProgress);

      // Add arc height based on morph progress
      const arcHeight = Math.sin(t * Math.PI) * (2 + morphProgress * 3);
      if (morphProgress > 0.5) {
        pos.normalize().multiplyScalar(pos.length() + arcHeight);
      } else {
        pos.z += arcHeight;
      }

      points.push(pos);
    }

    return points;
  }

  update(deltaTime: number): void {
    if (!this.visible) return;

    this.time += deltaTime;

    // Animate pulse particles along connections
    if (this.pulseParticles) {
      const positions = this.pulseParticles.geometry.attributes.position.array as Float32Array;

      CONNECTIONS.forEach((connection, idx) => {
        const [fromIdx, toIdx] = connection;
        const from = MAJOR_CITIES[fromIdx];
        const to = MAJOR_CITIES[toIdx];

        // Two particles per connection, traveling in opposite directions
        const t1 = (this.time * 0.3 + idx * 0.1) % 1;
        const t2 = (this.time * 0.3 + idx * 0.1 + 0.5) % 1;

        const points = this.createArcPointsWithMorph(from, to, 32, this.morphProgress);

        const segmentIdx1 = Math.floor(t1 * (points.length - 1));
        const segmentIdx2 = Math.floor(t2 * (points.length - 1));

        const pos1 = points[segmentIdx1];
        const pos2 = points[segmentIdx2];

        positions[idx * 6] = pos1.x;
        positions[idx * 6 + 1] = pos1.y;
        positions[idx * 6 + 2] = pos1.z;

        positions[idx * 6 + 3] = pos2.x;
        positions[idx * 6 + 4] = pos2.y;
        positions[idx * 6 + 5] = pos2.z;
      });

      this.pulseParticles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate line opacity based on time
    this.lines.forEach((line, idx) => {
      const material = line.material as THREE.LineBasicMaterial;
      const pulse = 0.3 + Math.sin(this.time * 2 + idx * 0.5) * 0.2;
      material.opacity = pulse * (0.5 + this.morphProgress * 0.5);
    });
  }

  async animateIn(duration: number = 2): Promise<void> {
    this.setVisible(true);
    const target = { opacity: 0 };

    return new Promise((resolve) => {
      gsap.to(target, {
        opacity: 1,
        duration,
        ease: "power2.inOut",
        onUpdate: () => {
          if (this.points) {
            (this.points.material as THREE.PointsMaterial).opacity = target.opacity * 0.9;
          }
          this.lines.forEach((line) => {
            (line.material as THREE.LineBasicMaterial).opacity = target.opacity * 0.4;
          });
        },
        onComplete: resolve,
      });
    });
  }

  dispose(): void {
    this.lines.forEach((line) => {
      line.geometry.dispose();
      (line.material as THREE.Material).dispose();
    });
    this.points?.geometry.dispose();
    (this.points?.material as THREE.Material)?.dispose();
    this.pulseParticles?.geometry.dispose();
    (this.pulseParticles?.material as THREE.Material)?.dispose();
  }
}
