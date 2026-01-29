<template>
  <div class="shop-page">
    <section class="banner">
      <div class="banner-content">
        <h1>🌳 Tree Marketplace</h1>
        <p>Encontre a árvore perfeita para seu jardim</p>
      </div>
    </section>

    <section class="products">
      <div class="product-grid">
        <!-- Árvores normais (8 primeiras) -->
        <div
          v-for="(tree, index) in trees"
          :key="`tree-${tree.seed}-${index}`"
          class="product-card"
        >
          <div class="tree-canvas-preview">
            <TreeGridCell
              :key="`cell-${tree.seed}`"
              :isDark="isDark"
              :seed="tree.seed"
              :shouldFreeze="true"
              :cardIndex="index"
            />
          </div>
          <div class="card-footer">
            <p class="seed-code">{{ tree.seed }}</p>
            <button
              class="view-button"
              title="Ver árvore em detalhes"
              @click="zoomIntoTree(tree.seed)"
            >
              <Search :size="22" :stroke-width="2.5" />
            </button>
          </div>
        </div>

        <!-- Registro vazio com spinner (9º item) -->
        <div ref="spinnerCard" class="product-card empty-card">
          <div class="tree-canvas-preview">
            <div class="loading-spinner-container">
              <div class="loading-spinner"></div>
            </div>
          </div>
          <div class="card-footer">
            <p class="seed-code empty-seed">---</p>
            <button class="view-button disabled" title="Carregando..." disabled>
              <Search :size="22" :stroke-width="2.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { Search } from "lucide-vue-next";
import { onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import TreeGridCell from "../components/TreeGridCell.vue";
import { useSeeds } from "../composables/useSeeds.js";

const props = defineProps({
  isDark: Boolean,
});

const emit = defineEmits(["zoom-tree"]);

const router = useRouter();
const { generateRandomSeed } = useSeeds();

const trees = ref([]);
const spinnerCard = ref(null);

let observer = null;

const zoomIntoTree = (seed) => {
  emit("zoom-tree", seed);
  router.push("/create");
};

const generateMoreTrees = () => {
  // Adicionar mais 8 árvores ao array existente
  for (let i = 0; i < 8; i++) {
    trees.value.push({
      seed: generateRandomSeed(),
    });
  }
};

const setupSpinnerObserver = () => {
  if (!spinnerCard.value) return;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          generateMoreTrees();
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the spinner is visible
      rootMargin: "0px",
    },
  );

  observer.observe(spinnerCard.value);
};

onMounted(() => {
  // Generate 8 trees
  for (let i = 0; i < 8; i++) {
    trees.value.push({
      seed: generateRandomSeed(),
    });
  }

  // Setup spinner visibility observer
  setTimeout(() => {
    setupSpinnerObserver();
  }, 100);
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});
</script>

<style scoped>
.shop-page {
  min-height: calc(100vh - 80px);
}

.banner {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.banner-content h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  color: white;
}

.banner-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-button {
  background: white;
  color: #27ae60;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 50px;
  cursor: pointer;
  font-weight: bold;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

.products {
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  background-color: var(--bg-primary);
}

.products h2 {
  text-align: center;
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}

.product-card {
  background: var(--card-bg);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px var(--shadow);
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  min-height: 320px;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow);
}

.tree-canvas-preview {
  width: 100%;
  height: 240px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--canvas-bg);
  flex-shrink: 0;
  box-shadow: inset 0 2px 8px var(--shadow);
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
}

.seed-code {
  color: #27ae60;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  font-family: "Courier New", monospace;
  letter-spacing: 2px;
  background: var(--bg-secondary);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  border: 2px solid #27ae60;
  display: inline-block;
  flex-shrink: 0;
}

.view-button {
  background: #27ae60;
  color: white;
  border: none;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.3rem;
  transition: all 0.3s;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  flex-shrink: 0;
}

.view-button:hover {
  background: #219a52;
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
}

.view-button.disabled {
  background: #95a5a6;
  cursor: not-allowed;
  opacity: 0.6;
}

.view-button.disabled:hover {
  background: #95a5a6;
  transform: none;
  box-shadow: 0 4px 12px rgba(149, 165, 166, 0.3);
}

.empty-card {
  opacity: 0.8;
}

.loading-spinner-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--canvas-bg);
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--text-secondary);
  border-top: 4px solid #27ae60;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  opacity: 0.7;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.empty-seed {
  color: #95a5a6;
  border-color: #95a5a6;
  background: var(--bg-secondary);
  opacity: 0.6;
}

/* Responsive */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 1rem;
  }

  .banner-content h1 {
    font-size: 2rem;
  }

  .banner-content p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
