import React from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { CATEGORIAS } from "../../utils/categorias";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

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
 * Componente de seleção de categoria usando Picker/Dropdown
 */
export function CategoriaSeletor({
  categoriaId,
  onCategoriaChange,
  label = "Categoria",
}: CategoriaSeletorProps) {
  // Cores baseadas no tema
  const borderColor = useThemeColor(
    { light: "#ccc", dark: "#444" },
    "background"
  );
  const inputBackgroundColor = useThemeColor(
    { light: "#f9f9f9", dark: "#2a2a2a" },
    "background"
  );
  const pickerColor = useThemeColor({ light: "#000", dark: "#fff" }, "text");

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      <View
        style={[
          styles.pickerContainer,
          {
            borderColor,
            backgroundColor: inputBackgroundColor,
          },
        ]}
      >
        <Picker
          selectedValue={categoriaId}
          onValueChange={(itemValue) => onCategoriaChange(itemValue as string)}
          style={[styles.picker, { color: pickerColor }]}
          dropdownIconColor={pickerColor}
        >
          {CATEGORIAS.map((categoria) => (
            <Picker.Item
              key={categoria.id}
              label={categoria.nome}
              value={categoria.id}
              color={pickerColor}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    marginBottom: 6,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    height: 48,
    width: "100%",
  },
});
