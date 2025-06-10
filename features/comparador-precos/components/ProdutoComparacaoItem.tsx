import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ProdutoComparacao } from "../hooks/useComparadorPrecos";
import {
  DetalhesEmbalagemInfo,
  UnidadeSimplesInfo,
  ValorUnitarioInfo,
} from "./InfoContainers";

interface ProdutoComparacaoItemProps {
  produto: ProdutoComparacao;
  onRemove?: () => void;
  isPrimeiro: boolean;
}

/**
 * Componente para exibir um produto na lista de comparação
 */
export function ProdutoComparacaoItem({
  produto,
  onRemove,
  isPrimeiro,
}: ProdutoComparacaoItemProps) {
  const errorColor = useThemeColor(
    { light: "#ff3b30", dark: "#ff453a" },
    "tint"
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <ThemedText type="subtitle">
          Produto {isPrimeiro ? "(Referência)" : ""}
        </ThemedText>

        {!isPrimeiro && (
          <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
            <Ionicons name="close-circle" size={24} color={errorColor} />
          </TouchableOpacity>
        )}
      </View>

      <ThemedText>
        Unidade:{" "}
        <ThemedText type="defaultSemiBold">
          {produto.unidadeSelecionada}
        </ThemedText>
      </ThemedText>

      <ThemedText>
        Quantidade:{" "}
        <ThemedText type="defaultSemiBold">{produto.quantidade}</ThemedText>
      </ThemedText>

      <ThemedText>
        Valor: <ThemedText type="defaultSemiBold">{produto.valor}</ThemedText>
      </ThemedText>

      <ValorUnitarioInfo valorUnitario={produto.valorUnitarioCalculado} />

      {!produto.isEmbalagem ? (
        <UnidadeSimplesInfo
          quantidade={produto.quantidade}
          unidadeSelecionada={produto.unidadeSelecionada}
        />
      ) : (
        <DetalhesEmbalagemInfo
          detalhesEmbalagem={produto.detalhesEmbalagem}
          quantidade={produto.quantidade}
          unidadeSelecionada={produto.unidadeSelecionada}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  removeButton: {
    padding: 4,
  },
});
