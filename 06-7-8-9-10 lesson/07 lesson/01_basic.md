# Guess app

#### 1. Create component `Header.js`

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    backgroundColor: "mediumseagreen",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    color: "black",
    fontSize: 20,
  },
});

export default Header;
```

#### 2. Create component for card:

- Card - will hold card styling that we can use anywhere in the app. (a card will get the basic styling - from the styles.card, and will add the external style from the props)

example:

```js
style={{ ...styles.card, ...props.style }}
```

- shadow: works on IOS only. (for android: we must add `elevation: 6,`)

```js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
  // ...styles.card - is the style in this file
  // ...props.style - additional style
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

// keep only the style that will be global for each card:
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 6, // now we will see the shadow
    shadowOpacity: 0.2, // 0-1
    borderRadius: 5, // rounded corners
    elevation: 6, // shadow settings for android
    padding: 10,
    marginTop: 10,
  },
});

export default Card;
```

#### StartGameScreen

- Use card component. (send additional style to it)

```js
import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Card from "../components/Card";

const StartGameScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new game!!</Text>

      <Card style={styles.inputContainer}>
        <Text>Select a number:</Text>
        <TextInput />

        <View style={styles.BtnContainer}>
          <View style={styles.btn}>
            <Button title="Reset" onPress={() => {}} />
          </View>
          <View style={styles.btn}>
            <Button title="OK" onPress={() => {}} />
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
});

export default StartGameScreen;
```

#### App.js

- use Header.js
- Keep StartGameScreen as variable, and use it to show in the main app.

```js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  let startGame = <StartGameScreen />;

  return (
    <View style={styles.container}>
      <Header headerTxt="Guess my number" />
      {startGame}
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

#### Colors.js

- this file will hold all the colors in our app global
- Reason: change in 1 place - change in all the places.

```js
export default {
  primary: "mediumseagreen",
  secondary: "lightgreen ",
};
```

- We Add the colors in 2 files:

1. Header.js

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
  },
});

export default Header;
```

2. StartGameScreen.js - for buttons

```js
import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import Card from "../components/Card";
import Colors from "../constants/Colors";

const StartGameScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new game!!</Text>

      <Card style={styles.inputContainer}>
        <Text>Select a number:</Text>
        <TextInput />

        <View style={styles.BtnContainer}>
          <View style={styles.btn}>
            <Button title="Reset" onPress={() => {}} color={Colors.secondary} />
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
});

export default StartGameScreen;
```
