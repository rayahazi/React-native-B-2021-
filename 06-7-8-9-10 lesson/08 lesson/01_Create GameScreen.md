# Create the GameScreen:

### GameScreen.js

- When user picked a good number(after validation), and clicks the button of `Start the game` - it will redirect him to the page of `GameScreen`.
- nextGuessHandler - for now, the function will check if the user clicked the wrong button(lower/higher).
  if so - show an alert message.

```js
import React, { useState } from "react";
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

  const nextGuessHandler = (direction) => {
    // If user clicks the wrong direction - show alert message:
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

### StartGameScreen.js

- Add onPress to the button `start the game` - that leads to a function in App.js that changes the state of userInput. (that leads to the next screen - GameScreen.js)

```js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";

import Card from "../components/Card";
import NumberContainer from "../components/NumberContainer";
import Colors from "../constants/Colors";

const StartGameScreen = (props) => {
  const [inputNumber, setInputNumber] = useState(""); // get the input of the user
  const [confirmed, setConfirmed] = useState(false); // keep the user input state(right/wrong)
  const [rightChoice, setRightChoice] = useState(); // keep the user input if right

  const numberInputHandler = (inputFromUser) => {
    setInputNumber(inputFromUser.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setInputNumber(""); // clear the input
  };

  const confirmInputHandler = () => {
    const userChoice = parseInt(inputNumber);
    //console.log(userChoice, typeof userChoice);

    // A. wrong input
    if (isNaN(userChoice) || userChoice <= 0 || userChoice > 99) {
      Alert.alert("Invalid number!", "Number has to be between 1 and 99", [
        { text: "Okay", style: "destructive", onPress: resetInputHandler },
      ]);
      return;
    }
    // B. right input
    setConfirmed(true);
    setRightChoice(userChoice);
    setInputNumber("");
  };

  // if user input is OK - show message + number + button to start the game!
  let confirmedOutput;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.finalContainer}>
        <Text>Your choice is:</Text>
        <NumberContainer>{rightChoice}</NumberContainer>
        <Button
          title="START THE GAME!"
          onPress={() => props.onStartGame(rightChoice)}
        />
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new game!!</Text>

      <Card style={styles.inputContainer}>
        <Text>Select a number:</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={2}
          onChangeText={numberInputHandler}
          value={inputNumber}
        />

        <View style={styles.BtnContainer}>
          <View style={styles.btn}>
            <Button
              title="Reset"
              onPress={resetInputHandler}
              color={Colors.secondary}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="OK"
              onPress={confirmInputHandler}
              color={Colors.primary}
            />
          </View>
        </View>
      </Card>
      {confirmedOutput}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  header: {
    fontSize: 22,
  },
  inputContainer: {
    alignItems: "center",
    width: 300, // 300px.
    maxWidth: "80%", // if phone is smaller -> width will be less than 300px
  },
  BtnContainer: {
    flexDirection: "row",
  },
  btn: {
    margin: 10,
    width: 70,
  },
  input: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    height: 30,
    margin: 10,
    textAlign: "center",
    width: 50,
  },
  finalContainer: {
    alignItems: "center",
    marginTop: 10,
  },
});

export default StartGameScreen;
```

### App.js

- Logic of passing between 2 screens in an app.
  - a state that will be changed when we want to go to the next screen(userNumber).
    (we need that state value also in the next screen).
- put the two screens in a variable ('content') that will be in the View.

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

// We want to return only one screen.
// (if startGameScreen exists, don't run GameScreen)

export default function App() {
  // if we receive a number from the user - we can move to the GameScreen:
  const [userNumber, setUserNumber] = useState();

  const startGameHandler = (numberFromUser) => {
    setUserNumber(numberFromUser);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber) {
    content = <GameScreen userChoice={userNumber} />;
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
