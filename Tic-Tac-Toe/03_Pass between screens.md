# Pass screens:

## 1.

Create startGameScreen.js
It will get as prop a function to change the screen state:

```js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function StartGameScreen(props) {
  return (
    <View style={styles.container}>
      <Button title="Start the game" onPress={() => props.onStartGame()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```

## 2. App.js

1. Create variable content - it will keep the required screen.
2. Create state to store data from the StartGameScreen - true/false.
3. when true - call the function that will change the screen

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameBoardScreen from "./screens/GameBoardScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [startGame, setstartGame] = useState(false);

  let startGameHandler = () => {
    setstartGame(true);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (startGame) content = <GameBoardScreen />;

  return (
    <View style={styles.container}>
      <Header headerTxt="Tic Tac Toe" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
```
