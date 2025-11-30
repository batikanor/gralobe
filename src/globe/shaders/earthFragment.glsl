// Advanced Earth Fragment Shader with Atmospheric Effects
precision highp float;

uniform float uTime;
uniform float uMorphProgress;
uniform sampler2D uDayMap;
uniform sampler2D uNightMap;
uniform sampler2D uCloudsMap;
uniform sampler2D uSpecularMap;
uniform sampler2D uNormalMap;
uniform sampler2D uElevationMap;

uniform vec3 uSunDirection;
uniform vec3 uCameraPosition;
uniform float uAtmosphereIntensity;
uniform float uCloudOpacity;
uniform float uOceanSpecular;
uniform float uCityLightsIntensity;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunsetColor;
uniform float uDayNightBlend;

uniform int uFormFactor;
uniform vec2 uFoldPosition;
uniform float uHoloIntensity;
uniform float uGridIntensity;
uniform float uScanLinePosition;
uniform float uDataVizIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWorldPosition;
varying float vElevation;
varying float vIsLand;
varying float vMorphProgress;
varying float vLatitude;
varying float vLongitude;

const float PI = 3.14159265359;

// Fresnel approximation
float fresnel(vec3 viewDir, vec3 normal, float power) {
    return pow(1.0 - max(dot(viewDir, normal), 0.0), power);
}

// Atmosphere scattering approximation
vec3 atmosphereColor(vec3 viewDir, vec3 normal, vec3 sunDir, float intensity) {
    float sunAlignment = max(dot(viewDir, sunDir), 0.0);
    float rim = fresnel(viewDir, normal, 3.0);

    // Rayleigh-like scattering (blue)
    vec3 rayleigh = uAtmosphereColor * rim * intensity;

    // Mie-like scattering (sun glow)
    float mie = pow(sunAlignment, 8.0) * 0.5;
    vec3 mieColor = uSunsetColor * mie * intensity;

    return rayleigh + mieColor;
}

// Holographic grid effect
vec3 holoGrid(vec2 uv, float time, float intensity) {
    float gridSize = 50.0;
    vec2 grid = fract(uv * gridSize);

    float lineX = smoothstep(0.02, 0.0, abs(grid.x - 0.5) - 0.48);
    float lineY = smoothstep(0.02, 0.0, abs(grid.y - 0.5) - 0.48);

    float scanLine = smoothstep(0.02, 0.0, abs(uv.y - fract(time * 0.1)) - 0.01);

    vec3 gridColor = vec3(0.0, 0.8, 1.0);
    return gridColor * (lineX + lineY + scanLine * 2.0) * intensity;
}

// Data visualization particles
float dataParticle(vec2 uv, float time) {
    float particleY = fract(uv.x * 20.0 + time * 0.5);
    float dist = length(vec2(fract(uv.x * 20.0) - 0.5, uv.y - particleY));
    return smoothstep(0.05, 0.0, dist);
}

// Hexagonal grid for futuristic look
float hexGrid(vec2 uv, float scale) {
    vec2 p = uv * scale;
    vec2 h = vec2(1.0, sqrt(3.0));
    vec2 a = mod(p, h) - h * 0.5;
    vec2 b = mod(p - h * 0.5, h) - h * 0.5;

    float d = min(length(a), length(b));
    return smoothstep(0.05, 0.0, abs(d - 0.4));
}

void main() {
    vec3 normal = normalize(vNormal);
    vec3 viewDir = normalize(uCameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunDirection);

    // Sample textures
    vec4 dayColor = texture2D(uDayMap, vUv);
    vec4 nightColor = texture2D(uNightMap, vUv);
    vec4 clouds = texture2D(uCloudsMap, vUv);
    vec4 specular = texture2D(uSpecularMap, vUv);

    // Day/Night calculation
    float sunDot = dot(normal, sunDir);
    float dayFactor = smoothstep(-0.2, 0.3, sunDot);
    float nightFactor = 1.0 - dayFactor;

    // Blend day and night based on sun position and user control
    vec3 surfaceColor = mix(nightColor.rgb, dayColor.rgb, dayFactor * uDayNightBlend);

    // Add city lights at night
    float cityLights = nightColor.a * nightFactor * uCityLightsIntensity * (1.0 - dayFactor);
    surfaceColor += vec3(1.0, 0.9, 0.7) * cityLights;

    // Add clouds
    float cloudFactor = clouds.r * uCloudOpacity * dayFactor;
    surfaceColor = mix(surfaceColor, vec3(1.0), cloudFactor);

    // Ocean specular reflection
    float isOcean = 1.0 - vIsLand;
    vec3 reflectDir = reflect(-sunDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
    surfaceColor += vec3(1.0, 0.95, 0.8) * spec * specular.r * uOceanSpecular * isOcean * dayFactor;

    // Atmosphere
    vec3 atmo = atmosphereColor(viewDir, normal, sunDir, uAtmosphereIntensity);
    float atmosMask = fresnel(viewDir, normal, 2.0);
    surfaceColor = mix(surfaceColor, surfaceColor + atmo, atmosMask);

    // Morphing visual effects
    float morphMask = sin(vMorphProgress * PI); // Peak at 50%

    // Holographic effect during morph
    if (uHoloIntensity > 0.0) {
        vec3 holo = holoGrid(vUv, uTime, uHoloIntensity * morphMask);
        surfaceColor += holo;
    }

    // Hex grid overlay
    if (uGridIntensity > 0.0) {
        float hex = hexGrid(vUv, 30.0);
        vec3 hexColor = vec3(0.0, 0.5, 1.0) * hex * uGridIntensity;
        surfaceColor += hexColor * (0.3 + morphMask * 0.7);
    }

    // Scan line effect
    if (uScanLinePosition > 0.0) {
        float scanDist = abs(vUv.x - uScanLinePosition);
        float scanLine = smoothstep(0.05, 0.0, scanDist);
        float scanGlow = smoothstep(0.2, 0.0, scanDist);
        surfaceColor += vec3(0.0, 1.0, 1.0) * scanLine * 2.0;
        surfaceColor += vec3(0.0, 0.5, 1.0) * scanGlow * 0.5;
    }

    // Elevation-based data visualization
    if (uDataVizIntensity > 0.0) {
        float elevViz = smoothstep(0.3, 0.8, vElevation);
        vec3 dataColor = mix(
            vec3(0.0, 0.3, 1.0),
            vec3(1.0, 0.0, 0.5),
            vElevation
        );
        surfaceColor += dataColor * elevViz * uDataVizIntensity * vIsLand;
    }

    // Form factor specific effects
    if (uFormFactor == 4) { // Watch - circular vignette
        float dist = length(vUv - 0.5) * 2.0;
        float vignette = smoothstep(1.0, 0.7, dist);
        surfaceColor *= vignette;
        if (dist > 0.95) discard;
    }

    // Edge glow during morph
    float edgeGlow = fresnel(viewDir, normal, 4.0) * morphMask * 0.5;
    surfaceColor += vec3(0.3, 0.6, 1.0) * edgeGlow;

    // Final color
    gl_FragColor = vec4(surfaceColor, 1.0);
}
