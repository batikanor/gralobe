import * as THREE from 'three';
import { gsap } from 'gsap';

// Import shaders as raw strings
import earthVertexShader from './shaders/earthVertex.glsl?raw';
import earthFragmentShader from './shaders/earthFragment.glsl?raw';
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl?raw';
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl?raw';

export type FormFactor = 'desktop' | 'phone' | 'foldable' | 'trifold' | 'watch';
export type MorphStyle = 'direct' | 'roll' | 'wave';

export interface GlobeConfig {
  morphProgress: number;
  morphStyle: MorphStyle;
  elevationScale: number;
  waveAmplitude: number;
  waveFrequency: number;
  atmosphereIntensity: number;
  atmosphereColor: THREE.Color;
  sunsetColor: THREE.Color;
  cloudOpacity: number;
  oceanSpecular: number;
  cityLightsIntensity: number;
  dayNightBlend: number;
  sunPosition: THREE.Vector3;
  holoIntensity: number;
  gridIntensity: number;
  scanLineEnabled: boolean;
  scanLineSpeed: number;
  dataVizIntensity: number;
  formFactor: FormFactor;
  foldAngle: number;
  rotationSpeed: number;
  autoRotate: boolean;
}

const DEFAULT_CONFIG: GlobeConfig = {
  morphProgress: 0,
  morphStyle: 'roll',
  elevationScale: 1.5,
  waveAmplitude: 3.0,
  waveFrequency: 8.0,
  atmosphereIntensity: 0.6,
  atmosphereColor: new THREE.Color(0.2, 0.4, 0.8),
  sunsetColor: new THREE.Color(0.8, 0.3, 0.15),
  cloudOpacity: 0.3,
  oceanSpecular: 0.5,
  cityLightsIntensity: 1.0,
  dayNightBlend: 1.0,
  sunPosition: new THREE.Vector3(100, 50, 100),
  holoIntensity: 0.0,
  gridIntensity: 0.0,
  scanLineEnabled: false,
  scanLineSpeed: 0.3,
  dataVizIntensity: 0.0,
  formFactor: 'desktop',
  foldAngle: 0,
  rotationSpeed: 0.1,
  autoRotate: false,
};

const FORM_FACTOR_MAP: Record<FormFactor, number> = {
  desktop: 0,
  phone: 1,
  foldable: 2,
  trifold: 3,
  watch: 4,
};

const MORPH_STYLE_MAP: Record<MorphStyle, number> = {
  direct: 0,
  roll: 1,
  wave: 2,
};

export class Globe {
  private group: THREE.Group;
  private earthMesh: THREE.Mesh | null = null;
  private atmosphereMesh: THREE.Mesh | null = null;
  // Reserved for future cloud layer
  // private cloudsMesh: THREE.Mesh | null = null;

  private earthMaterial: THREE.ShaderMaterial | null = null;
  private atmosphereMaterial: THREE.ShaderMaterial | null = null;

  private textures: Map<string, THREE.Texture> = new Map();
  private config: GlobeConfig;
  private time: number = 0;
  private scanLinePosition: number = 0;

  private morphTween: gsap.core.Tween | null = null;

  constructor(config: Partial<GlobeConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.group = new THREE.Group();
  }

  async initialize(): Promise<void> {
    await this.loadTextures();
    this.createEarth();
    this.createAtmosphere();
    // this.createClouds(); // Optional: separate cloud layer
  }

  private async loadTextures(): Promise<void> {
    const loader = new THREE.TextureLoader();

    const textureUrls: Record<string, string> = {
      day: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
      night: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png',
      clouds: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_clouds_1024.png',
      specular: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
      elevation: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg',
      normal: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg',
    };

    const loadPromises = Object.entries(textureUrls).map(async ([name, url]) => {
      try {
        const texture = await loader.loadAsync(url);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        this.textures.set(name, texture);
      } catch (error) {
        console.warn(`Failed to load texture ${name}:`, error);
        // Create a fallback texture
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 2;
        const ctx = canvas.getContext('2d')!;
        ctx.fillStyle = name === 'night' ? '#001020' : '#2244aa';
        ctx.fillRect(0, 0, 2, 2);
        const fallback = new THREE.CanvasTexture(canvas);
        this.textures.set(name, fallback);
      }
    });

    await Promise.all(loadPromises);
  }

  private createEarth(): void {
    // High-resolution plane geometry that will be morphed
    const segments = 512;
    const geometry = new THREE.PlaneGeometry(
      Math.PI * 2 * 50, // Width matches sphere circumference
      Math.PI * 50,     // Height matches half sphere circumference
      segments,
      segments / 2
    );

    // Convert to non-indexed geometry for proper vertex manipulation
    const nonIndexed = geometry.toNonIndexed();

    this.earthMaterial = new THREE.ShaderMaterial({
      vertexShader: earthVertexShader,
      fragmentShader: earthFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMorphProgress: { value: this.config.morphProgress },
        uMorphStyle: { value: MORPH_STYLE_MAP[this.config.morphStyle] },
        uElevationScale: { value: this.config.elevationScale },
        uWaveAmplitude: { value: this.config.waveAmplitude },
        uWaveFrequency: { value: this.config.waveFrequency },
        uFoldPosition: { value: new THREE.Vector2(0.5, 0.5) },
        uFoldAngle: { value: this.config.foldAngle },
        uFormFactor: { value: FORM_FACTOR_MAP[this.config.formFactor] },

        uDayMap: { value: this.textures.get('day') },
        uNightMap: { value: this.textures.get('night') },
        uCloudsMap: { value: this.textures.get('clouds') },
        uSpecularMap: { value: this.textures.get('specular') },
        uNormalMap: { value: this.textures.get('normal') },
        uElevationMap: { value: this.textures.get('elevation') },
        uLandMask: { value: this.textures.get('specular') },

        uSunDirection: { value: this.config.sunPosition.clone().normalize() },
        uCameraPosition: { value: new THREE.Vector3(0, 0, 200) },
        uAtmosphereIntensity: { value: this.config.atmosphereIntensity },
        uAtmosphereColor: { value: this.config.atmosphereColor },
        uSunsetColor: { value: this.config.sunsetColor },
        uCloudOpacity: { value: this.config.cloudOpacity },
        uOceanSpecular: { value: this.config.oceanSpecular },
        uCityLightsIntensity: { value: this.config.cityLightsIntensity },
        uDayNightBlend: { value: this.config.dayNightBlend },

        uHoloIntensity: { value: this.config.holoIntensity },
        uGridIntensity: { value: this.config.gridIntensity },
        uScanLinePosition: { value: 0 },
        uDataVizIntensity: { value: this.config.dataVizIntensity },
      },
      side: THREE.DoubleSide,
      transparent: true,
    });

    this.earthMesh = new THREE.Mesh(nonIndexed, this.earthMaterial);
    this.group.add(this.earthMesh);
  }

  private createAtmosphere(): void {
    const segments = 128;
    const geometry = new THREE.PlaneGeometry(
      Math.PI * 2 * 50 * 1.05,
      Math.PI * 50 * 1.05,
      segments,
      segments / 2
    );

    this.atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        uMorphProgress: { value: this.config.morphProgress },
        uAtmosphereScale: { value: 1.05 },
        uSunDirection: { value: this.config.sunPosition.clone().normalize() },
        uCameraPosition: { value: new THREE.Vector3(0, 0, 200) },
        uAtmosphereColor: { value: this.config.atmosphereColor },
        uSunsetColor: { value: this.config.sunsetColor },
        uAtmosphereIntensity: { value: this.config.atmosphereIntensity },
      },
      side: THREE.BackSide,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    this.atmosphereMesh = new THREE.Mesh(geometry, this.atmosphereMaterial);
    this.group.add(this.atmosphereMesh);
  }

  getObject(): THREE.Group {
    return this.group;
  }

  update(deltaTime: number, cameraPosition: THREE.Vector3): void {
    this.time += deltaTime;

    // Update scan line
    if (this.config.scanLineEnabled) {
      this.scanLinePosition = (this.scanLinePosition + deltaTime * this.config.scanLineSpeed) % 1;
    }

    // Auto rotation
    if (this.config.autoRotate && this.config.morphProgress > 0.9) {
      this.group.rotation.y += deltaTime * this.config.rotationSpeed;
    }

    // Update uniforms
    if (this.earthMaterial) {
      this.earthMaterial.uniforms.uTime.value = this.time;
      this.earthMaterial.uniforms.uCameraPosition.value.copy(cameraPosition);
      this.earthMaterial.uniforms.uScanLinePosition.value = this.scanLinePosition;
    }

    if (this.atmosphereMaterial) {
      this.atmosphereMaterial.uniforms.uCameraPosition.value.copy(cameraPosition);
    }
  }

  // Animation methods
  morphTo(progress: number, duration: number = 2, ease: string = 'power2.inOut'): Promise<void> {
    return new Promise((resolve) => {
      if (this.morphTween) {
        this.morphTween.kill();
      }

      const target = { progress: this.config.morphProgress };

      this.morphTween = gsap.to(target, {
        progress,
        duration,
        ease,
        onUpdate: () => {
          this.setMorphProgress(target.progress);
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  setMorphProgress(value: number): void {
    this.config.morphProgress = value;
    if (this.earthMaterial) {
      this.earthMaterial.uniforms.uMorphProgress.value = value;
    }
    if (this.atmosphereMaterial) {
      this.atmosphereMaterial.uniforms.uMorphProgress.value = value;
    }
  }

  // Configuration setters
  setConfig(newConfig: Partial<GlobeConfig>): void {
    Object.assign(this.config, newConfig);

    if (this.earthMaterial) {
      const u = this.earthMaterial.uniforms;

      if (newConfig.morphProgress !== undefined) u.uMorphProgress.value = newConfig.morphProgress;
      if (newConfig.morphStyle !== undefined) u.uMorphStyle.value = MORPH_STYLE_MAP[newConfig.morphStyle];
      if (newConfig.elevationScale !== undefined) u.uElevationScale.value = newConfig.elevationScale;
      if (newConfig.waveAmplitude !== undefined) u.uWaveAmplitude.value = newConfig.waveAmplitude;
      if (newConfig.waveFrequency !== undefined) u.uWaveFrequency.value = newConfig.waveFrequency;
      if (newConfig.atmosphereIntensity !== undefined) u.uAtmosphereIntensity.value = newConfig.atmosphereIntensity;
      if (newConfig.atmosphereColor !== undefined) u.uAtmosphereColor.value = newConfig.atmosphereColor;
      if (newConfig.sunsetColor !== undefined) u.uSunsetColor.value = newConfig.sunsetColor;
      if (newConfig.cloudOpacity !== undefined) u.uCloudOpacity.value = newConfig.cloudOpacity;
      if (newConfig.oceanSpecular !== undefined) u.uOceanSpecular.value = newConfig.oceanSpecular;
      if (newConfig.cityLightsIntensity !== undefined) u.uCityLightsIntensity.value = newConfig.cityLightsIntensity;
      if (newConfig.dayNightBlend !== undefined) u.uDayNightBlend.value = newConfig.dayNightBlend;
      if (newConfig.sunPosition !== undefined) u.uSunDirection.value = newConfig.sunPosition.clone().normalize();
      if (newConfig.holoIntensity !== undefined) u.uHoloIntensity.value = newConfig.holoIntensity;
      if (newConfig.gridIntensity !== undefined) u.uGridIntensity.value = newConfig.gridIntensity;
      if (newConfig.dataVizIntensity !== undefined) u.uDataVizIntensity.value = newConfig.dataVizIntensity;
      if (newConfig.formFactor !== undefined) u.uFormFactor.value = FORM_FACTOR_MAP[newConfig.formFactor];
      if (newConfig.foldAngle !== undefined) u.uFoldAngle.value = newConfig.foldAngle;
    }

    if (this.atmosphereMaterial) {
      const u = this.atmosphereMaterial.uniforms;

      if (newConfig.morphProgress !== undefined) u.uMorphProgress.value = newConfig.morphProgress;
      if (newConfig.atmosphereIntensity !== undefined) u.uAtmosphereIntensity.value = newConfig.atmosphereIntensity;
      if (newConfig.atmosphereColor !== undefined) u.uAtmosphereColor.value = newConfig.atmosphereColor;
      if (newConfig.sunsetColor !== undefined) u.uSunsetColor.value = newConfig.sunsetColor;
      if (newConfig.sunPosition !== undefined) u.uSunDirection.value = newConfig.sunPosition.clone().normalize();
    }
  }

  getConfig(): GlobeConfig {
    return { ...this.config };
  }

  // Preset animations
  async playIntroAnimation(): Promise<void> {
    // Start flat, then morph to globe
    this.setMorphProgress(0);
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.morphTo(1, 3, 'power2.inOut');
  }

  async playFoldAnimation(targetAngle: number, duration: number = 1): Promise<void> {
    return new Promise((resolve) => {
      gsap.to(this.config, {
        foldAngle: targetAngle,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => {
          this.setConfig({ foldAngle: this.config.foldAngle });
        },
        onComplete: resolve,
      });
    });
  }

  dispose(): void {
    if (this.morphTween) {
      this.morphTween.kill();
    }

    this.textures.forEach(texture => texture.dispose());
    this.earthMesh?.geometry.dispose();
    this.atmosphereMesh?.geometry.dispose();
    this.earthMaterial?.dispose();
    this.atmosphereMaterial?.dispose();
  }
}
