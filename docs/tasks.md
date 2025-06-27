# Tarefas do Projeto B-Market

## Tarefas Concluídas

### Base do Projeto

- ✅ Configuração inicial (Expo/React Native, expo-router, temas, fontes, ESLint)

### Componentes de UI

- ✅ Componentes base (ParallaxScrollView, ThemedText, ThemedView, Collapsible, HapticTab, IconSymbol)

### Comparador de Preços

- ✅ Interface e funcionalidade de comparação
- ✅ Cálculo inteligente entre unidades e embalagens
- ✅ Identificação de melhor custo-benefício

### Lista de Compras

- ✅ Persistência com AsyncStorage
- ✅ Interface para adicionar/remover itens

### Despensa

- ✅ Cadastro de produtos em estoque
- ✅ Controle de validade

### Navegação

- ✅ Tab navigation com estilização e tema

## Tarefas Prioritárias

### Fase 1 - Melhorias na Lista de Mercado

- 📋 Categorização de itens
- 📋 Priorização de itens
- 📋 Histórico de listas
- 📋 Status de compra (itens marcados como comprados)

### Sistema de Sugestões Inteligente

- 📋 Autocomplete com imagens de produtos (ex: "cen" → "Cenoura" com imagem)
- 📋 Integração com banco de imagens de produtos
- 📋 Cache local de sugestões frequentes

### Especificação de Produtos

- 📋 Sistema de distinção de apresentações (ex: lata de milho, sachê, in-natura)
- 📋 Setorização por categorias (alimentos, higiene, farmácia, automotivo, etc.)
- 📋 Estrutura de dados para relacionamento entre produtos e suas variantes

### Melhorias no Comparador de Preços

- 📋 Feedback visual aprimorado
- 📋 Mensagens de erro mais claras
- 📋 Animações de transição

## Tarefas para Médio Prazo

### Sistema de Notificações

- ✅ **Configuração básica**: Sistema de notificações implementado para iOS/Android
- ✅ **Proteção contra web**: Adicionadas verificações de plataforma para evitar erros na web
- 📋 **Limitação conhecida**: Notificações push não funcionam na plataforma web (limitação do Expo)
- 📋 **Alternativa web**: Implementar Service Workers para notificações web nativas (futuro)
- 📋 Alertas para produtos próximos da validade
- 📋 Notificações para estoque baixo
  ```
  npx expo install expo-notifications
  ```
- 📋 Lembretes baseados em padrões de consumo

### Integração Cross-feature

- 📋 Conexão entre comparador, lista e despensa
- 📋 Verificação automática de produtos disponíveis
- 📋 Recomendações baseadas em histórico

## Recursos Premium (Monetização)

### Sincronização Multi-dispositivo

- 📋 Sistema de contas de usuário
- 📋 Sincronização em nuvem
- 📋 Acesso simultâneo em diferentes plataformas

### Relatórios e Análises

- 📋 Histórico detalhado de compras
- 📋 Gráficos de gastos por categoria
- 📋 Tendências de consumo e sugestões de economia
- 📋 Leitor de notas fiscais via OCR

### Versão para Estabelecimentos

- 📋 Controle refinado de estoque e gastos
- 📋 Módulo para restaurantes e comércios
- 📋 Relatórios detalhados de consumo

## Monetização e Crescimento

### Sistema B2B de Dados (Opt-in)

- 📋 Coleta de dados anônimos de usuários que aceitarem
- 📋 API para estabelecimentos parceiros
- 📋 Dashboard para análise de tendências
- 📋 Mapa de densidade geográfica de demanda
- 📋 Implementação de LGPD/GDPR

### Publicidade Não-intrusiva

- 📋 Integração com AdMob
  ```
  npx expo install expo-ads-admob
  ```
- 📋 Modelo freemium com opção de remoção de anúncios
- 📋 Anúncios contextuais baseados na lista de compras

## Recursos Avançados para Futuro

### Assistente de Receitas com IA

- 📋 Extração de texto de imagens de receitas
  ```
  npx expo install expo-image-picker
  npx expo install expo-file-system
  ```
- 📋 Análise de ingredientes via NLP
- 📋 Integração com lista de compras e estoque

### Mapeamento de Supermercados

- 📋 Interface de layout de mercados
- 📋 Navegação interna otimizada
  ```
  npx expo install expo-location
  npx expo install react-native-maps
  ```
- 📋 Localização aproximada de produtos

### Fase Final - Polimento e Lançamento

- 📋 Testes em diferentes dispositivos
- 📋 Correção de bugs e refinamento da UI
- 📋 Preparação para publicação nas lojas
- 📋 Documentação final

## Notas Técnicas

- Arquitetura de componentes funcionais com hooks
- TypeScript para tipagem segura
- Expo SDK 53+
- AsyncStorage para persistência
- Considerações de privacidade (LGPD/GDPR)

## Decisões Arquiteturais

### Persistência de Dados

- ✅ **AsyncStorage como solução principal**: Decidido manter AsyncStorage como solução de persistência principal devido à compatibilidade estável com Expo
- ✅ **Remoção do SQLite**: Removido SQLite do roadmap devido a problemas de compatibilidade com Expo
- 📋 **Otimização do AsyncStorage**: Implementar estratégias de cache e otimização para AsyncStorage

## Tarefas Pendentes
