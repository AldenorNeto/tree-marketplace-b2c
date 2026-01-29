import { computed, ref } from "vue";
import { isValidSeed as validateSeed } from "../utils/seedConverter.js";

export function useSeeds() {
  const seedInput = ref("");
  const showSeedActions = ref(false);

  const isValidSeed = computed(() => validateSeed(seedInput.value));

  const generateFullSeed = (length = 12) => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let seed = "";
    for (let i = 0; i < length; i++) {
      seed += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seed;
  };

  const generateRandomSeed = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let seed = "";
    for (let i = 0; i < 8; i++) {
      seed += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return seed;
  };

  const handleSeedBlur = () => {
    setTimeout(() => {
      showSeedActions.value = false;
    }, 200);
  };

  return {
    seedInput,
    showSeedActions,
    isValidSeed,
    generateFullSeed,
    generateRandomSeed,
    handleSeedBlur,
  };
}
