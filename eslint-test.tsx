// Arquivo de teste para verificar alertas do ESLint
import React from 'react';
import { Text, View } from 'react-native';

// Variável não utilizada (deve gerar alerta)
const naoUtilizada = 'Teste';

// Aspas duplas (contraria a configuração do prettier com singleQuote: true)
const textoComAspas = 'Este texto usa aspas duplas';

// Ponto e vírgula faltando (depende das regras)
const semPontoEVirgula = 'Teste';

// Espaçamento irregular (problema de formatação)
const espacoIrregular = 'Teste';

// Componente com erro de prop-types (se configurado)
export default function ComponenteTeste() {
  // Variável declarada mas nunca lida (deve gerar alerta)
  let contador = 0;

  // Retorno sem ponto e vírgula (depende das regras)
  return (
    <View style={{ padding: 20 }}>
      <Text>{textoComAspas}</Text>
    </View>
  );
}
