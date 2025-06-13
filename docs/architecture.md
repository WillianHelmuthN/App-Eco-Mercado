# Arquitetura do Projeto B-Market

## Visão Geral

B-Market é um aplicativo móvel para gerenciamento de compras, comparação de preços e controle de estoque doméstico. Desenvolvido com React Native e Expo, segue uma arquitetura modular baseada em funcionalidades (feature-based).

## Tecnologias Principais

- **React Native/Expo**: Framework cross-platform (v53+)
- **TypeScript**: Tipagem estática para código mais seguro
- **Expo Router**: Sistema de navegação baseado em arquivos
- **AsyncStorage/SQLite**: Persistência de dados
- **React Hooks**: Gerenciamento de estado

## Estrutura do Projeto

```
├── app/                    # Telas e navegação (expo-router)
│   ├── _layout.tsx         # Layout principal
│   ├── index.tsx           # Tela inicial
│   └── (tabs)/             # Navegação por abas
│       ├── _layout.tsx     # Layout das abas
│       ├── Comparar.tsx    # Comparador de preços
│       ├── Lista.tsx       # Lista de compras
│       └── Despensa.tsx    # Gerenciamento de estoque
├── assets/                 # Recursos estáticos
├── components/             # Componentes globais reutilizáveis
├── constants/              # Configurações globais
├── docs/                   # Documentação
├── features/               # Funcionalidades por domínio
│   ├── comparador-precos/  # Comparação de preços
│   ├── lista-compras/      # Lista de compras
│   └── despensa/           # Gerenciamento de estoque
└── hooks/                  # Hooks globais
```

## Padrões de Desenvolvimento

### Organização por Features

Cada funcionalidade principal é isolada em seu próprio diretório com:

- **components/**: UI específica da feature
- **hooks/**: Gerenciamento de estado e lógica
- **utils/**: Funções auxiliares
- **index.ts**: Exportação dos elementos públicos

### Componentes

- Funcionais com hooks
- Tipados com TypeScript
- Temáticos (adaptáveis a dark/light mode)
- Responsivos para diferentes tamanhos de tela

### Estado e Lógica

- Hooks personalizados por feature
- Persistência com AsyncStorage (SQLite em desenvolvimento)
- Componentização para facilitar testes

## Roadmap de Evolução

### Fase Atual

- Implementação das funcionalidades core
- AsyncStorage para persistência básica
- UI/UX funcional e responsivo

### Próximas Fases

- Migração para SQLite
- Sistema de notificações
- Backend para sincronização
- Recursos premium e monetização

## Modularidade e Expansão

O design modular permite:

1. Adição de novas funcionalidades sem conflitos
2. Equipes trabalhando simultaneamente em features distintas
3. Escalabilidade progressiva do app
4. Testes isolados por módulo

Consulte [tasks.md](tasks.md) e [features.md](features.md) para mais detalhes sobre desenvolvimento futuro.
