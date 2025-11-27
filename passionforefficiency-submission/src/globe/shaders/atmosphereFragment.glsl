// Atmosphere Fragment Shader - Beautiful glow effect
precision highp float;

uniform vec3 uSunDirection;
uniform vec3 uCameraPosition;
uniform vec3 uAtmosphereColor;
uniform vec3 uSunsetColor;
uniform float uAtmosphereIntensity;
uniform float uMorphProgress;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

const float PI = 3.14159265359;

void main() {
    vec3 viewDir = normalize(uCameraPosition - vPosition);
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(uSunDirection);

    // Fresnel effect for atmosphere rim
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);

    // Sun alignment for sunset colors
    float sunAlignment = max(dot(normal, sunDir), 0.0);
    float sunsetZone = smoothstep(-0.1, 0.3, sunAlignment) * smoothstep(0.6, 0.2, sunAlignment);

    // Base atmosphere color
    vec3 atmoColor = uAtmosphereColor;

    // Add sunset colors where sun grazes the atmosphere
    atmoColor = mix(atmoColor, uSunsetColor, sunsetZone * 0.7);

    // Sun glow
    float sunGlow = pow(max(dot(viewDir, sunDir), 0.0), 16.0);
    atmoColor += vec3(1.0, 0.8, 0.5) * sunGlow * 0.3;

    // Intensity based on morph progress - stronger when fully spherical
    float morphIntensity = mix(0.3, 1.0, uMorphProgress);

    // Final alpha
    float alpha = fresnel * uAtmosphereIntensity * morphIntensity;

    // Edge fade for flat mode
    float edgeFade = 1.0;
    if (uMorphProgress < 0.5) {
        float distFromCenter = length(vUv - 0.5) * 2.0;
        edgeFade = 1.0 - smoothstep(0.8, 1.0, distFromCenter);
    }

    gl_FragColor = vec4(atmoColor, alpha * edgeFade);
}
