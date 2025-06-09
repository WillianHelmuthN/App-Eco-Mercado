import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function MainScreen() {
  const router = useRouter();
  const buttonBackgroundColor = useThemeColor(
    { light: "#2f95dc", dark: "#3498db" },
    "tint"
  );
  const buttonTextColor = useThemeColor(
    { light: "#ffffff", dark: "#ffffff" },
    "text"
  );

  const iniciarCompras = () => {
    router.push("/(tabs)");
  };

  const abrirListaCompras = () => {
    router.push("/(tabs)/Lista");
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require("@/assets/images/react-logo.png")}
        style={styles.logo}
        contentFit="contain"
      />

      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>
          Eco Mercado
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Compare preços de produtos e encontre a melhor opção!
        </ThemedText>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonBackgroundColor }]}
          onPress={iniciarCompras}
        >
          <ThemedText style={[styles.buttonText, { color: buttonTextColor }]}>
            Iniciar Compras
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.secondaryButton,
            { borderColor: buttonBackgroundColor },
          ]}
          onPress={abrirListaCompras}
        >
          <ThemedText
            style={[styles.buttonText, { color: buttonBackgroundColor }]}
          >
            Lista de Compras
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  contentContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 40,
    maxWidth: "80%",
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
