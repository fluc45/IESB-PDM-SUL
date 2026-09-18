# RotinaIESB - Organizador de Rotina Acadêmica

Aplicativo mobile desenvolvido para gerenciamento da rotina de estudos e compromissos do aluno no IESB, consolidando conceitos de React Native, Expo, Flexbox, componentes, gerenciamento de estado (`useState`) e persistência de dados local com `AsyncStorage`.

---

## 1. Comando Utilizado para Criação do Projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank

Dependências adicionais instaladas:

npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

2. Capturas de Tela (Prints)Tela VaziaCom CompromissosApós Reabrir o App

3. Mapeamento dos Hooks de Persistência (useEffect)

Toda a lógica de persistência local está concentrada no arquivo App.js:

    useEffect de Carga Inicial:

        Localização: Linhas ~16 a ~31 do App.js.

        Funcionamento: Disparado apenas 1 vez na montagem da tela (deps: []). Busca a chave @rotina_iesb_compromissos no AsyncStorage, converte a string gravada para objeto com JSON.parse() e atualiza o estado compromissos.

    useEffect de Salvamento Automático:

        Localização: Linhas ~33 a ~45 do App.js.

        Funcionamento: Escuta alterações na lista (deps: [compromissos, carregado]). Sempre que um item é cadastrado ou excluído via .filter(), converte o array com JSON.stringify() e salva no storage.

4. Arquivos Criados e Módulos

    labels.js: Centraliza todas as strings e textos do aplicativo (exportação nomeada), facilitando manutenções e internacionalização.

    components/CompromissoInput.js: Componente do formulário com TextInput e botão interativo Pressable com feedback de toque.

    components/CompromissoList.js: Componente de listagem estruturado com FlatList, renderização de cards com data de criação, exclusão de itens e tratamento de lista vazia (ListEmptyComponent).
```
