# input

- StartGameScreen.js

1. Add variable state to keep the user's input.
2. Add validation check for user input(using regex).
3. Reset button - when click on it - reset the input field
4. Style of input: (border only in the bottom)

```
borderBottomColor: "gray",
borderBottomWidth: 1,
```

```js
import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";

const StartGameScreen = (props) => {
  const [inputNumber, setInputNumber] = useState(""); // get the input of the user

  const numberInputHandler = (inputFromUser) => {
    setInputNumber(inputFromUser.replace(/[^0-9]/g, ""));
  };

  const resetInputHandler = () => {
    setInputNumber(""); // clear the input
  };

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
            <Button title="OK" onPress={() => {}} color={Colors.primary} />
          </View>
        </View>
      </Card>
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
});

export default StartGameScreen;
```
