import { ref, watch } from "vue";

const THEME_KEY = "theme-preference";

// Estado reativo compartilhado
const isDark = ref(false);

// Função para carregar o tema do localStorage
const loadTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    // Se há um tema salvo, usa ele
    isDark.value = savedTheme === "dark";
  } else {
    // Se não há tema salvo, verifica a preferência do sistema
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    isDark.value = prefersDark;
  }
};

// Função para salvar o tema no localStorage
const saveTheme = (theme) => {
  localStorage.setItem(THEME_KEY, theme);
};

// Função para alternar o tema
const toggleTheme = () => {
  isDark.value = !isDark.value;
};

// Watcher para salvar automaticamente quando o tema muda
watch(
  isDark,
  (newValue) => {
    saveTheme(newValue ? "dark" : "light");
  },
  { immediate: false },
);

// Composable principal
export const useTheme = () => {
  // Carrega o tema na primeira vez que o composable é usado
  if (!isDark.value && localStorage.getItem(THEME_KEY) !== "light") {
    loadTheme();
  }

  return {
    isDark,
    toggleTheme,
    loadTheme,
  };
};
