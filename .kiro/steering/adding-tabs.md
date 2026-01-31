# Adicionando Novas Abas no Tree Marketplace

## Sistema de Query Parameters

O projeto agora usa um sistema baseado em query parameters (`?aba=1`, `?aba=2`, etc.) ao invés de rotas separadas.

**Mapeamento atual:**

- `?aba=1` → Shop (Explore)
- `?aba=2` → Create (Live View)
- `?aba=3` → Registro
- `?aba=4` → Cenario

## Processo Completo para Nova Aba

### 1. Criar a View (src/views/)

```vue
<template>
  <div class="nova-aba-page">
    <!-- Conteúdo da página -->
  </div>
</template>

<script setup>
const props = defineProps({
  isDark: Boolean,
  initialSeed: String, // Se precisar de seed
});
</script>

<style scoped>
.nova-aba-page {
  /* Estilos específicos */
}
</style>
```

### 2. Atualizar o tabMap no App.vue

Adicione a nova aba no objeto `tabMap`:

```javascript
const tabMap = {
  1: "Shop",
  2: "Create",
  3: "Registro",
  4: "Cenario",
  5: "NovaAba", // ← Adicionar aqui
};
```

### 3. Adicionar ao App.vue

**🚨 CRÍTICO: SEMPRE FAÇA O IMPORT PRIMEIRO! 🚨**

**SEM O IMPORT = ABA FICA BRANCA E NÃO FUNCIONA!**

Esta é a etapa mais esquecida e que causa 90% das falhas. NUNCA pule esta etapa!

**PASSO A PASSO OBRIGATÓRIO:**

**1. PRIMEIRO - Adicionar Import (OBRIGATÓRIO):**

**🔥 EXEMPLOS PRÁTICOS DE IMPORTS:**

```vue
<script setup>
// Se o arquivo for TudoNosso.vue:
import TudoNosso from "./views/TudoNosso.vue";

// Se o arquivo for NadaDeles.vue:
import NadaDeles from "./views/NadaDeles.vue";

// Se o arquivo for MinhaAba.vue:
import MinhaAba from "./views/MinhaAba.vue";

// Se o arquivo for ConfigView.vue:
import ConfigView from "./views/ConfigView.vue";

// Se o arquivo for PerfilUsuario.vue:
import PerfilUsuario from "./views/PerfilUsuario.vue";

// Se o arquivo for NomesView.vue:
import NomesView from "./views/NomesView.vue";

// REGRA: Nome do arquivo SEM .vue = Nome do import
// ... outros imports
</script>
```

**🚨 ATENÇÃO: O NOME DO IMPORT DEVE SER EXATAMENTE O NOME DO ARQUIVO (sem .vue)!**

**2. SEGUNDO - Adicionar Template:**

**🔥 EXEMPLOS PRÁTICOS DE TEMPLATES:**

```vue
<template>
  <!-- Se o arquivo for TudoNosso.vue: -->
  <TudoNosso
    v-if="currentPage === 'TudoNosso'"
    :isDark="isDark"
    :initialSeed="selectedSeed"
  />

  <!-- Se o arquivo for NadaDeles.vue: -->
  <NadaDeles
    v-if="currentPage === 'NadaDeles'"
    :isDark="isDark"
    :initialSeed="selectedSeed"
  />

  <!-- Se o arquivo for MinhaAba.vue: -->
  <MinhaAba
    v-if="currentPage === 'MinhaAba'"
    :isDark="isDark"
    :initialSeed="selectedSeed"
  />

  <!-- Se o arquivo for ConfigView.vue: -->
  <ConfigView
    v-if="currentPage === 'ConfigView'"
    :isDark="isDark"
    :initialSeed="selectedSeed"
  />
</template>
```

**🚨 REGRA: Nome do componente no template = Nome do import = Nome do arquivo!**

**⚠️ ATENÇÃO: Se você adicionar só o template sem o import, a aba ficará BRANCA!**

### 4. Adicionar Botão na Navbar (src/components/Navbar.vue)

```vue
<button
  @click="setPage(5)"
  :class="{ active: currentPage === 'NovaAba' }"
  class="nav-button"
>
  Nome da Aba
</button>
```

## Padrões Obrigatórios

- **Props padrão**: `isDark` (Boolean), `initialSeed` (String opcional)
- **Classe CSS**: `.{nome}-page` para container principal
- **Número da aba**: Próximo número disponível no tabMap
- **Import**: PascalCase para componente
- **Navbar**: Texto em português, função `setPage(número)` com número da aba

## Exemplo Completo: Aba "Grass" (aba 5)

1. **View**: `src/views/CreateGrass.vue`
2. **tabMap**: `5: "CreateGrass"` no App.vue
3. **Import**: `import CreateGrass from "./views/CreateGrass.vue";` no App.vue
4. **Template**: `<CreateGrass v-if="currentPage === 'CreateGrass'" :isDark="isDark" :initialSeed="selectedSeed" />` no App.vue
5. **Navbar**: `<button @click="setPage(5)" :class="{ active: currentPage === 'CreateGrass' }">Grass</button>`

## Checklist Rápido

- [ ] View criada em `src/views/`
- [ ] **🚨 CRÍTICO**: Import adicionado em `src/App.vue` (SEM ISSO = ABA BRANCA!)
- [ ] Número adicionado no `tabMap` em `src/App.vue`
- [ ] Template adicionado em `src/App.vue` (SÓ DEPOIS DO IMPORT!)
- [ ] Botão na navbar em `src/components/Navbar.vue` com número correto
- [ ] Props `isDark` e `initialSeed` implementadas
- [ ] Estilos com variáveis CSS do tema

**🔴 LEMBRE-SE: Import primeiro, template depois. Sem import = aba branca!**

## URLs Resultantes

- `/?aba=1` → Shop
- `/?aba=2` → Create
- `/?aba=3` → Registro
- `/?aba=4` → Cenario
- `/?aba=5` → Nova Aba

## ⚠️ ERRO MAIS COMUM - ABA BRANCA

**SINTOMA**: Aba não funciona, página fica BRANCA, sem erros no console
**CAUSA**: Esqueceu de adicionar o import no App.vue (90% dos casos)
**SOLUÇÃO**:

1. Abrir `src/App.vue`
2. Verificar se o import está presente:

```javascript
// ✅ CORRETO - Import presente = aba funciona
import NovaAbaView from "./views/NovaAbaView.vue";

// ❌ ERRO - Import ausente = aba fica BRANCA
// (só template sem import não funciona!)
```

**🔴 REGRA DE OURO: IMPORT PRIMEIRO, TEMPLATE DEPOIS!**

## 🚨 TROUBLESHOOTING - Aba Não Funciona

### Problema: Aba não carrega, página em branco

**1. Verificar Import (90% dos casos)**

```javascript
// Abrir src/App.vue e verificar se existe:
import NovaAba from "./views/NovaAba.vue";

// 🚨 SE NÃO TIVER O IMPORT = ABA FICA BRANCA!
```

**2. Verificar tabMap**

```javascript
// Verificar se existe no tabMap do App.vue:
const tabMap = {
  1: "Shop",
  2: "Create",
  3: "Registro",
  4: "Cenario",
  5: "NovaAba", // ← Deve estar aqui
};
```

**3. Verificar Template**

```vue
<!-- Verificar se existe no template do App.vue: -->
<NovaAba
  v-if="currentPage === 'NovaAba'"
  :isDark="isDark"
  :initialSeed="selectedSeed"
/>
```

**4. Verificar Navbar**

```vue
<!-- Verificar se existe em src/components/Navbar.vue: -->
<button
  @click="setPage(5)"
  :class="{ active: currentPage === 'NovaAba' }"
  class="nav-button"
>
  Nome da Aba
</button>
```

### Ordem de Verificação (do mais comum para menos comum):

1. 🔴 **Import ausente no App.vue** (90% dos casos)
2. 🟡 Template ausente no App.vue
3. 🟡 Número ausente no tabMap
4. 🟢 Botão ausente na navbar
5. 🟢 Props incorretas na view
