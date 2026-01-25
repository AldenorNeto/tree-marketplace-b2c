<script setup>
import { Moon, Sun } from "lucide-vue-next";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import CreateView from "./views/CreateView.vue";
import ShopView from "./views/ShopView.vue";

const route = useRoute();
const router = useRouter();
const currentPage = ref("Create");
const isDark = ref(false);
const selectedSeed = ref(null);

// Sincroniza currentPage com a rota
watch(
  () => route.meta.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = newPage;
    }
  },
  { immediate: true },
);

const setPage = (page) => {
  router.push(`/${page.toLowerCase()}`);
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
};

// Função para lidar com o zoom da árvore vinda da loja
const handleZoomTree = (seed) => {
  selectedSeed.value = seed;
  setPage("Create");
};

// Limpa a seed selecionada quando sai da página Create
watch(currentPage, (newPage) => {
  if (newPage !== "Create") {
    selectedSeed.value = null;
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
      </nav>

      <button @click="toggleTheme" class="theme-toggle">
        <Sun v-if="isDark" :size="20" />
        <Moon v-else :size="20" />
      </button>
    </header>

    <main class="content">
      <!-- Página Faça sua Árvore 3D -->
      <CreateView
        v-if="currentPage === 'Create'"
        :isDark="isDark"
        :initialSeed="selectedSeed"
      />

      <!-- Página Loja -->
      <ShopView
        v-if="currentPage === 'Shop'"
        :isDark="isDark"
        @zoom-tree="handleZoomTree"
      />
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
</style>
