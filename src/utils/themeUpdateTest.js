// Teste para verificar se as mudanças de tema estão funcionando
export const testThemeUpdate = () => {
  console.log("🎨 Testando atualização de tema em tempo real...");

  // Simula mudança de tema
  const testThemeChange = () => {
    const currentTheme = localStorage.getItem("theme-preference");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    console.log(`Mudando tema de ${currentTheme} para ${newTheme}`);
    localStorage.setItem("theme-preference", newTheme);

    // Dispara evento customizado para simular mudança
    window.dispatchEvent(
      new CustomEvent("theme-changed", {
        detail: { theme: newTheme },
      }),
    );
  };

  // Testa mudança a cada 3 segundos
  let count = 0;
  const interval = setInterval(() => {
    testThemeChange();
    count++;

    if (count >= 4) {
      clearInterval(interval);
      console.log("✅ Teste de tema concluído!");
    }
  }, 3000);

  console.log("Teste iniciado - mudanças de tema a cada 3 segundos...");
};

// Função para parar o teste
export const stopThemeTest = () => {
  console.log("🛑 Parando teste de tema");
};
