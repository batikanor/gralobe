import GUI from 'lil-gui';
import * as THREE from 'three';
import { Globe } from '../globe/Globe';
import type { FormFactor, MorphStyle } from '../globe/Globe';
import { gsap } from 'gsap';

export interface ControlsCallbacks {
  onMorphChange?: (progress: number) => void;
  onFormFactorChange?: (formFactor: FormFactor) => void;
  onPresetPlay?: (presetName: string) => void;
}

export class Controls {
  private gui: GUI;
  private globe: Globe;
  private callbacks: ControlsCallbacks;

  private animationParams = {
    morphProgress: 0,
    morphDuration: 2,
    morphEase: 'power2.inOut',
  };

  private formFactorParams = {
    current: 'desktop' as FormFactor,
    foldAngle: 0,
  };

  private visualParams = {
    elevationScale: 1.5,
    atmosphereIntensity: 0.6,
    cloudOpacity: 0.3,
    oceanSpecular: 0.5,
    cityLightsIntensity: 1.0,
    dayNightBlend: 1.0,
    holoIntensity: 0.0,
    gridIntensity: 0.0,
    scanLineEnabled: false,
    scanLineSpeed: 0.3,
    dataVizIntensity: 0.0,
  };

  private lightingParams = {
    sunX: 100,
    sunY: 50,
    sunZ: 100,
    atmosphereR: 0.3,
    atmosphereG: 0.6,
    atmosphereB: 1.0,
    sunsetR: 1.0,
    sunsetG: 0.4,
    sunsetB: 0.2,
  };

  private rotationParams = {
    autoRotate: false,
    rotationSpeed: 0.1,
  };

  constructor(globe: Globe, callbacks: ControlsCallbacks = {}) {
    this.globe = globe;
    this.callbacks = callbacks;
    this.gui = new GUI({ title: 'Globe Control Center', width: 320 });

    this.initializeFromConfig();
    this.setupFolders();
    this.styleGUI();
  }

  private initializeFromConfig(): void {
    const config = this.globe.getConfig();
    this.animationParams.morphProgress = config.morphProgress;
    this.visualParams.elevationScale = config.elevationScale;
    this.visualParams.atmosphereIntensity = config.atmosphereIntensity;
    this.visualParams.cloudOpacity = config.cloudOpacity;
    this.visualParams.oceanSpecular = config.oceanSpecular;
    this.visualParams.cityLightsIntensity = config.cityLightsIntensity;
    this.visualParams.dayNightBlend = config.dayNightBlend;
    this.visualParams.holoIntensity = config.holoIntensity;
    this.visualParams.gridIntensity = config.gridIntensity;
    this.visualParams.dataVizIntensity = config.dataVizIntensity;
    this.rotationParams.autoRotate = config.autoRotate;
    this.rotationParams.rotationSpeed = config.rotationSpeed;
    this.formFactorParams.current = config.formFactor;
    this.formFactorParams.foldAngle = config.foldAngle;
  }

  private setupFolders(): void {
    this.setupAnimationFolder();
    this.setupFormFactorFolder();
    this.setupVisualsFolder();
    this.setupLightingFolder();
    this.setupPresetsFolder();
  }

  private setupAnimationFolder(): void {
    const folder = this.gui.addFolder('🌍 Morphing Animation');
    folder.open();

    folder.add(this.animationParams, 'morphProgress', 0, 1, 0.001)
      .name('Progress')
      .onChange((value: number) => {
        this.globe.setMorphProgress(value);
        this.callbacks.onMorphChange?.(value);
      });

    folder.add(this.animationParams, 'morphDuration', 0.5, 10, 0.1)
      .name('Duration (s)');

    folder.add(this.animationParams, 'morphEase', [
      'none', 'power1.inOut', 'power2.inOut', 'power3.inOut', 'power4.inOut',
      'elastic.out', 'bounce.out', 'back.inOut', 'circ.inOut'
    ]).name('Easing');

    const morphStyle = { style: 'roll' as MorphStyle };
    folder.add(morphStyle, 'style', ['direct', 'roll', 'wave'])
      .name('Style')
      .onChange((value: MorphStyle) => {
        this.globe.setConfig({ morphStyle: value });
      });

    folder.add({
      animate: () => {
        const targetProgress = this.animationParams.morphProgress > 0.5 ? 0 : 1;
        this.globe.morphTo(targetProgress, this.animationParams.morphDuration, this.animationParams.morphEase);
        gsap.to(this.animationParams, {
          morphProgress: targetProgress,
          duration: this.animationParams.morphDuration,
          ease: this.animationParams.morphEase,
        });
      }
    }, 'animate').name('▶️ Toggle Animation');
  }

  private setupFormFactorFolder(): void {
    const folder = this.gui.addFolder('📱 Form Factor');

    folder.add(this.formFactorParams, 'current', ['desktop', 'phone', 'foldable', 'trifold', 'watch'])
      .name('Device')
      .onChange((value: FormFactor) => {
        this.globe.setConfig({ formFactor: value });
        this.callbacks.onFormFactorChange?.(value);
      });

    folder.add(this.formFactorParams, 'foldAngle', 0, Math.PI, 0.01)
      .name('Fold Angle')
      .onChange((value: number) => {
        this.globe.setConfig({ foldAngle: value });
      });

    folder.add({
      animateFold: async () => {
        const targetAngle = this.formFactorParams.foldAngle > Math.PI / 2 ? 0 : Math.PI;
        await this.globe.playFoldAnimation(targetAngle, 1.5);
        this.formFactorParams.foldAngle = targetAngle;
      }
    }, 'animateFold').name('▶️ Fold/Unfold');
  }

  private setupVisualsFolder(): void {
    const folder = this.gui.addFolder('✨ Visual Effects');

    folder.add(this.visualParams, 'elevationScale', 0, 10, 0.1)
      .name('Terrain Height')
      .onChange((value: number) => this.globe.setConfig({ elevationScale: value }));

    folder.add(this.visualParams, 'atmosphereIntensity', 0, 2, 0.01)
      .name('Atmosphere')
      .onChange((value: number) => this.globe.setConfig({ atmosphereIntensity: value }));

    folder.add(this.visualParams, 'cloudOpacity', 0, 1, 0.01)
      .name('Clouds')
      .onChange((value: number) => this.globe.setConfig({ cloudOpacity: value }));

    folder.add(this.visualParams, 'oceanSpecular', 0, 2, 0.01)
      .name('Ocean Shine')
      .onChange((value: number) => this.globe.setConfig({ oceanSpecular: value }));

    folder.add(this.visualParams, 'cityLightsIntensity', 0, 3, 0.01)
      .name('City Lights')
      .onChange((value: number) => this.globe.setConfig({ cityLightsIntensity: value }));

    folder.add(this.visualParams, 'dayNightBlend', 0, 1, 0.01)
      .name('Day/Night Blend')
      .onChange((value: number) => this.globe.setConfig({ dayNightBlend: value }));

    // Holographic effects subfolder
    const holoFolder = folder.addFolder('🔮 Holographic');

    holoFolder.add(this.visualParams, 'holoIntensity', 0, 1, 0.01)
      .name('Holo Grid')
      .onChange((value: number) => this.globe.setConfig({ holoIntensity: value }));

    holoFolder.add(this.visualParams, 'gridIntensity', 0, 1, 0.01)
      .name('Hex Grid')
      .onChange((value: number) => this.globe.setConfig({ gridIntensity: value }));

    holoFolder.add(this.visualParams, 'scanLineEnabled')
      .name('Scan Line')
      .onChange((value: boolean) => this.globe.setConfig({ scanLineEnabled: value }));

    holoFolder.add(this.visualParams, 'scanLineSpeed', 0, 1, 0.01)
      .name('Scan Speed')
      .onChange((value: number) => this.globe.setConfig({ scanLineSpeed: value }));

    holoFolder.add(this.visualParams, 'dataVizIntensity', 0, 2, 0.01)
      .name('Data Overlay')
      .onChange((value: number) => this.globe.setConfig({ dataVizIntensity: value }));
  }

  private setupLightingFolder(): void {
    const folder = this.gui.addFolder('☀️ Lighting');

    folder.add(this.lightingParams, 'sunX', -200, 200, 1)
      .name('Sun X')
      .onChange(() => this.updateSunPosition());

    folder.add(this.lightingParams, 'sunY', -200, 200, 1)
      .name('Sun Y')
      .onChange(() => this.updateSunPosition());

    folder.add(this.lightingParams, 'sunZ', -200, 200, 1)
      .name('Sun Z')
      .onChange(() => this.updateSunPosition());

    // Auto rotation
    folder.add(this.rotationParams, 'autoRotate')
      .name('Auto Rotate')
      .onChange((value: boolean) => this.globe.setConfig({ autoRotate: value }));

    folder.add(this.rotationParams, 'rotationSpeed', 0, 1, 0.01)
      .name('Rotation Speed')
      .onChange((value: number) => this.globe.setConfig({ rotationSpeed: value }));
  }

  private setupPresetsFolder(): void {
    const folder = this.gui.addFolder('🎬 Presets');
    folder.open();

    const presets = {
      introAnimation: async () => {
        this.animationParams.morphProgress = 0;
        await this.globe.playIntroAnimation();
        this.animationParams.morphProgress = 1;
        this.callbacks.onPresetPlay?.('intro');
      },

      nightMode: () => {
        gsap.to(this.visualParams, {
          dayNightBlend: 0,
          cityLightsIntensity: 2.5,
          atmosphereIntensity: 0.5,
          duration: 1.5,
          onUpdate: () => {
            this.globe.setConfig({
              dayNightBlend: this.visualParams.dayNightBlend,
              cityLightsIntensity: this.visualParams.cityLightsIntensity,
              atmosphereIntensity: this.visualParams.atmosphereIntensity,
            });
          }
        });
        this.callbacks.onPresetPlay?.('night');
      },

      dayMode: () => {
        gsap.to(this.visualParams, {
          dayNightBlend: 1,
          cityLightsIntensity: 0.5,
          atmosphereIntensity: 1.0,
          duration: 1.5,
          onUpdate: () => {
            this.globe.setConfig({
              dayNightBlend: this.visualParams.dayNightBlend,
              cityLightsIntensity: this.visualParams.cityLightsIntensity,
              atmosphereIntensity: this.visualParams.atmosphereIntensity,
            });
          }
        });
        this.callbacks.onPresetPlay?.('day');
      },

      cyberMode: () => {
        gsap.to(this.visualParams, {
          holoIntensity: 0.8,
          gridIntensity: 0.6,
          dataVizIntensity: 1.5,
          atmosphereIntensity: 0.3,
          dayNightBlend: 0.2,
          duration: 1,
          onUpdate: () => {
            this.globe.setConfig({
              holoIntensity: this.visualParams.holoIntensity,
              gridIntensity: this.visualParams.gridIntensity,
              dataVizIntensity: this.visualParams.dataVizIntensity,
              atmosphereIntensity: this.visualParams.atmosphereIntensity,
              dayNightBlend: this.visualParams.dayNightBlend,
            });
          }
        });
        this.callbacks.onPresetPlay?.('cyber');
      },

      naturalMode: () => {
        gsap.to(this.visualParams, {
          holoIntensity: 0,
          gridIntensity: 0,
          dataVizIntensity: 0,
          atmosphereIntensity: 1.2,
          dayNightBlend: 1,
          cloudOpacity: 0.6,
          oceanSpecular: 0.9,
          duration: 1,
          onUpdate: () => {
            this.globe.setConfig({
              holoIntensity: this.visualParams.holoIntensity,
              gridIntensity: this.visualParams.gridIntensity,
              dataVizIntensity: this.visualParams.dataVizIntensity,
              atmosphereIntensity: this.visualParams.atmosphereIntensity,
              dayNightBlend: this.visualParams.dayNightBlend,
              cloudOpacity: this.visualParams.cloudOpacity,
              oceanSpecular: this.visualParams.oceanSpecular,
            });
          }
        });
        this.callbacks.onPresetPlay?.('natural');
      },

      resetAll: () => {
        this.globe.setConfig({
          morphProgress: 0,
          elevationScale: 2.0,
          atmosphereIntensity: 1.0,
          cloudOpacity: 0.4,
          oceanSpecular: 0.8,
          cityLightsIntensity: 1.5,
          dayNightBlend: 1.0,
          holoIntensity: 0.3,
          gridIntensity: 0.2,
          dataVizIntensity: 0.5,
          formFactor: 'desktop',
          foldAngle: 0,
        });
        this.initializeFromConfig();
        this.callbacks.onPresetPlay?.('reset');
      },
    };

    folder.add(presets, 'introAnimation').name('🎬 Play Intro');
    folder.add(presets, 'nightMode').name('🌙 Night Mode');
    folder.add(presets, 'dayMode').name('☀️ Day Mode');
    folder.add(presets, 'cyberMode').name('💠 Cyber Mode');
    folder.add(presets, 'naturalMode').name('🌿 Natural Mode');
    folder.add(presets, 'resetAll').name('🔄 Reset All');
  }

  private updateSunPosition(): void {
    this.globe.setConfig({
      sunPosition: new THREE.Vector3(
        this.lightingParams.sunX,
        this.lightingParams.sunY,
        this.lightingParams.sunZ
      )
    });
  }

  private styleGUI(): void {
    // Add custom CSS for a more polished look
    const style = document.createElement('style');
    style.textContent = `
      .lil-gui {
        --background-color: rgba(10, 15, 25, 0.95);
        --text-color: #e0e0e0;
        --title-background-color: rgba(0, 150, 200, 0.3);
        --title-text-color: #00d4ff;
        --widget-color: rgba(0, 150, 200, 0.3);
        --hover-color: rgba(0, 200, 255, 0.4);
        --focus-color: #00d4ff;
        --number-color: #00ffcc;
        --string-color: #ffcc00;
        font-family: 'Segoe UI', system-ui, sans-serif;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(0, 150, 200, 0.3);
        border-radius: 8px;
      }

      .lil-gui .title {
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      .lil-gui button {
        background: linear-gradient(135deg, rgba(0, 150, 200, 0.4), rgba(0, 100, 150, 0.4));
        border: 1px solid rgba(0, 200, 255, 0.3);
        border-radius: 4px;
        transition: all 0.2s ease;
      }

      .lil-gui button:hover {
        background: linear-gradient(135deg, rgba(0, 200, 255, 0.5), rgba(0, 150, 200, 0.5));
        border-color: rgba(0, 255, 255, 0.5);
      }

      .lil-gui input[type=range] {
        accent-color: #00d4ff;
      }
    `;
    document.head.appendChild(style);
  }

  dispose(): void {
    this.gui.destroy();
  }
}
