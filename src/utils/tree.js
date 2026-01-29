/**
 * Tree generation utilities - geometry, characteristics, and builder
 */
import * as THREE from "three";
import { SeededRandom } from "./seededRandom.js";

// ============================================================================
// GEOMETRY & MATERIALS
// ============================================================================

export const createLeafGeometry = (size, shape, complexity = "full") => {
  const segments = complexity === "simple" ? 6 : 8;
  const heightSegments = complexity === "simple" ? 4 : 6;

  switch (shape) {
    case 0:
      return new THREE.SphereGeometry(size, segments, heightSegments);

    case 1:
      const elongatedGeometry = new THREE.SphereGeometry(
        size,
        segments,
        heightSegments,
      );
      elongatedGeometry.scale(0.8, 2.0, 0.8);
      return elongatedGeometry;

    case 2:
      const coneSize = complexity === "simple" ? size * 1.0 : size * 1.2;
      const coneHeight = complexity === "simple" ? size * 2.0 : size * 2.5;
      return new THREE.ConeGeometry(coneSize, coneHeight, segments);

    case 3:
      const flatGeometry = new THREE.SphereGeometry(
        size,
        segments,
        heightSegments,
      );
      const scaleX = complexity === "simple" ? 2.0 : 1.8;
      const scaleY = complexity === "simple" ? 0.2 : 0.4;
      flatGeometry.scale(scaleX, scaleY, scaleX);
      return flatGeometry;

    default:
      return new THREE.SphereGeometry(size, segments, heightSegments);
  }
};

export const createLeafMaterial = (leafRgb) => {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(leafRgb[0], leafRgb[1], leafRgb[2]),
  });
};

export const createTrunkMaterial = (trunkRgb) => {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(trunkRgb[0], trunkRgb[1], trunkRgb[2]),
  });
};

export const createTreeRoots = (
  trunkThickness,
  trunkDirection,
  trunkMaterial,
  seed,
) => {
  const rng = new SeededRandom(seed + 54321);

  // Características das raízes baseadas na seed
  const characteristics = {
    rootHeight: rng.range(0.8, 2.5),
    rootTopRadius: rng.range(0.7, 1.3),
    rootBaseRadius: rng.range(2.0, 5.0),
    rootOvalness: rng.range(0.6, 1.4),
    rootTwist: rng.range(-0.3, 0.3),
    rootLean: rng.range(0.0, 0.15),
    rootLeanDirection: rng.range(0, Math.PI * 2),
    rootBumpiness: rng.range(0.8, 1.2),
  };

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

  // Posicionar com altura variável
  const baseHeight = rootHeight * 0.1;
  const heightVariation = characteristics.rootHeight * 0.05;
  rootMesh.position.set(0, baseHeight + heightVariation, 0);

  // Aplicar inclinações e torções
  const trunkLean = Math.sqrt(
    trunkDirection.x * trunkDirection.x + trunkDirection.z * trunkDirection.z,
  );
  if (trunkLean > 0.05) {
    rootMesh.rotation.x = trunkDirection.x * 0.2;
    rootMesh.rotation.z = trunkDirection.z * 0.2;
  }

  // Inclinação adicional baseada na seed
  if (characteristics.rootLean > 0.02) {
    const leanX =
      Math.cos(characteristics.rootLeanDirection) * characteristics.rootLean;
    const leanZ =
      Math.sin(characteristics.rootLeanDirection) * characteristics.rootLean;
    rootMesh.rotation.x += leanX;
    rootMesh.rotation.z += leanZ;
  }

  // Torção
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
  const radialSegments = 12;
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

    const heightRatio = (vertex.y + height / 2) / height;
    const currentRadius = topRadius + (bottomRadius - topRadius) * heightRatio;

    if (currentRadius > 0) {
      const angle = Math.atan2(vertex.z, vertex.x);
      const distance = Math.sqrt(vertex.x * vertex.x + vertex.z * vertex.z);

      if (distance > 0) {
        const ovalFactorX = 1.0;
        const ovalFactorZ = characteristics.rootOvalness;
        const irregularity =
          0.9 +
          0.2 * Math.sin(angle * 3) * (characteristics.rootBumpiness - 1.0);

        const newDistance =
          (distance / currentRadius) * currentRadius * irregularity;
        vertex.x = Math.cos(angle) * newDistance * ovalFactorX;
        vertex.z = Math.sin(angle) * newDistance * ovalFactorZ;
      }
    }

    positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  return geometry;
};

// ============================================================================
// CHARACTERISTICS & COLORS
// ============================================================================

export const generateTreeCharacteristics = (seed, complexity = "full") => {
  const rng = new SeededRandom(seed);

  if (complexity === "simple") {
    return {
      trunkThickness: rng.range(0.02, 0.12),
      trunkHeight: rng.range(0.6, 2.0),
      trunkTaper: rng.range(0.6, 0.95),
      trunkLean: rng.range(0.0, 0.1),

      branchingFactor: rng.int(5, 7),
      branchingAngle: rng.range(15, 110),
      branchingReduction: rng.range(0.4, 0.9),
      maxBranches: rng.int(15, 80),

      lengthReduction: rng.range(0.4, 0.9),
      radiusReduction: rng.range(0.5, 0.9),
      maxDepth: rng.int(4, 6),

      leafDensity: rng.range(0.0, 1.0),
      leafSize: rng.range(0.8, 1.5),
      leafClusters: rng.int(1, 3),
      leafVariation: rng.range(0.8, 1.2),
      leafShape: rng.int(0, 3),

      trunkHue: rng.range(0, 80),
      trunkSaturation: rng.range(0.2, 0.9),
      trunkLightness: rng.range(0.15, 0.6),
      leafHue: rng.range(40, 180),
      leafSaturation: rng.range(0.3, 1.0),
      leafLightness: rng.range(0.25, 0.7),

      upwardBias: rng.range(-0.2, 0.4),
      horizontalSpread: rng.range(1.2, 4.0),
      branchOpenness: rng.range(0.1, 8.0),
      asymmetryFactor: rng.range(0.0, 0.5),
      naturalVariation: rng.range(0.05, 0.4),

      // Novos parâmetros para controle de continuidade
      continuityRatio: rng.range(0.3, 0.8), // Proporção de galhos de continuidade vs galhos de nó
      continuityAngleLimit: rng.range(15, 45), // Ângulo máximo para galhos de continuidade (em graus)
      continuityStrength: rng.range(0.6, 0.9), // Força da continuidade (0-1)
    };
  }

  if (complexity === "medium") {
    // Balanced complexity for 8-digit seeds - interactive but performant
    return {
      trunkThickness: rng.range(0.04, 0.16),
      trunkHeight: rng.range(0.9, 2.5),
      trunkTaper: rng.range(0.65, 0.95),
      trunkLean: rng.range(0.0, 0.15),

      branchingFactor: rng.int(4, 6),
      branchingAngle: rng.range(12, 80),
      branchingVariation: rng.range(0.6, 1.4),
      branchingReduction: rng.range(0.5, 0.9),
      maxBranches: rng.int(80, 200), // Reduced from full mode for performance

      lengthReduction: rng.range(0.45, 0.9),
      radiusReduction: rng.range(0.55, 0.9),
      maxDepth: rng.int(5, 6), // Slightly reduced depth

      leafDensity: rng.range(0.0, 1.0),
      leafSize: rng.range(0.8, 1.8),
      leafClusters: rng.int(1, 2), // Fewer clusters for performance
      leafVariation: rng.range(0.8, 1.2),
      leafShape: rng.int(0, 3),

      upwardBias: rng.range(-0.25, 0.45),
      horizontalSpread: rng.range(1.0, 2.5),

      trunkHue: rng.range(0, 70),
      trunkSaturation: rng.range(0.25, 0.85),
      trunkLightness: rng.range(0.18, 0.55),
      leafHue: rng.range(50, 165),
      leafSaturation: rng.range(0.35, 1.0),
      leafLightness: rng.range(0.28, 0.65),

      asymmetryFactor: rng.range(0.0, 0.45),
      naturalVariation: rng.range(0.08, 0.45),

      // Novos parâmetros para controle de continuidade
      continuityRatio: rng.range(0.4, 0.7), // Proporção de galhos de continuidade vs galhos de nó
      continuityAngleLimit: rng.range(20, 40), // Ângulo máximo para galhos de continuidade (em graus)
      continuityStrength: rng.range(0.7, 0.9), // Força da continuidade (0-1)
    };
  }

  // Full complexity mode
  return {
    trunkThickness: rng.range(0.06, 0.2),
    trunkHeight: rng.range(1.2, 3.0),
    trunkTaper: rng.range(0.7, 0.95),
    trunkLean: rng.range(0.0, 0.25),

    branchingFactor: rng.int(3, 5),
    branchingAngle: rng.range(10, 60),
    branchingVariation: rng.range(0.5, 1.5),
    branchingReduction: rng.range(0.6, 0.9),
    maxBranches: rng.int(200, 500),

    lengthReduction: rng.range(0.5, 0.9),
    radiusReduction: rng.range(0.6, 0.9),
    maxDepth: rng.int(5, 7),

    leafDensity: rng.range(0.0, 1.0),
    leafSize: rng.range(0.8, 2.0),
    leafClusters: rng.int(1, 2),
    leafVariation: rng.range(0.8, 1.2),
    leafShape: rng.int(0, 3),

    upwardBias: rng.range(-0.3, 0.5),
    horizontalSpread: rng.range(0.8, 1.5),

    trunkHue: rng.range(0, 60),
    trunkSaturation: rng.range(0.3, 0.8),
    trunkLightness: rng.range(0.2, 0.5),
    leafHue: rng.range(60, 150),
    leafSaturation: rng.range(0.4, 1.0),
    leafLightness: rng.range(0.3, 0.6),

    asymmetryFactor: rng.range(0.0, 0.4),
    naturalVariation: rng.range(0.1, 0.5),

    // Novos parâmetros para controle de continuidade
    continuityRatio: rng.range(0.5, 0.8), // Proporção de galhos de continuidade vs galhos de nó
    continuityAngleLimit: rng.range(25, 50), // Ângulo máximo para galhos de continuidade (em graus)
    continuityStrength: rng.range(0.8, 0.95), // Força da continuidade (0-1)
  };
};

export const hslToRgb = (h, s, l) => {
  h /= 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
};

// ============================================================================
// TREE BUILDER
// ============================================================================

export const buildTree = async (
  seed,
  complexity = "simple",
  onProgress = null,
) => {
  const characteristics = generateTreeCharacteristics(seed, complexity);
  const rng = new SeededRandom(seed);

  const group = new THREE.Group();
  const allBranchTips = [];
  let maxHeight = 0;
  let branchCount = 0;

  const hasLeaves = characteristics.leafDensity > 0.3;

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

  const trunkMaterial = createTrunkMaterial(trunkRgb);
  const leafMaterial = createLeafMaterial(leafRgb);

  const buildBranch = async (
    startPos,
    direction,
    length,
    radius,
    depth,
    parentUp,
    branchRng,
    parentDirection = null,
  ) => {
    const endY = startPos.y + direction.y * length;
    maxHeight = Math.max(maxHeight, endY);

    if (depth <= 0 || length < 0.02) {
      if (hasLeaves && length > 0.01) {
        allBranchTips.push({
          position: startPos.clone(),
          size: Math.max(0.08, radius * characteristics.leafSize * 0.5),
          shape: characteristics.leafShape,
          rng: new SeededRandom(branchRng.next()),
        });
      }
      return;
    }

    const topRadius = radius * characteristics.trunkTaper;
    const segments = complexity === "simple" ? 6 : 8;
    const branchGeometry = new THREE.CylinderGeometry(
      topRadius,
      radius,
      length,
      segments,
    );
    const branchMesh = new THREE.Mesh(branchGeometry, trunkMaterial);

    const endPos = startPos
      .clone()
      .add(direction.clone().multiplyScalar(length));
    branchMesh.position.copy(startPos.clone().add(endPos).multiplyScalar(0.5));
    branchMesh.lookAt(endPos);
    branchMesh.rotateX(Math.PI / 2);

    if (complexity === "full") {
      branchMesh.castShadow = true;
      branchMesh.receiveShadow = true;
    }

    group.add(branchMesh);
    branchCount++;

    if (onProgress && branchCount % 5 === 0) {
      onProgress(branchCount);
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    const maxDepth = characteristics.maxDepth;
    const maxBranches =
      complexity === "simple"
        ? Math.min(characteristics.maxBranches, 50)
        : characteristics.maxBranches;

    if (branchCount >= maxBranches) return;

    let levelBranches;
    if (depth === maxDepth) {
      levelBranches = branchRng.int(4, 6);
    } else if (depth === maxDepth - 1) {
      levelBranches = branchRng.int(3, 4);
    } else if (depth === maxDepth - 2) {
      levelBranches = branchRng.int(2, 3);
    } else {
      levelBranches = branchRng.int(1, 2);
    }

    const numBranches = levelBranches;

    for (let i = 0; i < numBranches; i++) {
      if (branchCount >= maxBranches) break;

      // Determinar se este galho será de continuidade ou de nó
      const isContinuationBranch =
        parentDirection && branchRng.random() < characteristics.continuityRatio;

      let newDirection;

      if (isContinuationBranch) {
        // GALHO DE CONTINUIDADE - curva suave
        const continuityAngleRad =
          (characteristics.continuityAngleLimit * Math.PI) / 180;

        // Usar a direção do pai como base
        let baseDirection = parentDirection.clone().normalize();

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
        const baseAngleStep = 360 / numBranches;
        const baseAngle = i * baseAngleStep;
        const angleVariation = branchRng.range(
          -baseAngleStep * 0.2,
          baseAngleStep * 0.2,
        );
        const asymmetryInfluence =
          characteristics.asymmetryFactor * branchRng.range(-20, 20);

        const depthRatio = depth / characteristics.maxDepth;
        const depthBasedUpwardBias = depthRatio * 0.2;

        const horizontalAngle =
          ((baseAngle + angleVariation + asymmetryInfluence) * Math.PI) / 180;

        let verticalAngle =
          (characteristics.branchingAngle *
            branchRng.range(0.3, 1.5) *
            Math.PI) /
          180;
        verticalAngle += (characteristics.upwardBias * Math.PI) / 12;
        verticalAngle += (depthBasedUpwardBias * Math.PI) / 10;

        let baseDirection = new THREE.Vector3(0, 1, 0);

        newDirection = baseDirection.clone();
        newDirection.applyAxisAngle(baseDirection, horizontalAngle);

        const horizontalAxis = new THREE.Vector3()
          .crossVectors(newDirection, baseDirection)
          .normalize();
        if (horizontalAxis.length() > 0) {
          newDirection.applyAxisAngle(horizontalAxis, verticalAngle);
        }

        if (characteristics.branchOpenness > 4.0) {
          const roundnessBoost =
            characteristics.branchOpenness > 5.0 ? 1.5 : 1.0;
          const additionalSpread =
            branchRng.range(-Math.PI / 8, Math.PI / 8) * roundnessBoost;
          const randomAxis = new THREE.Vector3(
            branchRng.range(-1, 1),
            branchRng.range(-0.2, 0.2),
            branchRng.range(-1, 1),
          ).normalize();
          newDirection.applyAxisAngle(randomAxis, additionalSpread);
        }

        const variation =
          characteristics.naturalVariation * (0.5 + depthRatio * 0.5);
        newDirection.x += branchRng.range(-variation, variation);
        newDirection.y += branchRng.range(-variation * 0.2, variation * 0.2);
        newDirection.z += branchRng.range(-variation, variation);
        newDirection.normalize();
      }

      await buildBranch(
        endPos.clone(),
        newDirection,
        length * characteristics.lengthReduction * branchRng.range(0.7, 1.3),
        radius * characteristics.radiusReduction * branchRng.range(0.7, 1.3),
        depth - 1,
        parentUp.clone(),
        new SeededRandom(branchRng.next()),
        direction.clone(),
      );
    }
  };

  const trunkDirection = new THREE.Vector3(
    rng.range(-characteristics.trunkLean, characteristics.trunkLean),
    1,
    rng.range(-characteristics.trunkLean, characteristics.trunkLean),
  ).normalize();

  await buildBranch(
    new THREE.Vector3(0, 0, 0),
    trunkDirection,
    characteristics.trunkHeight,
    characteristics.trunkThickness,
    characteristics.maxDepth,
    new THREE.Vector3(0, 1, 0),
    new SeededRandom(rng.next()),
    null,
  );

  const rootMesh = createTreeRoots(
    characteristics.trunkThickness,
    trunkDirection,
    trunkMaterial,
    characteristics,
  );
  group.add(rootMesh);

  if (hasLeaves && allBranchTips.length > 0) {
    for (const leafData of allBranchTips) {
      const finalSize =
        leafData.size *
        leafData.rng.range(
          1 / characteristics.leafVariation,
          characteristics.leafVariation,
        ) *
        (complexity === "simple" ? 1.2 : 1.5);

      const leafGeometry = createLeafGeometry(
        finalSize,
        leafData.shape,
        complexity,
      );
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.copy(leafData.position);

      leaf.rotation.x = leafData.rng.range(0, Math.PI * 2);
      leaf.rotation.y = leafData.rng.range(0, Math.PI * 2);
      leaf.rotation.z = leafData.rng.range(0, Math.PI * 2);

      if (complexity === "full") {
        leaf.castShadow = true;
        leaf.receiveShadow = true;
      }

      group.add(leaf);

      const clusterCount =
        complexity === "simple"
          ? Math.min(characteristics.leafClusters, 2)
          : characteristics.leafClusters;

      for (let k = 0; k < clusterCount; k++) {
        const clusterLeaf = leaf.clone();
        const clusterVariation = finalSize * 0.3;
        clusterLeaf.position.add(
          new THREE.Vector3(
            leafData.rng.range(-clusterVariation, clusterVariation),
            leafData.rng.range(-clusterVariation, clusterVariation),
            leafData.rng.range(-clusterVariation, clusterVariation),
          ),
        );
        clusterLeaf.scale.setScalar(leafData.rng.range(0.8, 1.2));

        clusterLeaf.rotation.x = leafData.rng.range(0, Math.PI * 2);
        clusterLeaf.rotation.y = leafData.rng.range(0, Math.PI * 2);
        clusterLeaf.rotation.z = leafData.rng.range(0, Math.PI * 2);

        group.add(clusterLeaf);
      }
    }
  }

  return { group, height: maxHeight, characteristics };
};
