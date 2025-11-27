import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import GUI from 'lil-gui';
import { StatisticsOverlay } from './components/StatisticsOverlay';
import { Legend } from './components/Legend';
import { STATISTICS } from './data/statistics';

const SPHERE_RADIUS = 50;

// Vertex shader - handles the morph from flat to sphere
const vertexShader = `
uniform float uMorph;
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

const float PI = 3.14159265359;
const float RADIUS = ${SPHERE_RADIUS.toFixed(1)};

void main() {
    vUv = uv;

    // Longitude and latitude from UV
    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    // Spherical position
    vec3 spherePos = vec3(
        RADIUS * cos(lat) * sin(lon),
        RADIUS * sin(lat),
        RADIUS * cos(lat) * cos(lon)
    );

    // Flat position (Mercator-like)
    float flatWidth = 2.0 * PI * RADIUS;
    float flatHeight = PI * RADIUS;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        0.0
    );

    // Smooth morph with easing built into the shader
    float t = uMorph;
    t = t * t * (3.0 - 2.0 * t); // smoothstep easing

    vec3 pos = mix(flatPos, spherePos, t);

    // Normal calculation
    vec3 sphereNormal = normalize(spherePos);
    vec3 flatNormal = vec3(0.0, 0.0, 1.0);
    vNormal = normalize(mix(flatNormal, sphereNormal, t));

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment shader - renders the earth texture with lighting
const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uNightTexture;
uniform vec3 uSunDir;
uniform float uMorph;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDir);

    // Day/night based on sun
    float sunDot = dot(normal, sunDir);
    float dayFactor = smoothstep(-0.2, 0.4, sunDot);

    // Sample textures
    vec4 dayColor = texture2D(uTexture, vUv);
    vec4 nightColor = texture2D(uNightTexture, vUv);

    // Blend day and night
    vec3 color = mix(nightColor.rgb * 0.8, dayColor.rgb, dayFactor);

    // Add city lights at night
    float nightLights = nightColor.r * (1.0 - dayFactor) * 1.5;
    color += vec3(1.0, 0.9, 0.7) * nightLights;

    // Simple atmosphere rim
    float rim = 1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = pow(rim, 3.0) * uMorph;
    color += vec3(0.3, 0.5, 1.0) * rim * 0.3;

    gl_FragColor = vec4(color, 1.0);
}
`;

export class App {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;
    private globe: THREE.Mesh | null = null;
    private material: THREE.ShaderMaterial | null = null;
    private gui: GUI | null = null;
    private statsOverlay: StatisticsOverlay | null = null;
    private legend: Legend | null = null;

    private params = {
        morph: 0,
        autoRotate: false,
        sunX: 1,
        sunY: 0.5,
        sunZ: 1,
        statistic: 'none',
    };

    constructor() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000008);

        // Camera
        this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
        this.camera.position.set(0, 0, 200);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        document.getElementById('app')!.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.minDistance = 80;
        this.controls.maxDistance = 400;

        // Events
        window.addEventListener('resize', this.onResize.bind(this));

        this.init();
    }

    private async init(): Promise<void> {
        await this.createGlobe();
        this.createStars();
        this.createStatisticsOverlay();
        this.createGUI();
        this.animate();

        // Hide loading
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';

        // Auto-play intro
        setTimeout(() => this.playIntro(), 500);
    }

    private createStatisticsOverlay(): void {
        this.statsOverlay = new StatisticsOverlay(this.scene);
        this.legend = new Legend();
    }

    private async createGlobe(): Promise<void> {
        const loader = new THREE.TextureLoader();

        // Load textures
        const [dayTex, nightTex] = await Promise.all([
            loader.loadAsync('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'),
            loader.loadAsync('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png'),
        ]);

        // High quality filtering
        [dayTex, nightTex].forEach(tex => {
            tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.magFilter = THREE.LinearFilter;
        });

        // Geometry - high resolution plane
        const geometry = new THREE.PlaneGeometry(
            Math.PI * 2 * SPHERE_RADIUS,
            Math.PI * SPHERE_RADIUS,
            256, // width segments
            128  // height segments
        );

        // Shader material
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uMorph: { value: 0 },
                uTime: { value: 0 },
                uTexture: { value: dayTex },
                uNightTexture: { value: nightTex },
                uSunDir: { value: new THREE.Vector3(1, 0.5, 1).normalize() },
            },
            side: THREE.DoubleSide,
        });

        this.globe = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.globe);
    }

    private createStars(): void {
        const starsGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(3000 * 3);

        for (let i = 0; i < 3000; i++) {
            const r = 300 + Math.random() * 300;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }

        starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const starsMat = new THREE.PointsMaterial({
            size: 1,
            color: 0xffffff,
            transparent: true,
            opacity: 0.8,
        });

        this.scene.add(new THREE.Points(starsGeo, starsMat));
    }

    private createGUI(): void {
        this.gui = new GUI({ title: 'Controls' });

        // Morph slider
        this.gui.add(this.params, 'morph', 0, 1, 0.01)
            .name('Flat ↔ Globe')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uMorph.value = v;
                if (this.statsOverlay) this.statsOverlay.setMorph(v);
            });

        // Buttons
        this.gui.add({ toFlat: () => this.morphTo(0) }, 'toFlat').name('→ Flat Map');
        this.gui.add({ toGlobe: () => this.morphTo(1) }, 'toGlobe').name('→ Globe');
        this.gui.add({ replay: () => this.playIntro() }, 'replay').name('↻ Replay Intro');

        // Auto rotate
        this.gui.add(this.params, 'autoRotate').name('Auto Rotate');

        // Statistics folder
        const statsFolder = this.gui.addFolder('Statistics');
        const statOptions: { [key: string]: string } = { 'None': 'none' };
        STATISTICS.forEach(stat => {
            statOptions[stat.name] = stat.id;
        });
        statsFolder.add(this.params, 'statistic', statOptions)
            .name('Data Layer')
            .onChange((statId: string) => this.onStatisticChange(statId));
        statsFolder.open();

        // Sun direction folder
        const sunFolder = this.gui.addFolder('Sun Position');
        sunFolder.add(this.params, 'sunX', -1, 1, 0.1).onChange(() => this.updateSun());
        sunFolder.add(this.params, 'sunY', -1, 1, 0.1).onChange(() => this.updateSun());
        sunFolder.add(this.params, 'sunZ', -1, 1, 0.1).onChange(() => this.updateSun());
    }

    private onStatisticChange(statId: string): void {
        if (statId === 'none') {
            if (this.statsOverlay) this.statsOverlay.hide();
            if (this.legend) this.legend.hide();
        } else {
            const stat = STATISTICS.find(s => s.id === statId);
            if (stat) {
                if (this.statsOverlay) this.statsOverlay.show(statId);
                if (this.legend) this.legend.show(stat);
            }
        }
    }

    private updateSun(): void {
        if (this.material) {
            this.material.uniforms.uSunDir.value.set(
                this.params.sunX,
                this.params.sunY,
                this.params.sunZ
            ).normalize();
        }
    }

    private morphTo(target: number): void {
        gsap.to(this.params, {
            morph: target,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (this.material) {
                    this.material.uniforms.uMorph.value = this.params.morph;
                }
                // Sync statistics overlay
                if (this.statsOverlay) {
                    this.statsOverlay.setMorph(this.params.morph);
                }
                // Update GUI display
                this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
            }
        });
    }

    private async playIntro(): Promise<void> {
        // Start flat and zoomed out
        this.params.morph = 0;
        if (this.material) this.material.uniforms.uMorph.value = 0;
        if (this.statsOverlay) this.statsOverlay.setMorph(0);

        gsap.set(this.camera.position, { z: 350 });

        // Wait a moment
        await new Promise(r => setTimeout(r, 800));

        // Morph to globe
        this.morphTo(1);

        // Camera zoom in
        gsap.to(this.camera.position, {
            z: 150,
            duration: 3,
            ease: 'power2.out',
        });

        // Enable auto rotate after animation
        setTimeout(() => {
            this.params.autoRotate = true;
            this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
        }, 3000);
    }

    private onResize(): void {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update();

        // Auto rotation
        if (this.params.autoRotate && this.globe && this.params.morph > 0.8) {
            this.globe.rotation.y += 0.002;
        }

        // Sync statistics overlay rotation with globe
        if (this.statsOverlay && this.globe) {
            this.statsOverlay.syncRotation(this.globe.rotation.y);
        }

        this.renderer.render(this.scene, this.camera);
    }
}
