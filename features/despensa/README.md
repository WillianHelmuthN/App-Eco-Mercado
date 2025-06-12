# Despensa - Feature Modularizada

Esta feature implementa a despensa do usuário no app, permitindo o cadastro e gerenciamento de produtos disponíveis em casa.

## Estrutura

- **components/Despensa.tsx**: Componente visual e de interação da despensa.
- **hooks/useDespensa.ts**: Hook para lógica de estado, persistência e manipulação dos produtos.
- **index.ts**: Exporta os principais elementos da feature.

## Como usar

No arquivo da tela principal:

```tsx
import { Despensa } from "@/features/despensa";

export default function DespensaScreen() {
  return <Despensa />;
}
```

## Responsabilidades

- **Despensa.tsx**: UI, inputs, renderização da lista, chama métodos do hook.
- **useDespensa.ts**: Lida com AsyncStorage, validações, adição/remoção, expõe API simples para o componente.

## Funcionalidades

- Cadastro de produtos com nome, quantidade, unidade e data de validade
- Visualização de produtos em uma lista
- Indicação visual do status de validade dos produtos
- Remoção de produtos da despensa

## Vantagens

- Código mais limpo e testável
- Fácil manutenção e evolução
- Possível reutilização do hook em outros contextos

---

Fase 1 da implementação: apenas o cadastro básico. Fases futuras incluirão categorização, busca/filtros e integração com a lista de compras.
