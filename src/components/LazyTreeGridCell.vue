<template>
  <div ref="container" class="lazy-tree-container">
    <!-- Mostrar imagem do cache se disponível -->
    <img
      v-if="treeImage"
      :src="treeImage"
      alt="Cached Tree"
      class="cached-tree-image"
    />
    <!-- Placeholder de loading -->
    <div v-else-if="!isVisible" class="tree-placeholder">
      <div class="loading-spinner"></div>
    </div>
    <!-- TreeGridCell para gerar nova árvore -->
    <TreeGridCell
      v-else-if="isVisible && shouldRender"
      :isDark="isDark"
      :seed="seed"
      :cellIndex="cellIndex"
      @tree-frozen="onTreeFrozen"
    />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import TreeGridCell from "./TreeGridCell.vue";

const props = defineProps({
  isDark: Boolean,
  seed: String,
  cellIndex: Number,
});

const container = ref(null);
const isVisible = ref(false);
const shouldRender = ref(false);
const treeImage = ref(null); // Cache da imagem da árvore

let observer = null;

// Cache de imagens por seed para evitar regeneração
const imageCache = new Map();

// Função chamada quando TreeGridCell congela a árvore
const onTreeFrozen = (imageDataUrl) => {
  const cacheKey = `${props.seed}-${props.isDark}`;
  imageCache.set(cacheKey, imageDataUrl);
  treeImage.value = imageDataUrl;
  shouldRender.value = false; // Não precisa mais do TreeGridCell
};

onMounted(() => {
  // Verificar se já temos a imagem no cache
  const cacheKey = `${props.seed}-${props.isDark}`;
  if (imageCache.has(cacheKey)) {
    treeImage.value = imageCache.get(cacheKey);
    isVisible.value = true;
    shouldRender.value = false; // Não precisa renderizar TreeGridCell
    return;
  }

  // Intersection Observer para lazy loading
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          // Delay para evitar renderizar todas de uma vez
          setTimeout(() => {
            shouldRender.value = true;
          }, props.cellIndex * 200); // Stagger loading
        }
      });
    },
    { threshold: 0.1 },
  );

  if (container.value) {
    observer.observe(container.value);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.lazy-tree-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.cached-tree-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.tree-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--canvas-bg);
  border-radius: 10px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--text-secondary);
  border-top: 3px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
