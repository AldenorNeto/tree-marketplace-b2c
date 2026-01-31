<template>
  <div class="cenario-page">
    <div class="terrain-container" ref="terrainContainer"></div>

    <!-- Botão flutuante para voltar ao editor (só aparece no modo realista) -->
    <button
      v-if="realisticMode"
      class="btn-back-editor"
      @click="toggleRealisticMode"
    >
      🎮 Voltar ao Editor
    </button>

    <!-- Painel de controles (esconde no modo realista) -->
    <div class="controls-panel" v-if="!realisticMode">
      <h3>⛰️ Configurações do Terreno</h3>

      <div class="control-group">
        <label>Seed</label>
        <div class="seed-row">
          <input
            type="number"
            v-model.number="seed"
            @change="regenerateTerrain"
          />
          <button
            class="btn-icon"
            @click="randomizeSeed"
            title="Seed aleatória"
          >
            🎲
          </button>
        </div>
      </div>

      <div class="section-title">🌊 Rio</div>

      <div class="control-group">
        <label>Largura do Rio: {{ riverWidth }}</label>
        <input
          type="range"
          v-model.number="riverWidth"
          min="5"
          max="150"
          step="1"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Sinuosidade: {{ riverSinuosity.toFixed(3) }}</label>
        <input
          type="range"
          v-model.number="riverSinuosity"
          min="0.001"
          max="0.05"
          step="0.001"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Amplitude: {{ riverAmplitude }}</label>
        <input
          type="range"
          v-model.number="riverAmplitude"
          min="10"
          max="180"
          step="5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="section-title">⛰️ Relevo</div>

      <div class="control-group">
        <label>Altura Máxima: {{ maxElevation.toFixed(1) }}</label>
        <input
          type="range"
          v-model.number="maxElevation"
          min="0.5"
          max="40"
          step="0.5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Suavização Relevo: {{ terrainSmoothness.toFixed(1) }}</label>
        <input
          type="range"
          v-model.number="terrainSmoothness"
          min="0.5"
          max="20"
          step="0.5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Frequência: {{ terrainFrequency.toFixed(4) }}</label>
        <input
          type="range"
          v-model.number="terrainFrequency"
          min="0.0001"
          max="0.05"
          step="0.0001"
          @input="regenerateTerrain"
        />
      </div>

      <div class="section-title">🎨 Cores</div>

      <div class="control-group">
        <label>Suavização Cor: {{ colorSmoothness.toFixed(1) }}</label>
        <input
          type="range"
          v-model.number="colorSmoothness"
          min="1"
          max="10"
          step="0.5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Variação de Cor: {{ colorVariation.toFixed(2) }}</label>
        <input
          type="range"
          v-model.number="colorVariation"
          min="0"
          max="0.3"
          step="0.01"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Intensidade Verde: {{ greenIntensity.toFixed(2) }}</label>
        <input
          type="range"
          v-model.number="greenIntensity"
          min="0.3"
          max="0.9"
          step="0.05"
          @input="regenerateTerrain"
        />
      </div>

      <div class="section-title">🏖️ Margem</div>

      <div class="control-group">
        <label>Largura da Margem: {{ bankWidth }}</label>
        <input
          type="range"
          v-model.number="bankWidth"
          min="5"
          max="40"
          step="1"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Suavização Margem: {{ bankSmoothness.toFixed(1) }}</label>
        <input
          type="range"
          v-model.number="bankSmoothness"
          min="1"
          max="5"
          step="0.5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="section-title">✨ Suavização Global</div>

      <div class="control-group">
        <label
          >Suavidade Grama (Perlin):
          {{ grassPerlinSmoothness.toFixed(1) }}</label
        >
        <input
          type="range"
          v-model.number="grassPerlinSmoothness"
          min="0.5"
          max="5"
          step="0.25"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label>Zona de Transição: {{ transitionZone }}</label>
        <input
          type="range"
          v-model.number="transitionZone"
          min="5"
          max="80"
          step="5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="control-group">
        <label
          >Suavidade Transição: {{ transitionSmoothness.toFixed(1) }}</label
        >
        <input
          type="range"
          v-model.number="transitionSmoothness"
          min="1"
          max="8"
          step="0.5"
          @input="regenerateTerrain"
        />
      </div>

      <div class="section-title">🌳 Árvores</div>

      <div class="control-group">
        <label>Fertilidade: {{ treeDensity }}</label>
        <input
          type="range"
          v-model.number="treeDensity"
          min="0"
          max="200"
          step="5"
          @input="updateTreePoints"
        />
      </div>

      <div class="control-group">
        <label>Distância Mínima: {{ treeMinDistance }}</label>
        <input
          type="range"
          v-model.number="treeMinDistance"
          min="5"
          max="40"
          step="1"
          @input="updateTreePoints"
        />
      </div>

      <div class="tree-info" v-if="treePoints.length > 0">
        <span>{{ treePoints.length }} árvores posicionadas</span>
      </div>

      <button
        class="btn-generate"
        @click="generateTrees"
        :disabled="treePoints.length === 0 || isGeneratingTrees"
      >
        <span v-if="isGeneratingTrees">⏳ Gerando...</span>
        <span v-else>🌲 Gerar Árvores</span>
      </button>

      <div class="section-title">📷 Visualização</div>

      <div class="control-group">
        <label>Neblina: {{ fogDensity.toFixed(4) }}</label>
        <input
          type="range"
          v-model.number="fogDensity"
          min="0"
          max="0.01"
          step="0.0005"
          @input="updateFog"
        />
      </div>

      <button
        class="btn-realistic"
        @click="toggleRealisticMode"
        :class="{ active: realisticMode }"
      >
        <span v-if="realisticMode">🎮 Voltar ao Editor</span>
        <span v-else>🎬 Modo Realista</span>
      </button>
    </div>
  </div>
</template>

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

// Carrega config do localStorage ou usa defaults
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

// Controles reativos com valores salvos ou defaults
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
const fogDensity = ref(savedConfig?.fogDensity ?? 0.0025);
const treePoints = ref([]);
const isGeneratingTrees = ref(false);
const realisticMode = ref(false);
const generatedTrees = []; // Array para armazenar árvores geradas

// Salva config no localStorage com debounce de 5 segundos
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
      fogDensity: fogDensity.value,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.warn("Erro ao salvar config:", e);
    }
  }, 5000);
};

// Watch em todos os controles para agendar save
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
    fogDensity,
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
    createWater();
  }
};

const updateFog = () => {
  if (scene) {
    const fogColor = props.isDark ? 0x1a1a2e : 0xc9dde8;
    scene.fog = new THREE.FogExp2(fogColor, fogDensity.value);
  }
};

watch(
  () => props.isDark,
  () => {
    if (scene) {
      const skyColor = props.isDark ? 0x1a1a2e : 0xa8d4e6;
      scene.background = new THREE.Color(skyColor);
      const fogColor = props.isDark ? 0x1a1a2e : 0xc9dde8;
      scene.fog = new THREE.FogExp2(fogColor, fogDensity.value);
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
  // Scene setup
  scene = new THREE.Scene();

  // Céu com gradiente mais realista (azul claro no topo, mais claro no horizonte)
  const skyColor = props.isDark ? 0x1a1a2e : 0xa8d4e6;
  scene.background = new THREE.Color(skyColor);

  // Neblina mais suave para atmosfera (mais densa no horizonte)
  const fogColor = props.isDark ? 0x1a1a2e : 0xc9dde8;
  scene.fog = new THREE.FogExp2(fogColor, fogDensity.value);

  // Camera - positioned higher and more angled for aerial view
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.position.set(0, 80, 120);
  camera.lookAt(0, 0, 0);

  // Renderer com configurações PBR otimizadas
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    terrainContainer.value.clientWidth,
    terrainContainer.value.clientHeight,
  );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  terrainContainer.value.appendChild(renderer.domElement);

  // Luz ambiente mais quente (simula luz do céu refletida)
  const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.5);
  scene.add(ambientLight);

  // Hemisphere light para iluminação natural céu/chão (mais quente)
  const hemiLight = new THREE.HemisphereLight(0xffeedd, 0x3d6b3d, 0.6);
  scene.add(hemiLight);

  // Main sun light - luz do sol dourada (hora dourada)
  const sunLight = new THREE.DirectionalLight(0xffd4a6, 1.8);
  sunLight.position.set(80, 60, 40);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.width = 4096;
  sunLight.shadow.mapSize.height = 4096;
  sunLight.shadow.camera.near = 0.5;
  sunLight.shadow.camera.far = 500;
  sunLight.shadow.camera.left = -200;
  sunLight.shadow.camera.right = 200;
  sunLight.shadow.camera.top = 200;
  sunLight.shadow.camera.bottom = -200;
  sunLight.shadow.bias = -0.0001;
  scene.add(sunLight);

  // Fill light azulada (simula luz do céu)
  const fillLight = new THREE.DirectionalLight(0x8899cc, 0.4);
  fillLight.position.set(-80, 40, -30);
  scene.add(fillLight);

  // Rim light para destacar contornos
  const rimLight = new THREE.DirectionalLight(0xffeedd, 0.3);
  rimLight.position.set(-50, 20, 80);
  scene.add(rimLight);

  // Create terrain
  createTerrain();

  // Create water plane separado
  createWater();

  // Controls
  setupControls();

  // Animation loop
  animate();
}

function createTerrain() {
  const width = 400;
  const height = 400;
  const widthSegments = 300;
  const heightSegments = 300;

  const geometry = new THREE.PlaneGeometry(
    width,
    height,
    widthSegments,
    heightSegments,
  );

  const vertices = geometry.attributes.position.array;
  const colors = new Float32Array(vertices.length);

  // Seed-based random offset
  const seedOffset = seed.value * 0.01;

  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 1];

    let elevation = 0;

    // Large gentle undulations com suavização
    const smoothFactor = 1 / terrainSmoothness.value;
    elevation += Math.sin(x * 0.03 * smoothFactor + seedOffset) * 4;
    elevation += Math.cos(z * 0.06 * smoothFactor + seedOffset) * 3;

    // Medium details com frequência controlada
    elevation +=
      perlinNoise(
        x + seedOffset * 100,
        z + seedOffset * 100,
        terrainFrequency.value,
        terrainSmoothness.value,
      ) *
      maxElevation.value *
      0.2;

    // Create meandering river path
    const ampFactor = riverAmplitude.value / 90; // normaliza baseado no valor original
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

    // Altura base do leito do rio (mais baixo no centro)
    const riverDepth = -1.5;
    // Altura da grama (terreno normal)
    const grassElevation = (baseElevation + elevation + 5) / 2;

    // Zona total de transição = margem + zona extra de gradiente
    const totalTransitionZone = currentBankWidth + transitionZone.value;

    if (distanceFromRiver < currentRiverWidth) {
      // Dentro do rio - terreno vai para baixo (escondido pela água)
      elevation = -3;
    } else if (distanceFromRiver < currentRiverWidth + totalTransitionZone) {
      // Zona de transição gradual (margem + zona extra)
      const transitionFactor =
        (distanceFromRiver - currentRiverWidth) / totalTransitionZone;

      // Aplica smoothstep múltiplas vezes para transição ultra suave
      const smoothTransition = smoothstepN(
        transitionFactor,
        transitionSmoothness.value,
      );

      // Altura da borda do rio (um pouco acima do leito)
      const riverEdgeElevation = riverDepth + 0.5;

      // Interpola suavemente entre borda do rio e altura da grama
      elevation =
        riverEdgeElevation * (1 - smoothTransition) +
        grassElevation * smoothTransition;
    } else {
      // Terreno normal (grama)
      elevation = grassElevation;
    }

    // Cores com suavização
    if (distanceFromRiver < currentRiverWidth) {
      // Leito do rio - mesma cor da areia (fica por baixo da água)
      const riverBedNoise = 0;
      colors[i] = 0.65 + riverBedNoise;
      colors[i + 1] = 0.55 + riverBedNoise * 0.8;
      colors[i + 2] = 0.38 + riverBedNoise * 0.5;
    } else {
      const bankDistance = distanceFromRiver - currentRiverWidth;
      const bankFactor = Math.min(1, bankDistance / currentBankWidth);
      const smoothBankFactor = smoothstepN(bankFactor, bankSmoothness.value);

      // Ruído de cor com múltiplas camadas para variação natural
      const colorFreq = 0.006 / colorSmoothness.value;

      // Camadas de ruído para variação de cor
      const largeColorNoise =
        perlinNoise(
          x + seedOffset * 200,
          z + seedOffset * 200,
          colorFreq * 0.5,
          grassPerlinSmoothness.value,
        ) *
        colorVariation.value *
        1.2;

      const mediumColorNoise =
        perlinNoise(
          x + 200 + seedOffset * 150,
          z + 150,
          colorFreq * 1.5,
          grassPerlinSmoothness.value,
        ) *
        colorVariation.value *
        0.8;

      const fineColorNoise =
        perlinNoise(
          x - 100,
          z + 300 + seedOffset * 100,
          colorFreq * 4,
          grassPerlinSmoothness.value,
        ) *
        colorVariation.value *
        0.5;

      // Ruído extra para "manchas" de grama
      const patchNoise = perlinNoise(
        x + seedOffset * 500,
        z + seedOffset * 500,
        colorFreq * 0.3,
        2,
      );

      // Cores da areia/margem mais naturais
      const sandR = 0.65 + fineColorNoise * 0.1;
      const sandG = 0.55 + fineColorNoise * 0.08;
      const sandB = 0.38 + fineColorNoise * 0.05;

      // Cores da grama com mais variação
      const baseGreen = greenIntensity.value;
      const grassR = 0.18 + largeColorNoise * 0.8 + patchNoise * 0.05;
      const grassG =
        baseGreen +
        largeColorNoise * 0.5 +
        mediumColorNoise * 0.3 +
        patchNoise * 0.08;
      const grassB = 0.12 + largeColorNoise * 0.3 + fineColorNoise * 0.2;

      if (bankDistance < currentBankWidth) {
        // Transição suave areia -> grama
        colors[i] = sandR * (1 - smoothBankFactor) + grassR * smoothBankFactor;
        colors[i + 1] =
          sandG * (1 - smoothBankFactor) + grassG * smoothBankFactor;
        colors[i + 2] =
          sandB * (1 - smoothBankFactor) + grassB * smoothBankFactor;
      } else {
        const elevationInfluence = (elevation + 6) / 14;
        const elevationFactor = Math.max(0, Math.min(1, elevationInfluence));

        // Large-scale color patches com suavização
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

        // Transições suaves entre regiões de cor
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

  // Material PBR para terreno mais realista
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.85,
    metalness: 0.0,
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
  terrain.castShadow = true;
  scene.add(terrain);
}

// Variável global para água
let waterMesh = null;

// Cria plano de água separado com material realista
function createWater() {
  const width = 400;
  const height = 400;
  const segments = 300;

  const waterGeometry = new THREE.PlaneGeometry(
    width,
    height,
    segments,
    segments,
  );
  const waterVertices = waterGeometry.attributes.position.array;
  const waterColors = new Float32Array(waterVertices.length);

  const seedOffset = seed.value * 0.01;
  const ampFactor = riverAmplitude.value / 90;

  // Ajusta vértices para seguir o rio
  for (let i = 0; i < waterVertices.length; i += 3) {
    const x = waterVertices[i];
    const z = waterVertices[i + 1];

    // Calcula centro do rio nesse ponto
    const riverCenterX =
      Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
      Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
      Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const currentRiverWidth =
      riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;

    // Água é mais larga que o buraco do rio (invade a margem por baixo do terreno)
    const waterExtraWidth = 15; // Quanto a água excede a largura do rio
    const totalWaterWidth = currentRiverWidth + waterExtraWidth;

    // Altura da água alinhada com o leito do rio
    const waterHeight = -1;

    if (distanceFromRiver > totalWaterWidth) {
      // Fora da água - esconde completamente
      waterVertices[i + 2] = -100;
      waterColors[i] = 0;
      waterColors[i + 1] = 0;
      waterColors[i + 2] = 0;
    } else {
      // Dentro da água - altura constante
      waterVertices[i + 2] = waterHeight;

      // Gradiente de cor: mais claro nas bordas, mais escuro no centro
      const centerFactor = distanceFromRiver / totalWaterWidth;

      // Variação de cor com ruído
      const waterNoise = perlinNoise(x * 0.5, z * 0.5, 0.02, 2) * 0.08;

      // Azul natural
      waterColors[i] = 0.18 + centerFactor * 0.15 + waterNoise;
      waterColors[i + 1] = 0.48 + centerFactor * 0.2 + waterNoise;
      waterColors[i + 2] = 0.58 + centerFactor * 0.15 + waterNoise * 0.5;
    }
  }

  waterGeometry.computeVertexNormals();
  waterGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(waterColors, 3),
  );

  // Material de água mais transparente para ver o leito
  const waterMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.05,
    metalness: 0.6,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
    envMapIntensity: 2.0,
  });

  if (waterMesh) {
    scene.remove(waterMesh);
    waterMesh.geometry.dispose();
    waterMesh.material.dispose();
  }

  waterMesh = new THREE.Mesh(waterGeometry, waterMaterial);
  waterMesh.rotation.x = -Math.PI / 2;
  waterMesh.receiveShadow = true;
  scene.add(waterMesh);
}

// Improved Perlin-like noise function with smoothness control
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

// Smoothstep com controle de suavidade (N = número de iterações)
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

// Verifica se um ponto está na grama (não no rio ou areia)
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

  // Só bloqueia rio e areia (margem), permite na zona de transição (que é grama)
  return distanceFromRiver > currentRiverWidth + currentBankWidth;
}

// Calcula a altura do terreno em um ponto (considera transição rio/grama)
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

  // Calcula posição do rio
  const ampFactor = riverAmplitude.value / 90;
  const riverCenterX =
    Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
    Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
    Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

  const distanceFromRiver = Math.abs(x - riverCenterX);
  const currentRiverWidth =
    riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
  const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

  // Altura base do leito do rio e da grama
  const riverDepth = -1.5;
  const grassElevation = (baseElevation + elevation + 5) / 2;

  // Zona total de transição
  const totalTransitionZone = currentBankWidth + transitionZone.value;

  if (distanceFromRiver < currentRiverWidth) {
    // Dentro do rio - transição suave
    const riverCenterFactor = distanceFromRiver / currentRiverWidth;
    const smoothRiverFactor = smoothstepN(riverCenterFactor, 2);
    const riverBedElevation = riverDepth - (1 - smoothRiverFactor) * 0.8;
    const edgeBlend = smoothstepN(riverCenterFactor, 3);
    const bankEdgeElevation = grassElevation * 0.3 + riverDepth * 0.7;
    return (
      riverBedElevation * (1 - edgeBlend * 0.3) +
      bankEdgeElevation * (edgeBlend * 0.3)
    );
  } else if (distanceFromRiver < currentRiverWidth + totalTransitionZone) {
    // Zona de transição
    const transitionFactor =
      (distanceFromRiver - currentRiverWidth) / totalTransitionZone;
    const smoothTransition = smoothstepN(
      transitionFactor,
      transitionSmoothness.value,
    );
    const riverEdgeElevation = riverDepth + 0.5;
    return (
      riverEdgeElevation * (1 - smoothTransition) +
      grassElevation * smoothTransition
    );
  } else {
    return grassElevation;
  }
}

// Gera seed aleatória para árvore
function generateTreeSeed() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Atualiza os pontos de árvores
function updateTreePoints() {
  // Remove pontos antigos da cena
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

  // Poisson disk sampling simplificado
  const attempts = treeDensity.value * 20;

  for (let i = 0; i < attempts && points.length < treeDensity.value; i++) {
    const x = (Math.random() - 0.5) * width * 0.9;
    const z = (Math.random() - 0.5) * height * 0.9;

    // Verifica se está na grama
    if (!isOnGrass(x, z)) continue;

    // Verifica distância mínima de outros pontos
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

  // Cria esferas vermelhas para visualizar os pontos
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

// Gera as árvores uma a uma
async function generateTrees() {
  if (treePoints.value.length === 0 || isGeneratingTrees.value) return;

  isGeneratingTrees.value = true;

  // Copia os pontos para processar
  const pointsToProcess = [...treePoints.value];

  for (let i = 0; i < pointsToProcess.length; i++) {
    const point = pointsToProcess[i];

    try {
      // Converte seed string para número
      const numericSeed = seedToNumber(point.seed);

      // Gera a árvore usando o seed numérico
      const { group: treeGroup } = await buildTree(numericSeed, "simple");

      // Posiciona a árvore no terreno
      treeGroup.position.set(point.x, point.y, -point.z);

      // Escala para caber no cenário
      treeGroup.scale.setScalar(7);

      // Adiciona à cena
      scene.add(treeGroup);
      generatedTrees.push(treeGroup);

      // Remove o marcador vermelho correspondente
      if (treePointsMeshes[i]) {
        scene.remove(treePointsMeshes[i]);
        treePointsMeshes[i].geometry.dispose();
        treePointsMeshes[i].material.dispose();
      }

      // Atualiza o array de pontos restantes
      treePoints.value = pointsToProcess.slice(i + 1);

      // Pequeno delay para efeito visual de geração uma a uma
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Erro ao gerar árvore ${point.seed}:`, error);
    }
  }

  // Limpa os arrays após terminar
  treePointsMeshes = [];
  treePoints.value = [];
  isGeneratingTrees.value = false;
}

// Armazena estado da câmera
let controlsEnabled = true;
let pebblesMeshes = []; // Array para armazenar pedrinhas

// Cria pedrinhas na margem do rio perto da câmera
function createPebbles() {
  // Remove pedrinhas anteriores
  pebblesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  pebblesMeshes = [];

  // Pega posição da câmera (projetada no plano XZ)
  const camX = camera.position.x;
  const camZ = -camera.position.z; // Inverte Z porque o terreno está rotacionado

  const radius = 80; // Raio ao redor da câmera
  const numPebbles = 200; // Quantidade de pedrinhas
  const seedOffset = seed.value * 0.01;
  const ampFactor = riverAmplitude.value / 90;

  for (let i = 0; i < numPebbles; i++) {
    // Posição aleatória dentro do raio
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const x = camX + Math.cos(angle) * dist;
    const z = camZ + Math.sin(angle) * dist;

    // Verifica se está na margem do rio (areia)
    const riverCenterX =
      Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
      Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
      Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const currentRiverWidth =
      riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
    const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

    // Só coloca pedrinhas na margem (entre rio e grama)
    const bankDistance = distanceFromRiver - currentRiverWidth;
    if (bankDistance < 0 || bankDistance > currentBankWidth) continue;

    // Mais pedrinhas perto da água
    const proximityToWater = 1 - bankDistance / currentBankWidth;
    if (Math.random() > proximityToWater * 0.8 + 0.2) continue;

    // Calcula altura do terreno nesse ponto
    const y = getTerrainHeight(x, z);

    // Tamanho variado das pedrinhas
    const baseSize = 0.3 + Math.random() * 0.6;
    const scaleX = baseSize * (0.8 + Math.random() * 0.4);
    const scaleY = baseSize * (0.3 + Math.random() * 0.3); // Achatadas
    const scaleZ = baseSize * (0.8 + Math.random() * 0.4);

    // Geometria de pedra (esfera achatada)
    const pebbleGeometry = new THREE.SphereGeometry(1, 6, 4);

    // Cor variada (tons de cinza/marrom)
    const colorVariation = Math.random();
    const r = 0.4 + colorVariation * 0.25;
    const g = 0.38 + colorVariation * 0.2;
    const b = 0.32 + colorVariation * 0.15;

    const pebbleMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(r, g, b),
      roughness: 0.9,
      metalness: 0.1,
      flatShading: true,
    });

    const pebble = new THREE.Mesh(pebbleGeometry, pebbleMaterial);
    pebble.position.set(x, y + scaleY * 0.3, -z);
    pebble.scale.set(scaleX, scaleY, scaleZ);
    pebble.rotation.set(
      Math.random() * 0.3,
      Math.random() * Math.PI * 2,
      Math.random() * 0.3,
    );
    pebble.castShadow = true;
    pebble.receiveShadow = true;

    scene.add(pebble);
    pebblesMeshes.push(pebble);
  }
}

// Remove pedrinhas
function removePebbles() {
  pebblesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  pebblesMeshes = [];
}

// Array para graminhas
let grassBladesMeshes = [];

// Cria tufos de grama perto da câmera
function createGrassBlades() {
  // Remove graminhas anteriores
  grassBladesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  grassBladesMeshes = [];

  // Pega posição da câmera
  const camX = camera.position.x;
  const camZ = -camera.position.z;

  const radius = 60; // Raio menor que pedrinhas (mais perto da câmera)
  const numGrass = 400; // Quantidade de tufos
  const seedOffset = seed.value * 0.01;
  const ampFactor = riverAmplitude.value / 90;

  for (let i = 0; i < numGrass; i++) {
    // Posição aleatória dentro do raio
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const x = camX + Math.cos(angle) * dist;
    const z = camZ + Math.sin(angle) * dist;

    // Verifica se está na grama (fora da margem)
    const riverCenterX =
      Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
      Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
      Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const currentRiverWidth =
      riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
    const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

    // Só coloca grama fora da margem (na área verde)
    const bankDistance = distanceFromRiver - currentRiverWidth;
    if (bankDistance < currentBankWidth) continue;

    // Calcula altura do terreno
    const y = getTerrainHeight(x, z);

    // Cria tufo de grama (3-5 lâminas por tufo)
    const numBlades = 3 + Math.floor(Math.random() * 3);

    for (let j = 0; j < numBlades; j++) {
      // Geometria de lâmina de grama (cone fino)
      const bladeHeight = 0.8 + Math.random() * 1.2;
      const bladeWidth = 0.08 + Math.random() * 0.06;
      const bladeGeometry = new THREE.ConeGeometry(
        bladeWidth,
        bladeHeight,
        4,
        1,
      );

      // Move a base do cone para y=0
      bladeGeometry.translate(0, bladeHeight / 2, 0);

      // Cor verde variada
      const greenVar = Math.random();
      const r = 0.15 + greenVar * 0.15;
      const g = 0.45 + greenVar * 0.25;
      const b = 0.1 + greenVar * 0.1;

      const bladeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(r, g, b),
        roughness: 0.8,
        metalness: 0.0,
        side: THREE.DoubleSide,
      });

      const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);

      // Posição com pequeno offset dentro do tufo
      const offsetX = (Math.random() - 0.5) * 0.3;
      const offsetZ = (Math.random() - 0.5) * 0.3;
      blade.position.set(x + offsetX, y, -z + offsetZ);

      // Inclinação aleatória (como grama real)
      blade.rotation.set(
        (Math.random() - 0.5) * 0.4,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.4,
      );

      blade.castShadow = true;
      blade.receiveShadow = true;

      scene.add(blade);
      grassBladesMeshes.push(blade);
    }
  }
}

// Remove graminhas
function removeGrassBlades() {
  grassBladesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  grassBladesMeshes = [];
}

// Array para partículas de areia
let sandParticlesMeshes = [];

// Cria textura de areia com pequenas partículas
function createSandTexture() {
  // Remove partículas anteriores
  sandParticlesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  sandParticlesMeshes = [];

  // Pega posição da câmera
  const camX = camera.position.x;
  const camZ = -camera.position.z;

  const radius = 50;
  const numParticles = 300;
  const seedOffset = seed.value * 0.01;
  const ampFactor = riverAmplitude.value / 90;

  for (let i = 0; i < numParticles; i++) {
    // Posição aleatória dentro do raio
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * radius;
    const x = camX + Math.cos(angle) * dist;
    const z = camZ + Math.sin(angle) * dist;

    // Verifica se está na margem (areia)
    const riverCenterX =
      Math.sin(z * riverSinuosity.value + seedOffset) * (90 * ampFactor) +
      Math.sin(z * riverSinuosity.value * 0.5 + seedOffset) * (60 * ampFactor) +
      Math.cos(z * riverSinuosity.value * 1.75 + seedOffset) * (35 * ampFactor);

    const distanceFromRiver = Math.abs(x - riverCenterX);
    const currentRiverWidth =
      riverWidth.value + Math.sin(z * 0.01 + seedOffset) * 3;
    const currentBankWidth = bankWidth.value + Math.sin(z * 0.02 + seedOffset);

    // Só na margem
    const bankDistance = distanceFromRiver - currentRiverWidth;
    if (bankDistance < 0 || bankDistance > currentBankWidth) continue;

    // Calcula altura do terreno
    const y = getTerrainHeight(x, z);

    // Pequenos grãos de areia (discos muito pequenos e achatados)
    const grainSize = 0.05 + Math.random() * 0.1;
    const grainGeometry = new THREE.CircleGeometry(grainSize, 5);

    // Cor de areia variada
    const sandVar = Math.random();
    const r = 0.7 + sandVar * 0.15;
    const g = 0.6 + sandVar * 0.12;
    const b = 0.45 + sandVar * 0.1;

    const grainMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(r, g, b),
      roughness: 1.0,
      metalness: 0.0,
      side: THREE.DoubleSide,
    });

    const grain = new THREE.Mesh(grainGeometry, grainMaterial);
    grain.position.set(x, y + 0.02, -z);
    grain.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.3;
    grain.rotation.z = Math.random() * Math.PI * 2;

    scene.add(grain);
    sandParticlesMeshes.push(grain);
  }
}

// Remove partículas de areia
function removeSandTexture() {
  sandParticlesMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  sandParticlesMeshes = [];
}

// Alterna entre modo editor e modo realista
function toggleRealisticMode() {
  realisticMode.value = !realisticMode.value;

  if (realisticMode.value) {
    // Desabilita controles de câmera
    controlsEnabled = false;

    // Ajusta FOV para mais cinematográfico mas mantém posição
    camera.fov = 55;
    camera.updateProjectionMatrix();

    // Cria pedrinhas na margem perto da câmera
    createPebbles();

    // Cria graminhas na área verde perto da câmera
    createGrassBlades();

    // Habilita sombras nas árvores
    generatedTrees.forEach((tree) => {
      tree.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    });

    // Atualiza terreno para receber sombras
    if (terrain) {
      terrain.receiveShadow = true;
      terrain.castShadow = true;
    }
  } else {
    // Reabilita controles de câmera
    controlsEnabled = true;

    // Remove pedrinhas
    removePebbles();

    // Remove graminhas
    removeGrassBlades();

    // Remove textura de areia
    removeSandTexture();

    // Restaura FOV original
    camera.fov = 75;
    camera.updateProjectionMatrix();
  }
}

function cleanup() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  // Limpa pontos de árvores
  treePointsMeshes.forEach((mesh) => {
    scene.remove(mesh);
    mesh.geometry.dispose();
    mesh.material.dispose();
  });
  treePointsMeshes = [];

  // Limpa árvores geradas
  generatedTrees.forEach((tree) => {
    scene.remove(tree);
    tree.traverse((child) => {
      if (child.geometry) child.geometry.dispose();
      if (child.material) child.material.dispose();
    });
  });
  generatedTrees.length = 0;

  // Limpa pedrinhas
  removePebbles();

  // Limpa graminhas
  removeGrassBlades();

  // Limpa textura de areia
  removeSandTexture();

  // Limpa água
  if (waterMesh) {
    scene.remove(waterMesh);
    waterMesh.geometry.dispose();
    waterMesh.material.dispose();
    waterMesh = null;
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
  height: calc(100vh - 60px);
  position: relative;
  background: var(--bg-primary);
}

.terrain-container {
  width: 100%;
  height: 100%;
}

.controls-panel {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 280px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  padding: 20px;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  z-index: 10;
}

.light-theme .controls-panel {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.dark-theme .controls-panel {
  background: rgba(0, 0, 0, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.controls-panel h3 {
  margin: 0 0 16px 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.section-title {
  margin: 20px 0 12px 0;
  padding-top: 12px;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  color: var(--text-primary);
  font-size: 0.9rem;
  font-weight: 600;
}

.control-group {
  margin-bottom: 14px;
}

.control-group label {
  display: block;
  margin-bottom: 6px;
  color: var(--text-primary);
  font-size: 0.8rem;
  font-weight: 500;
}

.seed-row {
  display: flex;
  gap: 8px;
}

.seed-row input {
  flex: 1;
}

.btn-icon {
  padding: 8px 12px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.2s;
}

.btn-icon:hover {
  transform: scale(1.05);
}

.control-group input[type="number"] {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 14px;
}

.control-group input[type="range"] {
  width: 100%;
  cursor: pointer;
}

/* Scrollbar styling */
.controls-panel::-webkit-scrollbar {
  width: 6px;
}

.controls-panel::-webkit-scrollbar-track {
  background: transparent;
}

.controls-panel::-webkit-scrollbar-thumb {
  background: rgba(128, 128, 128, 0.4);
  border-radius: 3px;
}

.controls-panel::-webkit-scrollbar-thumb:hover {
  background: rgba(128, 128, 128, 0.6);
}

.tree-info {
  padding: 10px;
  background: rgba(39, 174, 96, 0.2);
  border: 1px solid rgba(39, 174, 96, 0.4);
  border-radius: 8px;
  text-align: center;
  color: #2ecc71;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 12px;
}

.btn-generate {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 8px;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
}

.btn-generate:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #666;
}

.btn-realistic {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
  margin-top: 8px;
}

.btn-realistic:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(155, 89, 182, 0.4);
}

.btn-realistic.active {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  box-shadow: 0 4px 15px rgba(39, 174, 96, 0.4);
}

.btn-back-editor {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  padding: 16px 32px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
  z-index: 100;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
}

.btn-back-editor:hover {
  transform: translateX(-50%) translateY(-3px);
  box-shadow: 0 12px 40px rgba(39, 174, 96, 0.5);
}
</style>
