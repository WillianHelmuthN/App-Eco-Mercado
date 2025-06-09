import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UnidadeSelectorAvancado } from "@/features/comparador-precos/components/UnidadeSelectorAvancado";
import { StyleSheet } from "react-native";
import { useComparadorPrecos } from "../hooks/useComparadorPrecos";
import {
  DetalhesEmbalagemInfo,
  UnidadeSimplesInfo,
  ValorUnitarioInfo,
} from "./InfoContainers";

/**
 * Componente principal do comparador de preços
 */
export function ComparadorPrecos() {
  const {
    unidadeSelecionada,
    detalhesEmbalagem,
    quantidade,
    valor,
    setUnidadeSelecionada,
    setDetalhesEmbalagem,
    setQuantidade,
    setValor,
    valorUnitarioCalculado,
    isEmbalagem,
  } = useComparadorPrecos();

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.titleContainer,
          { justifyContent: "center", width: "100%" },
        ]}
      >
        <ThemedText type="title">Comparador de Preços</ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Selecione a Unidade do Produto</ThemedText>
        <ThemedText>
          Escolha a unidade de medida para comparação de preços:
        </ThemedText>

        <UnidadeSelectorAvancado
          unidadeSelecionada={unidadeSelecionada}
          aoSelecionarUnidade={setUnidadeSelecionada}
          detalhesEmbalagem={detalhesEmbalagem}
          aoAlterarDetalhesEmbalagem={setDetalhesEmbalagem}
          label="Unidade de medida"
          quantidade={quantidade}
          aoAlterarQuantidade={setQuantidade}
          valor={valor}
          aoAlterarValor={setValor}
        />

        <ThemedText>
          Unidade selecionada:{" "}
          <ThemedText type="defaultSemiBold">{unidadeSelecionada}</ThemedText>
        </ThemedText>

        <ThemedText>
          Quantidade:{" "}
          <ThemedText type="defaultSemiBold">{quantidade}</ThemedText>
        </ThemedText>

        <ThemedText>
          Valor:{" "}
          <ThemedText type="defaultSemiBold">
            {valor || "Não informado"}
          </ThemedText>
        </ThemedText>

        {/* Exibe o valor unitário calculado quando o valor estiver informado */}
        {valor && <ValorUnitarioInfo valorUnitario={valorUnitarioCalculado} />}

        {/* Exibe informações baseadas no tipo de unidade selecionada */}
        {!isEmbalagem && (
          <UnidadeSimplesInfo
            quantidade={quantidade}
            unidadeSelecionada={unidadeSelecionada}
          />
        )}

        {isEmbalagem && (
          <DetalhesEmbalagemInfo
            detalhesEmbalagem={detalhesEmbalagem}
            quantidade={quantidade}
            unidadeSelecionada={unidadeSelecionada}
          />
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  stepContainer: {
    gap: 12,
    marginBottom: 16,
  },
});
