import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import GUI from 'lil-gui';
import { ChoroplethRenderer } from './components/ChoroplethRenderer';
import { Legend } from './components/Legend';
import { STATISTICS, getStatisticById } from './data/worldStatistics';

const SPHERE_RADIUS = 50;

// Vertex shader - handles the morph from flat to sphere
const vertexShader = `
uniform float uMorph;
uniform float uTime;
uniform float uParchment;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

const float PI = 3.14159265359;
const float RADIUS = ${SPHERE_RADIUS.toFixed(1)};

// Simple noise function for parchment curl variation
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

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

    // Parchment curl effect - only when completely flat (morph = 0)
    // uParchment animates 0->1 to create the rolling effect
    if (uMorph < 0.01 && uParchment > 0.01) {
        // Distance from edges (0 at edge, 1 at center)
        float edgeL = uv.x;
        float edgeR = 1.0 - uv.x;
        float edgeB = uv.y;
        float edgeT = 1.0 - uv.y;

        // Corner distances for extra dramatic corner curls
        float cornerBL = length(vec2(edgeL, edgeB));
        float cornerBR = length(vec2(edgeR, edgeB));
        float cornerTL = length(vec2(edgeL, edgeT));
        float cornerTR = length(vec2(edgeR, edgeT));

        // Edge curl - varies organically along each edge
        float curlL = pow(1.0 - smoothstep(0.0, 0.12, edgeL), 2.0) * (0.7 + 0.4 * hash(vec2(uv.y * 4.0, 1.0)));
        float curlR = pow(1.0 - smoothstep(0.0, 0.10, edgeR), 2.0) * (0.6 + 0.5 * hash(vec2(uv.y * 4.0, 2.0)));
        float curlB = pow(1.0 - smoothstep(0.0, 0.08, edgeB), 2.0) * (0.8 + 0.3 * hash(vec2(uv.x * 4.0, 3.0)));
        float curlT = pow(1.0 - smoothstep(0.0, 0.06, edgeT), 2.0) * (0.5 + 0.6 * hash(vec2(uv.x * 4.0, 4.0)));

        // Corner curls - more dramatic rolling at corners
        float cornerCurlBL = pow(1.0 - smoothstep(0.0, 0.20, cornerBL), 2.5) * 1.2;
        float cornerCurlBR = pow(1.0 - smoothstep(0.0, 0.18, cornerBR), 2.5) * 1.0;
        float cornerCurlTL = pow(1.0 - smoothstep(0.0, 0.15, cornerTL), 2.5) * 0.9;
        float cornerCurlTR = pow(1.0 - smoothstep(0.0, 0.22, cornerTR), 2.5) * 1.3;

        // Combine edge and corner curls
        float edgeCurl = curlL + curlR + curlB + curlT;
        float cornerCurl = cornerCurlBL + cornerCurlBR + cornerCurlTL + cornerCurlTR;
        float totalCurl = (edgeCurl * 0.6 + cornerCurl * 0.8) * uParchment;

        // Z displacement - curling backward
        flatPos.z -= totalCurl * 18.0;

        // Corners curl inward more dramatically
        float inwardX = (cornerCurlBR + cornerCurlTR - cornerCurlBL - cornerCurlTL) * 5.0;
        float inwardY = (cornerCurlTL + cornerCurlTR - cornerCurlBL - cornerCurlBR) * 4.0;
        flatPos.x += inwardX * uParchment;
        flatPos.y += inwardY * uParchment;

        // Slight edge inward curl
        flatPos.x += (curlR - curlL) * 4.0 * uParchment;
        flatPos.y += (curlT - curlB) * 3.0 * uParchment;

        // Subtle surface waviness (old paper wrinkles)
        float wave1 = sin(uv.x * 15.0 + uv.y * 10.0) * 0.3;
        float wave2 = sin(uv.y * 18.0 + uv.x * 5.0) * 0.2;
        float wave3 = sin((uv.x + uv.y) * 25.0) * 0.15;
        float centerFade = smoothstep(0.0, 0.3, min(min(edgeL, edgeR), min(edgeB, edgeT)));
        flatPos.z += (wave1 + wave2 + wave3) * uParchment * (0.3 + 0.7 * (1.0 - centerFade));

        // Damaged/torn edge effect - slight irregular displacement
        float damage = hash(uv * 20.0) * 0.5;
        float edgeProximity = 1.0 - smoothstep(0.0, 0.05, min(min(edgeL, edgeR), min(edgeB, edgeT)));
        flatPos.z -= damage * edgeProximity * uParchment * 3.0;
    }

    // Smooth morph with easing built into the shader
    float t = uMorph;
    t = t * t * (3.0 - 2.0 * t); // smoothstep easing

    vec3 pos = mix(flatPos, spherePos, t);

    // Normal calculation (simplified - doesn't account for parchment warping)
    vec3 sphereNormal = normalize(spherePos);
    vec3 flatNormal = vec3(0.0, 0.0, 1.0);
    vNormal = normalize(mix(flatNormal, sphereNormal, t));

    vPosition = pos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

// Fragment shader - blends base texture with choropleth overlay
const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform float uDataOpacity;
uniform vec3 uSunDir;
uniform float uMorph;
uniform float uParchment;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Noise for aged paper texture
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDir);

    // Day/night based on sun
    float sunDot = dot(normal, sunDir);
    float dayFactor = smoothstep(-0.2, 0.4, sunDot);

    // Sample base texture
    vec4 baseColor = texture2D(uTexture, vUv);

    // Sample data overlay
    vec4 dataColor = texture2D(uDataTexture, vUv);

    // Blend base with data overlay
    vec3 color = mix(baseColor.rgb, dataColor.rgb, uDataOpacity * dataColor.a);

    // Apply lighting
    color *= (0.4 + 0.6 * dayFactor);

    // Atmosphere rim effect (only for globe)
    float rim = 1.0 - max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
    rim = pow(rim, 3.0) * uMorph;
    color += vec3(0.3, 0.5, 1.0) * rim * 0.2;

    // Parchment/aged effect (only when completely flat)
    if (uMorph < 0.01 && uParchment > 0.01) {
        // Check if we have data overlay active
        float hasData = uDataOpacity * dataColor.a;

        // For areas WITH statistics data: keep colors more saturated
        // For areas WITHOUT data (base map): apply full sepia

        // Sepia tone for base map areas
        vec3 sepia = vec3(
            dot(color, vec3(0.393, 0.769, 0.189)),
            dot(color, vec3(0.349, 0.686, 0.168)),
            dot(color, vec3(0.272, 0.534, 0.131))
        );

        // Warm parchment tint
        vec3 parchmentTint = vec3(0.96, 0.91, 0.82);
        sepia = mix(sepia, sepia * parchmentTint, 0.5);

        // Add paper texture noise (subtle)
        float paperNoise = noise(vUv * 200.0) * 0.06 + noise(vUv * 50.0) * 0.04;
        sepia += vec3(paperNoise * 0.7, paperNoise * 0.6, paperNoise * 0.4);

        // Corner distances for dramatic corner aging
        float cornerBL = length(vUv);
        float cornerBR = length(vec2(1.0 - vUv.x, vUv.y));
        float cornerTL = length(vec2(vUv.x, 1.0 - vUv.y));
        float cornerTR = length(vec2(1.0 - vUv.x, 1.0 - vUv.y));
        float minCorner = min(min(cornerBL, cornerBR), min(cornerTL, cornerTR));

        // Edge distances
        float edgeDistX = min(vUv.x, 1.0 - vUv.x);
        float edgeDistY = min(vUv.y, 1.0 - vUv.y);
        float edgeDist = min(edgeDistX, edgeDistY);

        // Vignette - darker at edges and especially corners
        float edgeVignette = smoothstep(0.0, 0.15, edgeDist);
        float cornerVignette = smoothstep(0.0, 0.25, minCorner);
        float vignette = edgeVignette * 0.6 + cornerVignette * 0.4;
        sepia *= 0.7 + 0.3 * vignette;

        // Burn/damage marks at corners
        float cornerDamage = pow(1.0 - smoothstep(0.0, 0.18, minCorner), 2.0);
        float burnNoise = noise(vUv * 30.0 + 10.0);
        float burn = cornerDamage * burnNoise * 0.4;
        sepia = mix(sepia, vec3(0.15, 0.1, 0.05), burn);

        // Age spots and foxing (brown spots on old paper)
        float stain = noise(vUv * 8.0 + 42.0);
        stain = smoothstep(0.6, 0.8, stain) * 0.12;
        sepia -= vec3(stain * 0.5, stain * 0.4, stain * 0.2);

        // Water damage marks near edges
        float waterMark = noise(vUv * 4.0 + 100.0);
        float edgeWater = (1.0 - smoothstep(0.0, 0.12, edgeDist)) * waterMark * 0.15;
        sepia -= vec3(edgeWater * 0.3, edgeWater * 0.2, edgeWater * 0.05);

        // For statistics data: blend less sepia, keep more original color
        // This preserves the color coding while still looking aged
        float sepiaAmount = mix(0.85, 0.35, hasData); // 85% sepia for base, 35% for data

        // Also boost saturation for data areas to make colors pop more
        if (hasData > 0.1) {
            // Increase color saturation for data overlay
            float luminance = dot(color, vec3(0.299, 0.587, 0.114));
            color = mix(vec3(luminance), color, 1.3); // Boost saturation by 30%
        }

        // Blend with sepia based on whether it's data or base map
        color = mix(color, sepia, sepiaAmount * uParchment);
    }

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
    private choropleth: ChoroplethRenderer | null = null;
    private legend: Legend | null = null;
    private dataTexture: THREE.CanvasTexture | null = null;

    private params = {
        morph: 0,
        autoRotate: false,
        parchmentStyle: false,
        sunX: 1,
        sunY: 0.5,
        sunZ: 1,
        statistic: 'none',
    };

    constructor() {
        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x000812);

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
        // Initialize choropleth renderer first (needs to load country data)
        this.choropleth = new ChoroplethRenderer();
        this.legend = new Legend();

        await this.createGlobe();
        this.createStars();
        this.createGUI();

        // Wait for country boundaries to load
        await this.choropleth.waitForLoad();

        this.animate();

        // Hide loading
        const loading = document.getElementById('loading');
        if (loading) loading.style.display = 'none';

        // Auto-play intro
        setTimeout(() => this.playIntro(), 500);
    }

    private async createGlobe(): Promise<void> {
        const loader = new THREE.TextureLoader();

        // Load base earth texture
        const baseTex = await loader.loadAsync(
            'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
        );

        baseTex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
        baseTex.minFilter = THREE.LinearMipmapLinearFilter;
        baseTex.magFilter = THREE.LinearFilter;

        // Create empty data texture (will be updated when statistic selected)
        const emptyCanvas = document.createElement('canvas');
        emptyCanvas.width = 2048;
        emptyCanvas.height = 1024;
        this.dataTexture = new THREE.CanvasTexture(emptyCanvas);

        // Geometry - high resolution plane
        const geometry = new THREE.PlaneGeometry(
            Math.PI * 2 * SPHERE_RADIUS,
            Math.PI * SPHERE_RADIUS,
            256,
            128
        );

        // Shader material
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uMorph: { value: 0 },
                uTime: { value: 0 },
                uParchment: { value: 0 },
                uTexture: { value: baseTex },
                uDataTexture: { value: this.dataTexture },
                uDataOpacity: { value: 0 },
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
        this.gui = new GUI({ title: 'Globe Controls' });

        // Morph slider
        this.gui.add(this.params, 'morph', 0, 1, 0.01)
            .name('Flat ↔ Globe')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uMorph.value = v;
            });

        // Buttons
        this.gui.add({ toFlat: () => this.morphTo(0) }, 'toFlat').name('→ Flat Map');
        this.gui.add({ toGlobe: () => this.morphTo(1) }, 'toGlobe').name('→ Globe');
        this.gui.add({ replay: () => this.playIntro() }, 'replay').name('↻ Replay Intro');

        // Auto rotate
        this.gui.add(this.params, 'autoRotate').name('Auto Rotate');

        // Parchment style (old map look) - only works when flat
        this.gui.add(this.params, 'parchmentStyle')
            .name('Parchment Style')
            .onChange((enabled: boolean) => {
                if (this.material) {
                    // Only animate if we're flat
                    if (this.params.morph < 0.01) {
                        gsap.to(this.material.uniforms.uParchment, {
                            value: enabled ? 1 : 0,
                            duration: 1.5, // Slower for nice rolling effect
                            ease: 'power2.out',
                        });
                    } else {
                        // If not flat, just set the value (will apply when flat)
                        this.material.uniforms.uParchment.value = enabled ? 1 : 0;
                    }
                }
            });

        // Statistics folder
        const statsFolder = this.gui.addFolder('World Statistics');
        const statOptions: { [key: string]: string } = { 'None (Satellite View)': 'none' };
        STATISTICS.forEach(stat => {
            statOptions[stat.name] = stat.id;
        });
        statsFolder.add(this.params, 'statistic', statOptions)
            .name('Data Layer')
            .onChange((statId: string) => this.onStatisticChange(statId));
        statsFolder.open();

        // Sun direction folder
        const sunFolder = this.gui.addFolder('Lighting');
        sunFolder.add(this.params, 'sunX', -1, 1, 0.1).name('Sun X').onChange(() => this.updateSun());
        sunFolder.add(this.params, 'sunY', -1, 1, 0.1).name('Sun Y').onChange(() => this.updateSun());
        sunFolder.add(this.params, 'sunZ', -1, 1, 0.1).name('Sun Z').onChange(() => this.updateSun());
    }

    private onStatisticChange(statId: string): void {
        if (!this.material || !this.choropleth) return;

        if (statId === 'none') {
            // Fade out data overlay
            gsap.to(this.material.uniforms.uDataOpacity, {
                value: 0,
                duration: 0.5,
            });
            if (this.legend) this.legend.hide();
        } else {
            const stat = getStatisticById(statId);
            if (stat) {
                // Render new choropleth texture
                const canvas = this.choropleth.renderTexture(stat);

                // Update texture
                if (this.dataTexture) {
                    this.dataTexture.image = canvas;
                    this.dataTexture.needsUpdate = true;
                }

                // Fade in data overlay
                gsap.to(this.material.uniforms.uDataOpacity, {
                    value: 0.85,
                    duration: 0.5,
                });

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
        // Calculate zoom distances
        // Flat map: width = 2π × 50 ≈ 314, need to fit in view
        // With 50° FOV, z ≈ width / (2 × tan(25°)) ≈ 314 / 0.93 ≈ 340
        const flatZoom = 350;
        const globeZoom = 150;

        if (target === 0) {
            // Going to flat: reset rotation, center camera, zoom out
            if (this.globe) {
                gsap.to(this.globe.rotation, {
                    x: 0,
                    y: 0,
                    z: 0,
                    duration: 2.5,
                    ease: 'power2.inOut',
                });
            }
            // Center and zoom out camera to show full map
            gsap.to(this.camera.position, {
                x: 0,
                y: 0,
                z: flatZoom,
                duration: 2.5,
                ease: 'power2.inOut',
            });
            // Reset controls target to center
            gsap.to(this.controls.target, {
                x: 0,
                y: 0,
                z: 0,
                duration: 2.5,
                ease: 'power2.inOut',
            });
        } else {
            // Going to globe: first unparchment, then zoom in
            gsap.to(this.camera.position, {
                z: globeZoom,
                duration: 2.5,
                ease: 'power2.inOut',
            });
        }

        // Re-enable controls immediately when going to globe
        if (target === 1) {
            this.controls.enabled = true;
        }

        // Handle parchment animation based on direction
        if (target === 1 && this.params.parchmentStyle && this.material) {
            // Going to globe with parchment enabled: unparchment FIRST, then morph
            gsap.to(this.material.uniforms.uParchment, {
                value: 0,
                duration: 1.2,
                ease: 'power2.in',
                onComplete: () => {
                    this.startMorphAnimation(target);
                }
            });
        } else if (target === 0) {
            // Going to flat: morph first, parchment after (handled in onComplete)
            this.startMorphAnimation(target);
        } else {
            // No parchment involved, just morph
            this.startMorphAnimation(target);
        }
    }

    private startMorphAnimation(target: number): void {
        // Ensure parchment starts at 0 when morphing to flat
        // (it will animate in after morph completes)
        if (target === 0 && this.material) {
            this.material.uniforms.uParchment.value = 0;
        }

        gsap.to(this.params, {
            morph: target,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (this.material) {
                    this.material.uniforms.uMorph.value = this.params.morph;
                }
                this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
            },
            onComplete: () => {
                // When fully flat, disable controls and apply parchment if enabled
                if (target === 0) {
                    this.controls.enabled = false;
                    // If parchment style is enabled, animate it in now
                    if (this.params.parchmentStyle && this.material) {
                        gsap.to(this.material.uniforms.uParchment, {
                            value: 1,
                            duration: 1.5,
                            ease: 'power2.out',
                        });
                    }
                }
            }
        });
    }

    private async playIntro(): Promise<void> {
        // Start flat, centered, and zoomed out to show full map
        this.params.morph = 0;
        if (this.material) this.material.uniforms.uMorph.value = 0;

        // Reset globe rotation and disable controls while flat
        if (this.globe) {
            this.globe.rotation.set(0, 0, 0);
        }
        this.controls.enabled = false;

        // Position camera centered, facing the front of the map (positive Z)
        gsap.set(this.camera.position, { x: 0, y: 0, z: 350 });
        gsap.set(this.controls.target, { x: 0, y: 0, z: 0 });

        // Wait a moment to show the flat map
        await new Promise(r => setTimeout(r, 800));

        // Morph to globe (this also handles zooming in)
        this.morphTo(1);

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

        // Auto rotation - scales with morph level for elegant transition
        if (this.params.autoRotate && this.globe) {
            // Rotation speed scales from 0 at flat to full at globe
            const rotationSpeed = 0.002 * this.params.morph;
            this.globe.rotation.y += rotationSpeed;
        }

        // Update material side based on morph
        // When flat, only show front; when globe, show both sides
        if (this.material) {
            this.material.side = this.params.morph < 0.1 ? THREE.FrontSide : THREE.DoubleSide;
        }

        this.renderer.render(this.scene, this.camera);
    }
}
