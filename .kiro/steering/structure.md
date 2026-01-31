# Estrutura do Projeto

## Organização de Pastas

```
src/
├── components/          # Componentes Vue reutilizáveis
│   ├── Navbar.vue      # Navegação principal
│   ├── TreeGenerator3D.vue    # Gerador 3D principal
│   ├── TreeGridCell.vue       # Célula de grid para modo simples
│   ├── LazyTreeGridCell.vue   # Versão lazy da célula
│   └── PerformanceMonitor.vue # Monitor de performance
├── views/              # Páginas/rotas principais
│   ├── CreateView.vue  # Página de criação de árvores
│   ├── ShopView.vue    # Marketplace de árvores
│   ├── RegistroView.vue # Página de registro
│   └── CreateGrass.vue # Gerador de grama
├── composables/        # Lógica reutilizável Vue
│   ├── useTheme.js     # Gerenciamento de tema
│   └── useSeeds.js     # Gerenciamento de seeds
├── utils/              # Utilitários e algoritmos
│   ├── perlinNoise.js  # Implementação Perlin Noise
│   ├── seededRandom.js # Gerador aleatório com seed
│   ├── treeBuilder.js  # Construtor principal de árvores
│   ├── treeCharacteristics.js # Características das árvores
│   ├── leafGeometry.js # Geometrias de folhas
│   ├── treeRoots.js    # Geometrias de raízes
│   ├── grassTexture.js # Texturas de grama
│   ├── sceneSetup.js   # Configuração de cena 3D
│   └── seedConverter.js # Conversão de seeds
├── assets/             # Recursos estáticos
│   ├── base.css        # Estilos base
│   └── main.css        # Estilos principais
└── router/             # Configuração de rotas
```

## Convenções de Nomenclatura

### Componentes Vue

- **PascalCase** para nomes de componentes (`TreeGenerator3D.vue`)
- **kebab-case** para uso em templates (`<tree-generator-3d>`)

### Utilitários JavaScript

- **camelCase** para funções e variáveis
- **PascalCase** para classes (`SeededRandom`, `SimpleNoise`)

### Arquivos

- **camelCase** para arquivos JavaScript (`perlinNoise.js`)
- **PascalCase** para componentes Vue (`TreeGenerator3D.vue`)

## Padrões de Arquitetura

### Composables

- Lógica reativa compartilhada entre componentes
- Prefixo `use` para composables (`useTheme`, `useSeeds`)
- Estado global gerenciado via composables

### Utilitários

- Funções puras para algoritmos matemáticos
- Classes para estruturas de dados complexas
- Separação clara entre lógica de negócio e apresentação

### Componentes

- **Single File Components** (.vue)
- **Composition API** preferida sobre Options API
- Props tipadas com `defineProps()`
- Eventos com `defineEmits()`

## Fluxo de Dados

1. **Seeds** → `seedConverter.js` → Número determinístico
2. **Número** → `seededRandom.js` → Sequência pseudo-aleatória
3. **Random** → `treeCharacteristics.js` → Características da árvore
4. **Características** → `treeBuilder.js` → Geometria 3D
5. **Geometria** → `TreeGenerator3D.vue` → Renderização

## Gerenciamento de Estado

- **Local**: `ref()` e `reactive()` para estado de componente
- **Compartilhado**: Composables para estado global
- **Persistência**: localStorage via composables (`useTheme`)

## Convenções de Estilo

- **CSS Variables** para temas (`--bg-primary`, `--text-primary`)
- **Scoped styles** em componentes
- **Responsive design** com breakpoints consistentes
