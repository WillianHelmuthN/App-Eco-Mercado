# 📱 B-Market

Este é um aplicativo desenvolvido em React Native utilizando [Expo](https://expo.dev). Seu principal objetivo é auxiliar usuários a economizar nas compras através de funcionalidades de comparação de preços, gerenciamento de listas de compras e, futuramente, controle de estoque doméstico.

## Funcionalidades Principais

### Comparador de Preços

- Manipulação dinâmica de diversas unidades de medida (gramas, quilogramas, mililitros, litros, unidades, caixas, packs, fardos, etc.).
- Cálculo e exibição da opção de compra mais econômica.
- Permite comparações detalhadas de pacotes contendo múltiplas subunidades (ex: fardos com várias unidades menores).
- Cálculo de economia percentual entre diferentes opções.
- [Documentação detalhada do Comparador de Preços](./features/comparador-precos/README.md)

### Lista de Mercado (Em desenvolvimento)

- Armazenamento local de listas de compras com AsyncStorage.
- Interface para adicionar, visualizar e remover itens.
- Suporte para adicionar quantidades para cada item.
- Funcionalidades em implementação: categorias, priorização de itens, histórico de listas.

### Funcionalidades Planejadas

- **Gerenciamento de Estoque e Controle de Validade**: Sistema para acompanhar produtos disponíveis em casa com controle de validade e notificações.
- **Assistente de Receitas com IA**: Extração de ingredientes de receitas e integração com estoque e lista de compras.
- **Mapeamento de Supermercados**: Navegação interna otimizada em supermercados e sistema de ofertas personalizadas.

## Como iniciar

1. Instale as dependências

```bash
npm install
```

2. Inicie o app

```bash
npx expo start
```

Isso abre opções para:

- [Build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
- [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

Comece editando os arquivos no diretório **app**. Este projeto utiliza [roteamento baseado em arquivos](https://docs.expo.dev/router/introduction).

## Estrutura do Projeto

```
├── app/                # Telas e navegação (expo-router)
├── assets/             # Recursos estáticos (imagens, fontes)
├── components/         # Componentes reutilizáveis
├── constants/          # Constantes e cores
├── docs/               # Documentação do projeto
├── features/           # Funcionalidades principais
│   └── comparador-precos/ # Comparador de preços
│       ├── components/ # Componentes do comparador
│       ├── hooks/      # Hooks personalizados
│       └── utils/      # Funções utilitárias
└── hooks/              # Hooks globais da aplicação
```

## Tecnologias Principais

- [Expo Router](https://docs.expo.dev/router/introduction/) - Navegação baseada em arquivos
- [React Native](https://reactnative.dev/) - Framework para desenvolvimento mobile
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) - Armazenamento local para listas
- [TypeScript](https://www.typescriptlang.org/) - Tipagem estática para melhor manutenção do código
- [Expo EAS Build](https://docs.expo.dev/build/introduction/) - Geração de builds para Android e iOS

## Builds e Implantação

Para gerar um APK para Android (build de preview):

```bash
npx eas build --platform android --profile preview
```

## Documentação Adicional

- [Arquitetura do Projeto](./docs/architecture.md)
- [Documentação de Funcionalidades](./docs/features.md)
- [Tarefas Planejadas](./docs/tasks.md)
- [Documentação detalhada do Comparador de Preços](./features/comparador-precos/README.md)
- [Changelog](./CHANGELOG.md)

## Links úteis

- [Documentação Expo](https://docs.expo.dev/)
- [Tutorial Learn Expo](https://docs.expo.dev/tutorial/introduction/)
- [Expo GitHub](https://github.com/expo/expo)
- [Comunidade no Discord](https://chat.expo.dev)
