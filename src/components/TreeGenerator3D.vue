<script setup>
import * as THREE from "three";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { createGrassGround } from "../utils/grassTexture.js";
import { seedToNumber } from "../utils/seedConverter.js";
import { SeededRandom } from "../utils/seededRandom.js";
import { hslToRgb } from "../utils/treeCharacteristics.js";
import { createTreeRoots } from "../utils/treeRoots.js";
import TreeGridCell from "./TreeGridCell.vue";

const props = defineProps({
  isDark: Boolean,
});

const canvasContainer = ref(null);
const currentSeed = ref("");
const treeCharacteristics = ref({});
const isGenerating = ref(false);
const generationProgress = ref(0);
const currentPhase = ref("");
const useSimpleMode = ref(false); // Flag para usar TreeGridCell
let scene, camera, renderer, currentTree;
let animationId,
  generationCancelled = false;

// Seeded Random Number Generator (Linear Congruential Generator)

// Generate random seed string (12 characters for full mode)
const generateSeed = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Removed local seedToNumber - now using unified version from seedConverter.js

// Generate all tree characteristics from seed
const generateTreeCharacteristics = (seed) => {
  const rng = new SeededRandom(seedToNumber(seed));

  // Independent parameters generated from seed
  const characteristics = {
    // Trunk characteristics
    trunkThickness: rng.range(0.06, 0.2), // Very thin to very thick
    trunkHeight: rng.range(1.2, 3.0), // Short to tall trunk
    trunkTaper: rng.range(0.7, 0.95), // How much trunk tapers
    trunkLean: rng.range(0.0, 0.25), // Trunk lean angle

    // Branching characteristics
    branchingFactor: rng.int(3, 5), // Base branching factor (will be reduced with depth)
    branchingAngle: rng.range(10, 60), // 10-60 degree branching
    branchingVariation: rng.range(0.5, 1.5), // Angle variation multiplier
    branchingReduction: rng.range(0.6, 0.9), // How much branching reduces per level
    maxBranches: rng.int(200, 500), // Total branch limit (increased for better trees)

    // Growth characteristics
    lengthReduction: rng.range(0.5, 0.9), // How much branches shrink
    radiusReduction: rng.range(0.6, 0.9), // How much radius shrinks
    maxDepth: rng.int(5, 7), // Tree complexity (increased for better branching)

    // Leaf characteristics
    leafDensity: rng.range(0.0, 1.0), // Global probability - if > 0.3, ALL branches get leaves
    leafSize: rng.range(0.8, 2.0), // Much larger leaf size multiplier
    leafClusters: rng.int(1, 2), // Fewer clusters to avoid overcrowding
    leafVariation: rng.range(0.8, 1.2), // Less extreme variation
    leafShape: rng.int(0, 3), // 0=sphere, 1=elongated, 2=pointed, 3=flat

    // Growth pattern
    upwardBias: rng.range(-0.3, 0.5), // Negative = droopy, positive = upward
    horizontalSpread: rng.range(0.8, 1.5), // How much branches spread

    // Colors (independent of other characteristics)
    trunkHue: rng.range(0, 60), // Brown to yellow-brown range
    trunkSaturation: rng.range(0.3, 0.8), // Color intensity
    trunkLightness: rng.range(0.2, 0.5), // Darkness

    leafHue: rng.range(60, 150), // Yellow-green to blue-green
    leafSaturation: rng.range(0.4, 1.0), // Color intensity
    leafLightness: rng.range(0.3, 0.6), // Darkness

    // Asymmetry and natural variation
    asymmetryFactor: rng.range(0.0, 0.4), // How asymmetric the tree is
    naturalVariation: rng.range(0.1, 0.5), // Random variation in all parameters

    // Novos parâmetros para controle de continuidade
    continuityRatio: rng.range(0.5, 0.8), // Proporção de galhos de continuidade vs galhos de nó
    continuityAngleLimit: rng.range(25, 50), // Ângulo máximo para galhos de continuidade (em graus)
    continuityStrength: rng.range(0.8, 0.95), // Força da continuidade (0-1)

    // Root characteristics (new parameters)
    rootHeight: rng.range(0.8, 2.5), // Altura do cone da raiz (multiplicador do trunkThickness)
    rootBaseRadius: rng.range(2.0, 5.0), // Diâmetro da base da raiz (multiplicador do trunkThickness)
    rootTopRadius: rng.range(0.7, 1.3), // Raio do topo da raiz (multiplicador do trunkThickness)

    // Novas características para raízes mais interessantes
    rootOvalness: rng.range(0.6, 1.4), // Quão oval é a base (1.0 = circular, <1.0 = achatada, >1.0 = alongada)
    rootTwist: rng.range(-0.3, 0.3), // Torção da raiz em radianos
    rootLean: rng.range(0.0, 0.15), // Inclinação adicional da raiz
    rootLeanDirection: rng.range(0, Math.PI * 2), // Direção da inclinação
    rootBumpiness: rng.range(0.8, 1.2), // Irregularidade da superfície
  };

  return characteristics;
};

// Create different leaf shapes
const createLeafGeometry = (size, shape) => {
  switch (shape) {
    case 0: // Sphere (default) - larger
      return new THREE.SphereGeometry(size, 8, 6);

    case 1: // Elongated (ellipsoid) - larger
      const elongatedGeometry = new THREE.SphereGeometry(size, 8, 6);
      elongatedGeometry.scale(0.8, 2.0, 0.8);
      return elongatedGeometry;

    case 2: // Pointed (cone-like) - larger
      return new THREE.ConeGeometry(size * 1.2, size * 2.5, 8);

    case 3: // Flat (disc-like) - larger
      const flatGeometry = new THREE.SphereGeometry(size, 8, 6);
      flatGeometry.scale(1.8, 0.4, 1.8);
      return flatGeometry;

    default:
      return new THREE.SphereGeometry(size, 8, 6);
  }
};

// Build tree directly in scene with live visual feedback and branch limit
const buildTreeLiveAsync = async (seed) => {
  if (generationCancelled) return null;

  const characteristics = generateTreeCharacteristics(seed);
  treeCharacteristics.value = characteristics;

  const rng = new SeededRandom(seedToNumber(seed));

  // Create group and add to scene immediately
  const group = new THREE.Group();
  scene.add(group);
  currentTree = group;

  // Generate colors from characteristics
  const trunkRgb = hslToRgb(
    characteristics.trunkHue,
    characteristics.trunkSaturation,
    characteristics.trunkLightness,
  );
  const leafRgb = hslToRgb(
    characteristics.leafHue,
    characteristics.leafSaturation,
    characteristics.leafLightness,
  );

  const trunkMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(trunkRgb[0], trunkRgb[1], trunkRgb[2]),
  });
  const leafMaterial = new THREE.MeshPhongMaterial({
    color: new THREE.Color(leafRgb[0], leafRgb[1], leafRgb[2]),
  });

  // Add roots at the base
  const trunkDirection = new THREE.Vector3(
    rng.range(-characteristics.trunkLean, characteristics.trunkLean),
    1,
    rng.range(-characteristics.trunkLean, characteristics.trunkLean),
  ).normalize();

  const rootMesh = createTreeRoots(
    characteristics.trunkThickness,
    trunkDirection,
    trunkMaterial,
    characteristics,
  );
  group.add(rootMesh);

  // Build tree structure and render branches immediately
  currentPhase.value = "Construindo tronco e galhos...";
  await buildBranchesLive(
    group,
    characteristics,
    rng,
    trunkMaterial,
    leafMaterial,
  );

  currentPhase.value = "Concluído!";
  generationProgress.value = 100;

  return group;
};

// Build branches live with branch limit
const buildBranchesLive = async (
  group,
  characteristics,
  rng,
  trunkMaterial,
  leafMaterial,
) => {
  const branchQueue = [];
  const allBranchTips = []; // Collect ALL tips, even when we stop early
  let branchCount = 0;
  let processedBranches = 0;

  // Global decision: does this tree have leaves?
  const hasLeaves = characteristics.leafDensity > 0.3; // 70% chance of having leaves

  // Add initial branch to queue
  branchQueue.push({
    startPos: new THREE.Vector3(0, 0, 0),
    direction: new THREE.Vector3(
      rng.range(-characteristics.trunkLean, characteristics.trunkLean),
      1,
      rng.range(-characteristics.trunkLean, characteristics.trunkLean),
    ).normalize(),
    length: characteristics.trunkHeight,
    radius: characteristics.trunkThickness,
    depth: characteristics.maxDepth,
    parentUp: new THREE.Vector3(0, 1, 0),
    branchRng: new SeededRandom(rng.next()),
    asymmetryOffset: 0,
    parentDirection: null, // Tronco não tem direção pai
  });

  // Process branches with limit
  const BRANCH_CHUNK_SIZE = 2;

  while (branchQueue.length > 0 && !generationCancelled) {
    const chunkEnd = Math.min(BRANCH_CHUNK_SIZE, branchQueue.length);

    for (let i = 0; i < chunkEnd; i++) {
      if (generationCancelled) break;

      const branch = branchQueue.shift();

      // Check if we've hit the branch limit
      if (branchCount >= characteristics.maxBranches) {
        // Add this branch's END position as a leaf tip since we're stopping here
        const endPos = branch.startPos
          .clone()
          .add(branch.direction.clone().multiplyScalar(branch.length));

        if (hasLeaves) {
          allBranchTips.push({
            position: endPos,
            size: Math.max(0.1, branch.radius * characteristics.leafSize * 2), // Larger base size
            clusters: characteristics.leafClusters,
            shape: characteristics.leafShape,
            rng: new SeededRandom(branch.branchRng.next()),
          });
        }
        continue; // Skip creating the actual branch mesh, but save the tip for leaves
      }

      await processBranchLive(
        branch,
        branchQueue,
        allBranchTips,
        group,
        characteristics,
        trunkMaterial,
        hasLeaves, // Pass the global decision
      );

      branchCount++;
      processedBranches++;
      generationProgress.value = Math.min(
        85,
        (branchCount / characteristics.maxBranches) * 85,
      );
    }

    // If we hit the limit, add all remaining queued branches as leaf tips
    if (branchCount >= characteristics.maxBranches) {
      while (branchQueue.length > 0) {
        const remainingBranch = branchQueue.shift();

        // Calculate the end position of this branch that would have been created
        const endPos = remainingBranch.startPos
          .clone()
          .add(
            remainingBranch.direction
              .clone()
              .multiplyScalar(remainingBranch.length),
          );

        if (hasLeaves) {
          allBranchTips.push({
            position: endPos,
            size: Math.max(
              0.1,
              remainingBranch.radius * characteristics.leafSize * 2,
            ), // Larger base size
            clusters: characteristics.leafClusters,
            shape: characteristics.leafShape,
            rng: new SeededRandom(remainingBranch.branchRng.next()),
          });
        }
      }
      break;
    }

    // Yield control back to the browser for smooth animation
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }

  // Now add leaves to ALL branch tips (including cut-off ones)
  if (!generationCancelled && allBranchTips.length > 0 && hasLeaves) {
    currentPhase.value = "Adicionando folhas...";
    await addLeavesLive(allBranchTips, group, leafMaterial, characteristics);
  }
};

// Process single branch and add to scene immediately
const processBranchLive = async (
  branchData,
  branchQueue,
  allBranchTips,
  group,
  characteristics,
  trunkMaterial,
  hasLeaves,
) => {
  const {
    startPos,
    direction,
    length,
    radius,
    depth,
    parentUp,
    branchRng,
    asymmetryOffset,
    parentDirection,
  } = branchData;

  if (depth <= 0 || length < 0.05) {
    // Add leaf tip for terminal branches (only if tree has leaves)
    if (length > 0.02 && hasLeaves) {
      allBranchTips.push({
        position: startPos.clone(),
        size: Math.max(0.1, radius * characteristics.leafSize * 2), // Larger base size
        clusters: characteristics.leafClusters,
        shape: characteristics.leafShape,
        rng: new SeededRandom(branchRng.next()),
      });
    }
    return;
  }

  // Create and add branch to scene immediately
  const topRadius = radius * characteristics.trunkTaper;
  const branchGeometry = new THREE.CylinderGeometry(
    topRadius,
    radius,
    length,
    6,
  );
  const branchMesh = new THREE.Mesh(branchGeometry, trunkMaterial);

  // Position branch
  const endPos = startPos.clone().add(direction.clone().multiplyScalar(length));
  branchMesh.position.copy(startPos.clone().add(endPos).multiplyScalar(0.5));
  branchMesh.lookAt(endPos);
  branchMesh.rotateX(Math.PI / 2);

  branchMesh.castShadow = true;
  branchMesh.receiveShadow = true;

  // Add to scene immediately - this creates the live building effect
  group.add(branchMesh);

  // Add child branches to queue
  // Calculate dynamic branching based on depth - more branches near trunk, fewer at tips
  const maxDepth = characteristics.maxDepth;
  const currentDepthRatio = depth / maxDepth; // 1.0 = trunk, 0.0 = tips

  // Base branching factor reduces as we get further from trunk
  const depthMultiplier = Math.pow(
    characteristics.branchingReduction,
    maxDepth - depth,
  );
  const dynamicBranchingFactor = Math.max(
    1,
    Math.round(characteristics.branchingFactor * depthMultiplier),
  );

  // Add some randomness but keep the depth-based trend
  const finalBranchingFactor = Math.max(
    1,
    Math.min(
      characteristics.branchingFactor,
      branchRng.int(
        Math.max(1, dynamicBranchingFactor - 1),
        dynamicBranchingFactor + 1,
      ),
    ),
  );

  const numBranches = finalBranchingFactor;
  const baseAngle = characteristics.branchingAngle;

  for (let i = 0; i < numBranches; i++) {
    // Determinar se este galho será de continuidade ou de nó
    const isContinuationBranch =
      depth < characteristics.maxDepth &&
      branchRng.random() < characteristics.continuityRatio;

    let newDirection;

    if (isContinuationBranch) {
      // GALHO DE CONTINUIDADE - curva suave
      const continuityAngleRad =
        (characteristics.continuityAngleLimit * Math.PI) / 180;

      // Usar a direção atual como base
      let baseDirection = direction.clone().normalize();

      // Aplicar continuidade forte
      const continuityFactor = characteristics.continuityStrength;
      baseDirection = new THREE.Vector3(0, 1, 0).lerp(
        baseDirection,
        continuityFactor,
      );
      baseDirection.normalize();

      // Pequena variação angular para curva suave
      const smallAngleVariation = branchRng.range(
        -continuityAngleRad,
        continuityAngleRad,
      );
      const smallVerticalVariation = branchRng.range(
        -continuityAngleRad * 0.5,
        continuityAngleRad * 0.5,
      );

      newDirection = baseDirection.clone();

      // Aplicar pequenas rotações para criar curva suave
      const horizontalAxis = new THREE.Vector3(1, 0, 0);
      const verticalAxis = new THREE.Vector3(0, 0, 1);

      newDirection.applyAxisAngle(horizontalAxis, smallVerticalVariation);
      newDirection.applyAxisAngle(verticalAxis, smallAngleVariation);

      // Pequena variação natural
      const smallVariation = characteristics.naturalVariation * 0.3;
      newDirection.x += branchRng.range(-smallVariation, smallVariation);
      newDirection.y += branchRng.range(
        -smallVariation * 0.1,
        smallVariation * 0.1,
      );
      newDirection.z += branchRng.range(-smallVariation, smallVariation);
      newDirection.normalize();
    } else {
      // GALHO DE NÓ - nova direção dramática
      // Apply asymmetry factor
      const asymmetryInfluence =
        Math.sin(asymmetryOffset + i) * characteristics.asymmetryFactor;

      // Independent angle calculation
      const angleVariation = characteristics.branchingVariation;
      const horizontalAngle =
        ((branchRng.range(0, 360) + asymmetryInfluence * 90) * Math.PI) / 180;
      let verticalAngle =
        (baseAngle *
          branchRng.range(1 / angleVariation, angleVariation) *
          Math.PI) /
        180;

      // Apply upward bias
      verticalAngle += (characteristics.upwardBias * Math.PI) / 6;

      // Calculate new direction in 3D space
      newDirection = direction.clone();

      // Apply vertical rotation (branching angle)
      const axis1 = new THREE.Vector3()
        .crossVectors(direction, parentUp)
        .normalize();
      if (axis1.length() > 0) {
        newDirection.applyAxisAngle(axis1, verticalAngle);
      }

      // Apply horizontal rotation with spread factor
      newDirection.applyAxisAngle(
        direction,
        horizontalAngle * characteristics.horizontalSpread,
      );

      // Add natural variation
      const variation = characteristics.naturalVariation;
      newDirection.x += branchRng.range(-variation, variation);
      newDirection.y += branchRng.range(-variation * 0.5, variation * 0.5);
      newDirection.z += branchRng.range(-variation, variation);
      newDirection.normalize();
    }

    // Apply length and radius reduction with variation
    const lengthVariation = branchRng.range(0.8, 1.2);
    const radiusVariation = branchRng.range(0.8, 1.2);

    // Add to queue
    branchQueue.push({
      startPos: endPos.clone(),
      direction: newDirection,
      length: length * characteristics.lengthReduction * lengthVariation,
      radius: radius * characteristics.radiusReduction * radiusVariation,
      depth: depth - 1,
      parentUp: parentUp.clone(),
      branchRng: new SeededRandom(branchRng.next()),
      asymmetryOffset: asymmetryOffset + i * 0.5,
      parentDirection: direction.clone(), // Adicionar direção do pai para continuidade
    });
  }
};

// Add leaves with different shapes gradually to scene
const addLeavesLive = async (
  leafQueue,
  group,
  leafMaterial,
  characteristics,
) => {
  const LEAF_CHUNK_SIZE = 3;

  for (let i = 0; i < leafQueue.length; i += LEAF_CHUNK_SIZE) {
    if (generationCancelled) break;

    const chunkEnd = Math.min(i + LEAF_CHUNK_SIZE, leafQueue.length);

    for (let j = i; j < chunkEnd; j++) {
      const leafData = leafQueue[j];

      // Apply size variation here - make leaves much larger
      const finalSize =
        leafData.size *
        leafData.rng.range(
          1 / characteristics.leafVariation,
          characteristics.leafVariation,
        ) *
        1.5; // Make leaves much larger

      // Create main leaf with specific shape
      const leafGeometry = createLeafGeometry(finalSize, leafData.shape);
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.copy(leafData.position);

      // Random rotation for more natural look
      leaf.rotation.x = leafData.rng.range(0, Math.PI * 2);
      leaf.rotation.y = leafData.rng.range(0, Math.PI * 2);
      leaf.rotation.z = leafData.rng.range(0, Math.PI * 2);

      leaf.castShadow = true;
      leaf.receiveShadow = true;

      // Add to scene immediately
      group.add(leaf);

      // Add leaf clusters - much closer to the main leaf and attached to branch
      for (let k = 0; k < leafData.clusters; k++) {
        const clusterLeaf = leaf.clone();
        const clusterVariation = finalSize * 0.1; // Much smaller cluster spread - almost attached
        clusterLeaf.position.add(
          new THREE.Vector3(
            leafData.rng.range(-clusterVariation, clusterVariation),
            leafData.rng.range(-clusterVariation, clusterVariation),
            leafData.rng.range(-clusterVariation, clusterVariation),
          ),
        );
        clusterLeaf.scale.setScalar(leafData.rng.range(0.9, 1.1)); // Less variation in size

        // Different rotation for each cluster leaf
        clusterLeaf.rotation.x = leafData.rng.range(0, Math.PI * 2);
        clusterLeaf.rotation.y = leafData.rng.range(0, Math.PI * 2);
        clusterLeaf.rotation.z = leafData.rng.range(0, Math.PI * 2);

        // Add to scene immediately
        group.add(clusterLeaf);
      }
    }

    // Update progress (85-100%)
    generationProgress.value = 85 + (i / leafQueue.length) * 15;

    // Yield control back to the browser
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};

const initThreeJS = () => {
  if (!canvasContainer.value) return;

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(props.isDark ? 0x1a1a1a : 0x87ceeb);

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight,
    0.1,
    1000,
  );
  camera.position.set(6, 4, 6);
  camera.lookAt(0, 2, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  canvasContainer.value.appendChild(renderer.domElement);

  // Manual camera controls
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let cameraDistance = 10;
  let cameraAngleX = 0.5; // vertical angle
  let cameraAngleY = 0; // horizontal angle

  const updateCameraPosition = () => {
    const x = Math.cos(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;
    const y = Math.sin(cameraAngleX) * cameraDistance;
    const z = Math.sin(cameraAngleY) * Math.cos(cameraAngleX) * cameraDistance;

    camera.position.set(x, y + 2, z);
    camera.lookAt(0, 2, 0);
  };

  // Mouse controls
  renderer.domElement.addEventListener("mousedown", (event) => {
    isDragging = true;
    previousMousePosition = { x: event.clientX, y: event.clientY };
  });

  renderer.domElement.addEventListener("mousemove", (event) => {
    if (isDragging) {
      const deltaX = event.clientX - previousMousePosition.x;
      const deltaY = event.clientY - previousMousePosition.y;

      cameraAngleY += deltaX * 0.01;
      cameraAngleX += deltaY * 0.01;

      // Limit vertical rotation
      cameraAngleX = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, cameraAngleX),
      );

      updateCameraPosition();

      previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  });

  renderer.domElement.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Zoom with mouse wheel
  renderer.domElement.addEventListener("wheel", (event) => {
    event.preventDefault();
    cameraDistance += event.deltaY * 0.01;
    cameraDistance = Math.max(3, Math.min(20, cameraDistance));
    updateCameraPosition();
  });

  // Touch controls for mobile
  let touchStartDistance = 0;

  renderer.domElement.addEventListener("touchstart", (event) => {
    if (event.touches.length === 1) {
      isDragging = true;
      previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      touchStartDistance = Math.sqrt(dx * dx + dy * dy);
    }
  });

  renderer.domElement.addEventListener("touchmove", (event) => {
    event.preventDefault();

    if (event.touches.length === 1 && isDragging) {
      const deltaX = event.touches[0].clientX - previousMousePosition.x;
      const deltaY = event.touches[0].clientY - previousMousePosition.y;

      cameraAngleY += deltaX * 0.01;
      cameraAngleX += deltaY * 0.01;

      cameraAngleX = Math.max(
        -Math.PI / 2 + 0.1,
        Math.min(Math.PI / 2 - 0.1, cameraAngleX),
      );

      updateCameraPosition();

      previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scale = distance / touchStartDistance;
      cameraDistance /= scale;
      cameraDistance = Math.max(3, Math.min(20, cameraDistance));
      updateCameraPosition();

      touchStartDistance = distance;
    }
  });

  renderer.domElement.addEventListener("touchend", () => {
    isDragging = false;
  });

  // Set initial camera position
  updateCameraPosition();

  // Improved lighting
  const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 10, 5);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  scene.add(directionalLight);

  // Add a second light for better illumination
  const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
  fillLight.position.set(-5, 5, -5);
  scene.add(fillLight);

  // Ground with grass texture
  const ground = createGrassGround(Date.now(), props.isDark, 20);
  ground.name = "ground"; // Add name for easy reference
  scene.add(ground);

  // Animation loop (no automatic rotation)
  const animate = () => {
    animationId = requestAnimationFrame(animate);
    renderer.render(scene, camera);
  };
  animate();
};

const generateRandomTree = async () => {
  // Generate new random seed
  currentSeed.value = generateSeed();
  await generateTreeFromSeed(currentSeed.value);
};

const generateTreeFromSeed = async (seed) => {
  generationCancelled = true;
  await new Promise((resolve) => setTimeout(resolve, 50)); // Wait for cancellation

  generationCancelled = false;
  isGenerating.value = true;
  generationProgress.value = 0;
  currentPhase.value = "Iniciando geração...";

  // Update current seed
  currentSeed.value = seed;

  try {
    // Remove existing tree
    if (currentTree) {
      scene.remove(currentTree);
      // Dispose of geometries and materials for memory management
      currentTree.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        }
      });
    }

    // Decide complexity based on seed length
    if (seed.length === 8) {
      // Simple mode - use TreeGridCell component
      useSimpleMode.value = true;

      // Hide the main 3D canvas
      if (renderer && renderer.domElement) {
        renderer.domElement.style.display = "none";
      }

      // Generate characteristics for display
      const characteristics = generateTreeCharacteristics(seed);
      treeCharacteristics.value = characteristics;

      generationProgress.value = 100;
    } else {
      // Complex mode - use buildTreeLiveAsync (full detail)
      useSimpleMode.value = false;

      // Show the main 3D canvas
      if (renderer && renderer.domElement) {
        renderer.domElement.style.display = "block";
      }

      await buildTreeLiveAsync(seed);
    }
  } catch (error) {
    console.error("Error generating tree:", error);
  } finally {
    isGenerating.value = false;
    generationProgress.value = 0;
    currentPhase.value = "";
  }
};

const handleResize = () => {
  if (!canvasContainer.value || !camera || !renderer) return;

  camera.aspect =
    canvasContainer.value.clientWidth / canvasContainer.value.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(
    canvasContainer.value.clientWidth,
    canvasContainer.value.clientHeight,
  );
};

// Watch for theme changes
watch(
  () => props.isDark,
  () => {
    if (scene) {
      // Only change background color, don't regenerate tree
      scene.background = new THREE.Color(props.isDark ? 0x1a1a1a : 0x87ceeb);

      // Update ground with new grass texture for theme
      const oldGround = scene.getObjectByName("ground");
      if (oldGround) {
        scene.remove(oldGround);
        oldGround.geometry.dispose();
        if (oldGround.material.map) {
          oldGround.material.map.dispose();
        }
        oldGround.material.dispose();
      }

      // Create new ground with updated theme
      const newGround = createGrassGround(Date.now(), props.isDark, 20);
      newGround.name = "ground";
      scene.add(newGround);
    }
  },
);

onMounted(() => {
  setTimeout(initThreeJS, 100);
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  generationCancelled = true;
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
  if (renderer) {
    renderer.dispose();
  }
  window.removeEventListener("resize", handleResize);
});

defineExpose({
  generateRandomTree,
  generateTreeFromSeed,
  getCurrentSeed: () => currentSeed.value,
  getTreeCharacteristics: () => treeCharacteristics.value,
  isGenerating: () => isGenerating.value,
  getGenerationProgress: () => generationProgress.value,
  getCurrentPhase: () => currentPhase.value,
});
</script>

<template>
  <div ref="canvasContainer" class="tree-canvas-3d">
    <!-- TreeGridCell para seeds de 8 caracteres -->
    <TreeGridCell
      v-if="useSimpleMode"
      :key="currentSeed"
      :isDark="isDark"
      :seed="currentSeed"
      :cellIndex="1"
      class="simple-tree-overlay"
    />

    <!-- Small progress indicator in corner instead of overlay -->
    <div v-if="isGenerating" class="progress-indicator">
      <div class="progress-bar-small">
        <div
          class="progress-fill-small"
          :style="{ width: generationProgress + '%' }"
        ></div>
      </div>
      <div class="progress-text-small">
        {{ Math.round(generationProgress) }}%
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-canvas-3d {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  cursor: grab;
}

.tree-canvas-3d:active {
  cursor: grabbing;
}

.simple-tree-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.progress-indicator {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  min-width: 150px;
  z-index: 10;
}

.progress-bar-small {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, #27ae60, #2ecc71);
  border-radius: 3px;
  transition: width 0.3s ease;
}

.progress-text-small {
  text-align: center;
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
