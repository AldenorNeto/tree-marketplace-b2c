/**
 * Three.js utilities for scene setup and camera controls
 */
import * as THREE from "three";

// ============================================================================
// SCENE SETUP
// ============================================================================

export const createTreeLighting = (scene, complexity = "full") => {
  const ambientIntensity = complexity === "simple" ? 0.5 : 0.4;
  const ambientLight = new THREE.AmbientLight(0x404040, ambientIntensity);
  scene.add(ambientLight);

  const directionalIntensity = complexity === "simple" ? 0.8 : 1.0;
  const directionalLight = new THREE.DirectionalLight(
    0xffffff,
    directionalIntensity,
  );
  directionalLight.position.set(5, 5, 3);
  directionalLight.castShadow = true;

  const shadowMapSize = complexity === "simple" ? 512 : 1024;
  directionalLight.shadow.mapSize.width = shadowMapSize;
  directionalLight.shadow.mapSize.height = shadowMapSize;

  scene.add(directionalLight);

  if (complexity === "full") {
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.3);
    fillLight.position.set(-3, 2, -2);
    scene.add(fillLight);
  }

  return { ambientLight, directionalLight };
};

export const createTreeCamera = (
  containerWidth,
  containerHeight,
  treeHeight = 2,
  complexity = "full",
) => {
  const camera = new THREE.PerspectiveCamera(
    60,
    containerWidth / containerHeight,
    0.1,
    100,
  );

  let cameraDistance, cameraHeight;

  if (complexity === "simple") {
    cameraDistance = Math.max(2.5, treeHeight * 0.8 + 1.5);
    cameraHeight = Math.max(1.5, treeHeight * 0.4 + 1.0);
  } else {
    cameraDistance = Math.max(4, treeHeight * 1.2 + 2);
    cameraHeight = Math.max(2, treeHeight * 0.6 + 1);
  }

  camera.position.set(cameraDistance, cameraHeight, cameraDistance);
  camera.lookAt(0, treeHeight * 0.3, 0);

  return { camera, cameraDistance, cameraHeight };
};

export const createTreeScene = (isDark) => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(isDark ? 0x1a1a1a : 0x87ceeb);
  return scene;
};

export const createTreeRenderer = (
  containerWidth,
  containerHeight,
  complexity = "full",
) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(containerWidth, containerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  return renderer;
};

// ============================================================================
// CAMERA CONTROLS
// ============================================================================

export const setupCameraControls = (camera, domElement, options = {}) => {
  const {
    initialDistance = 10,
    initialAngleX = 0.5,
    initialAngleY = 0,
    lookAtTarget = { x: 0, y: 2, z: 0 },
    minDistance = 3,
    maxDistance = 20,
    minAngleX = -Math.PI / 2 + 0.1,
    maxAngleX = Math.PI / 2 - 0.1,
    rotationSpeed = 0.01,
    zoomSpeed = 0.01,
  } = options;

  const state = {
    isDragging: false,
    previousMousePosition: { x: 0, y: 0 },
    cameraDistance: initialDistance,
    cameraAngleX: initialAngleX,
    cameraAngleY: initialAngleY,
    touchStartDistance: 0,
  };

  const updateCameraPosition = () => {
    const x =
      Math.cos(state.cameraAngleY) *
      Math.cos(state.cameraAngleX) *
      state.cameraDistance;
    const y = Math.sin(state.cameraAngleX) * state.cameraDistance;
    const z =
      Math.sin(state.cameraAngleY) *
      Math.cos(state.cameraAngleX) *
      state.cameraDistance;

    camera.position.set(x, y + lookAtTarget.y, z);
    camera.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
  };

  const handleMouseDown = (event) => {
    state.isDragging = true;
    state.previousMousePosition = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (event) => {
    if (state.isDragging) {
      const deltaX = event.clientX - state.previousMousePosition.x;
      const deltaY = event.clientY - state.previousMousePosition.y;

      state.cameraAngleY += deltaX * rotationSpeed;
      state.cameraAngleX += deltaY * rotationSpeed;

      state.cameraAngleX = Math.max(
        minAngleX,
        Math.min(maxAngleX, state.cameraAngleX),
      );

      updateCameraPosition();

      state.previousMousePosition = { x: event.clientX, y: event.clientY };
    }
  };

  const handleMouseUp = () => {
    state.isDragging = false;
  };

  const handleWheel = (event) => {
    event.preventDefault();
    state.cameraDistance += event.deltaY * zoomSpeed;
    state.cameraDistance = Math.max(
      minDistance,
      Math.min(maxDistance, state.cameraDistance),
    );
    updateCameraPosition();
  };

  const handleTouchStart = (event) => {
    if (event.touches.length === 1) {
      state.isDragging = true;
      state.previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      state.touchStartDistance = Math.sqrt(dx * dx + dy * dy);
    }
  };

  const handleTouchMove = (event) => {
    event.preventDefault();

    if (event.touches.length === 1 && state.isDragging) {
      const deltaX = event.touches[0].clientX - state.previousMousePosition.x;
      const deltaY = event.touches[0].clientY - state.previousMousePosition.y;

      state.cameraAngleY += deltaX * rotationSpeed;
      state.cameraAngleX += deltaY * rotationSpeed;

      state.cameraAngleX = Math.max(
        minAngleX,
        Math.min(maxAngleX, state.cameraAngleX),
      );

      updateCameraPosition();

      state.previousMousePosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    } else if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      const scale = distance / state.touchStartDistance;
      state.cameraDistance /= scale;
      state.cameraDistance = Math.max(
        minDistance,
        Math.min(maxDistance, state.cameraDistance),
      );
      updateCameraPosition();

      state.touchStartDistance = distance;
    }
  };

  const handleTouchEnd = () => {
    state.isDragging = false;
  };

  domElement.addEventListener("mousedown", handleMouseDown);
  domElement.addEventListener("mousemove", handleMouseMove);
  domElement.addEventListener("mouseup", handleMouseUp);
  domElement.addEventListener("wheel", handleWheel);
  domElement.addEventListener("touchstart", handleTouchStart);
  domElement.addEventListener("touchmove", handleTouchMove);
  domElement.addEventListener("touchend", handleTouchEnd);

  updateCameraPosition();

  const cleanup = () => {
    domElement.removeEventListener("mousedown", handleMouseDown);
    domElement.removeEventListener("mousemove", handleMouseMove);
    domElement.removeEventListener("mouseup", handleMouseUp);
    domElement.removeEventListener("wheel", handleWheel);
    domElement.removeEventListener("touchstart", handleTouchStart);
    domElement.removeEventListener("touchmove", handleTouchMove);
    domElement.removeEventListener("touchend", handleTouchEnd);
  };

  return {
    state,
    updateCameraPosition,
    cleanup,
  };
};
