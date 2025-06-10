import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ProdutoComparacao } from "../hooks/useComparadorPrecos";
import {
  calcularDiferencaPercentual,
  extrairValorNumericoDeTextoUnitario,
  formatarDiferencaPercentual,
} from "../utils/calculosUnidades";

interface ResultadoComparacaoProps {
  produtos: ProdutoComparacao[];
}

/**
 * Componente para exibir o resultado da comparação de produtos
 */
export function ResultadoComparacao({ produtos }: ResultadoComparacaoProps) {
  if (produtos.length <= 1) {
    return null;
  }

  // Extrai os valores unitários numéricos
  const valoresUnitarios = produtos.map((produto) => ({
    id: produto.id,
    valor: extrairValorNumericoDeTextoUnitario(produto.valorUnitarioCalculado),
    textoValorUnitario: produto.valorUnitarioCalculado,
    unidade: produto.unidadeSelecionada,
    index: produtos.indexOf(produto),
  }));

  // Encontra o produto mais barato (menor valor unitário)
  const produtoMaisBarato = [...valoresUnitarios].sort(
    (a, b) => a.valor - b.valor
  )[0];

  // Encontra o produto mais caro (maior valor unitário)
  const produtoMaisCaro = [...valoresUnitarios].sort(
    (a, b) => b.valor - a.valor
  )[0];

  // Calcula a diferença percentual entre o mais caro e o mais barato
  const diferencaPercentual = calcularDiferencaPercentual(
    produtoMaisCaro.valor,
    produtoMaisBarato.valor
  );

  // Determina a economia com base no mais barato
  const economia = formatarDiferencaPercentual(diferencaPercentual);

  // Define o índice de referência (o primeiro produto adicionado)
  const produtoReferencia = valoresUnitarios.find((p) => p.index === 0);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle" style={styles.title}>
        Resultado da Comparação
      </ThemedText>

      <View style={styles.resultadoContainer}>
        <ThemedText type="defaultSemiBold">Produto mais vantajoso:</ThemedText>
        <ThemedText>
          {produtoMaisBarato.index === 0
            ? "Produto de Referência"
            : `Produto ${produtoMaisBarato.index + 1}`}{" "}
          - {produtoMaisBarato.textoValorUnitario}
        </ThemedText>
      </View>

      {produtoReferencia && produtoReferencia.id !== produtoMaisBarato.id && (
        <View style={styles.resultadoContainer}>
          <ThemedText type="defaultSemiBold">
            Comparado ao produto de referência:
          </ThemedText>
          <ThemedText>
            {produtoMaisBarato.valor < produtoReferencia.valor
              ? `Economia de ${formatarDiferencaPercentual(calcularDiferencaPercentual(produtoReferencia.valor, produtoMaisBarato.valor))}`
              : `Mais caro em ${formatarDiferencaPercentual(calcularDiferencaPercentual(produtoMaisBarato.valor, produtoReferencia.valor))}`}
          </ThemedText>
        </View>
      )}

      <View style={styles.resultadoContainer}>
        <ThemedText type="defaultSemiBold">Economia total:</ThemedText>
        <ThemedText>
          Comparado ao produto mais caro, a economia é de {economia}
        </ThemedText>
      </View>

      <ThemedText style={styles.notaTexto}>
        Nota: A comparação considera o valor unitário por unidade padrão.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "rgba(65, 184, 131, 0.15)", // Verde mais suave
  },
  title: {
    marginBottom: 12,
  },
  resultadoContainer: {
    marginBottom: 8,
  },
  notaTexto: {
    fontSize: 12,
    fontStyle: "italic",
    marginTop: 12,
    opacity: 0.7,
  },
});
