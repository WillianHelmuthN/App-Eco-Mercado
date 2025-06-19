/**
 * Categorias disponíveis para a lista de compras
 */

export interface Categoria {
  id: string;
  nome: string;
  cor: string;
}

/**
 * Lista de categorias disponíveis para a lista de compras
 */
export const CATEGORIAS: Categoria[] = [
  { id: "mercado", nome: "Mercado", cor: "#4caf50" },
  { id: "farmacia", nome: "Farmácia", cor: "#f44336" },
  { id: "padaria", nome: "Padaria", cor: "#ff9800" },
  { id: "acougue", nome: "Açougue", cor: "#e91e63" },
  { id: "petshop", nome: "Pet Shop", cor: "#9c27b0" },
  { id: "limpeza", nome: "Limpeza", cor: "#2196f3" },
  { id: "outros", nome: "Outros", cor: "#607d8b" }
];

/**
 * Obter categoria por ID
 */
export function getCategoriaById(id: string): Categoria {
  return (
    CATEGORIAS.find((cat) => cat.id === id) || CATEGORIAS[CATEGORIAS.length - 1]
  );
}

/**
 * Obter cor padrão quando não há categoria definida
 */
export function getCorPadrao(): string {
  return "#607d8b"; // Mesma cor de 'outros'
}
