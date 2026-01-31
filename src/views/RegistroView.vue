<template>
  <div class="registro-page">
    <div class="canvas-container">
      <TreeGenerator3D
        ref="treeGenerator"
        :isDark="isDark"
        :noGrass="true"
        :fixedCamera="true"
        class="tree-canvas-3d"
      />

      <button
        @click="handleDownloadTree"
        :disabled="treeGenerator?.isGenerating?.()"
        class="download-button"
        title="Baixar árvore como PNG"
      >
        <Download :size="18" />
        Baixar PNG
      </button>
    </div>
  </div>
</template>

<script setup>
import { Download } from "lucide-vue-next";
import { onMounted, ref, watch } from "vue";
import TreeGenerator3D from "../components/TreeGenerator3D.vue";
import { useSeeds } from "../composables/useSeeds.js";

const props = defineProps({
  isDark: Boolean,
  initialSeed: String,
});

const treeGenerator = ref(null);

const {
  seedInput,
  showSeedActions,
  isValidSeed,
  generateFullSeed,
  handleSeedBlur,
} = useSeeds();

const handleRefreshClick = async () => {
  if (!treeGenerator.value) return;

  try {
    const newSeed = generateFullSeed(12);
    seedInput.value = newSeed;

    if (treeGenerator.value.generateTreeFromSeed) {
      await treeGenerator.value.generateTreeFromSeed(newSeed);
    }
  } catch (error) {
    console.error("Erro ao gerar nova árvore:", error);
  }
};

const handleConfirmSeed = async () => {
  if (!treeGenerator.value || !isValidSeed.value) return;

  try {
    const normalizedSeed = seedInput.value.toUpperCase().trim();

    if (treeGenerator.value.generateTreeFromSeed) {
      await treeGenerator.value.generateTreeFromSeed(normalizedSeed);
      showSeedActions.value = false;
    }
  } catch (error) {
    console.error("Erro ao confirmar seed:", error);
  }
};

const handleCancelSeed = () => {
  if (!treeGenerator.value) {
    showSeedActions.value = false;
    return;
  }

  try {
    if (treeGenerator.value.getCurrentSeed) {
      const currentSeed = treeGenerator.value.getCurrentSeed();
      seedInput.value = currentSeed;
    }
    showSeedActions.value = false;
  } catch (error) {
    console.error("Erro ao cancelar seed:", error);
    showSeedActions.value = false;
  }
};

const handleCopySeed = async () => {
  if (!treeGenerator.value) return;

  try {
    if (treeGenerator.value.getCurrentSeed) {
      const currentSeed = treeGenerator.value.getCurrentSeed();

      try {
        await navigator.clipboard.writeText(currentSeed);
        seedInput.value = currentSeed;
      } catch (clipboardError) {
        console.error(
          "Erro ao copiar para área de transferência:",
          clipboardError,
        );
        seedInput.value = currentSeed;
      }
    }
  } catch (error) {
    console.error("Erro ao copiar seed:", error);
  }
};

const handleDownloadTree = () => {
  if (!treeGenerator.value) return;

  try {
    if (treeGenerator.value.captureAndDownloadTree) {
      treeGenerator.value.captureAndDownloadTree();
    }
  } catch (error) {
    console.error("Erro ao baixar árvore:", error);
  }
};

watch(
  () => props.initialSeed,
  (newSeed) => {
    if (newSeed) {
      seedInput.value = newSeed;
      setTimeout(() => {
        if (treeGenerator.value) {
          treeGenerator.value.generateTreeFromSeed(newSeed);
        }
      }, 100);
    }
  },
);

onMounted(() => {
  if (props.initialSeed) {
    // Se tem seed inicial (vinda da loja), usa ela
    seedInput.value = props.initialSeed;
    setTimeout(() => {
      if (treeGenerator.value) {
        treeGenerator.value.generateTreeFromSeed(props.initialSeed);
      }
    }, 100);
  } else {
    // Senão, gera seed nova de 12 dígitos para modo completo
    const initialSeed = generateFullSeed(12);
    seedInput.value = initialSeed;

    setTimeout(() => {
      if (treeGenerator.value) {
        treeGenerator.value.generateTreeFromSeed(initialSeed);
      }
    }, 100);
  }
});

defineExpose({
  regenerateTree: (seed) => {
    seedInput.value = seed;
    if (treeGenerator.value) {
      treeGenerator.value.generateTreeFromSeed(seed);
    }
  },
});
</script>

<style scoped>
.registro-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 80px);
}

.canvas-container {
  flex: 1;
  display: flex;
  position: relative;
  background-color: var(--canvas-bg);
}

.tree-canvas-3d {
  flex: 1;
  width: 100%;
  height: 100%;
}

/* Botão de Download */
.download-button {
  position: absolute;
  bottom: 24px;
  left: 24px;
  background: linear-gradient(135deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  box-shadow: 0 8px 32px rgba(52, 152, 219, 0.3);
  z-index: 10;
}

.download-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #2980b9, #1f5f8b);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(52, 152, 219, 0.4);
}

.download-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: linear-gradient(135deg, #95a5a6, #7f8c8d);
  box-shadow: 0 4px 16px rgba(149, 165, 166, 0.3);
}

.download-button:disabled:hover {
  transform: none;
}

.seed-input-container {
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
}

.seed-input-group {
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 4px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.seed-input-group.invalid {
  border-color: rgba(231, 76, 60, 0.6) !important;
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3) !important;
}

/* Tema claro - fundo branco */
.light-theme .seed-input-group {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.light-theme .seed-input-group:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
}

/* Tema escuro - fundo escuro */
.dark-theme .seed-input-group {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.dark-theme .seed-input-group:hover {
  background: rgba(0, 0, 0, 0.75);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.seed-input {
  background: transparent;
  border: none;
  padding: 12px 16px;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2px;
  width: 190px;
  text-transform: uppercase;
}

/* Tema claro - texto escuro */
.light-theme .seed-input {
  color: #2c3e50;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.light-theme .seed-input::placeholder {
  color: rgba(0, 0, 0, 0.5);
  text-shadow: none;
}

/* Tema escuro - texto claro */
.dark-theme .seed-input {
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.dark-theme .seed-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.seed-input:focus {
  outline: none;
}

.seed-actions,
.seed-controls {
  display: flex;
  gap: 2px;
  margin-left: 4px;
}

.seed-action,
.seed-control {
  cursor: pointer;
  padding: 10px;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

/* Tema claro - botões claros */
.light-theme .seed-action,
.light-theme .seed-control {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #2c3e50;
}

.light-theme .seed-action:hover,
.light-theme .seed-control:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.25);
  transform: scale(1.05);
}

/* Tema escuro - botões escuros */
.dark-theme .seed-action,
.dark-theme .seed-control {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: white;
}

.dark-theme .seed-action:hover,
.dark-theme .seed-control:hover {
  background: rgba(0, 0, 0, 0.7);
  border-color: rgba(255, 255, 255, 0.3);
  transform: scale(1.05);
}

.seed-action.confirm {
  background: rgba(39, 174, 96, 0.2);
  border-color: rgba(39, 174, 96, 0.4);
  color: #2ecc71;
}

.seed-action.confirm:hover:not(:disabled) {
  background: rgba(39, 174, 96, 0.3);
  border-color: rgba(39, 174, 96, 0.6);
  box-shadow: 0 0 20px rgba(39, 174, 96, 0.3);
}

.seed-action.confirm:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background: rgba(128, 128, 128, 0.2);
  border-color: rgba(128, 128, 128, 0.3);
  color: #999;
}

.seed-action.confirm:disabled:hover {
  transform: none;
  box-shadow: none;
}

.seed-action.cancel {
  background: rgba(231, 76, 60, 0.2);
  border-color: rgba(231, 76, 60, 0.4);
  color: #e74c3c;
}

.seed-action.cancel:hover {
  background: rgba(231, 76, 60, 0.3);
  border-color: rgba(231, 76, 60, 0.6);
  box-shadow: 0 0 20px rgba(231, 76, 60, 0.3);
}

.seed-control.copy:hover {
  color: #3498db;
  box-shadow: 0 0 20px rgba(52, 152, 219, 0.3);
}

.seed-control.refresh:hover {
  color: #f39c12;
  box-shadow: 0 0 20px rgba(243, 156, 18, 0.3);
}

.seed-control:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* Tema claro - fundo branco */
.light-theme .tree-data-modal {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.light-theme .tree-data-modal:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
}

/* Tema escuro - fundo escuro */
.dark-theme .tree-data-modal {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.dark-theme .tree-data-modal:hover {
  background: rgba(0, 0, 0, 0.75);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.tree-data-header {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.tree-icon {
  font-size: 20px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.tree-title {
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
}

.tree-data-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.data-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.data-row:last-child {
  border-bottom: none;
}

.data-label {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  opacity: 0.8;
}

.data-value {
  color: #2ecc71;
  font-weight: 700;
  font-family: "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace;
  font-size: 14px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  background: rgba(46, 204, 113, 0.2);
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid rgba(46, 204, 113, 0.4);
}

.light-theme .data-value {
  color: #0e8c31;
  background: rgba(36, 104, 93, 0.2);
  border: 1px solid rgba(36, 104, 93, 0.4);
  text-shadow: none;
}

/* Painel de Informações do Registro */
.registro-info-panel {
  position: absolute;
  top: 24px;
  right: 24px;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 0;
  min-width: 300px;
  z-index: 10;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Tema claro - fundo branco */
.light-theme .registro-info-panel {
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(0, 0, 0, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.light-theme .registro-info-panel:hover {
  background: rgba(255, 255, 255, 0.85);
  border-color: rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
}

/* Tema escuro - fundo escuro */
.dark-theme .registro-info-panel {
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.dark-theme .registro-info-panel:hover {
  background: rgba(0, 0, 0, 0.75);
  border-color: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.registro-header {
  background: linear-gradient(135deg, #3498db, #2980b9);
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 12px;
}

.registro-icon {
  font-size: 20px;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
}

.registro-title {
  color: white;
  font-weight: 700;
  font-size: 14px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  letter-spacing: 0.5px;
}

.registro-content {
  padding: 20px;
}

.registro-description {
  color: var(--text-primary);
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 16px;
  opacity: 0.8;
}

.registro-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(52, 152, 219, 0.1);
  border: 1px solid rgba(52, 152, 219, 0.2);
}

.feature-icon {
  font-size: 16px;
}

.feature-text {
  color: var(--text-primary);
  font-weight: 600;
  font-size: 13px;
}

/* Responsive */
@media (max-width: 768px) {
  .registro-page {
    flex-direction: column;
  }

  .canvas-container {
    flex-direction: column;
    height: 60vh;
  }

  .registro-info-panel {
    position: relative;
    top: auto;
    right: auto;
    margin: 16px;
    min-width: auto;
  }
}
</style>
