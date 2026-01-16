import * as THREE from "three";

// Create different leaf shapes (from TreeGenerator3D - more advanced)
export const createLeafGeometry = (size, shape, complexity = "full") => {
  const segments = complexity === "simple" ? 6 : 8;
  const heightSegments = complexity === "simple" ? 4 : 6;

  switch (shape) {
    case 0: // Sphere (default)
      return new THREE.SphereGeometry(size, segments, heightSegments);

    case 1: // Elongated (ellipsoid)
      const elongatedGeometry = new THREE.SphereGeometry(
        size,
        segments,
        heightSegments
      );
      elongatedGeometry.scale(0.8, 2.0, 0.8);
      return elongatedGeometry;

    case 2: // Pointed (cone-like)
      const coneSize = complexity === "simple" ? size * 1.0 : size * 1.2;
      const coneHeight = complexity === "simple" ? size * 2.0 : size * 2.5;
      return new THREE.ConeGeometry(coneSize, coneHeight, segments);

    case 3: // Flat (disc-like)
      const flatGeometry = new THREE.SphereGeometry(
        size,
        segments,
        heightSegments
      );
      const scaleX = complexity === "simple" ? 2.0 : 1.8;
      const scaleY = complexity === "simple" ? 0.2 : 0.4;
      flatGeometry.scale(scaleX, scaleY, scaleX);
      return flatGeometry;

    default:
      return new THREE.SphereGeometry(size, segments, heightSegments);
  }
};

// Create leaf material with color
export const createLeafMaterial = (leafRgb) => {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(leafRgb[0], leafRgb[1], leafRgb[2]),
  });
};

// Create trunk material with color
export const createTrunkMaterial = (trunkRgb) => {
  return new THREE.MeshPhongMaterial({
    color: new THREE.Color(trunkRgb[0], trunkRgb[1], trunkRgb[2]),
  });
};
