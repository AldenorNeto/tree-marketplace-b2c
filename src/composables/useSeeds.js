import { computed, ref } from "vue";
import { normalizeSeed, isValidSeed as validateSeed } from "../utils/seed.js";

export function useSeeds() {
  const seedInput = ref("");
  const showSeedActions = ref(false);

  // Valida se a seed tem formato correto
  const isValidSeed = computed(() => validateSeed(seedInput.value));

  // Gera seed de 8 ou 12 caracteres para o gerador 3D
  const generateFullSeed = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let seed = "";
    for (let i = 0; i < length; i++) {
      seed += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seed;
  };

  // Gera seeds aleatórias de 8 caracteres para a loja
  const generateRandomSeed = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let seed = "";
    for (let i = 0; i < 8; i++) {
      seed += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seed;
  };

  const confirmSeed = async (treeGenerator) => {
    if (isValidSeed.value && treeGenerator.value) {
      await treeGenerator.value.generateTreeFromSeed(
        normalizeSeed(seedInput.value)
      );
      showSeedActions.value = false;
    }
  };

  const cancelSeed = (treeGenerator) => {
    syncSeedInput(treeGenerator);
    showSeedActions.value = false;
  };

  const handleSeedBlur = () => {
    setTimeout(() => {
      showSeedActions.value = false;
    }, 200);
  };

  const copySeed = async (treeGenerator) => {
    if (treeGenerator.value) {
      const seed = treeGenerator.value.getCurrentSeed();
      try {
        await navigator.clipboard.writeText(seed);
        seedInput.value = seed;
      } catch (err) {
        console.error("Erro ao copiar seed:", err);
        seedInput.value = seed;
      }
    }
  };

  const syncSeedInput = (treeGenerator) => {
    if (treeGenerator.value && treeGenerator.value.getCurrentSeed) {
      const currentSeed = treeGenerator.value.getCurrentSeed();
      seedInput.value = currentSeed;
    }
  };

  const generateNewTree = async (treeGenerator, seedLength = 12) => {
    if (treeGenerator.value && !treeGenerator.value.isGenerating()) {
      // Gera nova seed e mostra imediatamente no input
      const newSeed = generateFullSeed(seedLength);
      seedInput.value = newSeed;

      // Depois gera a árvore com essa seed
      await treeGenerator.value.generateTreeFromSeed(newSeed);
    }
  };

  return {
    seedInput,
    showSeedActions,
    isValidSeed,
    generateFullSeed,
    generateRandomSeed,
    confirmSeed,
    cancelSeed,
    handleSeedBlur,
    copySeed,
    syncSeedInput,
    generateNewTree,
  };
}
