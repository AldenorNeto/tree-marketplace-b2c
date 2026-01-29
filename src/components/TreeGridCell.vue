<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { createGrassGround } from "../utils/grassTexture.js";
import {
  createTreeCamera,
  createTreeLighting,
  createTreeRenderer,
  createTreeScene,
} from "../utils/sceneSetup.js";
import { seedToNumber } from "../utils/seedConverter.js";
import { buildTree } from "../utils/treeBuilder.js";

const props = defineProps({
  isDark: Boolean,
  cellIndex: Number,
  seed: String,
});

const emit = defineEmits(["tree-frozen"]);

const canvasContainer = ref(null);
const treeImage = ref(null); // Para armazenar a imagem final
const isGenerating = ref(true);
let scene, camera, renderer, currentTree, currentGround;
let animationId;
let currentSeed;

// Função para capturar a árvore como imagem e limpar recursos 3D
const freezeTreeAsImage = () => {
  if (!renderer || !scene || !camera) return;

  // Renderizar uma última vez
  renderer.render(scene, camera);

  // Capturar como imagem
  const canvas = renderer.domElement;
  const imageDataUrl = canvas.toDataURL("image/png");
  treeImage.value = imageDataUrl;

  // Emitir evento para componentes pai
  emit("tree-frozen", imageDataUrl);

  // Limpar todos os recursos 3D
  cleanupResources();

  // Remover canvas do DOM
  if (renderer.domElement && renderer.domElement.parentNode) {
    renderer.domElement.parentNode.removeChild(renderer.domElement);
  }

  // Limpar renderer
  if (renderer) {
    renderer.dispose();
    renderer = null;
  }

  // Limpar referências
  scene = null;
  camera = null;

  // Marcar como não gerando mais
  isGenerating.value = false;
};
const cleanupResources = () => {
  if (currentTree) {
    currentTree.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      }
    });
    if (scene) {
      scene.remove(currentTree);
    }
    currentTree = null;
  }

  if (currentGround) {
    if (currentGround.geometry) {
      currentGround.geometry.dispose();
    }
    if (currentGround.material) {
      if (currentGround.material.map) {
        currentGround.material.map.dispose();
      }
      currentGround.material.dispose();
    }
    if (scene) {
      scene.remove(currentGround);
    }
    currentGround = null;
  }
};

const initThreeJS = async () => {
  if (!canvasContainer.value) return;

  // Limpar recursos existentes antes de criar novos
  cleanupResources();

  // Create scene with utilities
  scene = createTreeScene(props.isDark);

  // Create camera with utilities
  const { camera: cam } = createTreeCamera(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    2, // estimated tree height
    "simple", // complexity level
  );
  camera = cam;

  // Create renderer with utilities
  renderer = createTreeRenderer(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    "simple", // complexity level
  );

  canvasContainer.value.appendChild(renderer.domElement);

  // Create lighting with utilities
  createTreeLighting(scene, "simple");

  // Generate seed - use prop seed if provided, otherwise generate from cellIndex
  if (props.seed) {
    // Convert seed string using unified converter
    currentSeed = seedToNumber(props.seed);
    console.log(
      "TreeGridCell usando seed da prop:",
      props.seed,
      "->",
      currentSeed,
    );
  } else {
    currentSeed = props.cellIndex * 87654321 + (Date.now() % 1000000);
    console.log("TreeGridCell gerando seed aleatória:", currentSeed);
  }

  // Ground with realistic grass texture
  currentGround = createGrassGround(currentSeed, props.isDark, 10);
  scene.add(currentGround);

  // Build tree using utility (simplified version)
  const treeResult = await buildTree(currentSeed, "simple");
  currentTree = treeResult.group;
  const treeHeight = treeResult.height;

  scene.add(currentTree);

  // Update camera position based on actual tree height
  const { camera: updatedCamera, cameraDistance } = createTreeCamera(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    treeHeight,
    "simple",
  );

  camera.position.copy(updatedCamera.position);
  camera.lookAt(0, treeHeight * 0.3, 0);

  // Adjust ground size based on camera distance
  const groundSize = Math.max(8, cameraDistance * 1.8);
  currentGround.geometry.dispose();
  currentGround.geometry = new THREE.PlaneGeometry(groundSize, groundSize);

  // Single render (no animation loop)
  renderer.render(scene, camera);

  // Aguardar um frame para garantir que tudo foi renderizado
  await new Promise((resolve) => requestAnimationFrame(resolve));

  // Congelar como imagem após 100ms (tempo para garantir renderização completa)
  setTimeout(() => {
    freezeTreeAsImage();
  }, 100);
};

// Função para atualizar apenas o tema sem recriar tudo
const updateTheme = async () => {
  // Se já temos uma imagem, precisamos regenerar
  if (treeImage.value) {
    treeImage.value = null;
    isGenerating.value = true;
    await initThreeJS();
    return;
  }

  if (!scene || !currentGround || !renderer || !camera || !currentSeed) return;

  // Atualizar cor de fundo da cena
  scene.background = new THREE.Color(props.isDark ? 0x1a1a1a : 0x87ceeb);

  // Recriar textura do chão com novo tema
  const newGrassGround = createGrassGround(currentSeed, props.isDark, 10);

  // Limpar material antigo do chão
  if (currentGround.material) {
    if (currentGround.material.map) {
      currentGround.material.map.dispose();
    }
    currentGround.material.dispose();
  }

  // Substituir material do chão
  currentGround.material = newGrassGround.material;

  // Re-renderizar
  renderer.render(scene, camera);

  // Recongelar como imagem
  setTimeout(() => {
    freezeTreeAsImage();
  }, 100);
};

// Watcher para mudanças de tema
watch(
  () => props.isDark,
  () => {
    updateTheme();
  },
);

const handleResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return;

  camera.aspect =
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );
  renderer.render(scene, camera);
};

onMounted(() => {
  setTimeout(initThreeJS, 100);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }

  // Limpeza adequada de recursos Three.js
  if (scene) {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              if (mat.map) mat.map.dispose();
              mat.dispose();
            });
          } else {
            if (child.material.map) child.material.map.dispose();
            child.material.dispose();
          }
        }
      }
    });
    scene.clear();
  }

  if (renderer) {
    renderer.dispose();
    if (renderer.domElement && renderer.domElement.parentNode) {
      renderer.domElement.parentNode.removeChild(renderer.domElement);
    }
  }

  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div ref="canvasContainer" class="tree-grid-cell-canvas">
    <!-- Mostrar imagem congelada quando pronta -->
    <img
      v-if="treeImage && !isGenerating"
      :src="treeImage"
      alt="Tree"
      class="frozen-tree-image"
    />
    <!-- Mostrar loading enquanto gera -->
    <div v-else-if="isGenerating" class="generating-indicator">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<style scoped>
.tree-grid-cell-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.frozen-tree-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.generating-indicator {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--canvas-bg, #f0f0f0);
  border-radius: 10px;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid var(--text-secondary, #ccc);
  border-top: 3px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
