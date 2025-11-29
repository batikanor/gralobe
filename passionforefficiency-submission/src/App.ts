import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import GUI from 'lil-gui';
import { ChoroplethRenderer } from './components/ChoroplethRenderer';
import { Legend } from './components/Legend';
import { Exporter } from './components/Exporter';
import { CountryLabels, type LabelStyle } from './components/CountryLabels';
import { STATISTICS, getStatisticById } from './data/worldStatistics';

const SPHERE_RADIUS = 50;

// Visual effects configuration
interface EffectsConfig {
    // Atmosphere
    clouds: boolean;
    cloudSpeed: number;
    cloudOpacity: number;
    atmosphereIntensity: number;
    aurora: boolean;
    auroraIntensity: number;

    // Lighting
    cityLights: boolean;
    cityLightsIntensity: number;
    oceanSpecular: boolean;
    specularIntensity: number;
    sunGlow: boolean;

    // Overlays
    gridLines: boolean;
    gridOpacity: number;
    countryBorders: boolean;
    scanEffect: boolean;
    scanSpeed: number;
    transitionEffect: boolean;

    // Style
    hologramMode: boolean;
    hologramColor: string;
    vintageMode: boolean;
    thermalMode: boolean;
    blueprintMode: boolean;
    glowPulse: boolean;
    glowColor: string;

    // Animation
    starTwinkle: boolean;
    cloudAnimation: boolean;
    auroraAnimation: boolean;
}

// Vertex shader - handles the morph from flat to sphere
const vertexShader = `
uniform float uMorph;
uniform float uTime;
uniform float uParchment;
uniform float uExtremeParchment;
uniform sampler2D uDataTexture;
uniform float uExtrudeHeight;
uniform float uDataOverlay;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

const float PI = 3.14159265359;
const float RADIUS = ${SPHERE_RADIUS.toFixed(1)};

// Hash functions for procedural variation
float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float hash3(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
}

// Smooth noise
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

// Fractal Brownian Motion for natural-looking tears
float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

void main() {
    vUv = uv;
    vTornEdge = 0.0;
    vCornerCurl = 0.0;
    vCrease = 0.0;
    vTornCorner = 0.0;
    vDiscard = 0.0;
    vExtrudeAmount = 0.0;

    // Sample data texture to get statistic value for height extrusion
    // The data texture stores color-coded values - we use luminance as height
    vec4 dataColor = texture2D(uDataTexture, uv);
    // Check if this is a data area (not ocean/no-data which is dark)
    float dataLuminance = dot(dataColor.rgb, vec3(0.299, 0.587, 0.114));
    // Only extrude if we have actual data (not dark ocean/no-data areas)
    float hasData = step(0.15, dataLuminance) * uDataOverlay;
    float extrudeValue = dataLuminance * hasData * uExtrudeHeight;
    vExtrudeAmount = extrudeValue;

    // Longitude and latitude from UV
    float lon = (uv.x - 0.5) * 2.0 * PI;
    float lat = (uv.y - 0.5) * PI;

    // Spherical position with height extrusion
    float extrudedRadius = RADIUS + extrudeValue * 15.0; // Scale factor for visible effect
    vec3 spherePos = vec3(
        extrudedRadius * cos(lat) * sin(lon),
        extrudedRadius * sin(lat),
        extrudedRadius * cos(lat) * cos(lon)
    );

    // Flat position (Mercator-like) with height extrusion
    float flatWidth = 2.0 * PI * RADIUS;
    float flatHeight = PI * RADIUS;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * flatWidth,
        (uv.y - 0.5) * flatHeight,
        extrudeValue * 20.0  // Z displacement for flat view
    );

    // Parchment curl effect - only when completely flat (morph = 0)
    if (uMorph < 0.01 && uParchment > 0.01) {
        // Distance from edges (0 at edge, 1 at center)
        float edgeL = uv.x;
        float edgeR = 1.0 - uv.x;
        float edgeB = uv.y;
        float edgeT = 1.0 - uv.y;
        float minEdge = min(min(edgeL, edgeR), min(edgeB, edgeT));

        // CRITICAL: Fade out displacement near very edges to prevent seam artifacts
        float boundaryFade = smoothstep(0.0, 0.02, edgeL) * smoothstep(0.0, 0.02, edgeR)
                           * smoothstep(0.0, 0.02, edgeB) * smoothstep(0.0, 0.02, edgeT);

        // === TORN EDGES ===
        // Create irregular torn edge pattern using FBM noise
        float tearNoiseL = fbm(vec2(uv.y * 15.0, 1.0)) * 0.03;
        float tearNoiseR = fbm(vec2(uv.y * 12.0, 2.0)) * 0.035;
        float tearNoiseB = fbm(vec2(uv.x * 14.0, 3.0)) * 0.025;
        float tearNoiseT = fbm(vec2(uv.x * 11.0, 4.0)) * 0.04;

        // Torn edge intensity (passed to fragment shader)
        float tornL = smoothstep(tearNoiseL + 0.02, tearNoiseL, edgeL);
        float tornR = smoothstep(tearNoiseR + 0.025, tearNoiseR, edgeR);
        float tornB = smoothstep(tearNoiseB + 0.015, tearNoiseB, edgeB);
        float tornT = smoothstep(tearNoiseT + 0.03, tearNoiseT, edgeT);
        vTornEdge = max(max(tornL, tornR), max(tornB, tornT)) * uParchment;

        // === CORNER CURLS - Much more dramatic ===
        // Each corner has unique character
        vec2 cornerBL = vec2(edgeL, edgeB);
        vec2 cornerBR = vec2(edgeR, edgeB);
        vec2 cornerTL = vec2(edgeL, edgeT);
        vec2 cornerTR = vec2(edgeR, edgeT);

        float distBL = length(cornerBL);
        float distBR = length(cornerBR);
        float distTL = length(cornerTL);
        float distTR = length(cornerTR);

        // Corner curl intensities with unique shapes
        // Bottom-left: tight scroll curl
        float curlBL = pow(1.0 - smoothstep(0.0, 0.22, distBL), 3.0) * 1.4;
        curlBL *= (0.8 + 0.4 * noise(cornerBL * 10.0));

        // Bottom-right: looser, dramatic roll
        float curlBR = pow(1.0 - smoothstep(0.0, 0.28, distBR), 2.5) * 1.6;
        curlBR *= (0.7 + 0.5 * noise(cornerBR * 8.0));

        // Top-left: subtle lift
        float curlTL = pow(1.0 - smoothstep(0.0, 0.18, distTL), 2.8) * 1.1;
        curlTL *= (0.9 + 0.3 * noise(cornerTL * 12.0));

        // Top-right: extreme curl (most damaged corner)
        float curlTR = pow(1.0 - smoothstep(0.0, 0.32, distTR), 2.2) * 2.0;
        curlTR *= (0.6 + 0.6 * noise(cornerTR * 7.0));

        float totalCornerCurl = curlBL + curlBR + curlTL + curlTR;
        vCornerCurl = totalCornerCurl * uParchment;

        // === EDGE CURLS ===
        // Organic variation along each edge
        float curlL = pow(1.0 - smoothstep(0.02, 0.12, edgeL), 2.2);
        curlL *= (0.5 + 0.7 * noise(vec2(uv.y * 6.0, 1.0)));

        float curlR = pow(1.0 - smoothstep(0.02, 0.14, edgeR), 2.0);
        curlR *= (0.6 + 0.6 * noise(vec2(uv.y * 5.0, 2.0)));

        float curlB = pow(1.0 - smoothstep(0.02, 0.10, edgeB), 2.3);
        curlB *= (0.7 + 0.5 * noise(vec2(uv.x * 7.0, 3.0)));

        float curlT = pow(1.0 - smoothstep(0.02, 0.09, edgeT), 2.5);
        curlT *= (0.4 + 0.8 * noise(vec2(uv.x * 8.0, 4.0)));

        // === FOLD CREASES ===
        // Diagonal crease (like the map was folded)
        float crease1 = abs(uv.x + uv.y - 1.0);
        crease1 = 1.0 - smoothstep(0.0, 0.02, crease1);
        crease1 *= smoothstep(0.1, 0.3, minEdge); // Fade at edges

        // Horizontal fold
        float crease2 = abs(uv.y - 0.5);
        crease2 = 1.0 - smoothstep(0.0, 0.015, crease2);
        crease2 *= smoothstep(0.05, 0.15, min(edgeL, edgeR));

        // Vertical fold
        float crease3 = abs(uv.x - 0.5);
        crease3 = 1.0 - smoothstep(0.0, 0.012, crease3);
        crease3 *= smoothstep(0.05, 0.15, min(edgeB, edgeT));

        float totalCrease = (crease1 * 0.6 + crease2 * 0.4 + crease3 * 0.3);
        vCrease = totalCrease * uParchment;

        // === APPLY DEFORMATIONS ===
        float p = uParchment;

        // Z displacement - corners and edges curl backward
        float cornerZ = (curlBL * 25.0 + curlBR * 30.0 + curlTL * 20.0 + curlTR * 35.0);
        float edgeZ = (curlL + curlR + curlB + curlT) * 15.0;
        float creaseZ = totalCrease * 8.0; // Creases pop up slightly

        flatPos.z -= (cornerZ + edgeZ) * p * boundaryFade;
        flatPos.z += creaseZ * p * boundaryFade;

        // Corner inward pull (curled corners pull inward)
        float inwardX = (curlBR + curlTR - curlBL - curlTL) * 8.0;
        float inwardY = (curlTL + curlTR - curlBL - curlBR) * 7.0;
        flatPos.x += inwardX * p * boundaryFade;
        flatPos.y += inwardY * p * boundaryFade;

        // Edge warping
        flatPos.x += (curlR - curlL) * 5.0 * p * boundaryFade;
        flatPos.y += (curlT - curlB) * 4.0 * p * boundaryFade;

        // Torn edge displacement (subtle outward fraying)
        float tornDisp = vTornEdge * 2.0;
        flatPos.z -= tornDisp * boundaryFade;

        // === SURFACE WAVINESS (old paper texture) ===
        float interiorFade = smoothstep(0.0, 0.1, minEdge);

        // Multiple wave frequencies for realistic paper
        float wave1 = sin(uv.x * 20.0 + uv.y * 12.0) * 0.4;
        float wave2 = sin(uv.y * 25.0 - uv.x * 8.0) * 0.3;
        float wave3 = sin((uv.x + uv.y) * 35.0) * 0.2;
        float wave4 = noise(uv * 40.0) * 0.5; // High-freq bumps

        float waves = (wave1 + wave2 + wave3 + wave4) * p * interiorFade;
        flatPos.z += waves * 0.6;

        // Crease deformation (slight ridge along fold lines)
        flatPos.z += crease1 * 3.0 * p * boundaryFade;
        flatPos.z += crease2 * 2.0 * p * boundaryFade;
        flatPos.z += crease3 * 1.5 * p * boundaryFade;

        // === EXTREME PARCHMENT: Irregular asymmetric dents and nibbles ===
        if (uExtremeParchment > 0.01) {
            float ep = uExtremeParchment;

            // Asymmetric corner dents - each corner is very different
            // Bottom-left: elongated horizontal nibble (more X than Y)
            float blNoise1 = fbm(vec2(edgeL * 25.0, edgeB * 8.0 + 1.0));
            float blNoise2 = noise(vec2(edgeL * 40.0, edgeB * 15.0)) * 0.5;
            float blDistort = edgeL * 1.8 + edgeB * 0.7; // Stretched horizontally
            float dentBL = smoothstep(0.09 + blNoise1 * 0.06, 0.02, blDistort) * (0.6 + blNoise2);

            // Top-right: jagged triangular bite
            float trNoise1 = fbm(vec2(edgeR * 12.0 + edgeT * 20.0, 2.0));
            float trNoise2 = noise(vec2(edgeR * 50.0, edgeT * 30.0));
            float trJagged = sin(atan(edgeT, edgeR) * 8.0) * 0.02 * trNoise2;
            float trDistort = edgeR * 1.2 + edgeT * 1.5 + trJagged; // Taller than wide
            float dentTR = smoothstep(0.12 + trNoise1 * 0.07, 0.025, trDistort);

            // Bottom-right: tiny irregular chip
            float brNoise1 = fbm(vec2(edgeR * 35.0, edgeB * 18.0 + 3.0));
            float brNoise2 = noise(vec2(edgeR * 60.0 + edgeB * 40.0, 5.0));
            float brDistort = edgeR * 1.0 + edgeB * 1.3 + brNoise2 * 0.015;
            float dentBR = smoothstep(0.055 + brNoise1 * 0.035, 0.01, brDistort) * (0.7 + brNoise2 * 0.4);

            // Top-left: organic curved tear
            float tlNoise1 = fbm(vec2(edgeL * 18.0 + edgeT * 25.0, 4.0));
            float tlNoise2 = noise(vec2(edgeL * 45.0, edgeT * 55.0));
            float tlCurve = sin(edgeL * 15.0) * 0.012 + cos(edgeT * 12.0) * 0.008;
            float tlDistort = edgeL * 1.4 + edgeT * 1.1 + tlCurve;
            float dentTL = smoothstep(0.08 + tlNoise1 * 0.05, 0.018, tlDistort) * (0.8 + tlNoise2 * 0.3);

            // Irregular edge nibbles - varying sizes and depths
            // Left edge - scattered uneven notches
            float nibbleL1 = fbm(vec2(uv.y * 35.0 + 10.0, 10.0));
            float nibbleL2 = noise(vec2(uv.y * 80.0, 11.0));
            float nibbleL_depth = 0.015 + nibbleL2 * 0.02;
            float nibbleL = smoothstep(nibbleL_depth, 0.0, edgeL) * smoothstep(0.75, 0.9, nibbleL1);

            // Right edge - different pattern
            float nibbleR1 = fbm(vec2(uv.y * 28.0 + 5.0, 12.0));
            float nibbleR2 = noise(vec2(uv.y * 65.0, 13.0));
            float nibbleR_depth = 0.012 + nibbleR2 * 0.018;
            float nibbleR = smoothstep(nibbleR_depth, 0.0, edgeR) * smoothstep(0.78, 0.92, nibbleR1);

            // Top edge - more aggressive
            float nibbleT1 = fbm(vec2(uv.x * 32.0 + 8.0, 14.0));
            float nibbleT2 = noise(vec2(uv.x * 70.0, 15.0));
            float nibbleT_depth = 0.018 + nibbleT2 * 0.025;
            float nibbleT = smoothstep(nibbleT_depth, 0.0, edgeT) * smoothstep(0.72, 0.88, nibbleT1);

            // Bottom edge - sparse small chips
            float nibbleB1 = fbm(vec2(uv.x * 40.0 + 3.0, 16.0));
            float nibbleB2 = noise(vec2(uv.x * 55.0, 17.0));
            float nibbleB_depth = 0.010 + nibbleB2 * 0.012;
            float nibbleB = smoothstep(nibbleB_depth, 0.0, edgeB) * smoothstep(0.82, 0.95, nibbleB1);

            // Combine with varying weights
            float cornerDents = max(max(dentBL, dentTR * 1.1), max(dentBR * 0.8, dentTL));
            float edgeNibbles = max(max(nibbleL, nibbleR * 0.9), max(nibbleT * 1.15, nibbleB * 0.7));
            float totalDent = max(cornerDents, edgeNibbles * 0.75);

            vTornCorner = totalDent * ep;
            vDiscard = step(0.5, totalDent * ep);

            // Varied curling depth based on which dent
            float curlVariation = dentBL * 0.8 + dentTR * 1.2 + dentBR * 0.6 + dentTL * 1.0;
            float dentEdgeCurl = smoothstep(0.0, 0.35, totalDent) * (1.0 - totalDent * 0.7);
            flatPos.z -= dentEdgeCurl * (5.0 + curlVariation * 4.0) * ep * boundaryFade;

            // Asymmetric inward pull - each corner pulls differently
            flatPos.x += dentBL * 3.0 * ep * boundaryFade; // BL pulls right
            flatPos.y += dentBL * 1.0 * ep * boundaryFade;

            flatPos.x -= dentTR * 2.0 * ep * boundaryFade; // TR pulls left and down more
            flatPos.y -= dentTR * 3.5 * ep * boundaryFade;

            flatPos.x -= dentBR * 1.2 * ep * boundaryFade; // BR barely moves
            flatPos.y += dentBR * 0.8 * ep * boundaryFade;

            flatPos.x += dentTL * 1.5 * ep * boundaryFade; // TL diagonal
            flatPos.y -= dentTL * 2.2 * ep * boundaryFade;

            // Edge nibbles add slight waviness
            flatPos.z -= (nibbleL + nibbleR) * 3.0 * ep * boundaryFade;
            flatPos.z -= (nibbleT + nibbleB) * 2.5 * ep * boundaryFade;
        }
    }

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

// Fragment shader - blends base texture with choropleth overlay
const fragmentShader = `
uniform sampler2D uTexture;
uniform sampler2D uDataTexture;
uniform sampler2D uCloudTexture;
uniform sampler2D uNightTexture;
uniform float uDataOpacity;
uniform vec3 uSunDir;
uniform float uMorph;
uniform float uParchment;
uniform float uExtremeParchment;
uniform float uTime;
uniform float uTransitionEffect;

// Effect uniforms
uniform float uClouds;
uniform float uCloudSpeed;
uniform float uCloudOpacity;
uniform float uAtmosphereIntensity;
uniform float uAurora;
uniform float uAuroraIntensity;
uniform float uCityLights;
uniform float uCityLightsIntensity;
uniform float uOceanSpecular;
uniform float uSpecularIntensity;
uniform float uSunGlow;
uniform float uGridLines;
uniform float uGridOpacity;
uniform float uScanEffect;
uniform float uScanSpeed;
uniform float uHologram;
uniform vec3 uHologramColor;
uniform float uVintage;
uniform float uThermal;
uniform float uBlueprint;
uniform float uGlowPulse;
uniform vec3 uGlowColor;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vTornEdge;
varying float vCornerCurl;
varying float vCrease;
varying float vTornCorner;
varying float vDiscard;
varying float vExtrudeAmount;

// Noise functions for aged paper texture
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

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 5; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
    }
    return value;
}

// Voronoi for cracks
vec2 voronoi(vec2 p) {
    vec2 n = floor(p);
    vec2 f = fract(p);
    float minDist = 8.0;
    float secondDist = 8.0;
    for (int i = -1; i <= 1; i++) {
        for (int j = -1; j <= 1; j++) {
            vec2 neighbor = vec2(float(i), float(j));
            vec2 point = hash(n + neighbor) * 0.5 + 0.25 + neighbor;
            float dist = length(point - f);
            if (dist < minDist) {
                secondDist = minDist;
                minDist = dist;
            } else if (dist < secondDist) {
                secondDist = dist;
            }
        }
    }
    return vec2(minDist, secondDist);
}

void main() {
    // Discard torn corner fragments in extreme parchment mode
    if (vDiscard > 0.5) {
        discard;
    }

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

    // Calculate rim for effects
    float viewDot = max(dot(normal, vec3(0.0, 0.0, 1.0)), 0.0);
    float rim = 1.0 - viewDot;

    // Enhanced atmosphere effect (only when atmosphere intensity > 0)
    if (uAtmosphereIntensity > 0.01) {
        // Multi-layer atmospheric glow
        float innerGlow = pow(rim, 2.0) * 0.4;
        float midGlow = pow(rim, 4.0) * 0.6;
        float outerGlow = pow(rim, 6.0) * 0.8;

        // Atmospheric colors - blue with subtle purple/cyan tints
        vec3 atmosphereInner = vec3(0.4, 0.7, 1.0);
        vec3 atmosphereMid = vec3(0.3, 0.5, 0.9);
        vec3 atmosphereOuter = vec3(0.5, 0.3, 0.8);

        vec3 atmosColor = atmosphereInner * innerGlow +
                          atmosphereMid * midGlow +
                          atmosphereOuter * outerGlow;

        // Fresnel-based atmosphere intensity
        float fresnelAtmos = pow(1.0 - viewDot, 3.0) * uMorph * uAtmosphereIntensity;
        color += atmosColor * fresnelAtmos * 0.35;

        // Subtle day-side atmospheric scattering
        float sunRim = max(dot(normal, sunDir), 0.0);
        float scatter = pow(rim, 2.5) * sunRim * uMorph * uAtmosphereIntensity;
        color += vec3(1.0, 0.9, 0.7) * scatter * 0.15;
    }

    // === TRANSITION EFFECT ===
    if (uTransitionEffect > 0.01) {
        // Grid/scan line dissolve effect during transition
        float scanLine = sin(vUv.y * 150.0 + uTime * 3.0) * 0.5 + 0.5;
        float gridX = sin(vUv.x * 80.0) * 0.5 + 0.5;
        float gridY = sin(vUv.y * 40.0) * 0.5 + 0.5;
        float grid = gridX * gridY;

        // Glowing edges during transition
        float transitionGlow = uTransitionEffect * (1.0 - uTransitionEffect) * 4.0;
        vec3 transGlowColor = vec3(0.2, 0.6, 1.0);

        // Add scan lines
        color += transGlowColor * scanLine * transitionGlow * 0.15;

        // Add edge highlight
        float edgeGlow = pow(rim, 2.0) * transitionGlow;
        color += transGlowColor * edgeGlow * 0.4;

        // Subtle grid overlay
        color += transGlowColor * grid * transitionGlow * 0.08;

        // Energy pulse from center
        float distFromCenter = length(vUv - 0.5) * 2.0;
        float pulse = sin(distFromCenter * 10.0 - uTime * 5.0) * 0.5 + 0.5;
        pulse *= smoothstep(1.0, 0.3, distFromCenter);
        color += transGlowColor * pulse * transitionGlow * 0.1;
    }

    // === CLOUD LAYER ===
    if (uClouds > 0.01) {
        // Animated cloud offset
        vec2 cloudUv = vUv + vec2(uTime * uCloudSpeed * 0.01, 0.0);
        cloudUv = fract(cloudUv);

        // Procedural clouds using layered noise
        float cloud1 = fbm(cloudUv * 8.0 + uTime * uCloudSpeed * 0.1);
        float cloud2 = fbm(cloudUv * 16.0 - uTime * uCloudSpeed * 0.05);
        float cloud3 = fbm(cloudUv * 4.0 + uTime * uCloudSpeed * 0.02);

        float clouds = cloud1 * 0.5 + cloud2 * 0.3 + cloud3 * 0.2;
        clouds = smoothstep(0.35, 0.7, clouds);

        // Clouds are white/light gray
        vec3 cloudColor = vec3(1.0, 1.0, 1.0);

        // Clouds are lit by sun
        float cloudLight = 0.7 + 0.3 * dayFactor;
        cloudColor *= cloudLight;

        // Cloud shadows (darken areas under clouds slightly)
        color *= 1.0 - clouds * 0.15 * uClouds;

        // Add clouds
        color = mix(color, cloudColor, clouds * uCloudOpacity * uClouds);
    }

    // === CITY LIGHTS (night side) ===
    if (uCityLights > 0.01) {
        float nightSide = 1.0 - dayFactor;

        // Procedural city lights pattern
        float cityNoise = fbm(vUv * 100.0);
        float cityPattern = fbm(vUv * 50.0 + 10.0);

        // Cities concentrated on land (avoid ocean-ish colors)
        float landMask = smoothstep(0.2, 0.4, length(baseColor.rgb - vec3(0.1, 0.2, 0.4)));

        float cities = smoothstep(0.6, 0.8, cityNoise) * smoothstep(0.4, 0.6, cityPattern);
        cities *= landMask;
        cities *= nightSide;

        // Warm city light colors
        vec3 cityColor = vec3(1.0, 0.8, 0.4) * 1.5;

        // Twinkle effect
        float twinkle = sin(uTime * 3.0 + cityNoise * 50.0) * 0.3 + 0.7;
        cities *= twinkle;

        color += cityColor * cities * uCityLightsIntensity * uCityLights;
    }

    // === OCEAN SPECULAR ===
    if (uOceanSpecular > 0.01) {
        // Detect ocean areas (blueish in base texture)
        float oceanMask = smoothstep(0.15, 0.05, length(baseColor.rgb - vec3(0.1, 0.2, 0.4)));

        // Specular reflection
        vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
        vec3 reflectDir = reflect(-sunDir, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

        // Ocean wave distortion
        float wave = sin(vUv.x * 200.0 + uTime * 2.0) * sin(vUv.y * 150.0 + uTime * 1.5);
        spec *= (0.8 + wave * 0.2);

        vec3 specColor = vec3(1.0, 0.95, 0.9);
        color += specColor * spec * oceanMask * uSpecularIntensity * uOceanSpecular * uMorph;
    }

    // === AURORA BOREALIS ===
    if (uAurora > 0.01) {
        // Aurora at polar regions
        float latitude = (vUv.y - 0.5) * 2.0;
        float polarMask = smoothstep(0.5, 0.8, abs(latitude));

        // Flowing aurora curtains
        float aurora1 = sin(vUv.x * 20.0 + uTime * 0.5 + latitude * 10.0);
        float aurora2 = sin(vUv.x * 35.0 - uTime * 0.3 + latitude * 15.0);
        float aurora3 = cos(vUv.x * 15.0 + uTime * 0.7);

        float auroraPattern = (aurora1 * 0.5 + aurora2 * 0.3 + aurora3 * 0.2) * 0.5 + 0.5;
        auroraPattern = pow(auroraPattern, 2.0);

        // Vertical shimmer
        float shimmer = fbm(vec2(vUv.x * 30.0, uTime * 2.0)) * 0.5 + 0.5;
        auroraPattern *= shimmer;

        // Aurora colors - green, blue, purple gradient
        vec3 auroraColor = mix(
            vec3(0.1, 0.8, 0.3), // Green
            mix(vec3(0.2, 0.4, 0.9), vec3(0.6, 0.2, 0.8), aurora2 * 0.5 + 0.5), // Blue to purple
            auroraPattern
        );

        // Night side only
        float nightAurora = 1.0 - dayFactor;

        color += auroraColor * auroraPattern * polarMask * nightAurora * uAuroraIntensity * uAurora * uMorph;
    }

    // === SUN GLOW ===
    if (uSunGlow > 0.01) {
        float sunAlignment = max(dot(normal, sunDir), 0.0);
        float sunGlowIntensity = pow(sunAlignment, 8.0);

        // Lens flare streaks
        float streak1 = pow(max(dot(normal, normalize(sunDir + vec3(0.1, 0.0, 0.0))), 0.0), 32.0);
        float streak2 = pow(max(dot(normal, normalize(sunDir + vec3(-0.1, 0.0, 0.0))), 0.0), 32.0);

        vec3 sunColor = vec3(1.0, 0.9, 0.7);
        color += sunColor * sunGlowIntensity * 0.3 * uSunGlow * uMorph;
        color += sunColor * (streak1 + streak2) * 0.1 * uSunGlow * uMorph;
    }

    // === GRID LINES ===
    if (uGridLines > 0.01) {
        // Latitude lines (every 15 degrees = every 1/12 of UV)
        float latLine = abs(sin(vUv.y * 3.14159 * 12.0));
        latLine = 1.0 - smoothstep(0.97, 1.0, latLine);

        // Longitude lines (every 15 degrees)
        float lonLine = abs(sin(vUv.x * 3.14159 * 24.0));
        lonLine = 1.0 - smoothstep(0.97, 1.0, lonLine);

        // Equator and prime meridian (thicker)
        float equator = 1.0 - smoothstep(0.005, 0.01, abs(vUv.y - 0.5));
        float primeMeridian = 1.0 - smoothstep(0.003, 0.006, abs(vUv.x - 0.5));

        float gridTotal = max(max(latLine, lonLine), max(equator * 2.0, primeMeridian * 2.0));

        vec3 gridColor = vec3(0.3, 0.6, 1.0);
        color = mix(color, gridColor, gridTotal * uGridOpacity * uGridLines);
    }

    // === SCAN EFFECT ===
    if (uScanEffect > 0.01) {
        // Rotating scan line
        float scanAngle = uTime * uScanSpeed;
        vec2 scanDir = vec2(cos(scanAngle), sin(scanAngle));
        vec2 centered = vUv - 0.5;
        float scanDist = dot(centered, scanDir);

        float scanLine2 = 1.0 - smoothstep(0.0, 0.03, abs(scanDist));
        float scanTrail = smoothstep(-0.15, 0.0, scanDist) * smoothstep(0.0, -0.15, scanDist - 0.15);

        vec3 scanColor = vec3(0.0, 1.0, 0.5);
        color += scanColor * scanLine2 * 0.5 * uScanEffect;
        color += scanColor * scanTrail * 0.2 * uScanEffect;
    }

    // === HOLOGRAM MODE ===
    if (uHologram > 0.01) {
        // Convert to hologram look
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));

        // Scan lines
        float hScanLines = sin(vUv.y * 400.0) * 0.5 + 0.5;
        hScanLines = mix(0.8, 1.0, hScanLines);

        // Edge glow
        float hEdge = pow(rim, 1.5);

        // Flicker
        float flicker = sin(uTime * 30.0) * 0.05 + 0.95;

        vec3 holoColor = uHologramColor * (luminance * 0.7 + 0.3);
        holoColor *= hScanLines * flicker;
        holoColor += uHologramColor * hEdge * 0.5;

        // Glitch effect
        float glitch = step(0.99, hash(vec2(floor(uTime * 10.0), floor(vUv.y * 20.0))));
        holoColor += vec3(glitch) * 0.3;

        color = mix(color, holoColor, uHologram);
    }

    // === VINTAGE MODE ===
    if (uVintage > 0.01) {
        // Sepia tone
        vec3 vintageSepia = vec3(
            dot(color, vec3(0.393, 0.769, 0.189)),
            dot(color, vec3(0.349, 0.686, 0.168)),
            dot(color, vec3(0.272, 0.534, 0.131))
        );

        // Vignette
        float vignette = 1.0 - length(vUv - 0.5) * 0.8;
        vignette = smoothstep(0.2, 0.8, vignette);

        // Film grain
        float grain = hash(vUv * 500.0 + uTime) * 0.1;

        vec3 vintageColor = vintageSepia * vignette + grain;
        color = mix(color, vintageColor, uVintage);
    }

    // === THERMAL MODE ===
    if (uThermal > 0.01) {
        float heat = dot(color, vec3(0.299, 0.587, 0.114));

        // Thermal color gradient: black -> blue -> purple -> red -> yellow -> white
        vec3 thermalColor;
        if (heat < 0.2) {
            thermalColor = mix(vec3(0.0, 0.0, 0.2), vec3(0.0, 0.0, 0.8), heat * 5.0);
        } else if (heat < 0.4) {
            thermalColor = mix(vec3(0.0, 0.0, 0.8), vec3(0.5, 0.0, 0.5), (heat - 0.2) * 5.0);
        } else if (heat < 0.6) {
            thermalColor = mix(vec3(0.5, 0.0, 0.5), vec3(1.0, 0.0, 0.0), (heat - 0.4) * 5.0);
        } else if (heat < 0.8) {
            thermalColor = mix(vec3(1.0, 0.0, 0.0), vec3(1.0, 1.0, 0.0), (heat - 0.6) * 5.0);
        } else {
            thermalColor = mix(vec3(1.0, 1.0, 0.0), vec3(1.0, 1.0, 1.0), (heat - 0.8) * 5.0);
        }

        color = mix(color, thermalColor, uThermal);
    }

    // === BLUEPRINT MODE ===
    if (uBlueprint > 0.01) {
        float luminance = dot(color, vec3(0.299, 0.587, 0.114));

        // Edge detection using gradient
        float edge = fwidth(luminance) * 50.0;
        edge = smoothstep(0.0, 0.5, edge);

        // Blueprint background
        vec3 blueprintBg = vec3(0.0, 0.1, 0.3);
        vec3 blueprintLine = vec3(0.7, 0.85, 1.0);

        // Grid pattern
        float bpGrid = max(
            1.0 - smoothstep(0.95, 1.0, abs(sin(vUv.x * 100.0))),
            1.0 - smoothstep(0.95, 1.0, abs(sin(vUv.y * 50.0)))
        );

        vec3 blueprintColor = blueprintBg + blueprintLine * (edge + bpGrid * 0.3);
        color = mix(color, blueprintColor, uBlueprint);
    }

    // === GLOW PULSE ===
    if (uGlowPulse > 0.01) {
        float glowPulseIntensity = sin(uTime * 2.0) * 0.5 + 0.5;
        float edgePulse = pow(rim, 2.0) * glowPulseIntensity;

        color += uGlowColor * edgePulse * 0.4 * uGlowPulse * uMorph;
    }

    // Parchment/aged effect (only when completely flat)
    if (uMorph < 0.01 && uParchment > 0.01) {
        float p = uParchment;

        // Check if we have data overlay active
        float hasData = uDataOpacity * dataColor.a;

        // Edge distances
        float edgeL = vUv.x;
        float edgeR = 1.0 - vUv.x;
        float edgeB = vUv.y;
        float edgeT = 1.0 - vUv.y;
        float edgeDist = min(min(edgeL, edgeR), min(edgeB, edgeT));

        // Corner distances
        float cornerBL = length(vUv);
        float cornerBR = length(vec2(1.0 - vUv.x, vUv.y));
        float cornerTL = length(vec2(vUv.x, 1.0 - vUv.y));
        float cornerTR = length(vec2(1.0 - vUv.x, 1.0 - vUv.y));
        float minCorner = min(min(cornerBL, cornerBR), min(cornerTL, cornerTR));

        // === BASE PARCHMENT COLOR ===
        // Rich, warm parchment base with variation
        vec3 parchmentBase = vec3(0.92, 0.85, 0.72);
        float baseVariation = fbm(vUv * 8.0) * 0.08;
        parchmentBase += vec3(baseVariation * 0.8, baseVariation * 0.6, baseVariation * 0.3);

        // === SEPIA TRANSFORMATION ===
        vec3 sepia = vec3(
            dot(color, vec3(0.393, 0.769, 0.189)),
            dot(color, vec3(0.349, 0.686, 0.168)),
            dot(color, vec3(0.272, 0.534, 0.131))
        );
        sepia = mix(sepia, sepia * parchmentBase, 0.6);

        // === PAPER FIBER TEXTURE ===
        // Fine paper grain
        float fineGrain = noise(vUv * 400.0) * 0.03;
        float mediumGrain = noise(vUv * 150.0) * 0.04;
        float coarseGrain = noise(vUv * 50.0) * 0.05;
        float paperTexture = fineGrain + mediumGrain + coarseGrain;

        // Fiber direction (horizontal bias like real paper)
        float fiberH = noise(vec2(vUv.x * 300.0, vUv.y * 80.0)) * 0.02;
        float fiberV = noise(vec2(vUv.x * 80.0, vUv.y * 200.0)) * 0.015;
        paperTexture += fiberH + fiberV;

        sepia += vec3(paperTexture * 0.8, paperTexture * 0.7, paperTexture * 0.5);

        // === TORN EDGE EFFECT ===
        // Paper fibers visible at torn edges
        if (vTornEdge > 0.01) {
            // Lighter, fibrous torn edge
            float fiberNoise = noise(vUv * 500.0);
            vec3 tornFiber = vec3(0.95, 0.92, 0.88) + fiberNoise * 0.1;
            sepia = mix(sepia, tornFiber, vTornEdge * 0.7);

            // Darkened edge right before the tear
            float tearShadow = smoothstep(0.0, 0.3, vTornEdge) * (1.0 - vTornEdge);
            sepia *= 1.0 - tearShadow * 0.3;
        }

        // === CORNER CURL SHADOWS ===
        // Curled corners cast shadows and look darker underneath
        if (vCornerCurl > 0.1) {
            float curlShadow = vCornerCurl * 0.4;
            sepia *= 1.0 - curlShadow;

            // Highlight on the curl edge (catching light)
            float curlHighlight = pow(vCornerCurl, 2.0) * 0.15;
            sepia += vec3(curlHighlight * 0.9, curlHighlight * 0.8, curlHighlight * 0.6);
        }

        // === FOLD CREASE MARKS ===
        if (vCrease > 0.01) {
            // Creases are darker and more worn
            float creaseWear = vCrease * 0.5;
            sepia *= 1.0 - creaseWear * 0.4;

            // Slight lighter line in center of crease (worn paper)
            float creaseLine = pow(vCrease, 3.0) * 0.15;
            sepia += vec3(creaseLine);
        }

        // === VIGNETTE - Dramatic edge darkening ===
        float edgeVignette = smoothstep(0.0, 0.18, edgeDist);
        float cornerVignette = smoothstep(0.0, 0.30, minCorner);
        float vignette = pow(edgeVignette * cornerVignette, 0.8);
        sepia *= 0.5 + 0.5 * vignette;

        // === BURN MARKS at corners ===
        // More dramatic, organic burn patterns
        float burnPattern = fbm(vUv * 25.0 + 5.0);
        float burnMask = pow(1.0 - smoothstep(0.0, 0.22, minCorner), 2.5);
        burnMask *= smoothstep(0.3, 0.6, burnPattern);
        vec3 burnColor = vec3(0.12, 0.08, 0.04);
        sepia = mix(sepia, burnColor, burnMask * 0.7 * p);

        // Charred edge effect at extreme corners
        float charMask = pow(1.0 - smoothstep(0.0, 0.12, minCorner), 3.0);
        charMask *= smoothstep(0.4, 0.7, burnPattern);
        sepia = mix(sepia, vec3(0.05, 0.03, 0.02), charMask * 0.5 * p);

        // === FOXING (age spots) ===
        float foxingPattern = fbm(vUv * 12.0 + 42.0);
        float foxing = smoothstep(0.55, 0.75, foxingPattern);
        foxing *= (1.0 - smoothstep(0.0, 0.3, edgeDist)) * 0.5 + 0.5; // More at edges
        vec3 foxingColor = vec3(0.6, 0.45, 0.3);
        sepia = mix(sepia, sepia * foxingColor, foxing * 0.25 * p);

        // === WATER STAINS ===
        // Organic water damage patterns
        float waterPattern = fbm(vUv * 3.0 + 100.0);
        float waterMask = smoothstep(0.4, 0.6, waterPattern);
        waterMask *= (1.0 - smoothstep(0.0, 0.15, edgeDist)); // Concentrated at edges

        // Water stain rings
        float waterRing = abs(waterPattern - 0.5);
        waterRing = 1.0 - smoothstep(0.0, 0.08, waterRing);
        waterMask = max(waterMask, waterRing * 0.3);

        vec3 waterColor = vec3(0.75, 0.68, 0.55);
        sepia = mix(sepia, sepia * waterColor, waterMask * 0.35 * p);

        // === INK FADING ===
        // Simulate uneven ink fading on the map
        float inkFade = fbm(vUv * 6.0 + 200.0) * 0.15;
        sepia *= 1.0 - inkFade * p * (1.0 - hasData * 0.7);

        // === CRACKS (fine surface cracks) ===
        vec2 crackVoronoi = voronoi(vUv * 40.0);
        float cracks = smoothstep(0.02, 0.0, crackVoronoi.y - crackVoronoi.x);
        cracks *= fbm(vUv * 20.0); // Vary crack visibility
        cracks *= smoothstep(0.05, 0.2, edgeDist); // Less at edges
        sepia *= 1.0 - cracks * 0.15 * p;

        // === DUST AND DIRT ===
        float dust = fbm(vUv * 80.0 + 300.0);
        dust = smoothstep(0.6, 0.8, dust) * 0.08;
        sepia += vec3(dust * 0.5, dust * 0.4, dust * 0.3) * p;

        // === APPLY TO FINAL COLOR ===
        // For statistics data: preserve more color
        float sepiaAmount = mix(0.88, 0.30, hasData);

        // Boost saturation for data areas
        if (hasData > 0.1) {
            float luminance = dot(color, vec3(0.299, 0.587, 0.114));
            color = mix(vec3(luminance), color, 1.4); // 40% saturation boost
        }

        color = mix(color, sepia, sepiaAmount * p);

        // === SUBTLE AMBIENT OCCLUSION from geometry ===
        // Curled areas appear slightly shadowed
        float ao = 1.0 - (vCornerCurl * 0.2 + vCrease * 0.15) * p;
        color *= ao;

        // === EXTREME PARCHMENT: Dented edge effects ===
        if (uExtremeParchment > 0.01 && vTornCorner > 0.01) {
            // Darkened edge near dents (worn/aged look)
            float wornEdge = smoothstep(0.15, 0.4, vTornCorner);
            vec3 wornColor = vec3(0.25, 0.18, 0.12);
            color = mix(color, wornColor, wornEdge * 0.5 * uExtremeParchment);

            // Paper fiber texture at dent edge
            float fiberNoise = noise(vUv * 500.0);
            float fibers = smoothstep(0.25, 0.45, vTornCorner) * fiberNoise;
            vec3 fiberColor = vec3(0.88, 0.82, 0.74);
            color = mix(color, fiberColor, fibers * 0.35 * uExtremeParchment);

            // Slight discoloration near dented areas
            float discolor = smoothstep(0.08, 0.35, vTornCorner);
            color = mix(color, color * vec3(0.95, 0.90, 0.82), discolor * 0.25 * uExtremeParchment);
        }
    }

    gl_FragColor = vec4(color, 1.0);
}
`;

// Earth texture options
const EARTH_TEXTURES: { [key: string]: { url: string; name: string } } = {
    'satellite': {
        url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg',
        name: 'Satellite (NASA Blue Marble)'
    },
    'natural': {
        url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_day_4096.jpg',
        name: 'Natural Earth'
    },
    'night': {
        url: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_lights_2048.png',
        name: 'Night Lights'
    },
    'topo': {
        url: 'https://eoimages.gsfc.nasa.gov/images/imagerecords/74000/74117/world.topo.200407.3x5400x2700.jpg',
        name: 'Topographic'
    },
    'watercolor': {
        url: 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg',
        name: 'Clean Satellite'
    }
};

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
    private atmosphere: THREE.Mesh | null = null;
    private textureLoader: THREE.TextureLoader = new THREE.TextureLoader();
    private exporter: Exporter | null = null;
    private stars: THREE.Points | null = null;
    private starOpacities: Float32Array | null = null;
    private countryLabels: CountryLabels | null = null;

    private params = {
        morph: 0,
        autoRotate: false,
        parchmentMode: 'normal' as 'normal' | 'parchment' | 'extreme',
        earthTexture: 'satellite',
        sunX: 1,
        sunY: 0.5,
        sunZ: 1,
        statistic: 'none',
        extrudeHeight: 0,
        labelStyle: 'none' as LabelStyle,
    };

    // Visual effects configuration
    private effects: EffectsConfig = {
        // Atmosphere
        clouds: false,
        cloudSpeed: 1.0,
        cloudOpacity: 0.6,
        atmosphereIntensity: 0, // Start with no atmosphere glow
        aurora: false,
        auroraIntensity: 1.0,

        // Lighting
        cityLights: false,
        cityLightsIntensity: 1.0,
        oceanSpecular: false,
        specularIntensity: 1.0,
        sunGlow: false,

        // Overlays
        gridLines: false,
        gridOpacity: 0.5,
        countryBorders: false,
        scanEffect: false,
        scanSpeed: 1.0,
        transitionEffect: false, // Off by default for clean basic mode

        // Style
        hologramMode: false,
        hologramColor: '#00ffff',
        vintageMode: false,
        thermalMode: false,
        blueprintMode: false,
        glowPulse: false,
        glowColor: '#4488ff',

        // Animation
        starTwinkle: true,
        cloudAnimation: true,
        auroraAnimation: true,
    };

    // Export state
    private exportState = {
        isRecordingGif: false,
        isRecordingVideo: false,
        gifFrameCount: 0,
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

        // Initialize country labels
        const container = document.getElementById('app')!;
        this.countryLabels = new CountryLabels(container, SPHERE_RADIUS);
        this.scene.add(this.countryLabels.getGroup());

        // Set globe and camera reference for rotation sync and backface culling
        if (this.globe) {
            this.countryLabels.setGlobe(this.globe);
        }
        this.countryLabels.setCamera(this.camera);

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

        // Shader material with all effect uniforms
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                // Core uniforms
                uMorph: { value: 0 },
                uTime: { value: 0 },
                uParchment: { value: 0 },
                uExtremeParchment: { value: 0 },
                uTransitionEffect: { value: 0 },
                uTexture: { value: baseTex },
                uDataTexture: { value: this.dataTexture },
                uCloudTexture: { value: null },
                uNightTexture: { value: null },
                uDataOpacity: { value: 0 },
                uDataOverlay: { value: 0 },
                uExtrudeHeight: { value: 0 },
                uSunDir: { value: new THREE.Vector3(1, 0.5, 1).normalize() },

                // Atmosphere effects
                uClouds: { value: 0 },
                uCloudSpeed: { value: 1.0 },
                uCloudOpacity: { value: 0.6 },
                uAtmosphereIntensity: { value: 0 }, // Start with no atmosphere glow in normal mode
                uAurora: { value: 0 },
                uAuroraIntensity: { value: 1.0 },

                // Lighting effects
                uCityLights: { value: 0 },
                uCityLightsIntensity: { value: 1.0 },
                uOceanSpecular: { value: 0 },
                uSpecularIntensity: { value: 1.0 },
                uSunGlow: { value: 0 },

                // Overlay effects
                uGridLines: { value: 0 },
                uGridOpacity: { value: 0.5 },
                uScanEffect: { value: 0 },
                uScanSpeed: { value: 1.0 },

                // Style effects
                uHologram: { value: 0 },
                uHologramColor: { value: new THREE.Color(0x00ffff) },
                uVintage: { value: 0 },
                uThermal: { value: 0 },
                uBlueprint: { value: 0 },
                uGlowPulse: { value: 0 },
                uGlowColor: { value: new THREE.Color(0x4488ff) },
            },
            side: THREE.DoubleSide,
        });

        this.globe = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.globe);

        // Create outer atmosphere glow
        this.createAtmosphere();
    }

    private createAtmosphere(): void {
        // Atmosphere shader for outer glow
        const atmosVertexShader = `
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform float uMorph;

            const float PI = 3.14159265359;
            const float RADIUS = ${SPHERE_RADIUS.toFixed(1)};

            void main() {
                vNormal = normalize(normalMatrix * normal);

                // Same morph logic as main globe but slightly larger
                float lon = (uv.x - 0.5) * 2.0 * PI;
                float lat = (uv.y - 0.5) * PI;

                float atmosRadius = RADIUS * 1.15; // 15% larger
                vec3 spherePos = vec3(
                    atmosRadius * cos(lat) * sin(lon),
                    atmosRadius * sin(lat),
                    atmosRadius * cos(lat) * cos(lon)
                );

                float flatWidth = 2.0 * PI * atmosRadius;
                float flatHeight = PI * atmosRadius;
                vec3 flatPos = vec3(
                    (uv.x - 0.5) * flatWidth,
                    (uv.y - 0.5) * flatHeight,
                    -5.0 // Behind the map
                );

                float t = uMorph * uMorph * (3.0 - 2.0 * uMorph);
                vec3 pos = mix(flatPos, spherePos, t);

                vPosition = pos;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        const atmosFragmentShader = `
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform float uMorph;

            void main() {
                float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);

                // Fade out when flat
                intensity *= uMorph;

                // Multi-color atmosphere
                vec3 innerColor = vec3(0.3, 0.6, 1.0);
                vec3 outerColor = vec3(0.1, 0.2, 0.5);
                vec3 color = mix(innerColor, outerColor, intensity);

                gl_FragColor = vec4(color, intensity * 0.6);
            }
        `;

        const atmosGeometry = new THREE.PlaneGeometry(
            Math.PI * 2 * SPHERE_RADIUS * 1.15,
            Math.PI * SPHERE_RADIUS * 1.15,
            128,
            64
        );

        const atmosMaterial = new THREE.ShaderMaterial({
            vertexShader: atmosVertexShader,
            fragmentShader: atmosFragmentShader,
            uniforms: {
                uMorph: { value: 0 }
            },
            side: THREE.BackSide,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.atmosphere = new THREE.Mesh(atmosGeometry, atmosMaterial);
        this.scene.add(this.atmosphere);
    }

    private async changeTexture(textureId: string): Promise<void> {
        const textureInfo = EARTH_TEXTURES[textureId];
        if (!textureInfo || !this.material) return;

        try {
            const newTexture = await this.textureLoader.loadAsync(textureInfo.url);
            newTexture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
            newTexture.minFilter = THREE.LinearMipmapLinearFilter;
            newTexture.magFilter = THREE.LinearFilter;

            // Crossfade would be nice but for simplicity just swap
            this.material.uniforms.uTexture.value = newTexture;
        } catch (error) {
            console.error('Failed to load texture:', textureId, error);
        }
    }

    private createStars(): void {
        const starCount = 3000;
        const starsGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(starCount * 3);
        const sizes = new Float32Array(starCount);
        const phases = new Float32Array(starCount); // For twinkling variation

        for (let i = 0; i < starCount; i++) {
            const r = 300 + Math.random() * 300;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);

            sizes[i] = 0.5 + Math.random() * 1.5;
            phases[i] = Math.random() * Math.PI * 2;
        }

        starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        starsGeo.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
        starsGeo.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

        // Store base opacities for twinkling
        this.starOpacities = new Float32Array(starCount);
        for (let i = 0; i < starCount; i++) {
            this.starOpacities[i] = 0.5 + Math.random() * 0.5;
        }

        // Custom star shader for twinkling
        const starVertexShader = `
            attribute float aSize;
            attribute float aPhase;
            uniform float uTime;
            uniform float uTwinkle;
            varying float vOpacity;

            void main() {
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

                // Twinkling effect
                float twinkle = sin(uTime * 2.0 + aPhase) * 0.3 + 0.7;
                twinkle = mix(1.0, twinkle, uTwinkle);
                vOpacity = twinkle;

                gl_PointSize = aSize * (300.0 / -mvPosition.z) * twinkle;
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const starFragmentShader = `
            varying float vOpacity;

            void main() {
                // Circular star with soft edges
                vec2 center = gl_PointCoord - 0.5;
                float dist = length(center);
                float alpha = 1.0 - smoothstep(0.3, 0.5, dist);

                gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * vOpacity * 0.9);
            }
        `;

        const starsMat = new THREE.ShaderMaterial({
            vertexShader: starVertexShader,
            fragmentShader: starFragmentShader,
            uniforms: {
                uTime: { value: 0 },
                uTwinkle: { value: 1 },
            },
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        this.stars = new THREE.Points(starsGeo, starsMat);
        this.scene.add(this.stars);
    }

    private createGUI(): void {
        this.gui = new GUI({ title: 'Globe Controls', width: 320 });

        // Initialize exporter
        this.exporter = new Exporter(this.renderer, this.scene, this.camera);

        // === MAIN CONTROLS ===
        // Morph slider
        this.gui.add(this.params, 'morph', 0, 1, 0.01)
            .name('Flat ↔ Globe')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uMorph.value = v;
                if (this.countryLabels) this.countryLabels.setMorph(v);
            });

        // Buttons
        this.gui.add({ toFlat: () => this.morphTo(0) }, 'toFlat').name('→ Flat Map');
        this.gui.add({ toGlobe: () => this.morphTo(1) }, 'toGlobe').name('→ Globe');
        this.gui.add({ replay: () => this.playIntro() }, 'replay').name('↻ Replay Intro');

        // Auto rotate
        this.gui.add(this.params, 'autoRotate').name('Auto Rotate');

        // Earth texture selector
        const textureOptions: { [key: string]: string } = {};
        Object.entries(EARTH_TEXTURES).forEach(([key, value]) => {
            textureOptions[value.name] = key;
        });
        this.gui.add(this.params, 'earthTexture', textureOptions)
            .name('Earth Style')
            .onChange((textureId: string) => {
                this.changeTexture(textureId);
            });

        // Parchment mode selector (normal, parchment, extreme)
        const parchmentModes = {
            'Normal': 'normal',
            'Parchment': 'parchment',
            'Extreme Parchment': 'extreme'
        };
        this.gui.add(this.params, 'parchmentMode', parchmentModes)
            .name('Map Style')
            .onChange((mode: string) => {
                if (this.material) {
                    const targetParchment = mode === 'parchment' || mode === 'extreme' ? 1 : 0;
                    const targetExtreme = mode === 'extreme' ? 1 : 0;

                    // Only animate if we're flat
                    if (this.params.morph < 0.01) {
                        if (mode === 'normal') {
                            // Animate back to normal
                            gsap.to(this.material.uniforms.uExtremeParchment, {
                                value: 0,
                                duration: 1.5,
                                ease: 'power2.in',
                            });
                            gsap.to(this.material.uniforms.uParchment, {
                                value: 0,
                                duration: 1.8,
                                ease: 'power2.in',
                            });
                        } else if (mode === 'parchment') {
                            // Disable extreme first if active
                            gsap.to(this.material.uniforms.uExtremeParchment, {
                                value: 0,
                                duration: 1.2,
                                ease: 'power2.in',
                            });
                            // Animate to parchment
                            gsap.to(this.material.uniforms.uParchment, {
                                value: 1,
                                duration: 2.2,
                                ease: 'power3.out',
                            });
                        } else if (mode === 'extreme') {
                            // First ensure parchment is active
                            gsap.to(this.material.uniforms.uParchment, {
                                value: 1,
                                duration: 1.5,
                                ease: 'power2.out',
                            });
                            // Then animate extreme with dramatic timing
                            gsap.to(this.material.uniforms.uExtremeParchment, {
                                value: 1,
                                duration: 2.5,
                                delay: 0.3,
                                ease: 'power3.out',
                            });
                        }
                    } else {
                        // If not flat, just set the values (will apply when flat)
                        this.material.uniforms.uParchment.value = targetParchment;
                        this.material.uniforms.uExtremeParchment.value = targetExtreme;
                    }
                }
            });

        // === STATISTICS FOLDER ===
        const statsFolder = this.gui.addFolder('World Statistics');
        const statOptions: { [key: string]: string } = { 'None (Satellite View)': 'none' };
        STATISTICS.forEach(stat => {
            statOptions[stat.name] = stat.id;
        });
        statsFolder.add(this.params, 'statistic', statOptions)
            .name('Data Layer')
            .onChange((statId: string) => this.onStatisticChange(statId));
        statsFolder.add(this.params, 'extrudeHeight', 0, 1, 0.01)
            .name('3D Height')
            .onChange((v: number) => {
                if (this.material) {
                    this.material.uniforms.uExtrudeHeight.value = v;
                }
            });

        // Country labels selector
        const labelOptions: { [key: string]: LabelStyle } = {
            'None': 'none',
            'Minimal (7 largest)': 'minimal',
            'Major Countries': 'major',
            'All Countries': 'all',
        };
        statsFolder.add(this.params, 'labelStyle', labelOptions)
            .name('Country Labels')
            .onChange((style: LabelStyle) => {
                if (this.countryLabels) {
                    this.countryLabels.setStyle(style);
                }
            });

        statsFolder.open();

        // === ATMOSPHERE EFFECTS ===
        const atmosFolder = this.gui.addFolder('Atmosphere Effects');
        atmosFolder.add(this.effects, 'atmosphereIntensity', 0, 1, 0.1)
            .name('Atmosphere Glow')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uAtmosphereIntensity.value = v;
            });
        atmosFolder.add(this.effects, 'clouds')
            .name('Clouds')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uClouds, { value: v ? 1 : 0, duration: 0.5 });
                }
            });
        atmosFolder.add(this.effects, 'cloudSpeed', 0.1, 3, 0.1)
            .name('Cloud Speed')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uCloudSpeed.value = v;
            });
        atmosFolder.add(this.effects, 'cloudOpacity', 0.1, 1, 0.1)
            .name('Cloud Opacity')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uCloudOpacity.value = v;
            });
        atmosFolder.add(this.effects, 'aurora')
            .name('Aurora Borealis')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uAurora, { value: v ? 1 : 0, duration: 0.8 });
                }
            });
        atmosFolder.add(this.effects, 'auroraIntensity', 0.1, 2, 0.1)
            .name('Aurora Intensity')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uAuroraIntensity.value = v;
            });

        // === LIGHTING EFFECTS ===
        const lightFolder = this.gui.addFolder('Lighting Effects');
        lightFolder.add(this.params, 'sunX', -1, 1, 0.1).name('Sun X').onChange(() => this.updateSun());
        lightFolder.add(this.params, 'sunY', -1, 1, 0.1).name('Sun Y').onChange(() => this.updateSun());
        lightFolder.add(this.params, 'sunZ', -1, 1, 0.1).name('Sun Z').onChange(() => this.updateSun());
        lightFolder.add(this.effects, 'cityLights')
            .name('City Lights')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uCityLights, { value: v ? 1 : 0, duration: 0.6 });
                }
            });
        lightFolder.add(this.effects, 'cityLightsIntensity', 0.1, 2, 0.1)
            .name('Lights Intensity')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uCityLightsIntensity.value = v;
            });
        lightFolder.add(this.effects, 'oceanSpecular')
            .name('Ocean Reflections')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uOceanSpecular, { value: v ? 1 : 0, duration: 0.4 });
                }
            });
        lightFolder.add(this.effects, 'specularIntensity', 0.1, 2, 0.1)
            .name('Reflection Intensity')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uSpecularIntensity.value = v;
            });
        lightFolder.add(this.effects, 'sunGlow')
            .name('Sun Lens Flare')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uSunGlow, { value: v ? 1 : 0, duration: 0.3 });
                }
            });

        // === OVERLAY EFFECTS ===
        const overlayFolder = this.gui.addFolder('Overlay Effects');
        overlayFolder.add(this.effects, 'transitionEffect')
            .name('Morph Transition FX');
        overlayFolder.add(this.effects, 'gridLines')
            .name('Lat/Long Grid')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uGridLines, { value: v ? 1 : 0, duration: 0.4 });
                }
            });
        overlayFolder.add(this.effects, 'gridOpacity', 0.1, 1, 0.1)
            .name('Grid Opacity')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uGridOpacity.value = v;
            });
        overlayFolder.add(this.effects, 'scanEffect')
            .name('Radar Scan')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uScanEffect, { value: v ? 1 : 0, duration: 0.3 });
                }
            });
        overlayFolder.add(this.effects, 'scanSpeed', 0.1, 3, 0.1)
            .name('Scan Speed')
            .onChange((v: number) => {
                if (this.material) this.material.uniforms.uScanSpeed.value = v;
            });
        overlayFolder.add(this.effects, 'glowPulse')
            .name('Edge Glow Pulse')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uGlowPulse, { value: v ? 1 : 0, duration: 0.4 });
                }
            });
        overlayFolder.addColor(this.effects, 'glowColor')
            .name('Glow Color')
            .onChange((v: string) => {
                if (this.material) this.material.uniforms.uGlowColor.value.set(v);
            });

        // === STYLE MODES ===
        const styleFolder = this.gui.addFolder('Visual Styles');
        styleFolder.add(this.effects, 'hologramMode')
            .name('Hologram Mode')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uHologram, { value: v ? 1 : 0, duration: 0.6 });
                    // Turn off conflicting modes
                    if (v) {
                        this.effects.vintageMode = false;
                        this.effects.thermalMode = false;
                        this.effects.blueprintMode = false;
                        this.material.uniforms.uVintage.value = 0;
                        this.material.uniforms.uThermal.value = 0;
                        this.material.uniforms.uBlueprint.value = 0;
                        this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
                    }
                }
            });
        styleFolder.addColor(this.effects, 'hologramColor')
            .name('Hologram Color')
            .onChange((v: string) => {
                if (this.material) this.material.uniforms.uHologramColor.value.set(v);
            });
        styleFolder.add(this.effects, 'vintageMode')
            .name('Vintage/Sepia')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uVintage, { value: v ? 1 : 0, duration: 0.6 });
                    if (v) {
                        this.effects.hologramMode = false;
                        this.effects.thermalMode = false;
                        this.effects.blueprintMode = false;
                        this.material.uniforms.uHologram.value = 0;
                        this.material.uniforms.uThermal.value = 0;
                        this.material.uniforms.uBlueprint.value = 0;
                        this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
                    }
                }
            });
        styleFolder.add(this.effects, 'thermalMode')
            .name('Thermal Vision')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uThermal, { value: v ? 1 : 0, duration: 0.5 });
                    if (v) {
                        this.effects.hologramMode = false;
                        this.effects.vintageMode = false;
                        this.effects.blueprintMode = false;
                        this.material.uniforms.uHologram.value = 0;
                        this.material.uniforms.uVintage.value = 0;
                        this.material.uniforms.uBlueprint.value = 0;
                        this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
                    }
                }
            });
        styleFolder.add(this.effects, 'blueprintMode')
            .name('Blueprint Mode')
            .onChange((v: boolean) => {
                if (this.material) {
                    gsap.to(this.material.uniforms.uBlueprint, { value: v ? 1 : 0, duration: 0.5 });
                    if (v) {
                        this.effects.hologramMode = false;
                        this.effects.vintageMode = false;
                        this.effects.thermalMode = false;
                        this.material.uniforms.uHologram.value = 0;
                        this.material.uniforms.uVintage.value = 0;
                        this.material.uniforms.uThermal.value = 0;
                        this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
                    }
                }
            });

        // === ANIMATION EFFECTS ===
        const animFolder = this.gui.addFolder('Animation');
        animFolder.add(this.effects, 'starTwinkle')
            .name('Star Twinkle');
        // Star twinkle is handled in animate loop

        // === EXPORT FOLDER ===
        const exportFolder = this.gui.addFolder('Export');
        exportFolder.add({ screenshot: () => this.takeScreenshot() }, 'screenshot')
            .name('📷 Screenshot (PNG)');
        exportFolder.add({ startVideo: () => this.toggleVideoRecording() }, 'startVideo')
            .name('🎬 Record Video');
        exportFolder.add({ startGif: () => this.toggleGifRecording() }, 'startGif')
            .name('🎞️ Record GIF');

        // === PRESETS ===
        const presetFolder = this.gui.addFolder('Quick Presets');
        presetFolder.add({ preset: () => this.applyPreset('cinematic') }, 'preset')
            .name('🎬 Cinematic');
        presetFolder.add({ preset: () => this.applyPreset('night') }, 'preset')
            .name('🌙 Night Mode');
        presetFolder.add({ preset: () => this.applyPreset('scifi') }, 'preset')
            .name('🚀 Sci-Fi');
        presetFolder.add({ preset: () => this.applyPreset('magic') }, 'preset')
            .name('✨ Magic');
        presetFolder.add({ preset: () => this.applyPreset('retro') }, 'preset')
            .name('📺 Retro');
        presetFolder.add({ preset: () => this.applyPreset('data') }, 'preset')
            .name('📊 Data Viz');
        presetFolder.add({ preset: () => this.applyPreset('reset') }, 'preset')
            .name('🔄 Reset All');
    }

    private takeScreenshot(): void {
        if (this.exporter) {
            this.exporter.screenshot({ width: 1920, height: 1080 });
        }
    }

    private toggleVideoRecording(): void {
        if (!this.exporter) return;

        // Auto-record animation: flat→globe→flat in one video
        this.recordAnimationVideo();
    }

    private toggleGifRecording(): void {
        if (!this.exporter) return;

        // Auto-record animation: flat→globe (file 1), then globe→flat (file 2)
        this.recordAnimationGif();
    }

    private async recordAnimationVideo(): Promise<void> {
        if (!this.exporter) return;

        this.showExportNotification('Preparing... going to flat map first');

        // First, go to flat map using the actual button behavior
        this.morphTo(0);

        // Wait for the morph animation to complete (2.5s morph + buffer)
        await new Promise(r => setTimeout(r, 3500));

        this.showExportNotification('Recording video: flat → globe → flat...');

        // Start video recording and wait for it to be ready
        await this.exporter.startVideoRecording();
        this.exportState.isRecordingVideo = true;

        // Brief pause to capture initial flat state
        await new Promise(r => setTimeout(r, 500));

        // Go to globe using actual button behavior
        this.morphTo(1);

        // Wait for morph to complete
        await new Promise(r => setTimeout(r, 3500));

        // Brief pause at globe state
        await new Promise(r => setTimeout(r, 500));

        // Go back to flat using actual button behavior
        this.morphTo(0);

        // Wait for morph to complete
        await new Promise(r => setTimeout(r, 3500));

        // Brief pause at end
        await new Promise(r => setTimeout(r, 300));

        // Stop recording
        this.exporter.stopVideoRecording();
        this.exportState.isRecordingVideo = false;

        this.showExportNotification('Video saved!');
    }

    private async recordAnimationGif(): Promise<void> {
        if (!this.exporter) return;

        this.showExportNotification('Preparing... going to flat map first');

        // First, go to flat map using the actual button behavior
        this.morphTo(0);

        // Wait for the morph animation to complete (2.5s morph + buffer)
        await new Promise(r => setTimeout(r, 3500));

        this.showExportNotification('Recording flat → globe animation...');

        // Start recording first GIF (flat → globe)
        this.exporter.startGifCapture();
        this.exportState.isRecordingGif = true;
        this.exportState.gifFrameCount = 0;

        // Brief pause to capture initial flat state
        await new Promise(r => setTimeout(r, 300));

        // Go to globe using actual button behavior
        this.morphTo(1);

        // Wait for morph to complete
        await new Promise(r => setTimeout(r, 3500));

        // Stop first recording
        this.exportState.isRecordingGif = false;
        const timestamp = Date.now();
        await this.exporter.stopGifCapture({ fps: 20, filename: `globe-flat-to-globe-${timestamp}.gif` });

        this.showExportNotification('Recording globe → flat animation...');

        // Brief pause
        await new Promise(r => setTimeout(r, 500));

        // Start recording second GIF (globe → flat)
        this.exporter.startGifCapture();
        this.exportState.isRecordingGif = true;
        this.exportState.gifFrameCount = 0;

        // Brief pause to capture initial globe state
        await new Promise(r => setTimeout(r, 300));

        // Go back to flat using actual button behavior
        this.morphTo(0);

        // Wait for morph to complete
        await new Promise(r => setTimeout(r, 3500));

        // Stop second recording
        this.exportState.isRecordingGif = false;
        await this.exporter.stopGifCapture({ fps: 20, filename: `globe-globe-to-flat-${timestamp}.gif` });

        this.showExportNotification('Both GIFs saved!');
    }

    private showExportNotification(message: string): void {
        // Create or update notification element
        let notification = document.getElementById('export-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'export-notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 40, 80, 0.95);
                color: #4af;
                padding: 12px 24px;
                border-radius: 8px;
                font-family: system-ui, sans-serif;
                font-size: 14px;
                z-index: 1000;
                border: 1px solid rgba(100, 170, 255, 0.3);
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
                transition: opacity 0.3s ease, transform 0.3s ease;
            `;
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(-50%) translateY(0)';

        // Auto-hide after 3 seconds
        setTimeout(() => {
            if (notification) {
                notification.style.opacity = '0';
                notification.style.transform = 'translateX(-50%) translateY(-10px)';
            }
        }, 3000);
    }

    private applyPreset(preset: string): void {
        if (!this.material) return;

        // Reset all style effects first
        const resetStyles = () => {
            this.effects.hologramMode = false;
            this.effects.vintageMode = false;
            this.effects.thermalMode = false;
            this.effects.blueprintMode = false;
            this.effects.clouds = false;
            this.effects.aurora = false;
            this.effects.cityLights = false;
            this.effects.oceanSpecular = false;
            this.effects.sunGlow = false;
            this.effects.gridLines = false;
            this.effects.scanEffect = false;
            this.effects.glowPulse = false;
            this.effects.atmosphereIntensity = 0;
            this.effects.transitionEffect = false;

            this.material!.uniforms.uHologram.value = 0;
            this.material!.uniforms.uVintage.value = 0;
            this.material!.uniforms.uThermal.value = 0;
            this.material!.uniforms.uBlueprint.value = 0;
            this.material!.uniforms.uClouds.value = 0;
            this.material!.uniforms.uAurora.value = 0;
            this.material!.uniforms.uCityLights.value = 0;
            this.material!.uniforms.uOceanSpecular.value = 0;
            this.material!.uniforms.uSunGlow.value = 0;
            this.material!.uniforms.uGridLines.value = 0;
            this.material!.uniforms.uScanEffect.value = 0;
            this.material!.uniforms.uGlowPulse.value = 0;
            this.material!.uniforms.uAtmosphereIntensity.value = 0;
        };

        resetStyles();

        switch (preset) {
            case 'cinematic':
                // Realistic look with atmosphere
                this.effects.clouds = true;
                this.effects.oceanSpecular = true;
                this.effects.sunGlow = true;
                this.effects.atmosphereIntensity = 1.0;
                this.effects.transitionEffect = true;
                gsap.to(this.material.uniforms.uClouds, { value: 1, duration: 0.8 });
                gsap.to(this.material.uniforms.uOceanSpecular, { value: 1, duration: 0.5 });
                gsap.to(this.material.uniforms.uSunGlow, { value: 1, duration: 0.5 });
                gsap.to(this.material.uniforms.uAtmosphereIntensity, { value: 1, duration: 0.6 });
                // Ensure we're on globe view
                if (this.params.morph < 0.5) this.morphTo(1);
                break;

            case 'night':
                // Night mode with city lights and aurora
                this.effects.cityLights = true;
                this.effects.aurora = true;
                this.effects.glowPulse = true;
                this.effects.glowColor = '#4466ff';
                this.effects.transitionEffect = true;
                this.effects.atmosphereIntensity = 0.5;
                gsap.to(this.material.uniforms.uCityLights, { value: 1, duration: 0.8 });
                gsap.to(this.material.uniforms.uAurora, { value: 1, duration: 1.2 });
                gsap.to(this.material.uniforms.uGlowPulse, { value: 1, duration: 0.5 });
                this.material.uniforms.uGlowColor.value.set('#4466ff');
                gsap.to(this.material.uniforms.uAtmosphereIntensity, { value: 0.5, duration: 0.6 });
                // Set sun to back side for night effect
                this.params.sunX = -1;
                this.params.sunY = 0;
                this.params.sunZ = -1;
                this.updateSun();
                if (this.params.morph < 0.5) this.morphTo(1);
                break;

            case 'scifi':
                // Hologram with scan effect
                this.effects.hologramMode = true;
                this.effects.scanEffect = true;
                this.effects.glowPulse = true;
                this.effects.transitionEffect = true;
                gsap.to(this.material.uniforms.uHologram, { value: 1, duration: 0.8 });
                gsap.to(this.material.uniforms.uScanEffect, { value: 1, duration: 0.5 });
                gsap.to(this.material.uniforms.uGlowPulse, { value: 1, duration: 0.5 });
                break;

            case 'magic':
                // Magical effect with multiple glowing elements
                this.effects.aurora = true;
                this.effects.auroraIntensity = 1.5;
                this.effects.clouds = true;
                this.effects.cloudOpacity = 0.4;
                this.effects.glowPulse = true;
                this.effects.glowColor = '#ff44ff';
                this.effects.cityLights = true;
                this.effects.transitionEffect = true;
                this.effects.atmosphereIntensity = 0.7;
                gsap.to(this.material.uniforms.uAurora, { value: 1, duration: 1.0 });
                this.material.uniforms.uAuroraIntensity.value = 1.5;
                gsap.to(this.material.uniforms.uClouds, { value: 1, duration: 0.8 });
                this.material.uniforms.uCloudOpacity.value = 0.4;
                gsap.to(this.material.uniforms.uGlowPulse, { value: 1, duration: 0.6 });
                this.material.uniforms.uGlowColor.value.set('#ff44ff');
                gsap.to(this.material.uniforms.uCityLights, { value: 1, duration: 0.7 });
                gsap.to(this.material.uniforms.uAtmosphereIntensity, { value: 0.7, duration: 0.6 });
                if (this.params.morph < 0.5) this.morphTo(1);
                break;

            case 'retro':
                // Vintage with grid
                this.effects.vintageMode = true;
                this.effects.gridLines = true;
                gsap.to(this.material.uniforms.uVintage, { value: 1, duration: 0.8 });
                gsap.to(this.material.uniforms.uGridLines, { value: 1, duration: 0.5 });
                break;

            case 'data':
                // Blueprint with grid - good for data viz
                this.effects.blueprintMode = true;
                this.effects.gridLines = true;
                gsap.to(this.material.uniforms.uBlueprint, { value: 1, duration: 0.8 });
                gsap.to(this.material.uniforms.uGridLines, { value: 1, duration: 0.5 });
                break;

            case 'reset':
                // Already reset above
                // Also reset sun position
                this.params.sunX = 1;
                this.params.sunY = 0.5;
                this.params.sunZ = 1;
                this.updateSun();
                break;
        }

        // Update GUI display
        this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
    }

    private onStatisticChange(statId: string): void {
        if (!this.material || !this.choropleth) return;

        if (statId === 'none') {
            // Fade out data overlay
            gsap.to(this.material.uniforms.uDataOpacity, {
                value: 0,
                duration: 0.5,
            });
            // Also fade out extrusion data signal
            gsap.to(this.material.uniforms.uDataOverlay, {
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
                // Enable data signal for extrusion
                gsap.to(this.material.uniforms.uDataOverlay, {
                    value: 1,
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
        const hasParchment = this.params.parchmentMode !== 'normal';
        const hasExtreme = this.params.parchmentMode === 'extreme';

        if (target === 1 && hasParchment && this.material) {
            // Going to globe with parchment enabled: unparchment FIRST, then morph
            // First remove extreme if active
            if (hasExtreme) {
                gsap.to(this.material.uniforms.uExtremeParchment, {
                    value: 0,
                    duration: 1.2,
                    ease: 'power2.in',
                });
            }
            // Then unroll parchment
            gsap.to(this.material.uniforms.uParchment, {
                value: 0,
                duration: 1.8,
                delay: hasExtreme ? 0.3 : 0,
                ease: 'power2.inOut',
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
            this.material.uniforms.uExtremeParchment.value = 0;
        }

        // Animate transition effect (peaks in the middle of morph) - only if enabled
        if (this.material && this.effects.transitionEffect) {
            gsap.to(this.material.uniforms.uTransitionEffect, {
                value: 1,
                duration: 1.25,
                ease: 'power2.out',
                onComplete: () => {
                    gsap.to(this.material!.uniforms.uTransitionEffect, {
                        value: 0,
                        duration: 1.25,
                        ease: 'power2.in',
                    });
                }
            });
        }

        gsap.to(this.params, {
            morph: target,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                if (this.material) {
                    this.material.uniforms.uMorph.value = this.params.morph;
                }
                // Update label positions to follow morph
                if (this.countryLabels) {
                    this.countryLabels.setMorph(this.params.morph);
                }
                this.gui?.controllersRecursive().forEach(c => c.updateDisplay());
            },
            onComplete: () => {
                // When fully flat, disable controls and apply parchment if enabled
                if (target === 0) {
                    this.controls.enabled = false;
                    const hasParchment = this.params.parchmentMode !== 'normal';
                    const hasExtreme = this.params.parchmentMode === 'extreme';

                    if (hasParchment && this.material) {
                        // Brief pause before parchment effect begins
                        gsap.to(this.material.uniforms.uParchment, {
                            value: 1,
                            duration: 2.2,
                            delay: 0.3,
                            ease: 'power3.out',
                        });

                        // If extreme mode, animate torn corners after parchment
                        if (hasExtreme) {
                            gsap.to(this.material.uniforms.uExtremeParchment, {
                                value: 1,
                                duration: 2.5,
                                delay: 1.5, // Start after parchment begins
                                ease: 'power3.out',
                            });
                        }
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
        // Resize label renderer
        if (this.countryLabels) {
            this.countryLabels.resize(window.innerWidth, window.innerHeight);
        }
    }

    private animate(): void {
        requestAnimationFrame(this.animate.bind(this));

        const time = performance.now() * 0.001;

        this.controls.update();

        // Update time uniform for shader effects
        if (this.material) {
            this.material.uniforms.uTime.value = time;
        }

        // Update star twinkling
        if (this.stars) {
            const starsMat = this.stars.material as THREE.ShaderMaterial;
            starsMat.uniforms.uTime.value = time;
            starsMat.uniforms.uTwinkle.value = this.effects.starTwinkle ? 1 : 0;
        }

        // Auto rotation - scales with morph level for elegant transition
        if (this.params.autoRotate && this.globe) {
            // Rotation speed scales from 0 at flat to full at globe
            const rotationSpeed = 0.002 * this.params.morph;
            this.globe.rotation.y += rotationSpeed;
        }

        // Sync atmosphere with globe (only visible when atmosphere effect is on)
        if (this.atmosphere && this.globe) {
            this.atmosphere.rotation.copy(this.globe.rotation);
            const atmosMat = this.atmosphere.material as THREE.ShaderMaterial;
            // Atmosphere mesh visibility tied to intensity setting
            atmosMat.uniforms.uMorph.value = this.params.morph * this.effects.atmosphereIntensity;
            this.atmosphere.visible = this.effects.atmosphereIntensity > 0.01;
        }

        // Update material side based on morph
        // When flat, only show front; when globe, show both sides
        if (this.material) {
            this.material.side = this.params.morph < 0.1 ? THREE.FrontSide : THREE.DoubleSide;
        }

        this.renderer.render(this.scene, this.camera);

        // Update and render country labels (CSS2DRenderer)
        if (this.countryLabels) {
            this.countryLabels.update(); // Update positions to match globe rotation
            this.countryLabels.render(this.scene, this.camera);
        }

        // Capture GIF frame if recording (every 3rd frame for performance)
        if (this.exportState.isRecordingGif && this.exporter) {
            this.exportState.gifFrameCount++;
            if (this.exportState.gifFrameCount % 3 === 0) {
                this.exporter.captureGifFrame();
            }
        }
    }
}
