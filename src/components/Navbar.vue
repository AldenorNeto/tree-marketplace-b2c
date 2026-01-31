<template>
  <header class="navbar">
    <nav>
      <button
        @click="setPage(1)"
        :class="{ active: currentPage === 'Shop' }"
        class="nav-button"
      >
        Explore
      </button>
      <button
        @click="setPage(2)"
        :class="{ active: currentPage === 'Create' }"
        class="nav-button"
      >
        Live View
      </button>
      <button
        @click="setPage(3)"
        :class="{ active: currentPage === 'Registro' }"
        class="nav-button"
      >
        Registro
      </button>
      <button
        @click="setPage(4)"
        :class="{ active: currentPage === 'Cenario' }"
        class="nav-button"
      >
        Cenário
      </button>
    </nav>

    <button @click="toggleTheme" class="theme-toggle">
      <Sun v-if="isDark" :size="20" />
      <Moon v-else :size="20" />
    </button>
  </header>
</template>

<script setup>
import { Moon, Sun } from "lucide-vue-next";

const props = defineProps({
  currentPage: String,
  isDark: Boolean,
});

const emit = defineEmits(["toggle-theme", "set-page"]);

const setPage = (tabNumber) => {
  emit("set-page", tabNumber);
};

const toggleTheme = () => {
  emit("toggle-theme");
};
</script>

<style scoped>
.navbar {
  background-color: var(--navbar-bg);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px var(--shadow);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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
</style>
