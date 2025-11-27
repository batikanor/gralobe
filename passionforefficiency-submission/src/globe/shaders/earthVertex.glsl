// Mathematically Correct Mercator to Globe Morphing Shader
// Uses inverse Gudermannian function for proper latitude transformation

uniform float uTime;
uniform float uMorphProgress;      // 0 = flat Mercator, 1 = sphere
uniform float uMorphStyle;         // 0 = direct, 1 = roll, 2 = unfold
uniform float uElevationScale;
uniform float uWaveAmplitude;
uniform float uWaveFrequency;
uniform vec2 uFoldPosition;        // For foldable form factor
uniform float uFoldAngle;          // Fold angle in radians
uniform int uFormFactor;           // 0 = flat, 1 = phone, 2 = foldable, 3 = trifold, 4 = watch

uniform sampler2D uElevationMap;
uniform sampler2D uLandMask;

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
const float TWO_PI = 6.28318530718;
const float HALF_PI = 1.57079632679;
const float SPHERE_RADIUS = 50.0;

// Inverse Gudermannian function - converts Mercator Y to latitude
float invGudermannian(float y) {
    return 2.0 * atan(exp(y)) - HALF_PI;
}

// Forward Gudermannian - converts latitude to Mercator Y
float gudermannian(float lat) {
    return log(tan(HALF_PI * 0.5 + lat * 0.5));
}

// Smooth morphing with customizable easing
float easeInOutCubic(float t) {
    return t < 0.5 ? 4.0 * t * t * t : 1.0 - pow(-2.0 * t + 2.0, 3.0) / 2.0;
}

float easeOutElastic(float t) {
    float c4 = (2.0 * PI) / 3.0;
    return t == 0.0 ? 0.0 : t == 1.0 ? 1.0 : pow(2.0, -10.0 * t) * sin((t * 10.0 - 0.75) * c4) + 1.0;
}

// Get position on a sphere from UV
vec3 uvToSphere(vec2 uv, float radius) {
    float lon = (uv.x - 0.5) * TWO_PI;  // -PI to PI

    // Convert Mercator Y to true latitude
    // UV.y goes from 0 to 1, we map it to Mercator range
    float mercatorY = (uv.y - 0.5) * PI;  // Mercator Y range
    float lat = invGudermannian(mercatorY);

    // Clamp latitude to avoid singularities at poles
    lat = clamp(lat, -HALF_PI * 0.95, HALF_PI * 0.95);

    // Spherical to Cartesian
    float cosLat = cos(lat);
    return vec3(
        radius * cosLat * sin(lon),
        radius * sin(lat),
        radius * cosLat * cos(lon)
    );
}

// Get flat Mercator position
vec3 uvToMercator(vec2 uv, float width, float height) {
    return vec3(
        (uv.x - 0.5) * width,
        (uv.y - 0.5) * height,
        0.0
    );
}

// Rolling morph - sphere unfolds like a scroll
vec3 calculateRollMorph(vec2 uv, float progress, float radius) {
    float width = TWO_PI * radius;
    float height = PI * radius;

    // How much of the cylinder is unrolled
    float unrollProgress = 1.0 - progress;

    // Longitude angle based on progress
    float lon = (uv.x - 0.5) * TWO_PI;
    float mercatorY = (uv.y - 0.5) * PI;
    float lat = invGudermannian(mercatorY);
    lat = clamp(lat, -HALF_PI * 0.95, HALF_PI * 0.95);

    // Cylindrical intermediate state
    float cylinderProgress = smoothstep(0.0, 0.6, progress);
    float sphereProgress = smoothstep(0.4, 1.0, progress);

    // Flat position
    vec3 flatPos = vec3(
        (uv.x - 0.5) * width,
        (uv.y - 0.5) * height,
        0.0
    );

    // Cylinder position (rolled around Y axis)
    float rollAngle = lon * cylinderProgress;
    float rollRadius = mix(width / TWO_PI, radius, cylinderProgress);
    vec3 cylinderPos = vec3(
        sin(rollAngle) * rollRadius,
        flatPos.y,
        (cos(rollAngle) - 1.0) * rollRadius
    );

    // Sphere position
    float cosLat = cos(lat);
    vec3 spherePos = vec3(
        radius * cosLat * sin(lon),
        radius * sin(lat),
        radius * cosLat * cos(lon)
    );

    // Blend from cylinder to sphere
    vec3 finalPos = mix(flatPos, cylinderPos, cylinderProgress);
    finalPos = mix(finalPos, spherePos, sphereProgress);

    return finalPos;
}

// Apply form factor transformations
vec3 applyFormFactor(vec3 pos, vec2 uv) {
    if (uFormFactor == 2) { // Foldable
        float foldX = uFoldPosition.x;
        if (uv.x > foldX) {
            float angle = uFoldAngle;
            float localX = pos.x - (foldX - 0.5) * TWO_PI * SPHERE_RADIUS;
            float rotatedX = localX * cos(angle);
            float rotatedZ = localX * sin(angle);
            pos.x = (foldX - 0.5) * TWO_PI * SPHERE_RADIUS + rotatedX;
            pos.z += rotatedZ;
        }
    } else if (uFormFactor == 3) { // Trifold
        float fold1 = 0.333;
        float fold2 = 0.666;
        float width = TWO_PI * SPHERE_RADIUS;

        if (uv.x > fold2) {
            float angle = uFoldAngle;
            float pivot = (fold2 - 0.5) * width;
            float localX = pos.x - pivot;
            pos.x = pivot + localX * cos(angle);
            pos.z += localX * sin(angle);
        } else if (uv.x > fold1) {
            float angle = -uFoldAngle * 0.5;
            float pivot = (fold1 - 0.5) * width;
            float localX = pos.x - pivot;
            pos.x = pivot + localX * cos(angle);
            pos.z += localX * sin(angle);
        }
    } else if (uFormFactor == 4) { // Watch (circular mask applied in fragment)
        // Curve the flat map slightly for watch display
        float curve = 0.3;
        pos.z += sin(uv.x * PI) * sin(uv.y * PI) * SPHERE_RADIUS * curve * (1.0 - uMorphProgress);
    }

    return pos;
}

void main() {
    vUv = uv;
    vMorphProgress = uMorphProgress;

    // Calculate latitude and longitude for fragment shader
    vLongitude = (uv.x - 0.5) * TWO_PI;
    float mercatorY = (uv.y - 0.5) * PI;
    vLatitude = invGudermannian(mercatorY);
    vLatitude = clamp(vLatitude, -HALF_PI * 0.95, HALF_PI * 0.95);

    // Sample elevation
    vec4 elevData = texture2D(uElevationMap, uv);
    vec4 landData = texture2D(uLandMask, uv);
    vElevation = elevData.r;
    vIsLand = step(0.1, landData.r);

    // Calculate base positions
    float width = TWO_PI * SPHERE_RADIUS;
    float height = PI * SPHERE_RADIUS;

    vec3 flatPos = uvToMercator(uv, width, height);
    vec3 spherePos = uvToSphere(uv, SPHERE_RADIUS);

    // Apply morph based on style
    float easedProgress = easeInOutCubic(uMorphProgress);
    vec3 morphedPos;

    if (uMorphStyle < 0.5) {
        // Direct interpolation
        morphedPos = mix(flatPos, spherePos, easedProgress);
    } else if (uMorphStyle < 1.5) {
        // Roll morph
        morphedPos = calculateRollMorph(uv, easedProgress, SPHERE_RADIUS);
    } else {
        // Unfold with wave effect
        morphedPos = mix(flatPos, spherePos, easedProgress);

        // Add wave during transition
        float wavePhase = uv.x * uWaveFrequency + uTime;
        float waveMask = sin(easedProgress * PI); // Peaks at 50% morph
        morphedPos.z += sin(wavePhase) * uWaveAmplitude * waveMask * (1.0 - vIsLand * 0.5);
    }

    // Apply elevation
    vec3 normal;
    if (easedProgress > 0.5) {
        normal = normalize(spherePos);
    } else {
        normal = vec3(0.0, 0.0, 1.0);
    }
    normal = normalize(mix(vec3(0.0, 0.0, 1.0), normalize(spherePos), easedProgress));

    float elevationAmount = vElevation * uElevationScale * vIsLand;
    morphedPos += normal * elevationAmount;

    // Apply form factor
    morphedPos = applyFormFactor(morphedPos, uv);

    vNormal = normal;
    vPosition = morphedPos;
    vWorldPosition = (modelMatrix * vec4(morphedPos, 1.0)).xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(morphedPos, 1.0);
}
