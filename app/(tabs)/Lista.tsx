import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useThemeColor } from "@/hooks/useThemeColor";

// Interface para o item da lista de compras
interface ItemCompra {
  id: string;
  nome: string;
  quantidade: string;
  dataAdicionado: string; // Data armazenada mas não exibida para o usuário
}

const STORAGE_KEY = "@eco_mercado_lista_compras";

export default function ListaComprasScreen() {
  const [itens, setItens] = useState<ItemCompra[]>([]);
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  
  // Cores baseadas no tema
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const borderColor = useThemeColor({ light: "#ccc", dark: "#444" }, "background");
  const inputBackgroundColor = useThemeColor({ light: "#f9f9f9", dark: "#2a2a2a" }, "background");
  const placeholderColor = useThemeColor({ light: "#888", dark: "#999" }, "tabIconDefault");

  // Carregar itens do AsyncStorage quando o componente montar
  useEffect(() => {
    carregarItens();
  }, []);

  // Função para carregar itens do AsyncStorage
  const carregarItens = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosArmazenados !== null) {
        setItens(JSON.parse(dadosArmazenados));
      }
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível carregar os itens da lista");
      console.error(erro);
    }
  };

  // Função para salvar itens no AsyncStorage
  const salvarItens = async (novosItens: ItemCompra[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar os itens da lista");
      console.error(erro);
    }
  };

  // Adicionar novo item à lista
  const adicionarItem = () => {
    if (nomeProduto.trim() === "") {
      Alert.alert("Erro", "O nome do produto é obrigatório");
      return;
    }

    const novoItem: ItemCompra = {
      id: Date.now().toString(),
      nome: nomeProduto,
      quantidade: quantidade || "1", // Valor padrão se quantidade for vazia
      dataAdicionado: new Date().toISOString(),
    };

    const novosItens = [...itens, novoItem];
    setItens(novosItens);
    salvarItens(novosItens);

    // Limpar campos
    setNomeProduto("");
    setQuantidade("");
  };

  // Remover item da lista
  const removerItem = (id: string) => {
    Alert.alert("Confirmar", "Deseja remover este item da lista?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          const novosItens = itens.filter((item) => item.id !== id);
          setItens(novosItens);
          salvarItens(novosItens);
        },
      },
    ]);
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Lista de Compras</ThemedText>
      </ThemedView>

      {/* Formulário para adicionar novo item */}
      <ThemedView style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          placeholder="Nome do produto"
          value={nomeProduto}
          onChangeText={setNomeProduto}
          placeholderTextColor={placeholderColor}
        />
        <TextInput
          style={[
            styles.inputQuantidade,
            {
              borderColor: borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={setQuantidade}
          keyboardType="numeric"
          placeholderTextColor={placeholderColor}
        />
        <TouchableOpacity style={styles.addButton} onPress={adicionarItem}>
          <ThemedText style={styles.addButtonText}>Adicionar</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Lista de itens */}
      {itens.length > 0 ? (
        <FlatList
          data={itens}
          renderItem={({ item }) => (
            <ThemedView style={styles.itemContainer}>
              <ThemedView style={styles.itemInfo}>
                <ThemedText type="defaultSemiBold" style={styles.itemNome}>
                  {item.nome}
                </ThemedText>
                <ThemedText>Qtd: {item.quantidade}</ThemedText>
              </ThemedView>
              <TouchableOpacity
                onPress={() => removerItem(item.id)}
                style={styles.removerBtn}
              >
                <ThemedText style={styles.removerBtnTexto}>✕</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
          keyExtractor={(item) => item.id}
          style={styles.lista}
          scrollEnabled={false}
        />
      ) : (
        <ThemedView style={styles.listaVazia}>
          <ThemedText>Sua lista de compras está vazia</ThemedText>
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
    marginTop: 20,
    paddingHorizontal: 16,
  },
  formContainer: {
    padding: 16,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputQuantidade: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: "#4a9f6e",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  lista: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    marginBottom: 4,
  },
  removerBtn: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#ff6b6b",
  },
  removerBtnTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  listaVazia: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
