/**
 * Exporta os componentes e hooks principais da feature de lista de compras
 */

// Componentes
export { ListaCompras } from "./components/ListaCompras";
export { CategoriaSeletor } from "./components/Categorias/CategoriaSeletor";
export { CategoriaFiltro } from "./components/Categorias/CategoriaFiltro";

// Hooks
export { useListaCompras } from "./hooks/useListaCompras";

// Utilitários
export {
  CATEGORIAS,
  Categoria,
  getCategoriaById,
  getCorPadrao,
} from "./utils/categorias";
