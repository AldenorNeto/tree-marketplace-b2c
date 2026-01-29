import * as THREE from "three";

// Create root cone at the base of a tree with more natural variations
export const createTreeRoots = (
  trunkThickness,
  trunkDirection,
  trunkMaterial,
  characteristics,
) => {
  // Use characteristics from seed instead of random generation
  const rootHeight = trunkThickness * characteristics.rootHeight;
  const rootTopRadius = trunkThickness * characteristics.rootTopRadius;
  const rootBottomRadius = trunkThickness * characteristics.rootBaseRadius;

  // Criar geometria personalizada para raízes ovais/irregulares
  const rootGeometry = createOvalRootGeometry(
    rootTopRadius,
    rootBottomRadius,
    rootHeight,
    characteristics,
  );

  const rootMesh = new THREE.Mesh(rootGeometry, trunkMaterial);

  // Posicionar o cone na base do tronco - mais visível acima do solo
  // Altura variável baseada nas características
  const baseHeight = rootHeight * 0.1;
  const heightVariation = characteristics.rootHeight * 0.05; // Pequena variação adicional
  rootMesh.position.set(0, baseHeight + heightVariation, 0);

  // Aplicar inclinação do tronco
  const trunkLean = Math.sqrt(
    trunkDirection.x * trunkDirection.x + trunkDirection.z * trunkDirection.z,
  );
  if (trunkLean > 0.05) {
    rootMesh.rotation.x = trunkDirection.x * 0.2;
    rootMesh.rotation.z = trunkDirection.z * 0.2;
  }

  // Aplicar inclinação adicional baseada na seed
  if (characteristics.rootLean > 0.02) {
    const leanX =
      Math.cos(characteristics.rootLeanDirection) * characteristics.rootLean;
    const leanZ =
      Math.sin(characteristics.rootLeanDirection) * characteristics.rootLean;
    rootMesh.rotation.x += leanX;
    rootMesh.rotation.z += leanZ;
  }

  // Aplicar torção
  if (Math.abs(characteristics.rootTwist) > 0.05) {
    rootMesh.rotation.y = characteristics.rootTwist;
  }

  return rootMesh;
};

// Criar geometria oval/irregular para as raízes
const createOvalRootGeometry = (
  topRadius,
  bottomRadius,
  height,
  characteristics,
) => {
  const radialSegments = 12; // Mais segmentos para melhor qualidade
  const heightSegments = 4;

  const geometry = new THREE.CylinderGeometry(
    topRadius,
    bottomRadius,
    height,
    radialSegments,
    heightSegments,
  );

  // Modificar vértices para criar formato oval e irregular
  const positions = geometry.attributes.position;
  const vertex = new THREE.Vector3();

  for (let i = 0; i < positions.count; i++) {
    vertex.fromBufferAttribute(positions, i);

    // Calcular a altura normalizada (0 = topo, 1 = base)
    const heightRatio = (vertex.y + height / 2) / height;

    // Aplicar ovalização baseada na altura
    const currentRadius = topRadius + (bottomRadius - topRadius) * heightRatio;

    if (currentRadius > 0) {
      // Calcular ângulo do vértice
      const angle = Math.atan2(vertex.z, vertex.x);
      const distance = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);

      if (distance > 0) {
        // Aplicar ovalização (esticar em uma direção)
        const ovalFactorX = 1.0;
        const ovalFactorZ = characteristics.rootOvalness;

        // Aplicar irregularidade
        const bumpiness = characteristics.rootBumpiness;
        const irregularity =
          0.9 + 0.2 * Math.sin(angle * 3) * (bumpiness - 1.0);

        // Recalcular posição
        const newDistance =
          (distance / currentRadius) * currentRadius * irregularity;
        vertex.x = Math.cos(angle) * newDistance * ovalFactorX;
        vertex.z = Math.sin(angle) * newDistance * ovalFactorZ;
      }
    }

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  // Recalcular normais para iluminação correta
  geometry.computeVertexNormals();

  return geometry;
};
