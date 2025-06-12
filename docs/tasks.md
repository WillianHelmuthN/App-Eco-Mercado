# Tarefas do Projeto Eco-Mercado

## Tarefas Concluídas

### Estrutura e Base do Projeto

- ✅ Configuração inicial do projeto com Expo e React Native
- ✅ Implementação da estrutura de navegação com expo-router
- ✅ Configuração do sistema de temas (claro/escuro)
- ✅ Configuração de fontes personalizadas
- ✅ Configuração do ESLint e ferramentas de qualidade de código

### Componentes de UI

- ✅ Desenvolvimento do componente ParallaxScrollView para scrolling com efeito parallax
- ✅ Criação de componentes base (ThemedText, ThemedView, etc.)
- ✅ Implementação do componente Collapsible para seções expansíveis
- ✅ Desenvolvimento do componente HapticTab com feedback tátil
- ✅ Implementação de ícones personalizados (IconSymbol)

### Funcionalidade de Comparação de Preços

- ✅ Criação da tela de comparação de preços
- ✅ Desenvolvimento do componente UnidadeSelectorAvancado
- ✅ Implementação da seleção de unidades de medida
- ✅ Suporte para detalhes de embalagem com múltiplas unidades
- ✅ Adição da funcionalidade para comparar múltiplos produtos
- ✅ Implementação do cálculo de valor unitário para diferentes unidades
- ✅ Desenvolvimento de lógica para determinar o melhor custo-benefício
- ✅ Implementação da exibição de resultados com economia percentual
- ✅ Suporte para adição/remoção de produtos da comparação

### Funcionalidade de Lista de Compras

- ✅ Implementação inicial da tela de Lista de Compras
- ✅ Implementação da persistência com AsyncStorage
- ✅ Desenvolvimento da interface para adicionar novos itens
- ✅ Funcionalidade para remover itens da lista
- ✅ Estilização da interface de lista de compras

### Telas e Navegação

- ✅ Implementação da tab navigation entre as telas principais
- ✅ Layout base da tela de Lista de Compras
- ✅ Configuração do tema para a barra de navegação

## Tarefas em Andamento e Futuras

### Fase 1 - Melhorias na Lista de Mercado (Prioridade Atual)

- 📋 Implementação da funcionalidade de categorias
- 📋 Adição de priorização de itens
- 📋 Desenvolvimento do histórico de listas
- 📋 Funcionalidade para marcar/desmarcar itens como comprados

### Fase 1.5 - Melhorias no Comparador de Preços

- 📋 Melhorias de UI/UX no comparador de preços
  - Adicionar feedback visual ao adicionar/remover produtos
  - Melhorar mensagens de erro para unidades incompatíveis
  - Implementar animações de transição ao mostrar resultados
- 📋 Implementação de testes para o comparador de preços
  - Adicionar testes unitários para as funções de cálculo
  - Implementar testes de integração para o fluxo completo
  - Testar com diversos cenários e casos extremos
- 📋 Melhorias de acessibilidade no comparador de preços

### Fase 2 - Aprimoramento da Lista de Mercado

- 📋 Adição de sugestões baseadas no histórico de compras
- 📋 Implementação de compartilhamento de listas
- 📋 Atualização para uso do SQLite (opção mais robusta que AsyncStorage)
  ```
  npx expo install expo-sqlite
  ```
- 📋 Desenvolvimento de funcionalidades para armazenar preços
- 📋 Estatísticas de gastos e histórico de compras

### Fase 2.5 - Gerenciamento de Estoque e Controle de Validade

- 📋 Criação da tela de Estoque Doméstico
  - Design da interface de listagem de produtos em estoque
  - Implementação de filtros por categoria, validade e quantidade
  - Desenvolvimento de visualização detalhada de produtos
- 📋 Implementação do cadastro de produtos em estoque
  - Formulário para adição de novos produtos com data de validade
  - Funcionalidade para definir quantidade em estoque
  - Opção para adicionar fotos do produto (opcional)
- 📋 Desenvolvimento do sistema de notificações
  - Configuração de alertas para produtos próximos da data de validade
  - Personalização do período de antecedência para notificações
  - Implementação de notificações push usando expo-notifications
  ```
  npx expo install expo-notifications
  ```
- 📋 Integração com a Lista de Compras
  - Prevenção de adição de itens duplicados já existentes no estoque
  - Sugestão automática de compra para itens com estoque baixo
  - Estatísticas de consumo baseadas no histórico de estoque

### Fase 3 - Integração e Recursos Avançados

- 📋 Integração entre o comparador de preços e a lista de compras
  - Adicionar opção para incluir produtos comparados diretamente na lista de compras
  - Salvar histórico de comparações para referência futura
  - Exibir produtos da lista de compras como opções no comparador
- 📋 Integração do gerenciador de estoque com o comparador de preços
  - Verificação automática de itens em estoque ao comparar preços
  - Sugestões de economia baseadas nos produtos já disponíveis
- 📋 Desenvolvimento de funcionalidades para marcação de produtos em promoção
- 📋 Adição de estatísticas de economia e sugestões de economia
- 📋 Otimização de performance e experiência do usuário

### Fase 3.5 - Assistente de Receitas com IA

- 📋 Desenvolvimento do scanner de receitas
  - Implementação da extração de texto de imagens usando Vision API
  - Criação de interface para captura ou upload de receitas
  - Funcionalidade para inserir links de receitas online
  ```
  npx expo install expo-image-picker
  npx expo install expo-file-system
  ```
- 📋 Implementação da análise de ingredientes
  - Desenvolvimento de algoritmo de processamento de linguagem natural para identificar ingredientes
  - Integração com modelo de IA para extração de ingredientes e quantidades
  - Comparação automática com estoque doméstico
- 📋 Integração com lista de compras
  - Adição automática de ingredientes faltantes à lista de compras
  - Opção para ajustar quantidades baseado no número de porções
  - Sugestões de substituições baseadas no estoque atual
- 📋 Salvamento e compartilhamento de receitas
  - Biblioteca de receitas analisadas anteriormente
  - Funcionalidade para compartilhar receitas com outros usuários
  - Exportação de lista de ingredientes

### Fase 3.7 - Mapeamento de Supermercados e Sistema de Ofertas

- 📋 Desenvolvimento do mapeamento interno de supermercados
  - Criação de interface para visualização de layout dos supermercados
  - Implementação de sistema para mapeamento de corredores e seções
  - Funcionalidade para pesquisa de produtos por localização
  ```
  npx expo install expo-location
  npx expo install react-native-maps
  ```
- 📋 Navegação interna em supermercados
  - Desenvolvimento de algoritmo para criação de rota otimizada de compras
  - Implementação de sistema de localização aproximada dentro do mercado
  - Criação de interface de navegação passo a passo entre os produtos da lista
- 📋 Plataforma para parcerias com supermercados
  - Desenvolvimento de API para integração com sistemas de supermercados
  - Implementação de sistema de ofertas personalizadas baseadas no histórico
  - Criação de painel administrativo para supermercados parceiros
- 📋 Sistema de consentimento e privacidade
  - Implementação de controles de privacidade para compartilhamento de dados
  - Desenvolvimento de sistema de recompensas para usuários que compartilham dados
  - Funcionalidade para gerenciar preferências de ofertas e notificações

### Fase 4 - Polimento e Lançamento

- 📋 Testes abrangentes em diferentes dispositivos
- 📋 Correção de bugs e refinamento da UI
- 📋 Preparação de assets para publicação
- 📋 Configuração para lançamento nas lojas de aplicativos
- 📋 Documentação final do projeto

## Notas Técnicas

- O armazenamento local está implementado com AsyncStorage para persistência básica
- Será migrado para SQLite para o gerenciamento de estoque e validade de produtos
- A arquitetura segue o padrão de componentes funcionais com hooks do React
- TypeScript é utilizado para garantir tipagem segura e melhor manutenibilidade
- O projeto usa Expo na versão 53 para aproveitar os recursos mais recentes
- Implementação de notificações locais usando expo-notifications para alertas de validade
- Utilização de APIs de visão computacional e processamento de linguagem natural para o assistente de receitas
- Possibilidade de integração com serviços como Google Cloud Vision API ou Azure Computer Vision
- Implementação de sistema de mapeamento de supermercados usando React Native Maps
- Desenvolvimento de backend para suportar integração com sistemas de supermercados
- Considerações sobre LGPD/GDPR para o sistema de compartilhamento de dados com parceiros
