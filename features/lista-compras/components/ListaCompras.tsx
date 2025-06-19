import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import React, { useState, useMemo } from "react";
import {
  FlatList,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useListaCompras } from "../hooks/useListaCompras";
import { CategoriaSeletor } from "./Categorias/CategoriaSeletor";
import { CategoriaFiltro } from "./Categorias/CategoriaFiltro";
import { getCategoriaById } from "../utils/categorias";

/**
 * Componente visual da lista de compras, desacoplado da lógica de estado/persistência
 */
export function ListaCompras() {
  const { itens, adicionarItem, removerItem, forceUpdate } = useListaCompras();
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [categoriaId, setCategoriaId] = useState("mercado"); // Categoria padrão
  const [filtroCategoria, setFiltroCategoria] = useState<string | null>(null); // null = todas as categorias

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

  // Filtrar itens por categoria
  const itensFiltrados = useMemo(() => {
    if (filtroCategoria === null) {
      return itens; // Retorna todos os itens se não houver filtro
    }
    return itens.filter((item) => item.categoriaId === filtroCategoria);
  }, [itens, filtroCategoria]);

  const handleAdicionar = async () => {
    const ok = await adicionarItem(nomeProduto, quantidade, categoriaId);
    if (ok) {
      setNomeProduto("");
      setQuantidade("");
      // Mantém a categoria selecionada para facilitar a adição de itens similares
    }
  };

  // Confirmação de remoção
  const handleRemover = (id: string) => {
    if (Platform.OS === "web") {
      if (window.confirm("Deseja remover este item da lista?")) removerItem(id);
    } else {
      // Alert nativo já está no hook
      removerItem(id);
    }
  };

  return (
    <>
      {/* Formulário para adicionar novo item */}
      <ThemedView style={styles.formContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          placeholder="Nome do produto"
          value={nomeProduto}
          onChangeText={setNomeProduto}
          placeholderTextColor={placeholderColor}
        />

        {/* Seletor de categoria */}
        <CategoriaSeletor
          categoriaId={categoriaId}
          onCategoriaChange={setCategoriaId}
        />

        <TextInput
          style={[
            styles.inputQuantidade,
            {
              borderColor,
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
        <TouchableOpacity style={styles.addButton} onPress={handleAdicionar}>
          <ThemedText style={styles.addButtonText}>Adicionar</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Filtro de categorias */}
      <View style={styles.filtroContainer}>
        <CategoriaFiltro
          categoriaSelecionada={filtroCategoria}
          onCategoriaChange={setFiltroCategoria}
        />
      </View>

      {/* Lista de itens */}
      {itensFiltrados.length > 0 ? (
        <FlatList
          data={itensFiltrados}
          extraData={forceUpdate}
          renderItem={({ item }) => (
            <ThemedView style={styles.itemContainer}>
              <ThemedView style={styles.itemInfo}>
                <ThemedText type="defaultSemiBold" style={styles.itemNome}>
                  {item.nome}
                </ThemedText>
                <ThemedText>Qtd: {item.quantidade}</ThemedText>
                {item.categoriaId && (
                  <View style={styles.categoriaContainer}>
                    <View
                      style={[
                        styles.categoriaDot,
                        {
                          backgroundColor: getCategoriaById(item.categoriaId)
                            .cor,
                        },
                      ]}
                    />
                    <ThemedText style={styles.categoriaText}>
                      {getCategoriaById(item.categoriaId).nome}
                    </ThemedText>
                  </View>
                )}
              </ThemedView>
              <TouchableOpacity
                onPress={() => handleRemover(item.id)}
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
          removeClippedSubviews={false}
        />
      ) : (
        <ThemedView style={styles.listaVazia}>
          {filtroCategoria === null ? (
            <ThemedText>Sua lista de compras está vazia</ThemedText>
          ) : (
            <ThemedText>
              Nenhum item encontrado na categoria{" "}
              {getCategoriaById(filtroCategoria).nome}
            </ThemedText>
          )}
        </ThemedView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 2,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  filtroContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
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
  categoriaContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  categoriaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  categoriaText: {
    fontSize: 12,
    opacity: 0.8,
  },
  removerBtn: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#ff6b6b",
    marginLeft: 10,
    cursor: "pointer",
  },
  removerBtnTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    userSelect: "none",
  },
  listaVazia: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
});
