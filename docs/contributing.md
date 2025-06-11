# Guia de Contribuição - Eco-Mercado

Este documento oferece orientações para contribuir com o projeto Eco-Mercado. Se você deseja participar do desenvolvimento, siga estas diretrizes para garantir um processo de contribuição suave e eficiente.

## Primeiros Passos

1. **Configurar o ambiente**:

   ```bash
   # Clone o repositório
   git clone [URL do repositório]
   cd eco-mercado

   # Instale as dependências
   npm install

   # Inicie o projeto
   npx expo start
   ```

2. **Familiarize-se com a estrutura**:
   - Leia o documento de [arquitetura](architecture.md) para entender a estrutura do projeto
   - Verifique a documentação em `/docs` e `/features/*/README.md`
   - Explore o código para entender os padrões utilizados

## Workflow de Desenvolvimento

1. **Crie uma branch** para sua feature ou correção:

   ```bash
   git checkout -b feature/nome-da-feature
   # ou
   git checkout -b fix/nome-do-bug
   ```

2. **Desenvolvimento**:

   - Siga os padrões de código existentes
   - Implemente testes para novas funcionalidades
   - Mantenha o código limpo e bem documentado

3. **Atualize a documentação**:

   - Se você adicionar ou modificar funcionalidades, atualize a documentação correspondente
   - Mantenha o arquivo tasks.md atualizado com o status das tarefas

4. **Prepare para envio**:

   - Certifique-se de que o código compila sem erros
   - Execute o linter: `npm run lint`
   - Teste em múltiplas plataformas (Android/iOS) quando possível

5. **Envie sua contribuição**:

   ```bash
   git add .
   git commit -m "Descrição clara da sua mudança"
   git push origin sua-branch
   ```

6. **Crie um Pull Request** para a branch principal

## Padrões de Código

### Estilo de Código

- Utilize TypeScript para todas as implementações
- Siga as regras definidas no ESLint
- Use PascalCase para componentes e camelCase para funções/variáveis
- Prefixe hooks personalizados com "use"

### Componentes React Native

- Prefira componentes funcionais com hooks
- Utilize os componentes temáticos (ThemedText, ThemedView) para manter consistência
- Defina tipos para props e estados
- Documente componentes com comentários descritivos

### Exemplo de Componente

```tsx
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

interface MeuComponenteProps {
  titulo: string;
  valor?: number;
}

/**
 * Descrição do que o componente faz
 */
export function MeuComponente({ titulo, valor = 0 }: MeuComponenteProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">{titulo}</ThemedText>
      <ThemedText>{valor}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
  },
});
```

## Organização de Pastas

- Coloque novos componentes globais em `/components`
- Adicione componentes específicos de uma funcionalidade em `/features/nome-feature/components`
- Crie hooks personalizados em `/features/nome-feature/hooks` ou `/hooks` se for global
- Utilitários em `/features/nome-feature/utils`

## Processo de Revisão

- Seu código será revisado pelos mantenedores do projeto
- Comentários e solicitações de mudanças podem ser feitos
- Responda aos comentários e faça as alterações necessárias
- Após aprovação, seu código será mesclado à branch principal

## Dúvidas e Suporte

Se tiver dúvidas ou precisar de ajuda, entre em contato com os mantenedores do projeto ou abra uma issue descrevendo sua dúvida ou problema.

Agradecemos sua contribuição para o projeto Eco-Mercado!
