import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { DetalhesEmbalagem } from "@/features/comparador-precos/components/UnidadeSelectorAvancado";
import { StyleSheet } from "react-native";
import {
  calcularTotalComQuantidade,
  calcularTotalPorEmbalagem,
} from "../utils/calculosUnidades";

interface DetalhesEmbalagemInfoProps {
  detalhesEmbalagem: DetalhesEmbalagem;
  quantidade: string;
  unidadeSelecionada: string;
}

/**
 * Componente para exibir detalhes da embalagem
 */
export function DetalhesEmbalagemInfo({
  detalhesEmbalagem,
  quantidade,
  unidadeSelecionada,
}: DetalhesEmbalagemInfoProps) {
  return (
    <ThemedView style={styles.infoContainer}>
      <ThemedText>Detalhes da embalagem:</ThemedText>
      <ThemedText>
        • {detalhesEmbalagem.quantidadeUnidades} unidades por{" "}
        {unidadeSelecionada}
      </ThemedText>
      <ThemedText>
        • {detalhesEmbalagem.quantidadePorUnidade}{" "}
        {detalhesEmbalagem.unidadeInterna} por unidade
      </ThemedText>
      <ThemedText>
        • Total por embalagem: {calcularTotalPorEmbalagem(detalhesEmbalagem)}{" "}
        {detalhesEmbalagem.unidadeInterna}
      </ThemedText>
      <ThemedText>
        • Total considerando quantidade:{" "}
        {calcularTotalComQuantidade(quantidade, detalhesEmbalagem)}{" "}
        {detalhesEmbalagem.unidadeInterna}
      </ThemedText>
    </ThemedView>
  );
}

/**
 * Componente para exibir informações de unidades simples
 */
export function UnidadeSimplesInfo({
  quantidade,
  unidadeSelecionada,
}: {
  quantidade: string;
  unidadeSelecionada: string;
}) {
  return (
    <ThemedView style={styles.infoContainer}>
      <ThemedText>
        Total: {quantidade} {unidadeSelecionada}
      </ThemedText>
    </ThemedView>
  );
}

/**
 * Componente para exibir o valor unitário calculado
 */
export function ValorUnitarioInfo({
  valorUnitario,
}: {
  valorUnitario: string;
}) {
  return (
    <ThemedView
      style={[
        styles.infoContainer,
        { backgroundColor: "rgba(65, 184, 131, 0.15)" },
      ]}
    >
      <ThemedText style={{ fontWeight: "600" }}>
        Valor Unitário para Comparação:
      </ThemedText>
      <ThemedText style={{ fontSize: 18 }}>{valorUnitario}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    gap: 4,
  },
});
