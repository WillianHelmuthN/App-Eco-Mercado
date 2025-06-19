import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { CATEGORIAS } from "../../utils/categorias";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

interface CategoriaFiltroProps {
  /**
   * ID da categoria atualmente selecionada (null para "Todas")
   */
  categoriaSelecionada: string | null;
  /**
   * Callback chamado quando uma categoria é selecionada
   */
  onCategoriaChange: (categoriaId: string | null) => void;
}

/**
 * Componente de filtro por categoria usando tabs horizontais
 */
export function CategoriaFiltro({
  categoriaSelecionada,
  onCategoriaChange,
}: CategoriaFiltroProps) {
  // Cores baseadas no tema
  const tintColor = useThemeColor(
    { light: "#007AFF", dark: "#0A84FF" },
    "tint"
  );
  const tabBackgroundColor = useThemeColor(
    { light: "#f0f0f0", dark: "#333" },
    "background"
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Tab para "Todas as Categorias" */}
        <TouchableOpacity
          style={[
            styles.tab,
            { backgroundColor: tabBackgroundColor },
            categoriaSelecionada === null && {
              borderBottomColor: tintColor,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => onCategoriaChange(null)}
          activeOpacity={0.7}
        >
          <ThemedText
            style={[
              styles.tabText,
              categoriaSelecionada === null && {
                color: tintColor,
                fontWeight: "bold",
              },
            ]}
          >
            Todas
          </ThemedText>
        </TouchableOpacity>

        {/* Tabs para cada categoria */}
        {CATEGORIAS.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[
              styles.tab,
              { backgroundColor: tabBackgroundColor },
              categoriaSelecionada === categoria.id && {
                borderBottomColor: categoria.cor,
                borderBottomWidth: 2,
              },
            ]}
            onPress={() => onCategoriaChange(categoria.id)}
            activeOpacity={0.7}
          >
            <View style={styles.tabContent}>
              <View
                style={[styles.categoryDot, { backgroundColor: categoria.cor }]}
              />
              <ThemedText
                style={[
                  styles.tabText,
                  categoriaSelecionada === categoria.id && {
                    color: categoria.cor,
                    fontWeight: "bold",
                  },
                ]}
              >
                {categoria.nome}
              </ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
});
