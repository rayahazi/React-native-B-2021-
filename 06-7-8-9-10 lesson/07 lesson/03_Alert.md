# Alert

- Alert is built-in component in react-native(not core).

Gets 3 values:

1. title
2. message
3. AlertButton[] - array of button options

```js
(property) AlertStatic.alert: (title: string, message?: string, buttons?: AlertButton[], options?: AlertOptions) => void
```

### numberContainer.js

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const NumberContainer = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    padding: 10,
    margin: 10,
  },
  number: {
    color: Colors.secondary,
    fontSize: 22,
  },
});

export default NumberContainer;
```

### StartGameScreen.js

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
        <Button title="START THE GAME!" />
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
