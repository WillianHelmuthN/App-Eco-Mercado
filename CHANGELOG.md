# Changelog - Eco-Mercado

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Documentação completa do projeto (arquitetura, contribuição, manual do usuário)
- Melhorias na documentação das funcionalidades existentes

## [1.0.0] - 2025-06-11

### Adicionado

- Funcionalidade de comparador de preços completa
  - Seleção de unidades de medida
  - Cálculo de valor unitário
  - Comparação de múltiplos produtos
  - Suporte a embalagens com subunidades
- Implementação inicial da lista de compras
  - Adição e remoção de itens
  - Persistência com AsyncStorage
- Interface com suporte a tema claro/escuro
- Navegação por abas entre as funcionalidades principais
- Tela inicial com acesso às principais funcionalidades

### Técnico

- Configuração do projeto com Expo 53
- Implementação de roteamento com expo-router
- Componentes reutilizáveis com temas
- Estrutura de projeto organizada por funcionalidades
