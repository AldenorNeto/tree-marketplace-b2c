import * as THREE from "three";

// Create standard lighting setup for tree scenes
export const createTreeLighting = (scene, complexity = "full") => {
  // Ambient light
  const ambientIntensity = complexity === "simple" ? 0.5 : 0.4;
  const ambientLight = new THREE.AmbientLight(0x404040, ambientIntensity);
  scene.add(ambientLight);

  // Main directional light
  const directionalIntensity = complexity === "simple" ? 0.8 : 1.0;
  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    directionalIntensity
  );
  directionalLight.position.set(5, 5, 3);
  directionalLight.castShadow = true;

  // Shadow quality based on complexity
  const shadowMapSize = complexity === "simple" ? 512 : 1024;
  directionalLight.shadow.mapSize.width = shadowMapSize;
  directionalLight.shadow.mapSize.height = shadowMapSize;

  scene.add(directionalLight);

  // Additional fill light for full complexity
  if (complexity === "full") {
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
  }

  return { ambientLight, directionalLight };
};

// Create camera with optimal positioning for trees
export const createTreeCamera = (
  containerWidth,
  containerHeight,
  treeHeight = 2,
  complexity = "full"
) => {
  const camera = new THREE.PerspectiveCamera(
    60,
    containerWidth / containerHeight,
    0.1,
    100
  );

  // Calculate camera distance based on complexity and tree height
  let cameraDistance, cameraHeight;

  if (complexity === "simple") {
    // TreeGridCell style - less aggressive scaling
    cameraDistance = Math.max(2.5, treeHeight * 0.8 + 1.5);
    cameraHeight = Math.max(1.5, treeHeight * 0.4 + 1.0);
  } else {
    // TreeGenerator3D style - more dramatic positioning
    cameraDistance = Math.max(4, treeHeight * 1.2 + 2);
    cameraHeight = Math.max(2, treeHeight * 0.6 + 1);
  }

  camera.position.set(cameraDistance, cameraHeight, cameraDistance);
  camera.lookAt(0, treeHeight * 0.3, 0);

  return { camera, cameraDistance, cameraHeight };
};

// Create scene with background
export const createTreeScene = (isDark) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(isDark ? 0x1a1a1a : 0x87ceeb);
  return scene;
};

// Setup renderer with shadows
export const createTreeRenderer = (
  containerWidth,
  containerHeight,
  complexity = "full"
) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerWidth, containerHeight);
  renderer.shadowMap.enabled = true;

  // Shadow type based on complexity
  renderer.shadowMap.type =
    complexity === "simple" ? THREE.PCFSoftShadowMap : THREE.PCFSoftShadowMap;

  return renderer;
};
