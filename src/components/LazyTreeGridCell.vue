<template>
  <div ref="container" class="lazy-tree-container">
    <div v-if="!isVisible" class="tree-placeholder">
      <div class="loading-spinner"></div>
    </div>
    <TreeGridCell
      v-else-if="isVisible && shouldRender"
      :isDark="isDark"
      :seed="seed"
      :cellIndex="cellIndex"
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

let observer = null;

onMounted(() => {
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
