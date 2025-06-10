import {
  DetalhesEmbalagem,
  UnidadeMedida,
} from "@/features/comparador-precos/components/UnidadeSelectorAvancado";
import { useState } from "react";
import { calcularValorUnitario } from "../utils/calculosUnidades";

// Interface para representar um produto completo para comparação
export interface ProdutoComparacao {
  id: string;
  unidadeSelecionada: UnidadeMedida;
  detalhesEmbalagem: DetalhesEmbalagem;
  quantidade: string;
  valor: string;
  valorUnitarioCalculado: string;
  isEmbalagem: boolean;
}

/**
 * Hook para gerenciar o estado e a lógica do comparador de preços
 */
export function useComparadorPrecos() {
  const [unidadeSelecionada, setUnidadeSelecionada] =
    useState<UnidadeMedida>("Kilograma (g)");

  const [detalhesEmbalagem, setDetalhesEmbalagem] = useState<DetalhesEmbalagem>(
    {
      quantidadeUnidades: "12",
      quantidadePorUnidade: "500",
      unidadeInterna: "Mililitro (ml)",
    }
  );

  const [quantidade, setQuantidade] = useState("1");
  const [valor, setValor] = useState("");
  
  // Estado para a lista de produtos adicionados para comparação
  const [produtos, setProdutos] = useState<ProdutoComparacao[]>([]);

  const valorUnitarioCalculado = calcularValorUnitario(
    valor,
    quantidade,
    unidadeSelecionada,
    detalhesEmbalagem
  );

  const isEmbalagem = ["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada);
  
  // Função para adicionar o produto atual à lista de comparação
  const adicionarProduto = () => {
    // Só adiciona se tiver um valor informado
    if (!valor) return;
    
    const novoProduto: ProdutoComparacao = {
      id: Date.now().toString(), // ID único baseado no timestamp
      unidadeSelecionada,
      detalhesEmbalagem: {...detalhesEmbalagem},
      quantidade,
      valor,
      valorUnitarioCalculado,
      isEmbalagem,
    };
    
    setProdutos([...produtos, novoProduto]);
    
    // Reseta os campos para um novo produto
    setValor("");
  };
  
  // Função para remover um produto da lista
  const removerProduto = (id: string) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  return {
    // Estado
    unidadeSelecionada,
    detalhesEmbalagem,
    quantidade,
    valor,

    // Setters
    setUnidadeSelecionada,
    setDetalhesEmbalagem,
    setQuantidade,
    setValor,

    // Valores calculados
    valorUnitarioCalculado,
    isEmbalagem,
    
    // Gerenciamento de produtos
    produtos,
    adicionarProduto,
    removerProduto,
  };
}
