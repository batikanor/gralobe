// Atmosphere Vertex Shader
uniform float uMorphProgress;
uniform float uAtmosphereScale;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

const float PI = 3.14159265359;
const float TWO_PI = 6.28318530718;
const float HALF_PI = 1.57079632679;
const float SPHERE_RADIUS = 50.0;

float invGudermannian(float y) {
    return 2.0 * atan(exp(y)) - HALF_PI;
}

float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    float easedProgress = easeInOutCubic(uMorphProgress);

    // Flat position
    float width = TWO_PI * SPHERE_RADIUS * uAtmosphereScale;
    float height = PI * SPHERE_RADIUS * uAtmosphereScale;
    vec3 flatPos = vec3(
        (uv.x - 0.5) * width,
        (uv.y - 0.5) * height,
        -5.0 // Slightly behind
    );

    // Sphere position
    float lon = (uv.x - 0.5) * TWO_PI;
    float mercatorY = (uv.y - 0.5) * PI;
    float lat = invGudermannian(mercatorY);
    lat = clamp(lat, -HALF_PI * 0.95, HALF_PI * 0.95);

    float radius = SPHERE_RADIUS * uAtmosphereScale;
    float cosLat = cos(lat);
    vec3 spherePos = vec3(
        radius * cosLat * sin(lon),
        radius * sin(lat),
        radius * cosLat * cos(lon)
    );

    vec3 morphedPos = mix(flatPos, spherePos, easedProgress);
    vPosition = morphedPos;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(morphedPos, 1.0);
}
