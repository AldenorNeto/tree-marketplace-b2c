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
