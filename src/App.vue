<script setup>
import { Check, Copy, Moon, RefreshCw, Search, Sun, X } from "lucide-vue-next";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import TreeGenerator3D from "./components/TreeGenerator3D.vue";
import TreeGridCell from "./components/TreeGridCell.vue";

const route = useRoute();
const router = useRouter();
const currentPage = ref("Create");
const isDark = ref(false);
const treeGenerator = ref(null);

// Sincroniza currentPage com a rota
watch(
  () => route.meta.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = newPage;
    }
  },
  { immediate: true }
);

const setPage = (page) => {
  router.push(`/${page.toLowerCase()}`);
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

const seedInput = ref("");
const showSeedActions = ref(false);

// Valida se a seed tem formato correto (8 ou 12 caracteres alfanuméricos)
const isValidSeed = computed(() => {
  const length = seedInput.value.length;
  const isValidLength = length === 8 || length === 12;
  const isAlphanumeric = /^[A-Z0-9]*$/i.test(seedInput.value);
  return isValidLength && isAlphanumeric;
});

const generateNewTree = async () => {
  if (treeGenerator.value && !treeGenerator.value.isGenerating()) {
    await treeGenerator.value.generateRandomTree();
    syncSeedInput(); // Sincroniza o input com o novo seed
  }
};

const copySeed = async () => {
  if (treeGenerator.value) {
    const seed = treeGenerator.value.getCurrentSeed();
    try {
      await navigator.clipboard.writeText(seed);
      seedInput.value = seed;
      console.log("Seed copiada:", seed); // Debug
    } catch (err) {
      console.error("Erro ao copiar seed:", err);
      seedInput.value = seed;
    }
  }
};

const syncSeedInput = () => {
  if (treeGenerator.value && treeGenerator.value.getCurrentSeed) {
    const currentSeed = treeGenerator.value.getCurrentSeed();
    console.log("Sincronizando seed input:", currentSeed); // Debug
    seedInput.value = currentSeed;
  }
};

onMounted(() => {
  setTimeout(() => {
    if (!seedInput.value) {
      syncSeedInput();
    }
  }, 1000);
});

const confirmSeed = async () => {
  // Aceita seeds de 8 ou 12 caracteres
  if (
    (seedInput.value.length === 8 || seedInput.value.length === 12) &&
    treeGenerator.value
  ) {
    await treeGenerator.value.generateTreeFromSeed(
      seedInput.value.toUpperCase()
    );
    showSeedActions.value = false;
  }
};

const cancelSeed = () => {
  syncSeedInput(); // Restaura o seed atual
  showSeedActions.value = false;
};

const handleSeedBlur = () => {
  setTimeout(() => {
    showSeedActions.value = false;
  }, 200);
};

// Gera seeds aleatórias para a loja
const generateRandomSeed = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let seed = "";
  for (let i = 0; i < 8; i++) {
    seed += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return seed;
};

const trees = ref([]);

// Gera 8 árvores aleatórias no carregamento
onMounted(() => {
  for (let i = 0; i < 8; i++) {
    trees.value.push({
      seed: generateRandomSeed(),
    });
  }
});
</script>

<template>
  <div :class="{ 'dark-theme': isDark, 'light-theme': !isDark }" class="app">
    <header class="navbar">
      <nav>
        <button
          @click="setPage('Create')"
          :class="{ active: currentPage === 'Create' }"
          class="nav-button"
        >
          Faça sua Árvore
        </button>
        <button
          @click="setPage('Shop')"
          :class="{ active: currentPage === 'Shop' }"
          class="nav-button"
        >
          Loja
        </button>
        <button
          @click="setPage('Grid')"
          :class="{ active: currentPage === 'Grid' }"
          class="nav-button"
        >
          Grid
        </button>
      </nav>

      <button @click="toggleTheme" class="theme-toggle">
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
      </button>
    </header>

    <main class="content">
      <!-- Página Faça sua Árvore 3D -->
      <div v-if="currentPage === 'Create'" class="page create-page">
        <div class="canvas-container">
          <TreeGenerator3D
            ref="treeGenerator"
            :isDark="isDark"
            class="tree-canvas-3d"
          />

          <div class="seed-input-container">
            <div
              class="seed-input-group"
              :class="{ invalid: showSeedActions && !isValidSeed }"
            >
              <input
                v-model="seedInput"
                @focus="showSeedActions = true"
                @blur="handleSeedBlur"
                @keyup.enter="confirmSeed"
                @keyup.escape="cancelSeed"
                class="seed-input"
                placeholder="8 ou 12 chars"
                maxlength="12"
              />

              <!-- Ações quando focado -->
              <div v-if="showSeedActions" class="seed-actions">
                <button
                  @click="confirmSeed"
                  :disabled="!isValidSeed"
                  class="seed-action confirm"
                  :title="
                    isValidSeed
                      ? 'Gerar árvore'
                      : 'Seed deve ter 8 ou 12 caracteres'
                  "
                >
                  <Check :size="18" />
                </button>
                <button
                  @click="cancelSeed"
                  class="seed-action cancel"
                  title="Cancelar"
                >
                  <X :size="18" />
                </button>
              </div>

              <!-- Ações normais -->
              <div v-else class="seed-controls">
                <button
                  @click="copySeed"
                  class="seed-control copy"
                  title="Copiar seed"
                >
                  <Copy :size="18" />
                </button>
                <button
                  @click="generateNewTree"
                  class="seed-control refresh"
                  title="Nova seed aleatória"
                >
                  <RefreshCw :size="18" />
                </button>
              </div>
            </div>
          </div>

          <div class="tree-data-modal">
            <div class="tree-data-header">
              <div class="tree-icon">🌳</div>
              <span class="tree-title">Dados da Árvore</span>
            </div>
            <div
              class="tree-data-content"
              v-if="treeGenerator?.getTreeCharacteristics?.()"
            >
              <div class="data-row">
                <span class="data-label">Tronco</span>
                <span class="data-value"
                  >{{
                    (
                      treeGenerator.getTreeCharacteristics().trunkThickness *
                        100 || 0
                    ).toFixed(0)
                  }}cm</span
                >
              </div>
              <div class="data-row">
                <span class="data-label">Altura</span>
                <span class="data-value"
                  >{{
                    (
                      treeGenerator.getTreeCharacteristics().trunkHeight || 0
                    ).toFixed(1)
                  }}m</span
                >
              </div>
              <div class="data-row">
                <span class="data-label">Galhos</span>
                <span class="data-value"
                  >{{
                    treeGenerator.getTreeCharacteristics().branchingFactor
                  }}-1/nó</span
                >
              </div>
              <div class="data-row">
                <span class="data-label">Ângulo</span>
                <span class="data-value"
                  >{{
                    (
                      treeGenerator.getTreeCharacteristics().branchingAngle || 0
                    ).toFixed(0)
                  }}°</span
                >
              </div>
              <div class="data-row">
                <span class="data-label">Folhas</span>
                <span class="data-value"
                  >{{
                    (
                      treeGenerator.getTreeCharacteristics().leafDensity *
                        100 || 0
                    ).toFixed(0)
                  }}%</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Página Loja -->
      <div v-if="currentPage === 'Shop'" class="page">
        <!-- Banner -->
        <section class="banner">
          <div class="banner-content">
            <h1>🌳 Tree Marketplace</h1>
            <p>Encontre a árvore perfeita para seu jardim</p>
            <button class="cta-button">Explorar Árvores</button>
          </div>
        </section>

        <!-- Grid de Produtos -->
        <section class="products">
          <h2>Nossas Árvores</h2>
          <div class="product-grid">
            <div
              v-for="(tree, index) in trees"
              :key="index"
              class="product-card"
            >
              <!-- Canvas com a árvore 3D -->
              <div class="tree-canvas-preview">
                <TreeGridCell :isDark="isDark" :seed="tree.seed" />
              </div>
              <div class="card-footer">
                <p class="seed-code">{{ tree.seed }}</p>
                <button class="view-button" title="Ver árvore">
                  <Search :size="22" :stroke-width="2.5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Página Grid -->
      <div v-if="currentPage === 'Grid'" class="page grid-page">
        <div class="grid-header">
          <h1>🌳 Grid de Árvores</h1>
          <p>Visualize múltiplas árvores em um grid de canvas</p>
        </div>

        <div class="canvas-grid">
          <!-- Grid será preenchido dinamicamente -->
          <div v-for="n in 9" :key="n" class="canvas-cell">
            <TreeGridCell :isDark="isDark" :cellIndex="n" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* Variáveis de tema */
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --card-bg: #ffffff;
  --navbar-bg: #2c3e50;
  --shadow: rgba(0, 0, 0, 0.1);
  --canvas-bg: #f0f8f0;
}

.dark-theme {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --card-bg: #2d2d2d;
  --navbar-bg: #0f0f0f;
  --shadow: rgba(0, 0, 0, 0.3);
  --canvas-bg: #2a2a2a;
}

.app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

/* Navbar */
.navbar {
  background-color: var(--navbar-bg);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 1rem;
}

.nav-button {
  background: none;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-button.active {
  background-color: #27ae60;
}

.theme-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.content {
  padding: 0;
}

.page {
  min-height: calc(100vh - 80px);
}

/* Create Page - 3D Canvas */
.create-page {
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

.canvas-controls {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: var(--card-bg);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px var(--shadow);
  min-width: 300px;
  max-width: 350px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;
}

.canvas-controls h2 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1.5rem;
  text-align: center;
}

.algorithm-info {
  font-size: 0.9rem;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 1.5rem;
  font-style: italic;
}

.control-buttons {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.control-btn {
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, transform 0.2s;
  text-align: center;
  font-size: 1rem;
}

.control-btn:hover {
  background: #219a52;
  transform: translateY(-2px);
}

.control-btn.primary {
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  font-size: 1.1rem;
  padding: 1.2rem;
}

.algorithm-info-detail {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.85rem;
}

.algorithm-info-detail h3 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 1rem;
}

.algorithm-info-detail ul {
  margin: 0;
  padding-left: 1rem;
  color: var(--text-secondary);
}

.algorithm-info-detail li {
  margin-bottom: 0.3rem;
}

.info-box {
  background: linear-gradient(
    135deg,
    rgba(39, 174, 96, 0.1),
    rgba(46, 204, 113, 0.1)
  );
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #27ae60;
}

.info-box p {
  margin: 0.3rem 0;
  font-size: 0.9rem;
  color: var(--text-primary);
}

.seed-display {
  background: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  border: 2px solid #27ae60;
}

.seed-display h4 {
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
  font-size: 0.9rem;
}

.flex {
  display: flex;
  gap: 1rem;
}

.seed-code {
  background: var(--card-bg);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-family: "Courier New", monospace;
  font-size: 1.2rem;
  font-weight: bold;
  color: #27ae60;
  border: 1px solid #27ae60;
  display: inline-block;
  letter-spacing: 2px;
}

.species-display {
  margin-top: 0.8rem;
  padding: 0.5rem;
  background: linear-gradient(
    135deg,
    rgba(39, 174, 96, 0.1),
    rgba(46, 204, 113, 0.1)
  );
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 1rem;
}

/* Banner */
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

/* Products */
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
  transition: transform 0.3s, box-shadow 0.3s;
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

.tree-emoji {
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  flex-shrink: 0;
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

.product-card h3 {
  color: var(--text-primary);
  margin: 0;
  font-size: 1.2rem;
  line-height: 1.3;
  flex-shrink: 0;
}

.product-card .seed-code {
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

/* Grid Page */
.grid-page {
  padding: 2rem;
  background-color: var(--bg-primary);
  min-height: calc(100vh - 80px);
}

.grid-header {
  text-align: center;
  margin-bottom: 3rem;
}

.grid-header h1 {
  color: var(--text-primary);
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.grid-header p {
  color: var(--text-secondary);
  font-size: 1.2rem;
}

.canvas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.canvas-cell {
  aspect-ratio: 1;
  background: var(--card-bg);
  border-radius: 15px;
  box-shadow: 0 5px 15px var(--shadow);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
}

.canvas-cell:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow);
}

/* Responsive */
@media (max-width: 768px) {
  .canvas-controls {
    position: static;
    margin: 1rem;
    width: auto;
    min-width: auto;
    max-width: none;
    max-height: none;
  }

  .create-page {
    flex-direction: column;
  }

  .canvas-container {
    flex-direction: column;
    height: 60vh;
  }

  /* Grid responsive */
  .canvas-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    padding: 0 1rem;
  }

  .grid-header h1 {
    font-size: 2rem;
  }

  .grid-header p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .canvas-grid {
    grid-template-columns: 1fr;
  }
}

/* Estilos adicionais que estavam fora da tag style */
.characteristics-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.char-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 0.5rem;
  background: var(--card-bg);
  border-radius: 4px;
  font-size: 0.85rem;
}

.char-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.char-value {
  color: #27ae60;
  font-weight: bold;
  font-family: "Courier New", monospace;
}

.control-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  background: #95a5a6;
}

.control-btn:disabled:hover {
  background: #95a5a6;
  transform: none;
}

.control-btn.generating {
  background: linear-gradient(135deg, #f39c12, #e67e22);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}

.phase-text {
  font-size: 0.8rem;
  opacity: 0.9;
  margin-top: 0.3rem;
  font-weight: normal;
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

/* Modal de Dados da Árvore - Design Moderno */
.tree-data-modal {
  position: absolute;
  bottom: 24px;
  right: 24px;
  backdrop-filter: blur(12px);
  border-radius: 20px;
  padding: 0;
  min-width: 280px;
  z-index: 10;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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

.seed-value {
  letter-spacing: 2px;
  font-size: 12px;
}
</style>
