import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { UnidadeSelectorAvancado, UnidadeMedida } from '@/components/UnidadeSelectorAvancado';

export default function HomeScreen() {
  const [unidadeSelecionada, setUnidadeSelecionada] = useState<UnidadeMedida>('g');

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Bem-vindo!</ThemedText>
        <HelloWave />
      </ThemedView>
      
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Exemplo de Seletor de Unidades</ThemedText>
        <ThemedText>
          Selecione a unidade de medida para comparação de preços:
        </ThemedText>
        <UnidadeSelectorAvancado 
          unidadeSelecionada={unidadeSelecionada}
          aoSelecionarUnidade={setUnidadeSelecionada}
          label="Unidade de medida"
        />
        <ThemedText>
          Unidade selecionada: <ThemedText type="defaultSemiBold">{unidadeSelecionada}</ThemedText>
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
