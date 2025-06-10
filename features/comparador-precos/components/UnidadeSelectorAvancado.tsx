import React, { useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "../../../components/ThemedText";
import { useThemeColor } from "../../../hooks/useThemeColor";

// Tipos de unidades disponíveis
export type UnidadeMedida =
  | "Kilograma (g)"
  | "Kilo (kg)"
  | "Mililitro (ml)"
  | "Litro (l)"
  | "Unidade"
  | "Caixa"
  | "Pack"
  | "Fardo";

// Array com todas as unidades disponíveis para seleção
const unidadesDisponiveis: UnidadeMedida[] = [
  "Kilograma (g)",
  "Kilo (kg)",
  "Mililitro (ml)",
  "Litro (l)",
  "Unidade",
  "Caixa",
  "Pack",
  "Fardo",
];

// Interface para os detalhes da embalagem
export interface DetalhesEmbalagem {
  quantidadeUnidades: string;
  quantidadePorUnidade: string;
  unidadeInterna: UnidadeMedida;
}

interface UnidadeSelectorAvancadoProps {
  unidadeSelecionada: UnidadeMedida;
  aoSelecionarUnidade: (unidade: UnidadeMedida) => void;
  detalhesEmbalagem?: DetalhesEmbalagem;
  aoAlterarDetalhesEmbalagem?: (detalhes: DetalhesEmbalagem) => void;
  label?: string;
  quantidade?: string;
  aoAlterarQuantidade?: (quantidade: string) => void;
  valor?: string;
  aoAlterarValor?: (valor: string) => void;
}

export const UnidadeSelectorAvancado: React.FC<
  UnidadeSelectorAvancadoProps
> = ({
  unidadeSelecionada,
  aoSelecionarUnidade,
  detalhesEmbalagem = {
    quantidadeUnidades: "1",
    unidadeInterna: "Unidade",
    quantidadePorUnidade: "1",
  },
  aoAlterarDetalhesEmbalagem = () => {},
  label = "Unidade",
  quantidade = "1",
  aoAlterarQuantidade = () => {},
  valor = "",
  aoAlterarValor = () => {},
}) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalUnidadeInternaVisivel, setModalUnidadeInternaVisivel] =
    useState(false);
  const [quantidadeLocal, setQuantidadeLocal] = useState(quantidade);
  const [valorLocal, setValorLocal] = useState(valor);

  // Estado local para os detalhes da embalagem
  const [detalhes, setDetalhes] =
    useState<DetalhesEmbalagem>(detalhesEmbalagem);

  // Atualiza os detalhes locais e notifica o componente pai
  const atualizarDetalhes = (novoDetalhes: Partial<DetalhesEmbalagem>) => {
    const detalhesAtualizados = { ...detalhes, ...novoDetalhes };
    setDetalhes(detalhesAtualizados);
    aoAlterarDetalhesEmbalagem(detalhesAtualizados);
  };

  // Atualiza a quantidade local e notifica o componente pai
  const atualizarQuantidade = (novaQuantidade: string) => {
    setQuantidadeLocal(novaQuantidade);
    aoAlterarQuantidade(novaQuantidade);
  };

  // Formata o valor como moeda (R$)
  const formatarValorComoMoeda = (valor: string) => {
    // Remove caracteres não numéricos
    let valorNumerico = valor.replace(/[^\d]/g, "");

    // Formata como moeda brasileira (R$)
    if (valorNumerico) {
      // Converte para centavos
      const centavos = parseInt(valorNumerico, 10);
      // Formata para reais com 2 casas decimais
      return `R$ ${(centavos / 100).toFixed(2).replace(".", ",")}`;
    }
    return "";
  };

  // Atualiza o valor local e notifica o componente pai
  const atualizarValor = (novoValor: string) => {
    // Remove caracteres não numéricos para manipulação
    const apenasNumeros = novoValor.replace(/[^\d]/g, "");

    // Formata para exibição
    const valorFormatado = formatarValorComoMoeda(apenasNumeros);

    setValorLocal(valorFormatado);
    aoAlterarValor(valorFormatado);
  };

  // Cores baseadas no tema
  const backgroundColor = useThemeColor(
    { light: "#fff", dark: "#121212" },
    "background"
  );
  const textColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");
  const borderColor = useThemeColor(
    { light: "#e0e0e0", dark: "#333" },
    "background"
  );
  const accentColor = useThemeColor(
    { light: "#2f95dc", dark: "#3498db" },
    "tint"
  );
  const inputBackgroundColor = useThemeColor(
    { light: "#f9f9f9", dark: "#1e1e1e" },
    "background"
  );

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const abrirModalUnidadeInterna = () => {
    setModalUnidadeInternaVisivel(true);
  };

  const fecharModalUnidadeInterna = () => {
    setModalUnidadeInternaVisivel(false);
  };

  const selecionarUnidade = (unidade: UnidadeMedida) => {
    aoSelecionarUnidade(unidade);
    fecharModal();

    // Se a nova unidade não é composta, reseta os detalhes para os valores padrão
    if (!["Caixa", "Pack", "Fardo"].includes(unidade)) {
      atualizarDetalhes({
        quantidadeUnidades: "1",
        quantidadePorUnidade: "1",
        unidadeInterna: "Unidade",
      });
    } else {
      // Se a unidade interna atual é uma embalagem, define para uma unidade adequada
      if (["Caixa", "Pack", "Fardo"].includes(detalhes.unidadeInterna)) {
        atualizarDetalhes({
          ...detalhes,
          unidadeInterna: "Unidade",
        });
      }
    }
  };

  const selecionarUnidadeInterna = (unidade: UnidadeMedida) => {
    atualizarDetalhes({ unidadeInterna: unidade });
    fecharModalUnidadeInterna();
  };

  // Renderiza cada item da lista de unidades
  const renderItem = ({ item }: { item: UnidadeMedida }) => (
    <TouchableOpacity
      style={[
        styles.itemLista,
        {
          backgroundColor:
            unidadeSelecionada === item ? accentColor + "20" : backgroundColor,
        },
      ]}
      onPress={() => selecionarUnidade(item)}
    >
      <Text style={[styles.textoItem, { color: textColor }]}>{item}</Text>
    </TouchableOpacity>
  );

  // Renderiza cada item da lista de unidades internas
  // Filtra as unidades que não devem aparecer como unidade interna (Caixa, Pack, Fardo)
  const unidadesInternasDisponiveis = unidadesDisponiveis.filter(
    (unidade) => !["Caixa", "Pack", "Fardo"].includes(unidade)
  );

  const renderItemUnidadeInterna = ({ item }: { item: UnidadeMedida }) => (
    <TouchableOpacity
      style={[
        styles.itemLista,
        {
          backgroundColor:
            detalhes.unidadeInterna === item
              ? accentColor + "20"
              : backgroundColor,
        },
      ]}
      onPress={() => selecionarUnidadeInterna(item)}
    >
      <Text style={[styles.textoItem, { color: textColor }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}

      <TouchableOpacity
        style={[styles.seletor, { borderColor }]}
        onPress={abrirModal}
      >
        <ThemedText>{unidadeSelecionada}</ThemedText>
        <Text style={{ fontSize: 18, color: textColor }}>▼</Text>
      </TouchableOpacity>

      {/* Campo de quantidade */}
      <View style={styles.campoContainer}>
        <ThemedText style={styles.campoLabel}>Quantidade</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          value={quantidadeLocal}
          onChangeText={atualizarQuantidade}
          keyboardType="numeric"
          placeholder="Ex: 1"
          placeholderTextColor={textColor + "80"}
        />
      </View>

      {/* Campo de valor */}
      <View style={styles.campoContainer}>
        <ThemedText style={styles.campoLabel}>Valor</ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor,
              color: textColor,
              backgroundColor: inputBackgroundColor,
            },
          ]}
          value={valorLocal}
          onChangeText={atualizarValor}
          keyboardType="numeric"
          placeholder="Ex: R$ 0,00"
          placeholderTextColor={textColor + "80"}
        />
      </View>

      {/* Campos adicionais para unidades compostas (caixa, pack, fardo) */}
      {["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada) && (
        <View style={styles.camposAdicionais}>
          <View style={styles.campoContainer}>
            <ThemedText style={styles.campoLabel}>
              Quantidade de unidades na {unidadeSelecionada}
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
              value={detalhes.quantidadeUnidades}
              onChangeText={(texto) =>
                atualizarDetalhes({ quantidadeUnidades: texto })
              }
              keyboardType="numeric"
              placeholder="Ex: 12"
              placeholderTextColor={textColor + "80"}
            />
          </View>

          <View style={styles.campoContainer}>
            <ThemedText style={styles.campoLabel}>
              Quantidade por unidade
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
              value={detalhes.quantidadePorUnidade}
              onChangeText={(texto) =>
                atualizarDetalhes({ quantidadePorUnidade: texto })
              }
              keyboardType="numeric"
              placeholder="Ex: 500"
              placeholderTextColor={textColor + "80"}
            />
          </View>

          <View style={styles.campoContainer}>
            <ThemedText style={styles.campoLabel}>Unidade interna</ThemedText>
            <TouchableOpacity
              style={[styles.seletor, { borderColor }]}
              onPress={abrirModalUnidadeInterna}
            >
              <ThemedText>{detalhes.unidadeInterna}</ThemedText>
              <Text style={{ fontSize: 18, color: textColor }}>▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Modal para seleção da unidade principal */}
      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={fecharModal}
        >
          <SafeAreaView style={[styles.modalContainer, { backgroundColor }]}>
            <View style={styles.cabecalhoModal}>
              <ThemedText style={styles.tituloModal}>
                Selecione a Unidade
              </ThemedText>
              <TouchableOpacity onPress={fecharModal}>
                <ThemedText style={{ color: accentColor }}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={unidadesDisponiveis}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>

      {/* Modal para seleção da unidade interna */}
      <Modal
        visible={modalUnidadeInternaVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModalUnidadeInterna}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={fecharModalUnidadeInterna}
        >
          <SafeAreaView style={[styles.modalContainer, { backgroundColor }]}>
            <View style={styles.cabecalhoModal}>
              <ThemedText style={styles.tituloModal}>
                Selecione a Unidade Interna
              </ThemedText>
              <TouchableOpacity onPress={fecharModalUnidadeInterna}>
                <ThemedText style={{ color: accentColor }}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={unidadesInternasDisponiveis}
              renderItem={renderItemUnidadeInterna}
              keyExtractor={(item) => item}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  seletor: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
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
  textoItem: {
    fontSize: 16,
  },
  camposAdicionais: {
    marginTop: 16,
    gap: 12,
  },
  campoContainer: {
    marginBottom: 4,
  },
  campoLabel: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "400",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
