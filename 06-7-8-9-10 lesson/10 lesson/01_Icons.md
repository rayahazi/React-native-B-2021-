# Icons

We can use icons in our app from expo-icons:

- Library for all the icons of expo: https://icons.expo.fyi/

or: https://oblador.github.io/react-native-vector-icons/

#### MainButton.js

```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";

const MainButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: 12, // top + bottom
    paddingHorizontal: 30, // left + right
  },
  buttonText: {
    color: "white",
    fontFamily: "reggae-one",
    fontSize: 18,
  },
});

export default MainButton;
```

## GameScreen.js

- Use Mainbutton
- Use Ionicons

```js
import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyle from "../constants/default-style";

// 1. import:
// Ionicons - one set of icons managed by ionic team:
import { Ionicons } from "@expo/vector-icons";
import MainButton from "../components/MainButton";

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
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(rounds);
    }
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

    setRounds(rounds + 1);
    console.log(
      `x ${props.userChoice} ${currentLow.current} ${currentHigh.current}`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={DefaultStyle.bodyText}>Computer's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.btnContainer}>
        {/* import { Ionicons } from '@expo/vector-icons'; */}
        <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
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
