import React from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ProdutoComparacao } from "../hooks/useComparadorPrecos";

interface ResultadoComparacaoProps {
  produtos: ProdutoComparacao[];
}

/**
 * Componente para exibir o resultado da comparação de produtos
 */
export function ResultadoComparacao({ produtos }: ResultadoComparacaoProps) {
  // Por enquanto só vamos criar a estrutura do componente
  // A lógica de comparação será implementada no passo 3
  
  if (produtos.length <= 1) {
    return null;
  }
  
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Resultado da Comparação</ThemedText>
      <ThemedText>
        Comparando {produtos.length} produtos...
      </ThemedText>
      
      {/* A lógica de comparação será implementada no passo 3 */}
      
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0,122,255,0.1)",
  },
});
