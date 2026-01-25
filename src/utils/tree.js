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

  const rootHeight = trunkThickness * rng.range(1.5, 3.0);
  const rootTopRadius = trunkThickness * rng.range(0.8, 1.2);
  const rootBottomRadius = trunkThickness * rng.range(2.0, 4.0);

  const rootGeometry = new THREE.CylinderGeometry(
    rootTopRadius,
    rootBottomRadius,
    rootHeight,
    8,
  );

  const rootMesh = new THREE.Mesh(rootGeometry, trunkMaterial);
  rootMesh.position.set(0, -rootHeight * 0.4, 0);

  const trunkLean = Math.sqrt(
    trunkDirection.x * trunkDirection.x + trunkDirection.z * trunkDirection.z,
  );
  if (trunkLean > 0.05) {
    rootMesh.rotation.x = trunkDirection.x * 0.2;
    rootMesh.rotation.z = trunkDirection.z * 0.2;
  }

  return rootMesh;
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
        (characteristics.branchingAngle * branchRng.range(0.3, 1.5) * Math.PI) /
        180;
      verticalAngle += (characteristics.upwardBias * Math.PI) / 12;
      verticalAngle += (depthBasedUpwardBias * Math.PI) / 10;

      let baseDirection = new THREE.Vector3(0, 1, 0);

      if (parentDirection && depth < characteristics.maxDepth) {
        const continuityFactor = Math.min(0.8, depthRatio * 1.0);
        baseDirection = baseDirection.lerp(
          parentDirection.clone().normalize(),
          continuityFactor,
        );
        baseDirection.normalize();
      }

      let newDirection = baseDirection.clone();
      newDirection.applyAxisAngle(baseDirection, horizontalAngle);

      const horizontalAxis = new THREE.Vector3()
        .crossVectors(newDirection, baseDirection)
        .normalize();
      if (horizontalAxis.length() > 0) {
        newDirection.applyAxisAngle(horizontalAxis, verticalAngle);
      }

      if (characteristics.branchOpenness > 4.0) {
        const roundnessBoost = characteristics.branchOpenness > 5.0 ? 1.5 : 1.0;
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
