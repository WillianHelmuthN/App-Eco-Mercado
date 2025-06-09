import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  DetalhesEmbalagem,
  UnidadeMedida,
  UnidadeSelectorAvancado,
} from "@/components/UnidadeSelectorAvancado";
import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet } from "react-native";

export default function CompararPrecosScreen() {
  const [unidadeSelecionada, setUnidadeSelecionada] =
    useState<UnidadeMedida>("Kilograma (g)");
  const [detalhesEmbalagem, setDetalhesEmbalagem] = useState<DetalhesEmbalagem>(
    {
      quantidadeUnidades: "12",
      quantidadePorUnidade: "500",
      unidadeInterna: "Mililitro (ml)",
    }
  );
  const [quantidade, setQuantidade] = useState("1");
  const [valor, setValor] = useState("");

  // Função para extrair valor numérico do formato de moeda R$
  const extrairValorNumerico = (valorFormatado: string): number => {
    if (!valorFormatado) return 0;
    // Remove caracteres não numéricos, exceto ponto e vírgula
    const numerico = valorFormatado.replace(/[^\d,\.]/g, "").replace(",", ".");
    return parseFloat(numerico) || 0;
  };

  // Função para calcular o valor unitário
  const calcularValorUnitario = (): string => {
    const valorNumerico = extrairValorNumerico(valor);
    if (!valorNumerico) return "Informe um valor";

    const qtd = parseFloat(quantidade) || 1;

    if (["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada)) {
      const unidadesPorEmbalagem =
        parseFloat(detalhesEmbalagem.quantidadeUnidades) || 1;
      const qtdPorUnidade =
        parseFloat(detalhesEmbalagem.quantidadePorUnidade) || 1;
      const totalUnidades = qtd * unidadesPorEmbalagem;
      const totalMedida = totalUnidades * qtdPorUnidade;

      // Converte para a unidade de medida adequada para comparação
      let valorUnitario = valorNumerico / totalMedida;

      // Define o número de casas decimais com base no valor
      const casasDecimais = valorUnitario <= 0.09 ? 3 : 2;

      // Formatação baseada na unidade interna
      if (
        detalhesEmbalagem.unidadeInterna.includes("Kilo") ||
        detalhesEmbalagem.unidadeInterna.includes("Litro")
      ) {
        return `R$ ${valorUnitario.toFixed(casasDecimais).replace(".", ",")} por ${detalhesEmbalagem.unidadeInterna}`;
      } else if (
        detalhesEmbalagem.unidadeInterna.includes("Kilograma") ||
        detalhesEmbalagem.unidadeInterna.includes("Mililitro")
      ) {
        // Converte para kilo/litro para melhor comparação
        valorUnitario = valorUnitario * 1000;
        const unidadePadrão = detalhesEmbalagem.unidadeInterna.includes(
          "Kilograma"
        )
          ? "Kilo (kg)"
          : "Litro (l)";
        return `R$ ${valorUnitario.toFixed(casasDecimais).replace(".", ",")} por ${unidadePadrão}`;
      } else {
        return `R$ ${valorUnitario.toFixed(casasDecimais).replace(".", ",")} por ${detalhesEmbalagem.unidadeInterna}`;
      }
    } else {
      // Para unidades simples
      const valorUnitario = valorNumerico / qtd;

      // Define o número de casas decimais com base no valor
      const casasDecimais = valorUnitario <= 0.09 ? 3 : 2;

      // Formatação baseada na unidade selecionada
      if (unidadeSelecionada.includes("Kilograma")) {
        // Converte para kilo para melhor comparação
        const valorPorKilo = valorUnitario * 1000;
        return `R$ ${valorPorKilo.toFixed(casasDecimais).replace(".", ",")} por Kilo (kg)`;
      } else if (unidadeSelecionada.includes("Mililitro")) {
        // Converte para litro para melhor comparação
        const valorPorLitro = valorUnitario * 1000;
        return `R$ ${valorPorLitro.toFixed(casasDecimais).replace(".", ",")} por Litro (l)`;
      } else {
        return `R$ ${valorUnitario.toFixed(casasDecimais).replace(".", ",")} por ${unidadeSelecionada}`;
      }
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
      <Image
        source={require("@/assets/images/mercadofundo.jpg")}
        style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        resizeMode: "cover"
        }}
      />
      }
    >
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

      {valor && (
        <ThemedView
        style={[
          styles.infoContainer,
          { backgroundColor: "rgba(65, 184, 131, 0.15)" },
        ]}
        >
        <ThemedText style={{ fontWeight: "600" }}>
          Valor Unitário para Comparação:
        </ThemedText>
        <ThemedText style={{ fontSize: 18 }}>
          {calcularValorUnitario()}
        </ThemedText>
        </ThemedView>
      )}

      {!["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada) && (
        <ThemedView style={styles.infoContainer}>
        <ThemedText>
          Total: {quantidade} {unidadeSelecionada}
        </ThemedText>
        </ThemedView>
      )}

      {["Caixa", "Pack", "Fardo"].includes(unidadeSelecionada) && (
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
          • Total por embalagem:{" "}
          {Number(detalhesEmbalagem.quantidadeUnidades) *
          Number(detalhesEmbalagem.quantidadePorUnidade)}{" "}
          {detalhesEmbalagem.unidadeInterna}
        </ThemedText>
        <ThemedText>
          • Total considerando quantidade:{" "}
          {Number(quantidade) *
          Number(detalhesEmbalagem.quantidadeUnidades) *
          Number(detalhesEmbalagem.quantidadePorUnidade)}{" "}
          {detalhesEmbalagem.unidadeInterna}
        </ThemedText>
        </ThemedView>
      )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
  infoContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    gap: 4,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
