# 📱 Eco-Mercado

Este é um aplicativo desenvolvido em React Native utilizando [Expo](https://expo.dev). Seu principal objetivo é auxiliar usuários a economizar nas compras através de funcionalidades de comparação de preços e gerenciamento de listas de compras.

## Funcionalidades Principais

### Comparador de Preços
* Manipulação dinâmica de diversas unidades de medida (gramas, quilogramas, mililitros, litros, unidades, caixas, packs, etc.).
* Cálculo e exibição da opção de compra mais econômica.
* Permite comparações detalhadas de pacotes contendo múltiplas subunidades (ex: fardos com várias unidades menores).
* Cálculo de economia percentual entre diferentes opções.
* [Documentação detalhada do Comparador de Preços](./features/comparador-precos/README.md)

### Lista de Mercado (Em desenvolvimento)
* Armazenamento local de listas de compras com SQLite.
* Categorização e priorização de itens.
* Acompanhamento do status de compra.
* Histórico de compras e estimativa de preços.
* Sugestões inteligentes baseadas no histórico.

# 📱 Comparador de Preços de Produtos

Este é um aplicativo simples desenvolvido em React Native utilizando [Expo](https://expo.dev). Seu principal objetivo é auxiliar usuários a comparar facilmente o custo-benefício de produtos vendidos em diferentes embalagens ou unidades, determinando qual a melhor opção de compra por unidade (gramas, mililitros ou itens).

## Funcionalidades

* Manipulação dinâmica de diversas unidades de medida (gramas, quilogramas, mililitros, litros, unidades, caixas, packs, etc.).
* Cálculo e exibição da opção de compra mais econômica.
* Permite comparações detalhadas de pacotes contendo múltiplas subunidades (ex: fardos com várias unidades menores).
* Integração fácil para relatórios de comparação de preços.

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

* [Build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/)
* [Emulador Android](https://docs.expo.dev/workflow/android-studio-emulator/)
* [Simulador iOS](https://docs.expo.dev/workflow/ios-simulator/)
* [Expo Go](https://expo.dev/go)

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

* [Documentação Expo](https://docs.expo.dev/)
* [Tutorial Learn Expo](https://docs.expo.dev/tutorial/introduction/)

## Junte-se à comunidade

* [Expo GitHub](https://github.com/expo/expo)
* [Comunidade no Discord](https://chat.expo.dev)
