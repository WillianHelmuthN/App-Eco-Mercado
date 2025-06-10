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

    // Se já existe um produto na lista, verifica compatibilidade
    if (produtos.length > 0) {
      const primeiroProduto = produtos[0];

      // Verificar compatibilidade de unidades
      const unidadesCompativeis = verificarUnidadesCompativeis(
        primeiroProduto.unidadeSelecionada,
        unidadeSelecionada,
        primeiroProduto.detalhesEmbalagem,
        detalhesEmbalagem
      );

      if (!unidadesCompativeis) {
        // Em uma aplicação real, aqui poderíamos mostrar um alerta
        console.warn("Unidades não compatíveis para comparação");
        return;
      }
    }

    const novoProduto: ProdutoComparacao = {
      id: Date.now().toString(), // ID único baseado no timestamp
      unidadeSelecionada,
      detalhesEmbalagem: { ...detalhesEmbalagem },
      quantidade,
      valor,
      valorUnitarioCalculado,
      isEmbalagem,
    };

    setProdutos([...produtos, novoProduto]);

    // Reseta os campos para um novo produto
    setValor("");
  };

  // Função para verificar se as unidades são compatíveis para comparação
  const verificarUnidadesCompativeis = (
    unidade1: UnidadeMedida,
    unidade2: UnidadeMedida,
    detalhes1: DetalhesEmbalagem,
    detalhes2: DetalhesEmbalagem
  ): boolean => {
    // Grupos de unidades compatíveis
    const grupoMassa = ["Kilograma (g)", "Kilo (kg)"];
    const grupoVolume = ["Mililitro (ml)", "Litro (l)"];
    const grupoUnidades = ["Unidade"];

    // Verificar unidades simples (não embalagens)
    if (
      !["Caixa", "Pack", "Fardo"].includes(unidade1) &&
      !["Caixa", "Pack", "Fardo"].includes(unidade2)
    ) {
      // Ambas as unidades devem estar no mesmo grupo
      if (grupoMassa.includes(unidade1) && grupoMassa.includes(unidade2))
        return true;
      if (grupoVolume.includes(unidade1) && grupoVolume.includes(unidade2))
        return true;
      if (grupoUnidades.includes(unidade1) && grupoUnidades.includes(unidade2))
        return true;

      return false;
    }

    // Se uma é embalagem e a outra não, verificar a unidade interna com a unidade simples
    if (
      ["Caixa", "Pack", "Fardo"].includes(unidade1) !==
      ["Caixa", "Pack", "Fardo"].includes(unidade2)
    ) {
      const embalagemDetalhes = ["Caixa", "Pack", "Fardo"].includes(unidade1)
        ? detalhes1
        : detalhes2;
      const unidadeSimples = ["Caixa", "Pack", "Fardo"].includes(unidade1)
        ? unidade2
        : unidade1;

      // Caso especial: se a unidade simples é "Unidade" e a unidade interna da embalagem também é "Unidade"
      if (
        unidadeSimples === "Unidade" &&
        embalagemDetalhes.unidadeInterna === "Unidade"
      ) {
        return true;
      }

      // Verificar se a unidade interna da embalagem é compatível com a unidade simples
      if (
        (grupoMassa.includes(embalagemDetalhes.unidadeInterna) &&
          grupoMassa.includes(unidadeSimples)) ||
        (grupoVolume.includes(embalagemDetalhes.unidadeInterna) &&
          grupoVolume.includes(unidadeSimples))
      ) {
        return true;
      }

      return false;
    }

    // Se ambas são embalagens, verificar unidades internas
    if (
      ["Caixa", "Pack", "Fardo"].includes(unidade1) &&
      ["Caixa", "Pack", "Fardo"].includes(unidade2)
    ) {
      // Verificar se as unidades internas são compatíveis
      if (
        grupoMassa.includes(detalhes1.unidadeInterna) &&
        grupoMassa.includes(detalhes2.unidadeInterna)
      )
        return true;
      if (
        grupoVolume.includes(detalhes1.unidadeInterna) &&
        grupoVolume.includes(detalhes2.unidadeInterna)
      )
        return true;
      if (
        grupoUnidades.includes(detalhes1.unidadeInterna) &&
        grupoUnidades.includes(detalhes2.unidadeInterna)
      )
        return true;

      return false;
    }

    return false;
  };

  // Função para remover um produto da lista
  const removerProduto = (id: string) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));

    // Se o resultado de comparação estiver visível e remover produtos suficientes, esconde o resultado
    if (resultadoComparacaoVisivel && produtos.length <= 2) {
      setResultadoComparacaoVisivel(false);
    }
  };

  // Variável que controla se o botão de comparar deve ser exibido
  const exibirBotaoComparar = produtos.length > 1;

  // Estado para controlar se o resultado da comparação está visível
  const [resultadoComparacaoVisivel, setResultadoComparacaoVisivel] =
    useState(false);

  // Função para iniciar a comparação
  const compararProdutos = () => {
    if (produtos.length > 1) {
      setResultadoComparacaoVisivel(true);
    }
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

    // Comparação
    exibirBotaoComparar,
    resultadoComparacaoVisivel,
    setResultadoComparacaoVisivel,
    compararProdutos,
  };
}
