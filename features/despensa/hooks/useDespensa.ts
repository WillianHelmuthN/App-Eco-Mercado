import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { verificarProdutosProximosVencimento } from "@/utils/notificacoes";

// Chave para armazenamento no AsyncStorage
const STORAGE_KEY = "@bmarket:despensa";

// Interface para representar um produto na despensa
export interface ProdutoDespensa {
  id: string;
  nome: string;
  quantidade: string;
  unidade: string;
  dataValidade?: string; // Opcional, formato ISO
  categoria?: string; // Opcional, para organização
  dataAdicionado: string; // Data de registro, formato ISO
}

/**
 * Hook para gerenciar os produtos da despensa com persistência local
 */
export function useDespensa() {
  const [produtos, setProdutos] = useState<ProdutoDespensa[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [produtosVencendo, setProdutosVencendo] = useState(0);

  // Carregar produtos ao montar o componente
  useEffect(() => {
    carregarProdutos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Efeito para verificar produtos próximos do vencimento quando a lista mudar
  useEffect(() => {
    if (produtos.length > 0) {
      const verificarVencimentos = async () => {
        const quantidade = await verificarProdutosProximosVencimento(produtos);
        setProdutosVencendo(quantidade);
      };
      verificarVencimentos();
    }
  }, [produtos]);

  // Carregar produtos do AsyncStorage
  const carregarProdutos = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosArmazenados !== null) {
        const produtosCarregados = JSON.parse(dadosArmazenados);
        setProdutos(produtosCarregados);
        if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);

        // Verificar produtos próximos do vencimento após carregar
        const quantidade =
          await verificarProdutosProximosVencimento(produtosCarregados);
        setProdutosVencendo(quantidade);
      } else {
        setProdutos([]);
      }
    } catch {
      exibirAlerta("Erro", "Não foi possível carregar os produtos da despensa");
    }
  };

  // Adicionar produto à despensa
  const adicionarProduto = async (
    nome: string,
    quantidade: string,
    unidade: string,
    dataValidade?: string,
    categoria?: string
  ) => {
    if (nome.trim() === "") {
      exibirAlerta("Erro", "O nome do produto é obrigatório");
      return false;
    }

    try {
      const novoProduto: ProdutoDespensa = {
        id: Date.now().toString(),
        nome,
        quantidade: quantidade || "1",
        unidade: unidade || "Unidade",
        dataValidade,
        categoria,
        dataAdicionado: new Date().toISOString(),
      };

      const novosProdutos = [...produtos, novoProduto];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosProdutos));
      setProdutos(novosProdutos);
      if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);

      // Verificar se é necessário agendar notificação para o novo produto
      await verificarProdutosProximosVencimento(novosProdutos);

      return true;
    } catch {
      exibirAlerta("Erro", "Não foi possível adicionar o produto à despensa");
      return false;
    }
  };

  // Remover produto
  const removerProduto = async (id: string) => {
    try {
      const novosProdutos = produtos.filter((produto) => produto.id !== id);
      setProdutos(novosProdutos);
      if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosProdutos));

      // Atualizar notificações após remover um produto
      await verificarProdutosProximosVencimento(novosProdutos);

      return true;
    } catch {
      exibirAlerta("Erro", "Ocorreu um erro ao remover o produto");
      return false;
    }
  };

  // Função auxiliar para exibir alertas conforme a plataforma
  const exibirAlerta = (titulo: string, mensagem: string) => {
    if (Platform.OS === "web") {
      alert(mensagem);
    } else {
      Alert.alert(titulo, mensagem);
    }
  };

  return {
    produtos,
    adicionarProduto,
    removerProduto,
    carregarProdutos,
    forceUpdate,
    produtosVencendo,
  };
}
