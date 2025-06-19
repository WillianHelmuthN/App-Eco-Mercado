import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";

export interface ItemCompra {
  id: string;
  nome: string;
  quantidade: string;
  dataAdicionado: string;
  categoriaId?: string;
}

const STORAGE_KEY = "@eco_mercado_lista_compras";

/**
 * Hook para gerenciar a lista de compras com persistência local
 */
export function useListaCompras() {
  const [itens, setItens] = useState<ItemCompra[]>([]);
  const [forceUpdate, setForceUpdate] = useState(0);

  // Carregar itens ao montar
  useEffect(() => {
    carregarItens();
  }, []);

  // Carregar itens do AsyncStorage
  const carregarItens = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosArmazenados !== null) {
        setItens(JSON.parse(dadosArmazenados));
        if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);
      } else {
        setItens([]);
      }
    } catch {
      if (Platform.OS === "web") {
        alert("Não foi possível carregar os itens da lista");
      } else {
        Alert.alert("Erro", "Não foi possível carregar os itens da lista");
      }
    }
  };

  // Adicionar item
  const adicionarItem = async (
    nome: string,
    quantidade: string,
    categoriaId?: string
  ) => {
    if (nome.trim() === "") {
      if (Platform.OS === "web") {
        alert("O nome do produto é obrigatório");
      } else {
        Alert.alert("Erro", "O nome do produto é obrigatório");
      }
      return false;
    }
    try {
      const novoItem: ItemCompra = {
        id: Date.now().toString(),
        nome,
        quantidade: quantidade || "1",
        dataAdicionado: new Date().toISOString(),
        categoriaId: categoriaId || "outros",
      };
      const novosItens = [...itens, novoItem];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));
      setItens(novosItens);
      if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);
      return true;
    } catch {
      if (Platform.OS === "web") {
        alert("Não foi possível adicionar o item à lista");
      } else {
        Alert.alert("Erro", "Não foi possível adicionar o item à lista");
      }
      return false;
    }
  };

  // Remover item
  const removerItem = async (id: string) => {
    try {
      const novosItens = itens.filter((item) => item.id !== id);
      setItens(novosItens);
      if (Platform.OS === "web") setForceUpdate((prev) => prev + 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));
      return true;
    } catch {
      if (Platform.OS === "web") {
        alert("Ocorreu um erro ao remover o item");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao remover o item");
      }
      return false;
    }
  };

  return {
    itens,
    adicionarItem,
    removerItem,
    carregarItens,
    forceUpdate,
  };
}
