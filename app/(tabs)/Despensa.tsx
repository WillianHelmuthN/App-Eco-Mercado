import ParallaxScrollView from "@/components/ParallaxScrollView";
import { Despensa } from "@/features/despensa";
import { Image } from "expo-image";

/**
 * Tela principal da Despensa
 */
export default function DespensaScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
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
      <Despensa />
    </ParallaxScrollView>
  );
}
