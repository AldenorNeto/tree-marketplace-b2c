import * as THREE from "three";
import { SimpleNoise } from "./perlinNoise.js";

export const createGrassTexture = (seed, isDark, groundSize = 10) => {
  const noise = new SimpleNoise(seed + 12345);

  const canvas = document.createElement("canvas");

  const textureSize = Math.max(512, groundSize * 50);
  canvas.width = textureSize;
  canvas.height = textureSize;
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(textureSize, textureSize);
  const data = imageData.data;

  const verdeLodo = isDark
    ? { r: 0.2, g: 0.5, b: 0.2 }
    : { r: 0.3, g: 0.7, b: 0.3 };

  const verdeLima = isDark
    ? { r: 0.6, g: 1.0, b: 0.0 }
    : { r: 0.8, g: 1.0, b: 0.0 };

  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;

      const nx = (x / textureSize) * groundSize;
      const ny = (y / textureSize) * groundSize;

      const regionX = Math.floor(nx * 2);
      const regionY = Math.floor(ny * 2);
      const regionSeed = regionX * 1000 + regionY * 100 + seed;

      const offsetX = (regionSeed * 0.1234) % 50;
      const offsetY = (regionSeed * 0.5678) % 50;
      const scaleVariation = 0.8 + ((regionSeed * 0.9876) % 0.4);

      const colorNoise = noise.octaveNoise(nx * 0.8, ny * 0.8, 3, 0.5);
      const colorMix = (colorNoise + 1) * 0.5;

      const lightNoise = noise.octaveNoise(
        nx * 1.5 + 100,
        ny * 1.5 + 100,
        2,
        0.6,
      );
      const lightVariation = (lightNoise + 1) * 0.5;

      const grassNoise1 = noise.octaveNoise(
        (nx + offsetX) * 8 * scaleVariation + 200,
        (ny + offsetY) * 8 * scaleVariation + 200,
        4,
        0.7,
      );
      const grassNoise2 = noise.octaveNoise(
        (nx + offsetX * 0.7) * 16 * scaleVariation + 300,
        (ny + offsetY * 0.7) * 16 * scaleVariation + 300,
        3,
        0.5,
      );
      const grassNoise3 = noise.octaveNoise(
        (nx + offsetX * 0.3) * 32 * scaleVariation + 400,
        (ny + offsetY * 0.3) * 32 * scaleVariation + 400,
        2,
        0.3,
      );

      const grassPattern =
        (grassNoise1 + grassNoise2 * 0.5 + grassNoise3 * 0.25) / 1.75;
      const grassTexture = (grassPattern + 1) * 0.5;

      const grassMultiplier = grassTexture * 0.6 + 0.7;

      const baseColor = {
        r: verdeLodo.r * (1 - colorMix) + verdeLima.r * colorMix,
        g: verdeLodo.g * (1 - colorMix) + verdeLima.g * colorMix,
        b: verdeLodo.b * (1 - colorMix) + verdeLima.b * colorMix,
      };

      const lightMultiplier = lightVariation * 1.0 + 0.4;

      const finalMultiplier = lightMultiplier * grassMultiplier;

      const r = Math.min(255, Math.max(0, baseColor.r * finalMultiplier * 255));
      const g = Math.min(255, Math.max(0, baseColor.g * finalMultiplier * 255));
      const b = Math.min(255, Math.max(0, baseColor.b * finalMultiplier * 255));

      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1);
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  return texture;
};

export const createGrassGround = (seed, isDark, size = 10) => {
  const grassTexture = createGrassTexture(seed, isDark, size);
  const groundGeometry = new THREE.PlaneGeometry(size, size);
  const groundMaterial = new THREE.MeshPhongMaterial({
    map: grassTexture,
    shininess: 0,
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  return ground;
};
