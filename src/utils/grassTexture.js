import * as THREE from "three";
import { SimpleNoise } from "./perlinNoise.js";

export const createGrassTexture = (seed, isDark) => {
  const noise = new SimpleNoise(seed + 12345); // Offset seed for ground

  const canvas = document.createElement("canvas");
  const size = 18;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(size, size);
  const data = imageData.data;

  // Base grass colors
  const baseGreen = isDark
    ? { r: 0.15, g: 0.35, b: 0.15 } // Darker grass for dark mode
    : { r: 0.3, g: 0.8, b: 0.3 }; // Natural grass green for light mode

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;

      const noiseValue = (noise.octaveNoise(x * 2, y * 2, 2, 0.5) + 1) * 0.5;

      const variation = noiseValue * 0.3 + 0.45; // 0.85 to 1.15 multiplier (more subtle)

      const r = Math.min(255, Math.max(0, baseGreen.r * variation * 255));
      const g = Math.min(255, Math.max(0, baseGreen.g * variation * 255));
      const b = Math.min(255, Math.max(0, baseGreen.b * variation * 255));

      data[index] = r; // Red
      data[index + 1] = g; // Green
      data[index + 2] = b; // Blue
      data[index + 3] = 255; // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3); // Repeat texture for tiling
  texture.generateMipmaps = false; // Disable mipmaps for better performance
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
};

export const createGrassGround = (seed, isDark, size = 10) => {
  const grassTexture = createGrassTexture(seed, isDark);
  const groundGeometry = new THREE.PlaneGeometry(size, size);
  const groundMaterial = new THREE.MeshPhongMaterial({
    map: grassTexture,
    shininess: 0, // No shine for grass
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  return ground;
};
