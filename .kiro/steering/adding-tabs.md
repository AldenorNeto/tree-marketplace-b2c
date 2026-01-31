# Adicionando Novas Abas no Tree Marketplace

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

### 2. Registrar Rota (src/router/index.js)

```javascript
{
  path: "/nova-aba",
  name: "NovaAba",
  component: App,
  meta: { page: "NovaAba" },
}
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
  @click="setPage('NovaAba')"
  :class="{ active: currentPage === 'NovaAba' }"
  class="nav-button"
>
  Nome da Aba
</button>
```

## Padrões Obrigatórios

- **Props padrão**: `isDark` (Boolean), `initialSeed` (String opcional)
- **Classe CSS**: `.{nome}-page` para container principal
- **Rota**: kebab-case no path, PascalCase no name e meta.page
- **Import**: PascalCase para componente
- **Navbar**: Texto em português, função `setPage()` com PascalCase

## Exemplo Completo: Aba "Grass"

1. **View**: `src/views/CreateGrass.vue`
2. **Rota**: `{ path: "/grass", name: "grass", meta: { page: "grass" } }`
3. **App**: `<CreateGrass v-if="currentPage === 'grass'" :isDark="isDark" :initialSeed="selectedSeed" />`
4. **Navbar**: `<button @click="setPage('grass')" :class="{ active: currentPage === 'grass' }">Grass</button>`

## Checklist Rápido

- [ ] View criada em `src/views/`
- [ ] Rota adicionada em `src/router/index.js`
- [ ] **🚨 CRÍTICO**: Import adicionado em `src/App.vue` (SEM ISSO = ABA BRANCA!)
- [ ] Template adicionado em `src/App.vue` (SÓ DEPOIS DO IMPORT!)
- [ ] Botão na navbar em `src/components/Navbar.vue`
- [ ] Props `isDark` e `initialSeed` implementadas
- [ ] Estilos com variáveis CSS do tema

**🔴 LEMBRE-SE: Import primeiro, template depois. Sem import = aba branca!**

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

**🔥 EXEMPLOS DE VERIFICAÇÃO DE IMPORTS:**

```javascript
// Abrir src/App.vue e verificar se existe um destes:

// Para TudoNosso.vue:
import TudoNosso from "./views/TudoNosso.vue";

// Para NadaDeles.vue:
import NadaDeles from "./views/NadaDeles.vue";

// Para MinhaAba.vue:
import MinhaAba from "./views/MinhaAba.vue";

// Para ConfigView.vue:
import ConfigView from "./views/ConfigView.vue";

// Para PerfilUsuario.vue:
import PerfilUsuario from "./views/PerfilUsuario.vue";

// 🚨 SE NÃO TIVER O IMPORT = ABA FICA BRANCA!
```

**2. Verificar Template**

**🔥 EXEMPLOS DE VERIFICAÇÃO DE TEMPLATES:**

```vue
<!-- Verificar se existe um destes no template do App.vue: -->

<!-- Para TudoNosso.vue: -->
<TudoNosso
  v-if="currentPage === 'TudoNosso'"
  :isDark="isDark"
  :initialSeed="selectedSeed"
/>

<!-- Para NadaDeles.vue: -->
<NadaDeles
  v-if="currentPage === 'NadaDeles'"
  :isDark="isDark"
  :initialSeed="selectedSeed"
/>

<!-- Para MinhaAba.vue: -->
<MinhaAba
  v-if="currentPage === 'MinhaAba'"
  :isDark="isDark"
  :initialSeed="selectedSeed"
/>

<!-- 🚨 LEMBRE-SE: Nome do componente = Nome do arquivo! -->
```

**3. Verificar Rota**

```javascript
// Verificar se existe em src/router/index.js:
{
  path: "/nova-aba",
  name: "NovaAba",
  component: App,
  meta: { page: "NovaAba" },
}
```

**4. Verificar Navbar**

```vue
<!-- Verificar se existe em src/components/Navbar.vue: -->
<button
  @click="setPage('NovaAba')"
  :class="{ active: currentPage === 'NovaAba' }"
  class="nav-button"
>
  Nome da Aba
</button>
```

### Ordem de Verificação (do mais comum para menos comum):

1. 🔴 **Import ausente no App.vue** (90% dos casos)
2. 🟡 Template ausente no App.vue
3. 🟡 Rota ausente no router
4. 🟢 Botão ausente na navbar
5. 🟢 Props incorretas na view
