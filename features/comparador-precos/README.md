# Comparador de Preços - Eco-Mercado

O Comparador de Preços é uma funcionalidade central do Eco-Mercado que permite aos usuários comparar produtos com diferentes unidades de medida e embalagens, identificando qual oferece o melhor custo-benefício.

## Status: ✅ Implementado

## Funcionalidades

### 1. Seleção de Unidades de Medida

- Suporte para diferentes tipos de unidades:
  - Massa: Kilograma (g), Kilo (kg)
  - Volume: Mililitro (ml), Litro (l)
  - Unitário: Unidade
  - Embalagens: Caixa, Pack, Fardo

### 2. Detalhes de Embalagem

- Para embalagens (Caixa, Pack, Fardo), é possível especificar:
  - Quantidade de unidades na embalagem
  - Quantidade por unidade
  - Unidade interna de medida

### 3. Comparação Multi-Produto

- Adição de múltiplos produtos para comparação
- Remoção de produtos (exceto o produto de referência)
- Visualização detalhada de cada produto adicionado

### 4. Cálculo de Valores Unitários

- Normalização automática das unidades para comparação justa
- Conversão entre diferentes tipos de unidade (ex: ml para l)
- Suporte para comparar embalagens com itens individuais

### 5. Resultados de Comparação

- Identificação do produto mais vantajoso
- Cálculo da economia percentual entre produtos
- Comparação com o produto de referência

## Como Usar

### Adicionando um Produto para Comparação

1. Selecione a unidade de medida do produto na lista suspensa
2. Se for uma embalagem (Caixa, Pack, Fardo):
   - Informe a quantidade de unidades na embalagem
   - Informe a quantidade por unidade
   - Selecione a unidade interna de medida
3. Informe a quantidade do produto
4. Informe o valor total do produto
5. Clique em "Adicionar Produto"

### Comparando Produtos

1. Adicione pelo menos dois produtos seguindo os passos acima
2. Clique no botão "Comparar Produtos" que aparecerá
3. Visualize o resultado da comparação na seção "Resultado da Comparação"
4. O produto mais vantajoso será destacado junto com a economia percentual

### Interpretando os Resultados

- **Produto mais vantajoso**: Produto com o menor valor unitário normalizado
- **Comparação com referência**: Economia percentual em relação ao primeiro produto adicionado
- **Economia total**: Economia percentual em relação ao produto mais caro

## Limitações e Compatibilidade

O sistema verifica automaticamente a compatibilidade entre unidades, permitindo apenas comparações válidas:

- Massa com massa (kg, g)
- Volume com volume (l, ml)
- Unidades com unidades
- Embalagens com unidades compatíveis (baseado na unidade interna)

## Exemplos de Uso

### Exemplo 1: Comparação de Embalagens

- Produto 1: Caixa com 12 unidades de 500ml cada por R$ 36,00
- Produto 2: Pack com 6 unidades de 1l cada por R$ 24,00
- Resultado: O sistema normaliza para o valor por litro e identifica o melhor custo-benefício

### Exemplo 2: Comparação de Massa

- Produto 1: 500g por R$ 4,50
- Produto 2: 1kg por R$ 8,20
- Resultado: O sistema converte para kg e compara o valor por kg

## Implementação Técnica

- Hook `useComparadorPrecos`: Gerencia todo o estado e lógica do comparador
- Componente `UnidadeSelectorAvancado`: Interface para seleção de unidades
- Utilitários `calculosUnidades.ts`: Funções para cálculos e normalização de valores
- Componente `ResultadoComparacao`: Exibe o resultado da comparação com detalhes de economia
