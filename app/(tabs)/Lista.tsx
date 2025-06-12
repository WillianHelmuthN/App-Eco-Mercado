import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ListaCompras } from "@/features/lista-compras";
import { Image } from "expo-image";

/**
 * Tela principal da lista de compras
 */
export default function ListaComprasScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
      headerImage={
        <Image
          source={require("@/assets/images/ListaCompras.jpg")}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            resizeMode: "cover",
          }}
        />
      }
    >
      <ListaCompras />
    </ParallaxScrollView>
  );
}
