import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { CATEGORIAS } from "../../utils/categorias";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

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
 * Componente de filtro por categoria usando cards coloridos
 */
export function CategoriaFiltro({
  categoriaSelecionada,
  onCategoriaChange,
}: CategoriaFiltroProps) {
  // Cores baseadas no tema
  const cardBackgroundColor = useThemeColor(
    { light: "#fff", dark: "#1e1e1e" },
    "background"
  );
  const shadowColor = useThemeColor({ light: "#000", dark: "#000" }, "text");

  // Ícones para cada categoria
  const getCategoryIcon = (id: string | null): string => {
    if (id === null) return "apps-outline";

    switch (id) {
      case "mercado":
        return "basket-outline";
      case "farmacia":
        return "medical-outline";
      case "padaria":
        return "fast-food-outline";
      case "acougue":
        return "restaurant-outline";
      case "petshop":
        return "paw-outline";
      case "limpeza":
        return "sparkles-outline";
      default:
        return "ellipsis-horizontal-outline";
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Card para "Todas as Categorias" */}
        <TouchableOpacity
          style={[
            styles.categoryCard,
            {
              backgroundColor:
                categoriaSelecionada === null ? "#607d8b" : cardBackgroundColor,
              borderColor: "#607d8b",
              shadowColor: shadowColor,
            },
          ]}
          onPress={() => onCategoriaChange(null)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={getCategoryIcon(null) as any}
            size={22}
            color={categoriaSelecionada === null ? "#fff" : "#607d8b"}
            style={styles.categoryIcon}
          />
          <ThemedText
            style={[
              styles.categoryText,
              categoriaSelecionada === null && { color: "#fff" },
            ]}
          >
            Todas
          </ThemedText>
        </TouchableOpacity>

        {/* Cards para cada categoria */}
        {CATEGORIAS.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[
              styles.categoryCard,
              {
                backgroundColor:
                  categoriaSelecionada === categoria.id
                    ? categoria.cor
                    : cardBackgroundColor,
                borderColor: categoria.cor,
                shadowColor: shadowColor,
              },
            ]}
            onPress={() => onCategoriaChange(categoria.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={getCategoryIcon(categoria.id) as any}
              size={22}
              color={
                categoriaSelecionada === categoria.id ? "#fff" : categoria.cor
              }
              style={styles.categoryIcon}
            />
            <ThemedText
              style={[
                styles.categoryText,
                categoriaSelecionada === categoria.id && { color: "#fff" },
              ]}
            >
              {categoria.nome}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    marginHorizontal: 4,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    marginRight: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
