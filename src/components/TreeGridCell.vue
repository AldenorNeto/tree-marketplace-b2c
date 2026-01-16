<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref } from "vue";
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

const canvasContainer = ref(null);
let scene, camera, renderer, currentTree;
let animationId;

const initThreeJS = async () => {
  if (!canvasContainer.value) return;

  // Create scene with utilities
  scene = createTreeScene(props.isDark);

  // Create camera with utilities
  const { camera: cam } = createTreeCamera(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    2, // estimated tree height
    "simple" // complexity level
  );
  camera = cam;

  // Create renderer with utilities
  renderer = createTreeRenderer(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    "simple" // complexity level
  );

  canvasContainer.value.appendChild(renderer.domElement);

  // Create lighting with utilities
  createTreeLighting(scene, "simple");

  // Generate seed - use prop seed if provided, otherwise generate from cellIndex
  let seed;
  if (props.seed) {
    // Convert seed string using unified converter
    seed = seedToNumber(props.seed);
    console.log("TreeGridCell usando seed da prop:", props.seed, "->", seed);
  } else {
    seed = props.cellIndex * 87654321 + (Date.now() % 1000000);
    console.log("TreeGridCell gerando seed aleatória:", seed);
  }

  // Ground with realistic grass texture
  const ground = createGrassGround(seed, props.isDark, 10);
  scene.add(ground);

  // Build tree using utility (simplified version)
  const treeResult = await buildTree(seed, "simple");
  currentTree = treeResult.group;
  const treeHeight = treeResult.height;

  scene.add(currentTree);

  // Update camera position based on actual tree height
  const { camera: updatedCamera, cameraDistance } = createTreeCamera(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
    treeHeight,
    "simple"
  );

  camera.position.copy(updatedCamera.position);
  camera.lookAt(0, treeHeight * 0.3, 0);

  // Adjust ground size based on camera distance
  const groundSize = Math.max(8, cameraDistance * 1.8);
  ground.geometry.dispose();
  ground.geometry = new THREE.PlaneGeometry(groundSize, groundSize);

  // Single render (no animation loop)
  renderer.render(scene, camera);
};

const handleResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return;

  camera.aspect =
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight
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
  if (renderer) {
    renderer.dispose();
  }
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div ref="canvasContainer" class="tree-grid-cell-canvas"></div>
</template>

<style scoped>
.tree-grid-cell-canvas {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
