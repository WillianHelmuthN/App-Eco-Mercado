# Visão Geral do Projeto Eco-Mercado

Este documento fornece uma visão geral do projeto Eco-Mercado, explicando sua arquitetura, estrutura de código, tecnologias utilizadas e padrões de desenvolvimento.

## Arquitetura

O Eco-Mercado é um aplicativo móvel desenvolvido com React Native e Expo, seguindo uma arquitetura de componentes funcionais com hooks. O projeto adota uma estrutura organizada por funcionalidades (feature-based) para facilitar a manutenção e escalabilidade.

### Principais Tecnologias

- **React Native**: Framework para desenvolvimento cross-platform
- **Expo**: Plataforma que simplifica o desenvolvimento React Native
- **Expo Router**: Sistema de roteamento baseado em arquivos
- **TypeScript**: Linguagem tipada para maior segurança e produtividade
- **AsyncStorage**: Armazenamento local para persistência de dados
- **React Navigation**: Navegação entre telas (através do Expo Router)

## Estrutura do Projeto

```
├── app/                    # Telas e navegação (expo-router)
│   ├── _layout.tsx         # Layout principal da aplicação
│   ├── index.tsx           # Tela inicial de boas-vindas
│   └── (tabs)/             # Grupo de abas
│       ├── _layout.tsx     # Layout da navegação por abas
│       ├── index.tsx       # Tab de comparador de preços
│       └── Lista.tsx       # Tab de lista de compras
├── assets/                 # Recursos estáticos (imagens, fontes)
├── components/             # Componentes reutilizáveis globais
│   ├── ParallaxScrollView.tsx # Componente de rolagem com efeito parallax
│   ├── ThemedText.tsx      # Componente de texto com tema
│   ├── ThemedView.tsx      # Componente de visualização com tema
│   └── ui/                 # Componentes de UI específicos
├── constants/              # Constantes e configurações globais
│   └── Colors.ts           # Definições de cores para temas
├── docs/                   # Documentação do projeto
├── features/               # Funcionalidades principais (por domínio)
│   └── comparador-precos/  # Funcionalidade de comparação de preços
│       ├── components/     # Componentes específicos da feature
│       ├── hooks/          # Hooks personalizados
│       └── utils/          # Funções utilitárias
└── hooks/                  # Hooks globais da aplicação
    └── useThemeColor.ts    # Hook para gerenciar cores baseadas no tema
```

## Padrões de Desenvolvimento

### Componentes

- **Componentes Funcionais**: Todos os componentes são implementados como funções.
- **Componentes Temáticos**: Componentes como `ThemedText` e `ThemedView` adaptam-se automaticamente ao tema claro/escuro.
- **Props Tipadas**: Uso consistente de TypeScript para definir tipos de props.

### Estado e Lógica

- **React Hooks**: Uso extensivo de hooks para gerenciar estado e comportamento.
- **Custom Hooks**: Encapsulamento de lógica complexa em hooks personalizados (ex: `useComparadorPrecos`).
- **Context API**: Utilizada para compartilhar estado entre componentes relacionados.

### Estilização

- **StyleSheet**: Uso do StyleSheet do React Native para definição de estilos.
- **Temas**: Suporte para temas claro e escuro, respeitando preferências do sistema.
- **Responsividade**: Adaptação para diferentes tamanhos de tela.

## Fluxo de Dados

### Comparador de Preços

1. O usuário seleciona unidade de medida, quantidade e valor no componente `UnidadeSelectorAvancado`
2. O hook `useComparadorPrecos` gerencia o estado e realiza os cálculos
3. O usuário adiciona produtos para comparação
4. Ao solicitar a comparação, os produtos são analisados e o resultado é exibido

### Lista de Compras

1. O usuário adiciona itens à lista com nome e quantidade
2. Os dados são persistidos com AsyncStorage
3. A lista é exibida e pode ser manipulada (remoção de itens)

## Configuração de Build

O projeto utiliza EAS (Expo Application Services) para builds:

- **Preview**: Para testes internos (APK)
- **Preview-Local**: Build local sem credenciais
- **Production**: Build final para distribuição

## Nomenclatura

- **Arquivos de Componentes**: PascalCase (ex: ComparadorPrecos.tsx)
- **Hooks**: camelCase com prefixo 'use' (ex: useComparadorPrecos.ts)
- **Utilitários**: camelCase (ex: calculosUnidades.ts)

## Próximos Passos

Consulte o arquivo [tasks.md](tasks.md) para detalhes sobre as próximas etapas planejadas para o desenvolvimento do projeto.
