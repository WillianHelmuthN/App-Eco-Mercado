# Funcionalidades do B-Market

## Core Features

### Comparador de Preços

Sistema que permite comparar preços de produtos com diferentes unidades de medida.

**Características:**

- Seleção avançada de unidades (kg, g, ml, l, unidade, etc.)
- Comparação de múltiplos produtos simultaneamente
- Cálculo automático de valor por unidade padrão
- Suporte para embalagens complexas (caixas, packs, fardos)
- Exibição da porcentagem de economia

### Lista de Mercado

Organização de compras com persistência local.

**Implementado:**

- Armazenamento com AsyncStorage
- Interface para adicionar/remover itens

**Em desenvolvimento:**

- Categorização e priorização de itens
- Histórico de listas
- Status de compra (itens marcados)

### Despensa

Gerenciamento de produtos disponíveis em casa.

**Implementado:**

- Cadastro de produtos com quantidade e validade
- Visualização do status de validade
- Remoção de produtos

**Planejado:**

- Filtros por categoria e validade
- Alertas para produtos vencendo
- Estatísticas de consumo

## Funcionalidades de Qualidade de Vida

### Sistema de Sugestões Inteligente

- Autocomplete com imagens de produtos
- Sugestões baseadas no histórico de compras
- Interface intuitiva e responsiva

### Especificação Detalhada de Produtos

- Distinção entre variantes do mesmo produto (lata, sachê, in-natura)
- Setorização por categorias (alimentos, higiene, farmácia, etc.)
- Sistema de tags para organização personalizada

### Notificações Contextuais

- Alertas de estoque baixo para produtos essenciais
- Notificações de validade próxima do vencimento
- Lembretes baseados em padrões de consumo

## Funcionalidades Premium

### Sincronização Multi-dispositivo

- Conta de usuário na nuvem
- Acesso em smartphones, tablets e web
- Edição simultânea e sincronização em tempo real

### Relatórios e Análises

- Histórico detalhado de compras com gráficos
- Tendências de consumo e sugestões de economia
- Leitor OCR para notas fiscais

### Versão para Estabelecimentos

- Controle refinado para restaurantes e pequenos comércios
- Relatórios detalhados de consumo e estoque
- Previsões de demanda baseadas em histórico

## Monetização

### Sistema B2B de Dados (Opt-in)

- Coleta anônima de dados de usuários que optarem
- API para estabelecimentos parceiros
- Dashboard de análise de tendências
- Mapa de densidade geográfica de demanda
- Implementação completa de LGPD/GDPR

### Publicidade Não-intrusiva

- Anúncios relevantes via AdMob
- Modelo freemium com opção de remoção
- Ads contextuais baseados na lista de compras

## Recursos Futuros

### Assistente de Receitas com IA

- Scanner para extrair ingredientes de receitas
- Verificação automática com estoque disponível
- Adição de ingredientes faltantes à lista

### Mapeamento de Supermercados

- Layout interno de estabelecimentos
- Rota otimizada para compras
- Localização aproximada de produtos nas prateleiras
