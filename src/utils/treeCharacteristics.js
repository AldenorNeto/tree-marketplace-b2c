import { SeededRandom } from "./seededRandom.js";

// Generate simple tree characteristics (lighter version but with more variation)
export const generateSimpleTreeCharacteristics = (seed) => {
  const rng = new SeededRandom(seed);

  return {
    // Trunk characteristics (more variation)
    trunkThickness: rng.range(0.02, 0.12), // Much wider range
    trunkHeight: rng.range(0.6, 2.0), // Bigger range
    trunkTaper: rng.range(0.6, 0.95), // More variation
    trunkLean: rng.range(0.0, 0.1), // Muito reduzido - árvores mais verticais

    // Branching characteristics (more variation)
    branchingFactor: rng.int(5, 7), // More branches, especially near trunk
    branchingAngle: rng.range(15, 110), // Ainda mais amplo - permite galhos quase horizontais
    branchingReduction: rng.range(0.4, 0.9), // More variation
    maxBranches: rng.int(15, 80), // Wider range

    // Growth characteristics (more variation)
    lengthReduction: rng.range(0.4, 0.9), // Much wider range
    radiusReduction: rng.range(0.5, 0.9), // More variation
    maxDepth: rng.int(4, 6), // Allow deeper trees for more levels

    // Leaf characteristics (much more variation)
    leafDensity: rng.range(0.0, 1.0),
    leafSize: rng.range(0.8, 1.5), // Folhas menores mas ainda com variação
    leafClusters: rng.int(1, 3), // Allow more clusters
    leafVariation: rng.range(0.8, 1.2), // Less extreme variation for consistency
    leafShape: rng.int(0, 3),

    // Colors (more variation)
    trunkHue: rng.range(0, 80), // Wider hue range
    trunkSaturation: rng.range(0.2, 0.9), // More saturation variation
    trunkLightness: rng.range(0.15, 0.6), // Wider lightness range
    leafHue: rng.range(40, 180), // Much wider leaf color range
    leafSaturation: rng.range(0.3, 1.0), // More variation
    leafLightness: rng.range(0.25, 0.7), // Wider range

    // Growth pattern (more variation)
    upwardBias: rng.range(-0.2, 0.4), // Less extreme downward bias
    horizontalSpread: rng.range(1.2, 4.0), // Aumentado ainda mais para forçar mais spread horizontal
    branchOpenness: rng.range(0.1, 8.0), // Variação ainda mais extrema: árvores muito achatadas vs muito arredondadas
    asymmetryFactor: rng.range(0.0, 0.5), // Reduzido para não interferir muito na distribuição uniforme
    naturalVariation: rng.range(0.05, 0.4), // More natural variation

    // Root characteristics (new parameters)
    rootHeight: rng.range(0.8, 2.5), // Altura do cone da raiz (multiplicador do trunkThickness)
    rootBaseRadius: rng.range(2.0, 5.0), // Diâmetro da base da raiz (multiplicador do trunkThickness)
    rootTopRadius: rng.range(0.7, 1.3), // Raio do topo da raiz (multiplicador do trunkThickness)
  };
};

// Convert HSL to RGB
export const hslToRgb = (h, s, l) => {
  h /= 360;
  const a = s * Math.min(l, 1 - l);
  const f = (n) => {
    const k = (n + h * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [f(0), f(8), f(4)];
};
