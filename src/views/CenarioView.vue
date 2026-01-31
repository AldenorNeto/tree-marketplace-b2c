<template>
  <div class="cenario-page">
    <div class="terrain-container" ref="terrainContainer"></div>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps({
  isDark: Boolean,
  initialSeed: String,
});

const terrainContainer = ref(null);
let scene, camera, renderer, terrain, animationId;

onMounted(() => {
  initTerrain();
});

onUnmounted(() => {
  cleanup();
});

function initTerrain() {
  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(props.isDark ? 0x1a1a2e : 0x87ceeb);

  // Camera - positioned higher and more angled for aerial view
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 80, 120);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    terrainContainer.value.clientWidth,
    terrainContainer.value.clientHeight,
  );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  terrainContainer.value.appendChild(renderer.domElement);

  // Enhanced lighting setup
  const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
  scene.add(ambientLight);

  // Main sun light
  const sunLight = new THREE.DirectionalLight(0xfff4e6, 1.2);
  sunLight.position.set(150, 120, 80);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 4096;
  sunLight.shadow.mapSize.height = 4096;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  sunLight.shadow.camera.left = -200;
  sunLight.shadow.camera.right = 200;
  sunLight.shadow.camera.top = 200;
  sunLight.shadow.camera.bottom = -200;
  scene.add(sunLight);

  // Secondary fill light
  const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
  fillLight.position.set(-100, 60, -50);
  scene.add(fillLight);

  // Rim light for depth
  const rimLight = new THREE.DirectionalLight(0xffa500, 0.4);
  rimLight.position.set(0, 50, -150);
  scene.add(rimLight);

  // Create terrain
  createTerrain();

  // Controls
  setupControls();

  // Animation loop
  animate();
}

function createTerrain() {
  const width = 400;
  const height = 400;
  const widthSegments = 200;
  const heightSegments = 200;

  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments,
  );

  // Generate height map and river
  const vertices = geometry.attributes.position.array;
  const colors = new Float32Array(vertices.length);

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 1];

    // Large-scale terrain using improved Perlin-like noise
    let elevation = 0;

    // Large gentle undulations
    elevation += Math.sin(x * 0.03) * 4;
    elevation += Math.cos(z * 0.06) * 3;

    // Medium details
    elevation += perlinNoise(x, z, 0.003) * 1.5;

    // Create meandering river path
    const riverCenterX =
      Math.sin(z * 0.004) * 90 +
      Math.sin(z * 0.002) * 60 +
      Math.cos(z * 0.007) * 35;

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const riverWidth = 15 + Math.random() * 3; // Variable river width
    const bankWidth = 20 + Math.random() * 5; // Variable bank width

    const riverInfluence = Math.max(
      0,
      1 - distanceFromRiver / (riverWidth + bankWidth + 40),
    );
    const ultraSmoothFalloff = smoothstep(riverInfluence); // Custom smoothstep
    elevation -= ultraSmoothFalloff * 2.5;

    // Large-scale color regions using Perlin noise
    if (distanceFromRiver < riverWidth) {
      // River water
      colors[i] = 0.1;
      colors[i + 1] = 0.6;
      colors[i + 2] = 0.9;
    } else {
      // Calculate smooth color transitions
      const bankDistance = distanceFromRiver - riverWidth;
      const bankFactor = Math.min(1, bankDistance / bankWidth);

      // Ultra smooth transition
      const smoothBankFactor = smoothstep(bankFactor);

      const largeColorNoise = perlinNoise(x, z, 0.004) * 0.15;
      const mediumColorNoise = perlinNoise(x + 200, z + 150, 0.008) * 0.1;
      const fineColorNoise = perlinNoise(x - 100, z + 300, 0.015) * 0.06;

      // Base colors
      const sandR = 0.72;
      const sandG = 0.62;
      const sandB = 0.42;

      // Grass base color with large-scale Perlin variation
      const grassR = 0.32 + largeColorNoise;
      const grassG = 0.62 + largeColorNoise + mediumColorNoise;
      const grassB = 0.22 + largeColorNoise * 0.5;

      if (bankDistance < bankWidth) {
        // Ultra smooth interpolation from sand to grass
        colors[i] = sandR * (1 - smoothBankFactor) + grassR * smoothBankFactor;
        colors[i + 1] =
          sandG * (1 - smoothBankFactor) + grassG * smoothBankFactor;
        colors[i + 2] =
          sandB * (1 - smoothBankFactor) + grassB * smoothBankFactor;
      } else {
        // Pure grassland with large, smooth Perlin-based color patches
        const elevationInfluence = (elevation + 6) / 14;
        const elevationFactor = Math.max(0, Math.min(1, elevationInfluence));

        // Large-scale color patches using Perlin noise
        const largePatchNoise = perlinNoise(x, z, 0.003);
        const mediumPatchNoise = perlinNoise(x + 500, z + 200, 0.007);

        let finalR = grassR;
        let finalG = grassG;
        let finalB = grassB;

        // Create large, smooth color regions based on Perlin noise
        if (largePatchNoise > 0.3) {
          // Lighter green areas
          finalR += 0.12;
          finalG += 0.1;
          finalB += 0.03;
        } else if (largePatchNoise < -0.3) {
          // Darker green areas
          finalR -= 0.1;
          finalG -= 0.06;
          finalB -= 0.04;
        }

        // Medium patches for subtle variation
        if (mediumPatchNoise > 0.2) {
          finalR += 0.06;
          finalG += 0.04;
        } else if (mediumPatchNoise < -0.2) {
          finalR -= 0.04;
          finalG -= 0.03;
        }

        // Add fine color noise
        finalR += fineColorNoise;
        finalG += fineColorNoise;
        finalB += fineColorNoise * 0.5;

        // Elevation influence
        const elevationColorShift = (elevationFactor - 0.5) * 0.08;
        finalR += elevationColorShift;
        finalG += elevationColorShift;
        finalB += elevationColorShift * 0.5;

        colors[i] = Math.max(0.15, Math.min(0.6, finalR));
        colors[i + 1] = Math.max(0.4, Math.min(0.8, finalG));
        colors[i + 2] = Math.max(0.1, Math.min(0.4, finalB));
      }
    }

    vertices[i + 2] = elevation;
  }

  geometry.computeVertexNormals();
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.MeshLambertMaterial({
    vertexColors: true,
    wireframe: false,
  });

  if (terrain) {
    scene.remove(terrain);
    terrain.geometry.dispose();
    terrain.material.dispose();
  }

  terrain = new THREE.Mesh(geometry, material);
  terrain.rotation.x = -Math.PI / 2;
  terrain.receiveShadow = true;
  scene.add(terrain);
}

// Simple noise function for terrain variation
function noise(x, y) {
  return (
    (Math.sin(x * 1.2) +
      Math.sin(y * 1.5) +
      Math.sin((x + y) * 0.8) +
      Math.sin((x - y) * 0.6)) *
    0.25
  );
}

// Improved Perlin-like noise function with larger, smoother patterns
function perlinNoise(x, y, frequency) {
  // Multiple octaves for natural Perlin-like variation
  let value = 0;
  let amplitude = 1;
  let freq = frequency;

  // 4 octaves for rich detail
  for (let i = 0; i < 4; i++) {
    value += Math.sin(x * freq) * Math.cos(y * freq) * amplitude;
    value +=
      Math.sin(x * freq * 1.3 + 2.5) *
      Math.cos(y * freq * 1.7 + 1.8) *
      amplitude *
      0.7;

    freq *= 2;
    amplitude *= 0.5;
  }

  return value * 0.3;
}

function smoothstep(t) {
  t = Math.max(0, Math.min(1, t));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function setupControls() {
  let mouseDown = false;
  let mouseX = 0;
  let mouseY = 0;

  const canvas = renderer.domElement;

  canvas.addEventListener("mousedown", (event) => {
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  canvas.addEventListener("mouseup", () => {
    mouseDown = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!mouseDown) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

    // Rotate camera around terrain
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(camera.position);

    spherical.theta -= deltaX * 0.01;
    spherical.phi += deltaY * 0.01;
    spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi));

    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0);

    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  canvas.addEventListener("wheel", (event) => {
    const distance = camera.position.length();
    const newDistance = Math.max(
      30,
      Math.min(300, distance + event.deltaY * 0.2),
    );
    camera.position.normalize().multiplyScalar(newDistance);
  });
}

function animate() {
  animationId = requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  if (renderer) {
    renderer.dispose();
    if (terrainContainer.value && renderer.domElement) {
      terrainContainer.value.removeChild(renderer.domElement);
    }
  }

  if (terrain) {
    terrain.geometry.dispose();
    terrain.material.dispose();
  }
}
</script>

<style scoped>
.cenario-page {
  width: 100%;
  height: 100vh;
  position: relative;
  background: var(--bg-primary);
}

.terrain-container {
  width: 100%;
  height: 100%;
}
</style>
