import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Image } from "expo-image";

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
  const [forceUpdate, setForceUpdate] = useState(0); // Para forçar re-renderização

  // Cores baseadas no tema
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const borderColor = useThemeColor(
    { light: "#ccc", dark: "#444" },
    "background"
  );
  const inputBackgroundColor = useThemeColor(
    { light: "#f9f9f9", dark: "#2a2a2a" },
    "background"
  );
  const placeholderColor = useThemeColor(
    { light: "#888", dark: "#999" },
    "tabIconDefault"
  );

  // Carregar itens do AsyncStorage quando o componente montar
  useEffect(() => {
    carregarItens();
  }, []);

  // Função para carregar itens do AsyncStorage
  const carregarItens = async () => {
    try {
      const dadosArmazenados = await AsyncStorage.getItem(STORAGE_KEY);
      if (dadosArmazenados !== null) {
        const itensCarregados = JSON.parse(dadosArmazenados);
        console.log("Itens carregados do AsyncStorage:", itensCarregados);
        setItens(itensCarregados);

        // Forçar re-renderização para ambiente web
        if (Platform.OS === "web") {
          setForceUpdate((prev) => prev + 1);
        }
      } else {
        console.log("Nenhum item encontrado no AsyncStorage");
      }
    } catch (erro) {
      console.error("Erro ao carregar itens:", erro);
      if (Platform.OS === "web") {
        alert("Não foi possível carregar os itens da lista");
      } else {
        Alert.alert("Erro", "Não foi possível carregar os itens da lista");
      }
    }
  };

  // Adicionar useEffect para monitorar mudanças nos itens para depuração
  useEffect(() => {
    if (Platform.OS === "web") {
      console.log("Estado de itens atualizado:", itens);
    }
  }, [itens, forceUpdate]);

  // Adicionar novo item à lista
  const adicionarItem = async () => {
    if (nomeProduto.trim() === "") {
      // Mensagem de erro adaptativa para web/mobile
      if (Platform.OS === "web") {
        alert("O nome do produto é obrigatório");
      } else {
        Alert.alert("Erro", "O nome do produto é obrigatório");
      }
      return;
    }

    try {
      const novoItem: ItemCompra = {
        id: Date.now().toString(),
        nome: nomeProduto,
        quantidade: quantidade || "1", // Valor padrão se quantidade for vazia
        dataAdicionado: new Date().toISOString(),
      };

      // Criar novo array com todos os itens atuais + o novo item
      const novosItens = [...itens, novoItem];

      // Primeiro persistir no AsyncStorage para garantir consistência
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));

      // Depois atualizar o estado local
      setItens(novosItens);

      // Forçar re-renderização para ambiente web
      if (Platform.OS === "web") {
        setForceUpdate((prev) => prev + 1);
      }

      // Limpar campos
      setNomeProduto("");
      setQuantidade("");

      console.log("Item adicionado com sucesso:", novoItem);
    } catch (erro) {
      console.error("Erro ao adicionar item:", erro);
      if (Platform.OS === "web") {
        alert("Não foi possível adicionar o item à lista");
      } else {
        Alert.alert("Erro", "Não foi possível adicionar o item à lista");
      }
    }
  };

  // Remover item da lista
  const removerItem = (id: string) => {
    console.log("Tentando remover item com id:", id);

    // Tratamento diferente para web e dispositivos móveis
    if (Platform.OS === "web") {
      // No ambiente web, pular a confirmação ou usar confirm nativo
      if (window.confirm("Deseja remover este item da lista?")) {
        removerItemConfirmado(id);
      }
    } else {
      // No ambiente mobile, usar Alert nativo
      Alert.alert("Confirmar", "Deseja remover este item da lista?", [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: () => removerItemConfirmado(id),
        },
      ]);
    }
  };

  // Função para realizar a remoção após confirmação
  const removerItemConfirmado = async (id: string) => {
    try {
      // Criar novo array sem o item a ser removido
      const novosItens = itens.filter((item) => item.id !== id);
      console.log("Itens após filtro:", novosItens);

      // Atualizar o estado com o novo array
      setItens(novosItens);

      // Forçar re-renderização para ambiente web
      if (Platform.OS === "web") {
        setForceUpdate((prev) => prev + 1);
      }

      // Persistir mudanças no AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novosItens));
      console.log("Itens atualizados no AsyncStorage");
    } catch (erro) {
      console.error("Erro ao remover item:", erro);
      if (Platform.OS === "web") {
        alert("Ocorreu um erro ao remover o item");
      } else {
        Alert.alert("Erro", "Ocorreu um erro ao remover o item");
      }
    }
  };
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/ListaCompras.jpg")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "cover",
          }}
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
          extraData={forceUpdate} // Forçar re-renderização quando forceUpdate mudar
          renderItem={({ item }) => (
            <ThemedView style={styles.itemContainer}>
              <ThemedView style={styles.itemInfo}>
                <ThemedText type="defaultSemiBold" style={styles.itemNome}>
                  {item.nome}
                </ThemedText>
                <ThemedText>Qtd: {item.quantidade}</ThemedText>
              </ThemedView>
              <TouchableOpacity
                onPress={() => {
                  console.log("Botão de remover clicado para id:", item.id);
                  removerItem(item.id);
                }}
                style={styles.removerBtn}
                activeOpacity={0.6}
              >
                <ThemedText style={styles.removerBtnTexto}>✕</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          )}
          keyExtractor={(item) => `item-${item.id}`}
          style={styles.lista}
          scrollEnabled={false}
          removeClippedSubviews={false} // Melhora o comportamento no web
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
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ff6b6b",
    marginLeft: 10,
    // Melhorias para web
    cursor: "pointer",
  },
  removerBtnTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    // Melhorias para web
    userSelect: "none",
  },
  listaVazia: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
