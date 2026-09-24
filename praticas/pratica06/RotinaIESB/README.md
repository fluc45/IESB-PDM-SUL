# RotinaIESB

Aplicativo mobile para cadastrar, visualizar e remover compromissos da rotina acadêmica do aluno no IESB. O projeto consolida conceitos de Expo, React Native, Flexbox, componentes, estado e persistência local.

## Criação e execução

Projeto criado com o template blank do Expo:

```bash
npx create-expo-app@latest RotinaIESB --template blank
```

Dependências instaladas:

```bash
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

Para iniciar o aplicativo:

```bash
npx expo start
```

O projeto foi desenvolvido com Expo SDK 54 e pode ser executado em um emulador Android ou no Expo Go.

## Funcionalidades

- Cadastro de compromissos, impedindo texto vazio.
- Exibição dos compromissos com horário de criação.
- Remoção individual usando o identificador do item.
- Persistência local com AsyncStorage e JSON.
- Contador de compromissos pendentes no cabeçalho (desafio opcional O3).
- Lista com `FlatList` e mensagem para estado vazio (desafio opcional O4).

## Capturas de tela

Os screenshots serão adicionados após os testes finais no dispositivo ou no Expo Go.

### Tela vazia

[Abrir screenshot da tela vazia](./screenshots/tela-vazia.png)

### Tela com compromissos

[Abrir screenshot com compromissos](./screenshots/com-compromissos.png)

### Após reabrir o app

[Abrir screenshot após reabrir o app](./screenshots/apos-reabrir.png)

## Persistência com useEffect

A lógica de persistência está em `App.js`:

- **Carga inicial:** o primeiro `useEffect`, executado com dependências vazias (`[]`), busca a chave `@rotina_iesb_compromissos` no AsyncStorage e converte o resultado com `JSON.parse`.
- **Salvamento automático:** o segundo `useEffect`, dependente de `compromissos` e `carregado`, salva a lista com `JSON.stringify` sempre que ela é alterada. O estado `carregado` evita sobrescrever os dados antes da conclusão da carga inicial.

## Estrutura do projeto

```text
RotinaIESB/
├── App.js
├── app.json
├── labels.js
├── package.json
├── assets/
│   └── logo.png
└── components/
    ├── CompromissoInput.js
    └── CompromissoList.js
```

- `labels.js`: centraliza os rótulos do aplicativo usando exportação nomeada.
- `components/CompromissoInput.js`: formulário com `TextInput` e `Pressable`.
- `components/CompromissoList.js`: listagem com `FlatList`, exclusão e estado vazio.
- `assets/logo.png`: imagem local exibida no cabeçalho.

## Requisitos demonstrados

O app utiliza `SafeAreaProvider`, `SafeAreaView`, `View`, `Text`, `Image`, `TextInput`, `StyleSheet`, `useState`, `useEffect`, props, `Pressable`, `FlatList`, `AsyncStorage`, `JSON.parse` e `JSON.stringify`.

O link do Pull Request será informado separadamente, conforme orientação da entrega.
