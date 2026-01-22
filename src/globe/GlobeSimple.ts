import { gsap } from "gsap";
import * as THREE from "three";

export interface SimpleGlobeConfig {
  morphProgress: number;
  autoRotate: boolean;
  rotationSpeed: number;
}

/**
 * A simpler, higher-quality globe implementation
 * Uses standard Three.js geometries with proper morphing
 */
export class SimpleGlobe {
  private group: THREE.Group;
  private sphereMesh: THREE.Mesh | null = null;
  private flatMesh: THREE.Mesh | null = null;
  private atmosphereMesh: THREE.Mesh | null = null;

  private material: THREE.MeshStandardMaterial | null = null;
  private config: SimpleGlobeConfig;
  private morphProgress: number = 0;

  private readonly SPHERE_RADIUS = 50;

  constructor(config: Partial<SimpleGlobeConfig> = {}) {
    this.config = {
      morphProgress: 0,
      autoRotate: false,
      rotationSpeed: 0.1,
      ...config,
    };
    this.group = new THREE.Group();
  }

  async initialize(): Promise<void> {
    const loader = new THREE.TextureLoader();

    // Load high-quality textures with proper settings
    const [dayMap, bumpMap, specMap] = await Promise.all([
      loader
        .loadAsync(
          "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_4096.jpg",
        )
        .catch(() =>
          loader.loadAsync(
            "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg",
          ),
        ),
      loader.loadAsync(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg",
      ),
      loader.loadAsync(
        "https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg",
      ),
    ]);

    // Enable anisotropic filtering for sharper textures
    const maxAniso = 16;
    [dayMap, bumpMap, specMap].forEach((tex) => {
      tex.anisotropy = maxAniso;
      tex.minFilter = THREE.LinearMipmapLinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = true;
    });

    // Create material
    this.material = new THREE.MeshStandardMaterial({
      map: dayMap,
      normalMap: bumpMap,
      normalScale: new THREE.Vector2(0.5, 0.5),
      metalnessMap: specMap,
      metalness: 0.1,
      roughness: 0.8,
    });

    this.createGeometries();
    this.createAtmosphere();
  }

  private createGeometries(): void {
    // High-resolution sphere geometry
    const sphereGeo = new THREE.SphereGeometry(this.SPHERE_RADIUS, 128, 64);

    // Create flat plane geometry with same UV mapping
    const width = Math.PI * 2 * this.SPHERE_RADIUS;
    const height = Math.PI * this.SPHERE_RADIUS;
    const flatGeo = new THREE.PlaneGeometry(width, height, 128, 64);

    // Store original positions for morphing
    const spherePositions = sphereGeo.attributes.position.array.slice();
    const flatPositions = flatGeo.attributes.position.array.slice();

    // Create a single geometry that we'll morph
    const morphGeo = sphereGeo.clone();
    morphGeo.morphAttributes.position = [new THREE.Float32BufferAttribute(flatPositions, 3)];

    // The sphere mesh with morph targets
    this.sphereMesh = new THREE.Mesh(morphGeo, this.material!);
    this.sphereMesh.morphTargetInfluences = [0]; // 0 = sphere, 1 = flat

    this.group.add(this.sphereMesh);
  }

  private createAtmosphere(): void {
    const atmosphereGeo = new THREE.SphereGeometry(this.SPHERE_RADIUS * 1.02, 64, 32);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.7 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
          gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 0.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    this.atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    this.group.add(this.atmosphereMesh);
  }

  getObject(): THREE.Group {
    return this.group;
  }

  setMorphProgress(value: number): void {
    this.morphProgress = Math.max(0, Math.min(1, value));

    if (this.sphereMesh && this.sphereMesh.morphTargetInfluences) {
      // 0 = sphere, 1 = flat
      this.sphereMesh.morphTargetInfluences[0] = 1 - this.morphProgress;
    }

    // Scale atmosphere based on morph
    if (this.atmosphereMesh) {
      this.atmosphereMesh.visible = this.morphProgress > 0.5;
      this.atmosphereMesh.scale.setScalar(0.5 + this.morphProgress * 0.5);
    }
  }

  getMorphProgress(): number {
    return this.morphProgress;
  }

  morphTo(target: number, duration: number = 2): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this, {
        morphProgress: target,
        duration,
        ease: "power2.inOut",
        onUpdate: () => this.setMorphProgress(this.morphProgress),
        onComplete: resolve,
      });
    });
  }

  update(deltaTime: number): void {
    if (this.config.autoRotate && this.morphProgress > 0.8) {
      this.group.rotation.y += deltaTime * this.config.rotationSpeed;
    }
  }

  setAutoRotate(value: boolean): void {
    this.config.autoRotate = value;
  }

  dispose(): void {
    this.sphereMesh?.geometry.dispose();
    this.atmosphereMesh?.geometry.dispose();
    this.material?.dispose();
  }
}
