# Finish gameOverScreen

### Class task

> the screens: GameOverScreen.js, App.js

1. In game over screen - show(using props)

   - number of rounds
   - user choice

   - add a button - "new game" -> will start new game.

2. In app.js
   - create a function to handle `new game`:
     - reset rounds
     - reset user choice

## GameOverScreen.js

- Show number of rounds + user choice
- Button to have a new Game

```js
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>GAME OVER!</Text>
      {/* 2 props from App.js */}
      <Text>Number of rounds: {props.roundsNumber}</Text>
      <Text>Number was: {props.userNumber}</Text>
      {/* button to have another new game! */}
      <Button title="New game" onPress={props.restart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default GameOverScreen;
```

## App.js

- send 3 props

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

  // reset rounds + userChoice to start another game:
  // display StartGameScreen
  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (numberFromUser) => {
    setUserNumber(numberFromUser);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds === 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    // add 2 props: user choice & number of rounds:
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        // send a function to restart the game:
        restart={newGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header headerTxt="Guess my number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
```
