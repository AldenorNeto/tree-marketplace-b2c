<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useTheme } from "./composables/useTheme.js";
import CenarioView from "./views/CenarioView.vue";
import CreateView from "./views/CreateView.vue";
import RegistroView from "./views/RegistroView.vue";
import ShopView from "./views/ShopView.vue";

const route = useRoute();
const router = useRouter();
const selectedSeed = ref(null);

const { isDark, toggleTheme } = useTheme();

// Mapeamento de abas por número
const tabMap = {
  1: "Shop",
  2: "Create",
  3: "Registro",
  4: "Cenario",
};

// Aba padrão é Shop (1)
const currentPage = computed(() => {
  const abaParam = route.query.aba;
  const tabNumber = parseInt(abaParam) || 1;
  return tabMap[tabNumber] || "Shop";
});

const handleZoomTree = (seed) => {
  selectedSeed.value = seed;
  router.push("/?aba=2"); // Vai para Create (aba 2)
};

watch(currentPage, (newPage) => {
  if (newPage !== "Create") {
    selectedSeed.value = null;
  }
});

const setPage = (tabNumber) => {
  router.push(`/?aba=${tabNumber}`);
};
</script>

<template>
  <div :class="{ 'dark-theme': isDark, 'light-theme': !isDark }" class="app">
    <Navbar
      :currentPage="currentPage"
      :isDark="isDark"
      @toggle-theme="toggleTheme"
      @set-page="setPage"
    />

    <main class="content">
      <CreateView
        v-if="currentPage === 'Create'"
        :isDark="isDark"
        :initialSeed="selectedSeed"
      />

      <ShopView
        v-if="currentPage === 'Shop'"
        :isDark="isDark"
        @zoom-tree="handleZoomTree"
      />

      <RegistroView
        v-if="currentPage === 'Registro'"
        :isDark="isDark"
        :initialSeed="selectedSeed"
      />

      <CenarioView
        v-if="currentPage === 'Cenario'"
        :isDark="isDark"
        :initialSeed="selectedSeed"
      />
    </main>
  </div>
</template>

<style>
.light-theme {
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-tertiary: #e9ecef;
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --card-bg: #ffffff;
  --navbar-bg: #2c3e50;
  --shadow: rgba(0, 0, 0, 0.1);
  --canvas-bg: #f0f8f0;
  --border-color: #dee2e6;
  --accent-color: #27ae60;
}

.dark-theme {
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-tertiary: #3a3a3a;
  --text-primary: #ffffff;
  --text-secondary: #b0b0b0;
  --card-bg: #2d2d2d;
  --navbar-bg: #0f0f0f;
  --shadow: rgba(0, 0, 0, 0.3);
  --canvas-bg: #2a2a2a;
  --border-color: #404040;
  --accent-color: #27ae60;
}
</style>

<style scoped>
.app {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

.content {
  padding-top: 60px;
}
</style>
