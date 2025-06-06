import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {
  DetalhesEmbalagem,
  UnidadeMedida,
  UnidadeSelectorAvancado
} from '@/components/UnidadeSelectorAvancado';
import { Image } from 'expo-image';
import { useState } from 'react';
import { StyleSheet } from 'react-native';

export default function HomeScreen() {
  const [unidadeSelecionada, setUnidadeSelecionada] =
    useState<UnidadeMedida>('Kilograma (g)');
  const [detalhesEmbalagem, setDetalhesEmbalagem] = useState<DetalhesEmbalagem>(
    {
      quantidadeUnidades: '12',
      quantidadePorUnidade: '500',
      unidadeInterna: 'Mililitro (ml)'
    }
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
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
          detalhesEmbalagem={detalhesEmbalagem}
          aoAlterarDetalhesEmbalagem={setDetalhesEmbalagem}
          label="Unidade de medida"
        />
        <ThemedText>
          Unidade selecionada:{' '}
          <ThemedText type="defaultSemiBold">{unidadeSelecionada}</ThemedText>
        </ThemedText>

        {['caixa', 'pack', 'fardo'].includes(unidadeSelecionada) && (
          <ThemedView style={styles.infoContainer}>
            <ThemedText>Detalhes da embalagem:</ThemedText>
            <ThemedText>
              • {detalhesEmbalagem.quantidadeUnidades} unidades por{' '}
              {unidadeSelecionada}
            </ThemedText>
            <ThemedText>
              • {detalhesEmbalagem.quantidadePorUnidade}{' '}
              {detalhesEmbalagem.unidadeInterna} por unidade
            </ThemedText>
            <ThemedText>
              • Total:{' '}
              {Number(detalhesEmbalagem.quantidadeUnidades) *
                Number(detalhesEmbalagem.quantidadePorUnidade)}{' '}
              {detalhesEmbalagem.unidadeInterna}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8
  },
  infoContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 8,
    gap: 4
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
});
