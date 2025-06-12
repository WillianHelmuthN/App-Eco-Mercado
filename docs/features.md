# Funcionalidades do Eco-Mercado

## Comparador de Preços

Permite ao usuário comparar preços de produtos baseados em diferentes unidades de medida, facilitando a tomada de decisões econômicas durante as compras.

### Características principais:

- **Seleção avançada de unidades**: Suporte para diversas unidades de medida (kg, g, ml, l, unidade, caixa, pack, fardo).
- **Comparação de múltiplos produtos**: Capacidade de adicionar e comparar vários produtos simultaneamente.
- **Análise de valor por unidade**: Calcula automaticamente o preço por unidade padrão para facilitar comparações justas.
- **Suporte para embalagens**: Comparação inteligente entre embalagens (caixas, packs, fardos) e itens individuais.
- **Cálculo de economia**: Exibe a porcentagem de economia ao escolher a opção mais vantajosa.
- **Verificação de compatibilidade**: Verifica se as unidades são compatíveis para comparação (volume com volume, massa com massa, etc).

### Benefícios econômicos:

- **Decisões informadas**: Identificação clara do produto com melhor custo-benefício.
- **Economia transparente**: Visualização da economia percentual entre diferentes opções.
- **Comparação justa**: Normalização automática de diferentes formas de embalagem para uma base comum.

### Melhorias planejadas:

- **Aprimoramentos de UI/UX**: Feedback visual aprimorado ao adicionar/remover produtos, mensagens de erro mais claras para unidades incompatíveis, e animações de transição.
- **Testes abrangentes**: Implementação de testes unitários e de integração para garantir a precisão dos cálculos e a robustez do fluxo completo.
- **Melhorias de acessibilidade**: Tornar o comparador mais acessível para todos os usuários.

## Lista de Mercado

A funcionalidade de Lista de Mercado oferece uma solução para organização de compras, com as seguintes capacidades:

### Implementadas:

- **Armazenamento local com AsyncStorage**: Permite salvar e gerenciar listas de compras mesmo sem conexão com a internet.
- **Interface para adicionar itens**: UI simples para adicionar produtos com quantidades.
- **Visualização e remoção de itens**: Capacidade de visualizar todos os itens adicionados e remover conforme necessário.

### Melhorias em andamento:

- **Categorização de itens**: Organização de produtos por categorias (frutas, laticínios, limpeza, farmácia, etc.).
- **Priorização de itens**: Possibilidade de marcar itens como prioritários.
- **Histórico de listas**: Acesso a listas anteriores para reutilização.
- **Status de compra**: Acompanhamento do que já foi colocado no carrinho.

### Planejadas para implementação futura:

- **Migração para SQLite**: Atualização para um sistema de armazenamento mais robusto que o AsyncStorage.
- **Compartilhamento de listas**: Capacidade de compartilhar listas com outros usuários.
- **Estatísticas de gastos**: Acompanhamento de gastos e histórico de compras para análise financeira.
- **Sugestões inteligentes**: Baseado no histórico de compras, o app sugere itens frequentemente adquiridos.

### Benefícios econômicos:

- **Compras planejadas**: Redução de gastos ao comprar apenas o necessário.
- **Comparação de ofertas**: Capacidade de registrar e comparar preços entre estabelecimentos.
- **Redução de viagens extras**: Lista bem organizada evita esquecimentos e gastos com deslocamentos adicionais.

## Gerenciamento de Estoque e Controle de Validade (Planejado)

Esta funcionalidade permite aos usuários acompanhar os produtos disponíveis em sua casa ou despensa, com foco no controle de validade para reduzir desperdício.

### Características planejadas:

- **Tela de Estoque Doméstico (Minha Despensa)**: Interface para listar, filtrar e visualizar detalhadamente os produtos em estoque.
- **Cadastro de produtos em estoque**: Formulário para adicionar novos produtos com data de validade, quantidade e opcionalmente fotos.
- **Sistema de notificações**: Alertas para produtos próximos da data de validade, com personalização do período de antecedência.
- **Integração com a Lista de Compras**: Prevenção de adição de itens duplicados já existentes no estoque e sugestões automáticas de compra para itens com estoque baixo.

### Benefícios:

- **Redução de desperdício**: Controle eficiente de validade reduz o desperdício de alimentos e produtos.
- **Economia financeira**: Melhor visibilidade do que já possui evita compras desnecessárias.
- **Organização doméstica**: Visualização clara de todos os itens disponíveis em casa.

## Recursos Avançados (Planejados)

### Assistente de Receitas com IA

- **Scanner de receitas**: Extração de texto de imagens de receitas usando tecnologias de visão computacional.
- **Análise de ingredientes**: Processamento de linguagem natural para identificar ingredientes e quantidades.
- **Integração com estoque e lista de compras**: Verificação automática de ingredientes disponíveis e adição dos faltantes à lista de compras.

### Mapeamento de Supermercados e Sistema de Ofertas

- **Mapeamento interno de supermercados**: Visualização de layout e localização de produtos por corredores e seções.
- **Navegação interna otimizada**: Criação de rotas otimizadas para compras baseadas na sua lista.
- **Plataforma para parcerias com supermercados**: Sistema de ofertas personalizadas e integração com sistemas de supermercados parceiros.
