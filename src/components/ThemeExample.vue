<template>
  <div class="theme-example">
    <h2>Exemplo de Uso do Tema</h2>

    <div class="theme-info">
      <p>
        Tema atual: <strong>{{ isDark ? "Escuro" : "Claro" }}</strong>
      </p>
      <button @click="toggleTheme" class="toggle-btn">
        Alternar para {{ isDark ? "Claro" : "Escuro" }}
      </button>
    </div>

    <div class="demo-card">
      <h3>Card de Demonstração</h3>
      <p>Este card muda de aparência automaticamente com o tema.</p>
      <p>A preferência é salva no localStorage e persiste entre sessões.</p>
    </div>
  </div>
</template>

<script setup>
import { useTheme } from "@/composables/useTheme.js";

// Usa o composable de tema
const { isDark, toggleTheme } = useTheme();
</script>

<style scoped>
.theme-example {
  padding: 2rem;
  background-color: var(--bg-primary);
  color: var(--text-primary);
  min-height: 100vh;
  transition: all 0.3s ease;
}

.theme-info {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: var(--bg-secondary);
  border-radius: 8px;
  box-shadow: 0 2px 4px var(--shadow);
}

.toggle-btn {
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  transition: background-color 0.3s;
}

.toggle-btn:hover {
  background-color: #219a52;
}

.demo-card {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px var(--shadow);
  transition: all 0.3s ease;
}

.demo-card h3 {
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.demo-card p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.5rem;
}
</style>
