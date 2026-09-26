# Receita Fácil

Aplicativo mobile de receitas culinárias desenvolvido em React Native com Expo.

## Requisitos

- Node.js
- Expo CLI
- Android Studio ou dispositivo Android
- Conexão com a internet

## Instalação

```bash
npm install
npx expo start
```

Para executar no Android:

```bash
npm run android
```

## Funcionalidades implementadas

- Busca de receitas por nome.
- Visualização de detalhes.
- Lista de ingredientes.
- Modo de preparo.
- Favoritos com AsyncStorage.
- Navegação por abas.
- Tratamento básico de erros e carregamento.

## API

TheMealDB:
https://www.themealdb.com/api.php

## Observação sobre a APK

A geração da APK deve ser realizada no ambiente Android configurado para o projeto. Após a geração, o arquivo deve ser colocado na pasta `release` do repositório, conforme a orientação da disciplina.
