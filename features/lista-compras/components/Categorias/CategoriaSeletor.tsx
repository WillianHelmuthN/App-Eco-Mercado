import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CATEGORIAS } from "../../utils/categorias";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Ionicons } from "@expo/vector-icons";

interface CategoriaSeletorProps {
  /**
   * ID da categoria atualmente selecionada
   */
  categoriaId: string;
  /**
   * Callback chamado quando uma categoria é selecionada
   */
  onCategoriaChange: (categoriaId: string) => void;
  /**
   * Título opcional para o seletor
   */
  label?: string;
}

/**
 * Componente de seleção de categoria usando botões coloridos
 */
export function CategoriaSeletor({
  categoriaId,
  onCategoriaChange,
  label = "Categoria",
}: CategoriaSeletorProps) {
  // Cores baseadas no tema
  const cardBackgroundColor = useThemeColor(
    { light: "#fff", dark: "#222" },
    "background"
  );

  // Ícones para cada categoria
  const getCategoryIcon = (id: string): string => {
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
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View style={styles.categoriesContainer}>
        {CATEGORIAS.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={[
              styles.categoryButton,
              {
                backgroundColor:
                  categoriaId === categoria.id
                    ? categoria.cor
                    : cardBackgroundColor,
                borderColor: categoria.cor,
              },
            ]}
            onPress={() => onCategoriaChange(categoria.id)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={getCategoryIcon(categoria.id) as any}
              size={20}
              color={categoriaId === categoria.id ? "#fff" : categoria.cor}
              style={styles.categoryIcon}
            />
            <ThemedText
              style={[
                styles.categoryText,
                categoriaId === categoria.id && { color: "#fff" },
              ]}
            >
              {categoria.nome}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    margin: 10,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: -4, // Compensa a margem dos botões
    marginBottom: 5,
  },
  categoryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    margin: 4,
    minWidth: 100,
    borderWidth: 1.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
  },
  categoryIcon: {
    marginRight: 5,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
