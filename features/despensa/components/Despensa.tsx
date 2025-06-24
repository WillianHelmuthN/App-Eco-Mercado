import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDespensa } from "../hooks/useDespensa";
import { registerForPushNotificationsAsync } from "@/utils/notificacoes";

// Unidades disponíveis para seleção
const unidadesDisponiveis = [
  "Unidade",
  "Pacote",
  "Caixa",
  "Kilograma (kg)",
  "Grama (g)",
  "Litro (l)",
  "Mililitro (ml)",
];

/**
 * Componente principal da Despensa
 */
export function Despensa() {
  const {
    produtos,
    adicionarProduto,
    removerProduto,
    forceUpdate,
    produtosVencendo,
  } = useDespensa();
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [unidade, setUnidade] = useState("Unidade");
  const [dataValidade, setDataValidade] = useState("");
  const [modalUnidadeVisivel, setModalUnidadeVisivel] = useState(false);

  // Inicializar o sistema de notificações quando o componente montar
  useEffect(() => {
    (async () => {
      await registerForPushNotificationsAsync();
    })();
  }, []);

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
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#121212" },
    "background"
  );
  const cardBackgroundColor = useThemeColor(
    { light: "#f0f0f0", dark: "#242424" },
    "background"
  );

  // Adicionar produto à despensa
  const handleAdicionar = async () => {
    const ok = await adicionarProduto(
      nomeProduto,
      quantidade,
      unidade,
      dataValidade
    );
    if (ok) {
      setNomeProduto("");
      setQuantidade("");
      setDataValidade("");
      // Mantém a unidade selecionada para facilitar a adição de múltiplos produtos
    }
  };

  // Confirmação de remoção
  const handleRemover = (id: string) => {
    if (Platform.OS === "web") {
      if (window.confirm("Deseja remover este produto da despensa?"))
        removerProduto(id);
    } else {
      removerProduto(id);
    }
  };

  // Calcula quantos dias faltam para a validade
  const calcularDiasParaValidade = (dataISO?: string) => {
    if (!dataISO) return null;

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataValidade = new Date(dataISO);
    dataValidade.setHours(0, 0, 0, 0);

    const diferencaMs = dataValidade.getTime() - hoje.getTime();
    const diferencaDias = Math.ceil(diferencaMs / (1000 * 60 * 60 * 24));

    return diferencaDias;
  };

  // Determina a cor do indicador de validade
  const getCorValidade = (dataISO?: string) => {
    if (!dataISO) return "#999"; // Cinza para sem data

    const dias = calcularDiasParaValidade(dataISO);

    if (dias === null) return "#999";
    if (dias < 0) return "#ff4040"; // Vermelho para vencido
    if (dias <= 7) return "#ff9600"; // Laranja para próximo da validade
    return "#28a745"; // Verde para validade ok
  };

  // Função para mostrar o texto de validade
  const getTextoValidade = (dataISO?: string) => {
    if (!dataISO) return "Sem data de validade";

    const dias = calcularDiasParaValidade(dataISO);

    if (dias === null) return "Data inválida";
    if (dias < 0) return `Vencido há ${Math.abs(dias)} dias`;
    if (dias === 0) return "Vence hoje";
    if (dias === 1) return "Vence amanhã";
    return `Vence em ${dias} dias`;
  };

  return (
    <>
      {/* Formulário para adicionar novo produto */}
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Adicionar Produto à Despensa
        </ThemedText>

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

        <TextInput
          style={[
            styles.input,
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

        <TouchableOpacity
          style={[
            styles.unidadeSelector,
            {
              borderColor,
              backgroundColor: inputBackgroundColor,
              marginBottom: 12,
            },
          ]}
          onPress={() => setModalUnidadeVisivel(true)}
        >
          <ThemedText>{unidade}</ThemedText>
          <Ionicons name="chevron-down" size={16} color={textColor} />
        </TouchableOpacity>

        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          placeholder="Data de validade (AAAA-MM-DD)"
          value={dataValidade}
          onChangeText={setDataValidade}
          placeholderTextColor={placeholderColor}
        />

        <TouchableOpacity
          style={[
            styles.addButton,
            {
              opacity: nomeProduto.trim() === "" ? 0.6 : 1,
            },
          ]}
          onPress={handleAdicionar}
          disabled={nomeProduto.trim() === ""}
        >
          <ThemedText style={styles.addButtonText}>
            Adicionar à Despensa
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {/* Lista de produtos */}
      <ThemedView style={styles.listContainer}>
        <View style={styles.headerContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Produtos na Despensa
          </ThemedText>

          {produtosVencendo > 0 && (
            <View style={styles.alertaBadge}>
              <ThemedText style={styles.alertaBadgeText}>
                {produtosVencendo}{" "}
                {produtosVencendo === 1 ? "produto" : "produtos"} vencendo
              </ThemedText>
            </View>
          )}
        </View>

        {produtos.length > 0 ? (
          <FlatList
            data={produtos}
            extraData={forceUpdate}
            renderItem={({ item }) => (
              <ThemedView
                style={[
                  styles.itemContainer,
                  { backgroundColor: cardBackgroundColor },
                ]}
              >
                <View style={styles.itemMainContent}>
                  <View style={styles.itemHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.itemNome}>
                      {item.nome}
                    </ThemedText>

                    <TouchableOpacity
                      onPress={() => handleRemover(item.id)}
                      style={styles.removerBtn}
                      activeOpacity={0.6}
                    >
                      <Ionicons name="close" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.itemInfo}>
                    <ThemedText>
                      Quantidade: {item.quantidade} {item.unidade}
                    </ThemedText>

                    <View style={styles.validadeContainer}>
                      <View
                        style={[
                          styles.validadeIndicator,
                          {
                            backgroundColor: getCorValidade(item.dataValidade),
                          },
                        ]}
                      />
                      <ThemedText style={styles.validadeText}>
                        {getTextoValidade(item.dataValidade)}
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </ThemedView>
            )}
            keyExtractor={(item) => `produto-${item.id}`}
            style={styles.lista}
            scrollEnabled={false}
            removeClippedSubviews={false}
          />
        ) : (
          <ThemedView style={styles.listaVazia}>
            <ThemedText>Sua despensa está vazia</ThemedText>
          </ThemedView>
        )}
      </ThemedView>

      {/* Modal para seleção de unidade */}
      <Modal
        visible={modalUnidadeVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalUnidadeVisivel(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalUnidadeVisivel(false)}
        >
          <View style={[styles.modalContainer, { backgroundColor }]}>
            <View style={styles.cabecalhoModal}>
              <ThemedText style={styles.tituloModal}>
                Selecione a Unidade
              </ThemedText>
              <TouchableOpacity onPress={() => setModalUnidadeVisivel(false)}>
                <ThemedText style={{ color: "#4a9f6e" }}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={unidadesDisponiveis}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.itemLista,
                    {
                      backgroundColor:
                        unidade === item
                          ? "rgba(74, 159, 110, 0.2)"
                          : backgroundColor,
                    },
                  ]}
                  onPress={() => {
                    setUnidade(item);
                    setModalUnidadeVisivel(false);
                  }}
                >
                  <ThemedText>{item}</ThemedText>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    padding: 1,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  listContainer: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  rowContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  unidadeSelector: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#4a9f6e",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
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
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  itemMainContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemNome: {
    fontSize: 16,
    flex: 1,
  },
  itemInfo: {
    gap: 8,
  },
  validadeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  validadeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  validadeText: {
    fontSize: 14,
  },
  removerBtn: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#ff6b6b",
    marginLeft: 10,
  },
  listaVazia: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    maxHeight: "60%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  cabecalhoModal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemLista: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  alertaBadge: {
    backgroundColor: "#ffcc00",
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  alertaBadgeText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 14,
  },
});
