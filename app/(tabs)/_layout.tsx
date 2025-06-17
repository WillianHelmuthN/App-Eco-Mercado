import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    backButton: {
      position: "absolute",
      top: 50,
      left: 15,
      zIndex: 10,
      padding: 8,
      borderRadius: 20,
      backgroundColor:
        colorScheme === "dark"
          ? "rgba(30, 30, 30, 0.7)"
          : "rgba(240, 240, 240, 0.7)",
    },
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Botão de voltar global em todas as telas */}
      <Pressable style={styles.backButton} onPress={() => router.navigate("/")}>
        <AntDesign
          name="left"
          size={24}
          color={colorScheme === "dark" ? "white" : "black"}
        />
      </Pressable>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="Comparar"
          options={{
            title: "Comparar",
            tabBarIcon: ({ color }) => (
              <AntDesign
                name="shoppingcart"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Lista"
          options={{
            title: "Lista",
            tabBarIcon: ({ color }) => (
              <MaterialIcons
                name="storage"
                size={28}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Despensa"
          options={{
            title: "Despensa",
            tabBarIcon: ({ color }) => (
              <AntDesign
                name="home"
                size={26}
                color={colorScheme === "dark" ? "white" : "black"}
              />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
