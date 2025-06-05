import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, SafeAreaView } from 'react-native';
import { ThemedText } from './ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';

// Tipos de unidades disponíveis
export type UnidadeMedida = 'g' | 'kg' | 'ml' | 'l' | 'unidade' | 'caixa' | 'pack' | 'fardo';

// Array com todas as unidades disponíveis para seleção
const unidadesDisponiveis: UnidadeMedida[] = ['g', 'kg', 'ml', 'l', 'unidade', 'caixa', 'pack', 'fardo'];

interface UnidadeSelectorAvancadoProps {
  unidadeSelecionada: UnidadeMedida;
  aoSelecionarUnidade: (unidade: UnidadeMedida) => void;
  label?: string;
}

export const UnidadeSelectorAvancado: React.FC<UnidadeSelectorAvancadoProps> = ({
  unidadeSelecionada,
  aoSelecionarUnidade,
  label = 'Unidade',
}) => {
  const [modalVisivel, setModalVisivel] = useState(false);

  // Cores baseadas no tema
  const backgroundColor = useThemeColor({ light: '#fff', dark: '#121212' }, 'background');
  const textColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#e0e0e0', dark: '#333' }, 'background');
  const accentColor = useThemeColor({ light: '#2f95dc', dark: '#3498db' }, 'tint');

  const abrirModal = () => {
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
  };

  const selecionarUnidade = (unidade: UnidadeMedida) => {
    aoSelecionarUnidade(unidade);
    fecharModal();
  };

  // Renderiza cada item da lista de unidades
  const renderItem = ({ item }: { item: UnidadeMedida }) => (
    <TouchableOpacity
      style={[
        styles.itemLista,
        { backgroundColor: unidadeSelecionada === item ? accentColor + '20' : backgroundColor }
      ]}
      onPress={() => selecionarUnidade(item)}
    >
      <Text style={[styles.textoItem, { color: textColor }]}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}
      
      <TouchableOpacity
        style={[styles.seletor, { borderColor }]}
        onPress={abrirModal}
      >
        <ThemedText>{unidadeSelecionada}</ThemedText>
        <Text style={{ fontSize: 18, color: textColor }}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent={true}
        animationType="slide"
        onRequestClose={fecharModal}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={fecharModal}
        >
          <SafeAreaView style={[styles.modalContainer, { backgroundColor }]}>
            <View style={styles.cabecalhoModal}>
              <ThemedText style={styles.tituloModal}>Selecione a Unidade</ThemedText>
              <TouchableOpacity onPress={fecharModal}>
                <ThemedText style={{ color: accentColor }}>Fechar</ThemedText>
              </TouchableOpacity>
            </View>

            <FlatList
              data={unidadesDisponiveis}
              renderItem={renderItem}
              keyExtractor={(item) => item}
            />
          </SafeAreaView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  seletor: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    height: 50,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    maxHeight: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingBottom: 30,
  },
  cabecalhoModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tituloModal: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemLista: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  textoItem: {
    fontSize: 16,
  },
});
