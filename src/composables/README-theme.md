# Sistema de Tema com localStorage

## Como usar

O sistema de tema foi implementado usando um composable Vue que automaticamente:

1. **Salva a preferência no localStorage**
2. **Carrega a preferência salva na inicialização**
3. **Detecta a preferência do sistema se não houver tema salvo**
4. **Sincroniza entre todas as instâncias do composable**

### Uso básico

```javascript
import { useTheme } from "@/composables/useTheme.js";

export default {
  setup() {
    const { isDark, toggleTheme } = useTheme();

    return {
      isDark,
      toggleTheme,
    };
  },
};
```

### Funcionalidades

- **isDark**: Reativo boolean que indica se o tema escuro está ativo
- **toggleTheme()**: Função para alternar entre temas
- **loadTheme()**: Função para recarregar o tema (raramente necessária)

### Armazenamento

- **Chave**: `theme-preference`
- **Valores**: `'dark'` ou `'light'`
- **Fallback**: Preferência do sistema operacional

### Teste no console

```javascript
// Verificar tema atual
localStorage.getItem("theme-preference");

// Definir tema manualmente
localStorage.setItem("theme-preference", "dark");
localStorage.setItem("theme-preference", "light");

// Limpar preferência (volta para preferência do sistema)
localStorage.removeItem("theme-preference");
```
