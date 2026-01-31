<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { seedToNumber } from "../utils/seedConverter.js";
import { buildTree } from "../utils/treeBuilder.js";

const props = defineProps({
  isDark: Boolean,
  initialSeed: String,
});

const terrainContainer = ref(null);
let scene, camera, renderer, terrain, animationId;
let saveTimeout = null;
let treePointsMeshes = [];

const STORAGE_KEY = "cenario-terrain-config";

const loadConfig = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn("Erro ao carregar config:", e);
  }
  return null;
};

const savedConfig = loadConfig();

const seed = ref(savedConfig?.seed ?? 12345);
const riverWidth = ref(savedConfig?.riverWidth ?? 25);
const riverSinuosity = ref(savedConfig?.riverSinuosity ?? 0.004);
const riverAmplitude = ref(savedConfig?.riverAmplitude ?? 90);
const maxElevation = ref(savedConfig?.maxElevation ?? 8);
const terrainSmoothness = ref(savedConfig?.terrainSmoothness ?? 4);
const terrainFrequency = ref(savedConfig?.terrainFrequency ?? 0.003);
const colorSmoothness = ref(savedConfig?.colorSmoothness ?? 3);
const colorVariation = ref(savedConfig?.colorVariation ?? 0.15);
const greenIntensity = ref(savedConfig?.greenIntensity ?? 0.62);
const bankWidth = ref(savedConfig?.bankWidth ?? 20);
const bankSmoothness = ref(savedConfig?.bankSmoothness ?? 2);
const grassPerlinSmoothness = ref(savedConfig?.grassPerlinSmoothness ?? 2);
const transitionZone = ref(savedConfig?.transitionZone ?? 30);
const transitionSmoothness = ref(savedConfig?.transitionSmoothness ?? 4);
const treeDensity = ref(savedConfig?.treeDensity ?? 50);
const treeMinDistance = ref(savedConfig?.treeMinDistance ?? 15);
const treePoints = ref([]);
const isGeneratingTrees = ref(false);
const realisticMode = ref(false);
const generatedTrees = [];

const scheduleConfigSave = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
  saveTimeout = setTimeout(() => {
    const config = {
      seed: seed.value,
      riverWidth: riverWidth.value,
      riverSinuosity: riverSinuosity.value,
      riverAmplitude: riverAmplitude.value,
      maxElevation: maxElevation.value,
      terrainSmoothness: terrainSmoothness.value,
      terrainFrequency: terrainFrequency.value,
      colorSmoothness: colorSmoothness.value,
      colorVariation: colorVariation.value,
      greenIntensity: greenIntensity.value,
      bankWidth: bankWidth.value,
      bankSmoothness: bankSmoothness.value,
      grassPerlinSmoothness: grassPerlinSmoothness.value,
      transitionZone: transitionZone.value,
      transitionSmoothness: transitionSmoothness.value,
      treeDensity: treeDensity.value,
      treeMinDistance: treeMinDistance.value,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn("Erro ao salvar config:", e);
    }
  }, 5000);
};

watch(
  [
    seed,
    riverWidth,
    riverSinuosity,
    riverAmplitude,
    maxElevation,
    terrainSmoothness,
    terrainFrequency,
    colorSmoothness,
    colorVariation,
    greenIntensity,
    bankWidth,
    bankSmoothness,
    grassPerlinSmoothness,
    transitionZone,
    transitionSmoothness,
    treeDensity,
    treeMinDistance,
  ],
  scheduleConfigSave,
);

const randomizeSeed = () => {
  seed.value = Math.floor(Math.random() * 100000);
  regenerateTerrain();
};

const regenerateTerrain = () => {
  if (scene && terrain) {
    createTerrain();
  }
};

watch(
  () => props.isDark,
  () => {
    if (scene) {
      scene.background = new THREE.Color(props.isDark ? 0x1a1a2e : 0x87ceeb);
    }
  },
);

onMounted(() => {
  initTerrain();
});

onUnmounted(() => {
  cleanup();
  if (saveTimeout) {
    clearTimeout(saveTimeout);
  }
});

function initTerrain() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(props.isDark ? 0x1a1a2e : 0x87ceeb);

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 80, 120);
  camera.lookAt(0, 0, 0);

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

  const ambientLight = new THREE.AmbientLight(0x404080, 0.4);
  scene.add(ambientLight);

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

  const fillLight = new THREE.DirectionalLight(0x87ceeb, 0.3);
  fillLight.position.set(-100, 60, -50);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffa500, 0.4);
  rimLight.position.set(0, 50, -150);
  scene.add(rimLight);

  createTerrain();

  setupControls();

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

  const vertices = geometry.attributes.position.array;
  const colors = new Float32Array(vertices.length);

  const seedOffset = seed.value * 0.01;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 1];

    let elevation = 0;

    const smoothFactor = 1 / terrainSmoothness.value;
    elevation += Math.sin(x * 0.03 * smoothFactor + seedOffset) * 4;
    elevation += Math.cos(z * 0.06 * smoothFactor + seedOffset) * 3;

    elevation +=
      perlinNoise(
        x + seedOffset * 100,
        z + seedOffset * 100,
        terrainFrequency.value,
        terrainSmoothness.value,
      ) *
      maxElevation.value *
      0.2;

    const ampFactor = riverAmplitude.value / 90;
    const riverCenterX =
      Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
      Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
      Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const currentRiverWidth =
      riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
    const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

    const riverInfluence = Math.max(
      0,
      1 - distanceFromRiver / (currentRiverWidth + currentBankWidth + 40),
    );
    const ultraSmoothFalloff = smoothstepN(
      riverInfluence,
      transitionSmoothness.value,
    );

    let baseElevation = 0;
    baseElevation += Math.abs(
      perlinNoise(
        x + seedOffset * 50,
        z + seedOffset * 50,
        terrainFrequency.value * 2.5,
        terrainSmoothness.value,
      ),
    );
    baseElevation +=
      Math.abs(
        perlinNoise(
          x + 100 + seedOffset * 30,
          z + 50,
          terrainFrequency.value * 0.4,
          terrainSmoothness.value,
        ),
      ) *
      maxElevation.value *
      0.5;
    baseElevation +=
      Math.abs(
        perlinNoise(
          x - 50,
          z + 100 + seedOffset * 20,
          terrainFrequency.value * 0.5,
          terrainSmoothness.value,
        ),
      ) *
      maxElevation.value *
      0.4;

    elevation -= ultraSmoothFalloff * 2.5;

    const riverElevation = -2;

    const grassElevation = (baseElevation + elevation + 5) / 2;

    const totalTransitionZone = currentBankWidth + transitionZone.value;

    if (distanceFromRiver < currentRiverWidth) {
      elevation = riverElevation;
    } else if (distanceFromRiver < currentRiverWidth + totalTransitionZone) {
      const transitionFactor =
        (distanceFromRiver - currentRiverWidth) / totalTransitionZone;

      const smoothTransition = smoothstepN(
        transitionFactor,
        transitionSmoothness.value,
      );

      elevation =
        riverElevation * (1 - smoothTransition) +
        grassElevation * smoothTransition;
    } else {
      elevation = grassElevation;
    }

    if (distanceFromRiver < currentRiverWidth) {
      colors[i] = 0.1;
      colors[i + 1] = 0.6;
      colors[i + 2] = 0.9;
    } else {
      const bankDistance = distanceFromRiver - currentRiverWidth;
      const bankFactor = Math.min(1, bankDistance / currentBankWidth);
      const smoothBankFactor = smoothstepN(bankFactor, bankSmoothness.value);

      const colorFreq = 0.004 / colorSmoothness.value;
      const largeColorNoise =
        perlinNoise(
          x + seedOffset * 200,
          z + seedOffset * 200,
          colorFreq,
          grassPerlinSmoothness.value,
        ) * colorVariation.value;
      const mediumColorNoise =
        perlinNoise(
          x + 200 + seedOffset * 150,
          z + 150,
          colorFreq * 2,
          grassPerlinSmoothness.value,
        ) *
        colorVariation.value *
        0.7;
      const fineColorNoise =
        perlinNoise(
          x - 100,
          z + 300 + seedOffset * 100,
          colorFreq * 4,
          grassPerlinSmoothness.value,
        ) *
        colorVariation.value *
        0.4;

      const sandR = 0.72;
      const sandG = 0.62;
      const sandB = 0.42;

      const grassR = 0.22 + largeColorNoise;
      const grassG = greenIntensity.value + largeColorNoise + mediumColorNoise;
      const grassB = 0.2 + largeColorNoise * 0.5;

      if (bankDistance < currentBankWidth) {
        colors[i] = sandR * (1 - smoothBankFactor) + grassR * smoothBankFactor;
        colors[i + 1] =
          sandG * (1 - smoothBankFactor) + grassG * smoothBankFactor;
        colors[i + 2] =
          sandB * (1 - smoothBankFactor) + grassB * smoothBankFactor;
      } else {
        const elevationInfluence = (elevation + 6) / 14;
        const elevationFactor = Math.max(0, Math.min(1, elevationInfluence));

        const patchFreq = 0.003 / colorSmoothness.value;
        const largePatchNoise = perlinNoise(
          x + seedOffset * 300,
          z + seedOffset * 300,
          patchFreq,
          grassPerlinSmoothness.value,
        );
        const mediumPatchNoise = perlinNoise(
          x + 500 + seedOffset * 250,
          z + 200,
          patchFreq * 2.3,
          grassPerlinSmoothness.value,
        );

        let finalR = grassR;
        let finalG = grassG;
        let finalB = grassB;

        const patchInfluence = smoothstepN(
          (largePatchNoise + 1) * 0.5,
          colorSmoothness.value,
        );
        finalR += (patchInfluence - 0.5) * colorVariation.value * 0.8;
        finalG += (patchInfluence - 0.5) * colorVariation.value * 0.6;
        finalB += (patchInfluence - 0.5) * colorVariation.value * 0.2;

        const mediumPatchInfluence = smoothstepN(
          (mediumPatchNoise + 1) * 0.5,
          colorSmoothness.value,
        );
        finalR += (mediumPatchInfluence - 0.5) * colorVariation.value * 0.4;
        finalG += (mediumPatchInfluence - 0.5) * colorVariation.value * 0.3;

        finalR += fineColorNoise;
        finalG += fineColorNoise;
        finalB += fineColorNoise * 0.5;

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

  const material = new THREE.MeshPhongMaterial({
    vertexColors: true,
    wireframe: false,
    shininess: 5,
    flatShading: false,
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

function perlinNoise(x, y, frequency, smoothness = 4) {
  let value = 0;
  let amplitude = 1;
  let freq = frequency;
  const octaves = Math.max(1, Math.floor(smoothness));
  const persistence = 0.5 / (smoothness * 0.25);

  for (let i = 0; i < octaves; i++) {
    value += Math.sin(x * freq) * Math.cos(y * freq) * amplitude;
    value +=
      Math.sin(x * freq * 1.3 + 2.5) *
      Math.cos(y * freq * 1.7 + 1.8) *
      amplitude *
      0.7;

    freq *= 2;
    amplitude *= persistence;
  }

  return value * 0.3;
}

function smoothstepN(t, n = 1) {
  t = Math.max(0, Math.min(1, t));
  for (let i = 0; i < n; i++) {
    t = t * t * (3 - 2 * t);
  }
  return t;
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
    if (!controlsEnabled) return;
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  canvas.addEventListener("mouseup", () => {
    mouseDown = false;
  });

  canvas.addEventListener("mousemove", (event) => {
    if (!mouseDown || !controlsEnabled) return;

    const deltaX = event.clientX - mouseX;
    const deltaY = event.clientY - mouseY;

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
    if (!controlsEnabled) return;
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

function isOnGrass(x, z) {
  const seedOffset = seed.value * 0.01;

  const ampFactor = riverAmplitude.value / 90;
  const riverCenterX =
    Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
    Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
    Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

  const distanceFromRiver = Math.abs(x - riverCenterX);
  const currentRiverWidth =
    riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
  const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

  return distanceFromRiver > currentRiverWidth + currentBankWidth;
}

function getTerrainHeight(x, z) {
  const seedOffset = seed.value * 0.01;
  const smoothFactor = 1 / terrainSmoothness.value;

  let elevation = 0;
  elevation += Math.sin(x * 0.03 * smoothFactor + seedOffset) * 4;
  elevation += Math.cos(z * 0.06 * smoothFactor + seedOffset) * 3;
  elevation +=
    perlinNoise(
      x + seedOffset * 100,
      z + seedOffset * 100,
      terrainFrequency.value,
      terrainSmoothness.value,
    ) *
    maxElevation.value *
    0.2;

  let baseElevation = 0;
  baseElevation += Math.abs(
    perlinNoise(
      x + seedOffset * 50,
      z + seedOffset * 50,
      terrainFrequency.value * 2.5,
      terrainSmoothness.value,
    ),
  );
  baseElevation +=
    Math.abs(
      perlinNoise(
        x + 100 + seedOffset * 30,
        z + 50,
        terrainFrequency.value * 0.4,
        terrainSmoothness.value,
      ),
    ) *
    maxElevation.value *
    0.5;

  const ampFactor = riverAmplitude.value / 90;
  const riverCenterX =
    Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
    Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
    Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

  const distanceFromRiver = Math.abs(x - riverCenterX);
  const currentRiverWidth =
    riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
  const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

  const riverElevation = -2;
  const grassElevation = (baseElevation + elevation + 5) / 2;

  const totalTransitionZone = currentBankWidth + transitionZone.value;

  if (distanceFromRiver < currentRiverWidth) {
    return riverElevation;
  } else if (distanceFromRiver < currentRiverWidth + totalTransitionZone) {
    const transitionFactor =
      (distanceFromRiver - currentRiverWidth) / totalTransitionZone;
    const smoothTransition = smoothstepN(
      transitionFactor,
      transitionSmoothness.value,
    );
    return (
      riverElevation * (1 - smoothTransition) +
      grassElevation * smoothTransition
    );
  } else {
    return grassElevation;
  }
}

function generateTreeSeed() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function updateTreePoints() {
  treePointsMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  treePointsMeshes = [];
  treePoints.value = [];

  if (treeDensity.value === 0 || !scene) return;

  const width = 400;
  const height = 400;
  const halfWidth = width / 2;
  const halfHeight = height / 2;
  const minDist = treeMinDistance.value;
  const points = [];

  const attempts = treeDensity.value * 20;

  for (let i = 0; i < attempts && points.length < treeDensity.value; i++) {
    const x = (Math.random() - 0.5) * width * 0.9;
    const z = (Math.random() - 0.5) * height * 0.9;

    if (!isOnGrass(x, z)) continue;

    let tooClose = false;
    for (const p of points) {
      const dx = p.x - x;
      const dz = p.z - z;
      if (dx * dx + dz * dz < minDist * minDist) {
        tooClose = true;
        break;
      }
    }

    if (!tooClose) {
      const y = getTerrainHeight(x, z);
      points.push({
        x,
        y,
        z,
        seed: generateTreeSeed(),
      });
    }
  }

  treePoints.value = points;

  const sphereGeometry = new THREE.SphereGeometry(1.5, 8, 8);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff4444 });

  points.forEach((point) => {
    const sphere = new THREE.Mesh(
      sphereGeometry.clone(),
      sphereMaterial.clone(),
    );
    sphere.position.set(point.x, point.y + 2, -point.z);
    scene.add(sphere);
    treePointsMeshes.push(sphere);
  });
}

async function generateTrees() {
  if (treePoints.value.length === 0 || isGeneratingTrees.value) return;

  isGeneratingTrees.value = true;

  const pointsToProcess = [...treePoints.value];

  for (let i = 0; i < pointsToProcess.length; i++) {
    const point = pointsToProcess[i];

    try {
      const numericSeed = seedToNumber(point.seed);

      const { group: treeGroup } = await buildTree(numericSeed, "simple");

      treeGroup.position.set(point.x, point.y, -point.z);

      treeGroup.scale.setScalar(7);

      scene.add(treeGroup);
      generatedTrees.push(treeGroup);

      if (treePointsMeshes[i]) {
        scene.remove(treePointsMeshes[i]);
        treePointsMeshes[i].geometry.dispose();
        treePointsMeshes[i].material.dispose();
      }

      treePoints.value = pointsToProcess.slice(i + 1);

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Erro ao gerar árvore ${point.seed}:`, error);
    }
  }

  treePointsMeshes = [];
  treePoints.value = [];
  isGeneratingTrees.value = false;
}

let controlsEnabled = true;

function toggleRealisticMode() {
  realisticMode.value = !realisticMode.value;

  if (realisticMode.value) {
    controlsEnabled = false;

    camera.fov = 55;
    camera.updateProjectionMatrix();

    generatedTrees.forEach((tree) => {
      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });

    if (terrain) {
      terrain.receiveShadow = true;
      terrain.castShadow = true;
    }
  } else {
    controlsEnabled = true;

    camera.fov = 75;
    camera.updateProjectionMatrix();
  }
}

function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  treePointsMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  treePointsMeshes = [];

  generatedTrees.forEach((tree) => {
    scene.remove(tree);
    tree.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  });
  generatedTrees.length = 0;

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
