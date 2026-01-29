/**
 * Seed utilities - conversion and validation
 */

/**
 * Converte uma seed string para número de forma consistente
 * Funciona com seeds de qualquer tamanho (8, 12, etc)
 * @param {string} seedStr - Seed em formato string (ex: "A1B2C3D4" ou "A1B2C3D4E5F6")
 * @returns {number} - Número gerado a partir da seed
 */
export const seedToNumber = (seedStr) => {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    const char = seedStr.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// ============================================================================
// SEED VALIDATION
// ============================================================================

export const isValidSeed = (seed) => {
  if (!seed || typeof seed !== "string") return false;

  const length = seed.length;
  const isValidLength = length === 8 || length === 12;
  const isAlphanumeric = /^[A-Z0-9]*$/i.test(seed);

  return isValidLength && isAlphanumeric;
};

export const isValidSeedLength = (seed) => {
  if (!seed) return false;
  const length = seed.length;
  return length === 8 || length === 12;
};

export const isValidSeedCharacters = (seed) => {
  if (!seed) return false;
  return /^[A-Z0-9]*$/i.test(seed);
};

export const getSeedComplexity = (seed) => {
  return seed && seed.length === 8 ? "simple" : "full";
};

export const normalizeSeed = (seed) => {
  return seed ? seed.toUpperCase() : "";
};
