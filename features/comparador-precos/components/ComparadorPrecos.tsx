import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { UnidadeSelectorAvancado } from "@/features/comparador-precos/components/UnidadeSelectorAvancado";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { useComparadorPrecos } from "../hooks/useComparadorPrecos";
import {
  DetalhesEmbalagemInfo,
  UnidadeSimplesInfo,
  ValorUnitarioInfo,
} from "./InfoContainers";
import { ProdutoComparacaoItem } from "./ProdutoComparacaoItem";
import { ResultadoComparacao } from "./ResultadoComparacao";

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
    produtos,
    adicionarProduto,
    removerProduto,
    exibirBotaoComparar,
    resultadoComparacaoVisivel,
    compararProdutos,
  } = useComparadorPrecos();

  return (
    <ScrollView>
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
          <ThemedText type="subtitle">
            Selecione a Unidade do Produto
          </ThemedText>
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
          {valor && (
            <ValorUnitarioInfo valorUnitario={valorUnitarioCalculado} />
          )}

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

          {/* Botão de adicionar produto */}
          <View style={styles.buttonContainer}>
            <Button
              title="Adicionar Produto"
              onPress={adicionarProduto}
              disabled={!valor}
            />
          </View>

          {/* Botão de comparar (aparece apenas quando há mais de 1 produto) */}
          {exibirBotaoComparar && (
            <View style={styles.buttonContainer}>
              <Button
                title="Comparar Produtos"
                onPress={compararProdutos}
                color="#28a745"
              />
            </View>
          )}

          {/* Exibe o resultado da comparação quando solicitado */}
          {resultadoComparacaoVisivel && produtos.length > 1 && (
            <ResultadoComparacao produtos={produtos} />
          )}

          {/* Lista de produtos adicionados */}
          {produtos.length > 0 && (
            <ThemedView style={styles.produtosContainer}>
              <ThemedText type="subtitle" style={styles.produtosTitle}>
                Produtos para Comparação
              </ThemedText>

              {produtos.map((produto, index) => (
                <ProdutoComparacaoItem
                  key={produto.id}
                  produto={produto}
                  onRemove={() => removerProduto(produto.id)}
                  isPrimeiro={index === 0}
                />
              ))}
            </ThemedView>
          )}
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
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
  buttonContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  produtosContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  produtosTitle: {
    marginBottom: 16,
  },
});
