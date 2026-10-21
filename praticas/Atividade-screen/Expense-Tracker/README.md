# Expense-Tracker

Aplicativo mobile de controle de despesas desenvolvido com Expo e React Native. O projeto demonstra navegação combinada com React Navigation: abas inferiores para consultar despesas e uma pilha de navegação para acessar a tela de gerenciamento.

## Criação e execução

O projeto utiliza Expo. Para instalar as dependências na raiz do projeto:

```bash
npm install
```

Para iniciar o aplicativo:

```bash
npx expo start
```

Também é possível iniciar diretamente em uma plataforma:

```bash
npm run android
npm run ios
npm run web
```

## Funcionalidades

- Navegação por abas entre as telas de despesas recentes e todas as despesas.
- Ícones de ampulheta e carteira nas abas, usando `@expo/vector-icons`.
- Acesso à tela de gerenciamento pelo botão de adicionar no cabeçalho.
- Navegação em pilha com retorno da tela de gerenciamento para as abas.
- Telas centralizadas com identificação textual.

## Navegação

O `NavigationContainer` envolve a navegação principal. Um Native Stack contém a tela `Despesas`, que renderiza o Bottom Tab Navigator, e a tela `GerenciarDespesa`. O cabeçalho da tela de gerenciamento é mantido; o cabeçalho da tela que contém as abas é ocultado.

O Bottom Tab Navigator contém:

- `DespesasRecentes`, com o rótulo **Recentes** e o ícone `hourglass`.
- `TodasDespesas`, com o rótulo **Todas** e o ícone `wallet-outline`.

O botão do cabeçalho é o componente reutilizável `IconButton`. Ao pressioná-lo, a navegação abre `GerenciarDespesa`.

## Estrutura do projeto

```text
Expense-Tracker/
├── App.js
├── app.json
├── components/
│   └── IconButton.js
├── screens/
│   ├── DespesasRecentes.js
│   ├── GerenciarDespesa.js
│   └── TodasDespesas.js
├── assets/
├── index.js
└── package.json
```

- `App.js`: configura o Native Stack e o Bottom Tab Navigator.
- `components/IconButton.js`: botão de ícone com feedback visual ao pressionar.
- `screens/`: telas de despesas recentes, todas as despesas e gerenciamento.
- `assets/`: recursos visuais do aplicativo.

## Dependências principais

- `expo` e `react-native` para executar o aplicativo.
- `@react-navigation/native` para a infraestrutura de navegação.
- `@react-navigation/bottom-tabs` para as abas inferiores.
- `@react-navigation/native-stack` para a pilha de telas.
- `@expo/vector-icons` para os ícones Ionicons.
- `react-native-screens` e `react-native-safe-area-context` como dependências de suporte do React Navigation.
