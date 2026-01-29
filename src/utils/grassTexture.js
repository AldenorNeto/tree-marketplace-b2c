import * as THREE from "three";
import { SimpleNoise } from "./perlinNoise.js";

export const createGrassTexture = (seed, isDark, groundSize = 10) => {
  const noise = new SimpleNoise(seed + 12345); // Offset seed for ground

  const canvas = document.createElement("canvas");
  // Textura do tamanho exato do gramado para eliminar repetição
  const textureSize = Math.max(512, groundSize * 50); // Resolução alta baseada no tamanho do gramado
  canvas.width = textureSize;
  canvas.height = textureSize;
  const ctx = canvas.getContext("2d");

  const imageData = ctx.createImageData(textureSize, textureSize);
  const data = imageData.data;

  // Cores base: verde lodo vs verde lima
  const verdeLodo = isDark
    ? { r: 0.2, g: 0.5, b: 0.2 } // Verde lodo escuro
    : { r: 0.3, g: 0.7, b: 0.3 }; // Verde lodo claro

  const verdeLima = isDark
    ? { r: 0.6, g: 1.0, b: 0.0 } // Verde lima MUITO forte escuro
    : { r: 0.8, g: 1.0, b: 0.0 }; // Verde lima MUITO forte claro

  for (let y = 0; y < textureSize; y++) {
    for (let x = 0; x < textureSize; x++) {
      const index = (y * textureSize + x) * 4;

      // Coordenadas normalizadas para o ruído (0 a groundSize)
      const nx = (x / textureSize) * groundSize;
      const ny = (y / textureSize) * groundSize;

      // Offsets aleatórios baseados na posição para quebrar repetição
      // Usa a própria posição como seed para ser determinístico
      const regionX = Math.floor(nx * 2); // Divide em regiões 2x2
      const regionY = Math.floor(ny * 2);
      const regionSeed = regionX * 1000 + regionY * 100 + seed;

      // Gera offsets únicos por região (mas determinísticos)
      const offsetX = (regionSeed * 0.1234) % 50;
      const offsetY = (regionSeed * 0.5678) % 50;
      const scaleVariation = 0.8 + ((regionSeed * 0.9876) % 0.4); // 0.8 a 1.2

      // RUÍDO 1: Para escolher entre verde lodo e verde lima
      const colorNoise = noise.octaveNoise(nx * 0.8, ny * 0.8, 3, 0.5);
      const colorMix = (colorNoise + 1) * 0.5; // 0 a 1

      // RUÍDO 2: Para sombra e luz (independente da cor)
      const lightNoise = noise.octaveNoise(
        nx * 1.5 + 100,
        ny * 1.5 + 100,
        2,
        0.6,
      );
      const lightVariation = (lightNoise + 1) * 0.5; // 0 a 1

      // RUÍDO 3: Textura de grama com variação por região
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

      // Combina os ruídos de grama para criar padrões orgânicos
      const grassPattern =
        (grassNoise1 + grassNoise2 * 0.5 + grassNoise3 * 0.25) / 1.75;
      const grassTexture = (grassPattern + 1) * 0.5; // 0 a 1

      // Intensifica o padrão de grama (0.7 a 1.3 multiplier)
      const grassMultiplier = grassTexture * 0.6 + 0.7;

      // Interpola entre verde lodo e verde lima
      const baseColor = {
        r: verdeLodo.r * (1 - colorMix) + verdeLima.r * colorMix,
        g: verdeLodo.g * (1 - colorMix) + verdeLima.g * colorMix,
        b: verdeLodo.b * (1 - colorMix) + verdeLima.b * colorMix,
      };

      // Aplica variação de luz/sombra (0.4 a 1.4 multiplier)
      const lightMultiplier = lightVariation * 1.0 + 0.4;

      // Combina todos os multiplicadores: cor base + luz + textura de grama
      const finalMultiplier = lightMultiplier * grassMultiplier;

      // Calcula cores finais
      const r = Math.min(255, Math.max(0, baseColor.r * finalMultiplier * 255));
      const g = Math.min(255, Math.max(0, baseColor.g * finalMultiplier * 255));
      const b = Math.min(255, Math.max(0, baseColor.b * finalMultiplier * 255));

      data[index] = r; // Red
      data[index + 1] = g; // Green
      data[index + 2] = b; // Blue
      data[index + 3] = 255; // Alpha
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  // SEM repetição - textura única para todo o gramado
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(1, 1); // Sem repetição
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
    shininess: 0, // No shine for grass
  });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;

  return ground;
};
