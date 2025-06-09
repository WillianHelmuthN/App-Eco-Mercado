import {
  DetalhesEmbalagem,
  UnidadeMedida,
} from "@/features/comparador-precos/components/UnidadeSelectorAvancado";
import { useState } from "react";
import { calcularValorUnitario } from "../utils/calculosUnidades";

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

  const valorUnitarioCalculado = calcularValorUnitario(
    valor,
    quantidade,
    unidadeSelecionada,
    detalhesEmbalagem
  );

  const isEmbalagem = ["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada);

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
  };
}
