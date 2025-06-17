# 📱 B-Market

Aplicativo em React Native com [Expo](https://expo.dev) que auxilia usuários a economizar nas compras através de funcionalidades de comparação de preços, gerenciamento de listas de compras e controle de estoque doméstico.

## Funcionalidades Principais

### Comparador de Preços

- Comparação inteligente entre diferentes unidades de medida
- Cálculo da opção mais econômica com percentual de economia
- Suporte para embalagens complexas (fardos, caixas, pacotes múltiplos)
- [Detalhes do Comparador](./features/comparador-precos/README.md)

### Lista de Mercado

- Gerenciamento de itens para comprar
- Persistência local de dados
- Interface intuitiva para adicionar e remover produtos

### Despensa

- Cadastro de produtos disponíveis em casa
- Controle de validade com alertas visuais
- Gerenciamento de estoque doméstico

## Próximas Funcionalidades

### Sistema de Sugestões Inteligente

- Autocomplete com imagens de produtos
- Sugestões baseadas no histórico de compras

### Recursos Avançados

- Sincronização multi-dispositivo (premium)
- Relatórios detalhados de consumo
- Notificações contextuais de estoque baixo
- Assistente de receitas com IA

### Monetização

- Versão premium sem anúncios
- Sistema B2B de dados anônimos (opt-in)
- Versão especializada para estabelecimentos

## Início Rápido

```bash
# Instalar dependências
npm install

# Iniciar o app
npx expo start
```

## Estrutura do Projeto

```
├── app/                # Telas e navegação (expo-router)
│   └── (tabs)/         # Navegação por abas
│       ├── Comparar.tsx # Comparador de preços
│       ├── Lista.tsx   # Lista de compras
│       └── Despensa.tsx # Controle de estoque
├── assets/             # Recursos estáticos
├── components/         # Componentes reutilizáveis
├── constants/          # Constantes e configurações
├── docs/               # Documentação
│   ├── architecture.md # Arquitetura do projeto
│   ├── features.md     # Descrição de funcionalidades
│   └── tasks.md        # Planejamento de tarefas
└── features/           # Módulos de funcionalidades
    ├── comparador-precos/ # Comparador de preços
    ├── lista-compras/  # Lista de compras
    └── despensa/       # Gerenciamento de estoque
```

## Tecnologias

- **Front-end**: React Native, Expo 53+
- **Navegação**: Expo Router
- **Armazenamento**: AsyncStorage (SQLite em desenvolvimento)
- **Linguagem**: TypeScript
- **Desenvolvimento**: EAS Build

## Builds

```bash
# Preview para Android
npx eas build --platform android --profile preview

# Build local para Android
npx eas build --platform android --profile preview-local --local
```

## Documentação

- [Arquitetura](./docs/architecture.md)
- [Funcionalidades](./docs/features.md)
- [Roadmap](./docs/tasks.md)
- [Comparador de Preços](./features/comparador-precos/README.md)
- [Changelog](./CHANGELOG.md)

---

Desenvolvido por [@willian](https://github.com/WillianHelmuthN) | [Expo](https://docs.expo.dev/)
