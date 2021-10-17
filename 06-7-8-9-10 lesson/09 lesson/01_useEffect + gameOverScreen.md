# useEffect

The Effect hook lets you prefom side effect in function components.

- Side effects: data fetching, subscription, changing the DOM.
- useEffect run after every render by default. It will run after the first render, and after every update.
- Dependencies:

### GameOverScreen.js

- Create new screen that will be shown when number of rounds is set.(in App.js)

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GameOverScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>GAME OVER!</Text>
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

### App.js

- Define new state: guessRounds. when changes: GameOverScreen.
- The screen `GameScreen` is responsible to change that value.

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  // state to keep number of rounds:
  const [guessRounds, setGuessRounds] = useState(0);

  const startGameHandler = (numberFromUser) => {
    setUserNumber(numberFromUser);
    // if we start a new game - reset the guessRounds
    setGuessRounds(0);
  };

  // function to change the guessRounds - when game is over!
  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  // add new prop `onGameOver` - to change the value of rounds:
  if (userNumber && guessRounds === 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = <GameOverScreen />;
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

### GameScreen.js

- state to store number of rounds: will be incremented(++) after each round
- useEffect: is responsible to check for winning each round:
  - if number of computer & number of user are equal: go to the function of game over.
  - The useEffect will run only after one of his dependencies will change.

```js
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";

const generateRandomNumber = (min, max, userChoice) => {
  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === userChoice) {
    return generateRandomNumber(min, max, userChoice);
  } else {
    return randomNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomNumber(1, 100, props.userChoice)
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  // Add state to manage the rounds:
  const [rounds, setRounds] = useState(0);

  // Add useEffect: run after every render - will check for winning after every round:
  // useEffect(function to execute, arr of dependencies);
  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
    // here we specify any value that comes from outside the effect:
    // by adding dependencies - the effect will run only when dependencies change:
  }, [currentGuess, props.userChoice, props.onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "lower" && currentGuess < props.userChoice) ||
      (direction === "higher" && currentGuess > props.userChoice)
    ) {
      Alert.alert(
        "Wrong direction!",
        "this is the wrong direction! check yourself...",
        [{ text: "oopps..", style: "cancel" }]
      );
      return;
    }

    if (direction === "lower") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);

    // set rounds:
    setRounds(rounds + 1);
    console.log(
      `x ${props.userChoice} ${currentLow.current} ${currentHigh.current}`
    );
  };

  return (
    <View style={styles.container}>
      <Text>Computer's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "lower")} />
        <Button
          title="HIGHER"
          onPress={nextGuessHandler.bind(this, "higher")}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    width: 300,
    maxWidth: "80%",
    marginTop: 20,
    justifyContent: "space-around",
  },
});

export default GameScreen;
```
