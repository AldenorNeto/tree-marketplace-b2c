// Teste simples para verificar se o tema está sendo salvo corretamente
export const testThemeStorage = () => {
  console.log("🎨 Testando sistema de tema...");

  // Verifica se há um tema salvo
  const savedTheme = localStorage.getItem("theme-preference");
  console.log("Tema salvo:", savedTheme);

  // Verifica a preferência do sistema
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log("Sistema prefere dark mode:", prefersDark);

  // Simula mudança de tema
  localStorage.setItem("theme-preference", "dark");
  console.log("Tema alterado para dark");

  localStorage.setItem("theme-preference", "light");
  console.log("Tema alterado para light");

  console.log("✅ Teste concluído!");
};

// Função para limpar o localStorage (útil para testes)
export const clearThemeStorage = () => {
  localStorage.removeItem("theme-preference");
  console.log("🧹 Tema removido do localStorage");
};
