# Custom fonts

> We can use: https://fonts.google.com/

- The assets folder will contain our fonts.
- Create new folder in `assets` -> `fonts`
- insert to `fonts` the `.ttf` files.
- In App.js - we use the file. Because it is the first file to load or to be executed. We want to load our fonts when app starts.

### install expo-font

We can install expo-font using:

1. npm install expo font
2. expo install expo font

- The better option is using `expo`. Expo will install the right package version for the specific version of our current expo app.

## App.js

- Function fetchFonts() to get the fonts before the app loaded.

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
// Import:
import * as Font from "expo-font";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

// function outside the App component:
const fetchFonts = () => {
  // pass an object with all the fonts:
  // loadAsync returns a promise -> take a little longer

  Font.loadAsync({
    // font-name(we use) : path to the font
    "reggae-one": require("./assets/fonts/ReggaeOne-Regular.ttf"),
  });
};

export default function App() {
  // we can load our function here -> it is not recommended .
  // the fonts take time to load, and some elements will need it and won't have it

  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);

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
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
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

## AppLoading: App.js

AppLoading - will wait until task is dont. (in our case: fetchFonts), and then will run the app.

- Install: `expo install expo-app-loading`
- import: `import AppLoading from 'expo-app-loading'`

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";
// Import:
import AppLoading from "expo-app-loading";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "reggae-one": require("./assets/fonts/ReggaeOne-Regular.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  // we can use state to check if data has loaded:
  const [dataLoaded, setDataLoaded] = useState(false);

  // as long as data isn't loaded -> app is loading
  /* * startAsync: is a prop that gets the operation to execute. 
       A. it has to be a function B. it has to return a promise. 
     * onFinish: when startAsync is donw - go to it. (function)
     * onError - in case loading failed 
  */
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log(err)}
      />
    );
  }

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
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
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

## Change fontFamily in `StartGameScreen.js` and Header.js

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
    fontFamily: "reggae-one", // Add external font-family
  },
  inputContainer: {
    alignItems: "center",
    width: 300,
    maxWidth: "80%",
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

- Header.js

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTxt}>{props.headerTxt}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    width: "100%",
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    color: "black",
    fontSize: 20,
    fontFamily: "reggae-one",
  },
});

export default Header;
```
