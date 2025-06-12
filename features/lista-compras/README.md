# Lista de Compras - Feature Modularizada

Esta feature implementa a lista de compras do app, separando responsabilidades em componentes e hooks reutilizáveis.

## Estrutura

- **components/ListaCompras.tsx**: Componente visual e de interação da lista de compras.
- **hooks/useListaCompras.ts**: Hook para lógica de estado, persistência e manipulação dos itens.
- **index.ts**: Exporta os principais elementos da feature.

## Como usar

No arquivo da tela principal:

```tsx
import { ListaCompras } from "@/features/lista-compras";

export default function ListaComprasScreen() {
  return <ListaCompras />;
}
```

## Responsabilidades

- **ListaCompras.tsx**: UI, inputs, renderização da lista, chama métodos do hook.
- **useListaCompras.ts**: Lida com AsyncStorage, validações, adição/remoção, expõe API simples para o componente.

## Vantagens

- Código mais limpo e testável
- Fácil manutenção e evolução
- Possível reutilização do hook em outros contextos

---

Siga este padrão para outras features do app.
