import * as THREE from "three";
import { SeededRandom } from "./seededRandom.js";

// Create root cone at the base of a tree for more natural look
export const createTreeRoots = (
  trunkThickness,
  trunkDirection,
  trunkMaterial,
  seed
) => {
  const rng = new SeededRandom(seed + 54321); // Offset seed for roots

  const rootHeight = trunkThickness * rng.range(1.5, 3.0); // Altura proporcional ao tronco
  const rootTopRadius = trunkThickness * rng.range(0.8, 1.2); // Raio do topo similar ao tronco
  const rootBottomRadius = trunkThickness * rng.range(2.0, 4.0); // Raio da base bem maior

  // Usar CylinderGeometry para cone truncado (mais controle)
  const rootGeometry = new THREE.CylinderGeometry(
    rootTopRadius, // Raio do topo (menor - conecta ao tronco)
    rootBottomRadius, // Raio da base (maior - raízes)
    rootHeight, // Altura
    8 // Segmentos radiais
  );

  const rootMesh = new THREE.Mesh(rootGeometry, trunkMaterial);

  // Posicionar o cone na base do tronco
  rootMesh.position.set(0, -rootHeight * 0.4, 0); // Enterrar mais no chão

  // Inclinar ligeiramente se o tronco estiver inclinado
  const trunkLean = Math.sqrt(
    trunkDirection.x * trunkDirection.x + trunkDirection.z * trunkDirection.z
  );
  if (trunkLean > 0.05) {
    rootMesh.rotation.x = trunkDirection.x * 0.2;
    rootMesh.rotation.z = trunkDirection.z * 0.2;
  }

  return rootMesh;
};
