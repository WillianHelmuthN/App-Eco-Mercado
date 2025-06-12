import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ComparadorPrecos } from "@/features/comparador-precos";
import { Image } from "expo-image";

/**
 * Tela principal do comparador de preços
 */
export default function CompararPrecosScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/mercadofundo.jpg")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "cover",
          }}
        />
      }
    >
      <ComparadorPrecos />
    </ParallaxScrollView>
  );
}
