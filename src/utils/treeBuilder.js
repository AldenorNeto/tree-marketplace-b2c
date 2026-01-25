import * as THREE from "three";
import {
  createLeafGeometry,
  createLeafMaterial,
  createTrunkMaterial,
} from "./leafGeometry.js";
import { SeededRandom } from "./seededRandom.js";
import {
  generateSimpleTreeCharacteristics,
  hslToRgb,
} from "./treeCharacteristics.js";
import { createTreeRoots } from "./treeRoots.js";

// Build tree with different complexity levels
const buildTree = async (seed, complexity = "simple", onProgress = null) => {
  const characteristics = generateSimpleTreeCharacteristics(seed);
  const rng = new SeededRandom(seed);

  const group = new THREE.Group();
  const allBranchTips = [];
  let maxHeight = 0;
  let branchCount = 0;

  // Global decision: does this tree have leaves?
  const hasLeaves = characteristics.leafDensity > 0.3;

  // Generate colors
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

  // Build branches function
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
    // Update max height
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

    // Create branch
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

    // Progress callback for async building
    if (onProgress && branchCount % 5 === 0) {
      onProgress(branchCount);
      // Allow UI to update
      await new Promise((resolve) => setTimeout(resolve, 1));
    }

    // Add child branches with complexity-based limits
    const maxDepth = characteristics.maxDepth;
    const maxBranches =
      complexity === "simple"
        ? Math.min(characteristics.maxBranches, 50)
        : characteristics.maxBranches;

    if (branchCount >= maxBranches) return;

    // Define branching per level
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

      // Angular distribution
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

      // Direction calculation with parent continuity
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

      // 3D variation for rounded trees
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

  // Build trunk and branches
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

  // Add roots
  const rootMesh = createTreeRoots(
    characteristics.trunkThickness,
    trunkDirection,
    trunkMaterial,
    characteristics,
  );
  group.add(rootMesh);

  // Add leaves
  if (hasLeaves && allBranchTips.length > 0) {
    for (const leafData of allBranchTips) {
      const finalSize =
        leafData.size *
        leafData.rng.range(
          1 / characteristics.leafVariation,
          characteristics.leafVariation,
        ) *
        (complexity === "simple" ? 1.2 : 1.5);

      // Create main leaf
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

      // Add leaf clusters
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

export { buildTree };
