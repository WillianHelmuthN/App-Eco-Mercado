import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  View,
} from "react-native";
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
 * Componente de filtro por categoria usando cards coloridos com animação de expansão
 */
export function CategoriaFiltro({
  categoriaSelecionada,
  onCategoriaChange,
}: CategoriaFiltroProps) {
  // Estado para controlar a expansão
  const [expanded, setExpanded] = useState(false);

  // Configurar LayoutAnimation para Android
  useEffect(() => {
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  // Valores de animação para os diferentes efeitos
  const animatedValue = useRef(new Animated.Value(0)).current;
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // Criar referências de animação para cada categoria (efeito stagger)
  const categoryAnimations = useRef(
    CATEGORIAS.map(() => new Animated.Value(0))
  ).current;

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

  // Rotação do ícone do chevron
  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  // Função para alternar o estado de expansão com animação
  const toggleExpand = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
    });

    setExpanded(!expanded);

    if (!expanded) {
      // Expandindo - Animar o chevron e preparar animações stagger
      Animated.timing(rotateAnimation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Resetar todas as animações de categoria
      categoryAnimations.forEach((anim) => anim.setValue(0));

      // Animar a opacidade principal
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();

      // Efeito stagger - animar cada categoria com um pequeno atraso
      Animated.stagger(
        50, // Intervalo entre cada animação
        categoryAnimations.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start();
    } else {
      // Retraindo - Apenas animar o chevron
      Animated.timing(rotateAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Animar a opacidade principal para 0
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  };

  // Efeito para atualizar animações quando o estado de expansão muda
  useEffect(() => {
    if (!expanded) {
      // Quando retraído, resetar animações após um pequeno delay
      const timer = setTimeout(() => {
        categoryAnimations.forEach((anim) => anim.setValue(0));
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [expanded, categoryAnimations]);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.centerContainer}>
        {/* Card para "Todas as Categorias" - sempre visível e centralizado */}
        <TouchableOpacity
          style={[
            styles.categoryCard,
            {
              backgroundColor:
                categoriaSelecionada === null ? "#607d8b" : cardBackgroundColor,
              borderColor: "#607d8b",
              shadowColor: shadowColor,
              zIndex: 1,
            },
          ]}
          onPress={() => {
            onCategoriaChange(null);
            toggleExpand();
          }}
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
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
          >
            <Ionicons
              name="chevron-down-outline"
              size={16}
              color={categoriaSelecionada === null ? "#fff" : "#607d8b"}
              style={styles.expandIcon}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* Cards para cada categoria - visíveis apenas quando expandido */}
      {expanded && (
        <Animated.View
          style={[
            styles.categoriesContainer,
            {
              opacity: animatedValue,
              transform: [{ translateY: Animated.multiply(animatedValue, 5) }],
            },
          ]}
        >
          <View style={styles.categoriesWrapper}>
            {CATEGORIAS.map((categoria, index) => (
              <Animated.View
                key={categoria.id}
                style={{
                  opacity: categoryAnimations[index],
                  transform: [
                    {
                      scale: Animated.add(
                        0.8,
                        Animated.multiply(categoryAnimations[index], 0.2)
                      ),
                    },
                    {
                      translateY: Animated.multiply(
                        Animated.subtract(1, categoryAnimations[index]),
                        10
                      ),
                    },
                  ],
                }}
              >
                <TouchableOpacity
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
                  onPress={() => {
                    onCategoriaChange(categoria.id);
                    toggleExpand();
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons
                    name={getCategoryIcon(categoria.id) as any}
                    size={22}
                    color={
                      categoriaSelecionada === categoria.id
                        ? "#fff"
                        : categoria.cor
                    }
                    style={styles.categoryIcon}
                  />
                  <ThemedText
                    style={[
                      styles.categoryText,
                      categoriaSelecionada === categoria.id && {
                        color: "#fff",
                      },
                    ]}
                  >
                    {categoria.nome}
                  </ThemedText>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        </Animated.View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: "relative",
  },
  centerContainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
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
    marginBottom: 8,
    borderWidth: 1.5,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryIcon: {
    marginRight: 6,
  },
  expandIcon: {
    marginLeft: 6,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
  },
  categoriesContainer: {
    marginTop: 8,
    width: "100%",
  },
  categoriesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    paddingHorizontal: 8,
    gap: 8,
  },
});
