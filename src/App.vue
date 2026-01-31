<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Navbar from "./components/Navbar.vue";
import { useTheme } from "./composables/useTheme.js";
import CreateView from "./views/CreateView.vue";
import RegistroView from "./views/RegistroView.vue";
import ShopView from "./views/ShopView.vue";
import CenarioView from "./views/CenarioView.vue";

const route = useRoute();
const router = useRouter();
const currentPage = ref("Create");
const selectedSeed = ref(null);

const { isDark, toggleTheme } = useTheme();

watch(
  () => route.meta.page,
  (newPage) => {
    if (newPage) {
      currentPage.value = newPage;
    }
  },
  { immediate: true },
);

const handleZoomTree = (seed) => {
  selectedSeed.value = seed;
  currentPage.value = "Create";
  router.push("/create");
};

watch(currentPage, (newPage) => {
  if (newPage !== "Create") {
    selectedSeed.value = null;
  }
});
</script>

<template>
  <div :class="{ 'dark-theme': isDark, 'light-theme': !isDark }" class="app">
    <Navbar
      :currentPage="currentPage"
      :isDark="isDark"
      @toggle-theme="toggleTheme"
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
  padding: 0;
}

.page {
  min-height: calc(100vh - 80px);
}
</style>
