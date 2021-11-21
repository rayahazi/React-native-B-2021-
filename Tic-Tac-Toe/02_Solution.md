# `GameBoardScreen.js`

```js
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function GameBoardScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        ></View>
        <View
          style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}
        ></View>
        <View
          style={[
            styles.tile,
            { borderRightWidth: 0, borderTopWidth: 0, borderLeftWidth: 1 },
          ]}
        ></View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        ></View>
        <View
          style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        ></View>
        <View
          style={[
            styles.tile,
            { borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0 },
          ]}
        ></View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View
          style={[
            styles.tile,
            { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0 },
          ]}
        ></View>
        <View
          style={[
            styles.tile,
            { borderBottomWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
          ]}
        ></View>
        <View
          style={[
            styles.tile,
            {
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            },
          ]}
        ></View>
      </View>
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
  tile: {
    borderWidth: 5,
    height: 100,
    width: 100,
  },
});
```

## Header.js

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
    fontSize: 25,
  },
});

export default Header;
```

## App.js

```js
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameBoardScreen from "./screens/GameBoardScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <Header headerTxt="Tic Tac Toe" />
      <GameBoardScreen></GameBoardScreen>
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

## Final:

```js
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// 2. Add icons - built in in expo:
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default function GameBoardScreen(props) {
  const [GameBoard, setGameBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currPlayer, setCurrPlayer] = useState(1);

  // 3. Function to show the Icons:
  let renderIcon = (row, column) => {
    let value = GameBoard[row][column];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.theX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.theO} />;
      default:
        return <View></View>;
    }
  };

  // 4. Function to handle press:
  let onBrickPress = (row, col) => {
    // Prevent change of non-empty brick:
    if (GameBoard[row][col] !== 0) return;
    // Update the border:
    setGameBoard([...GameBoard, (GameBoard[row][col] = currPlayer)]);
    // Update the player - switch to the other one
    setCurrPlayer(currPlayer == 1 ? -1 : 1);
    // check winning option:
    let winner = checkWinner();
    if (winner === 1) Alert.alert("Player 1 is the winner");
    //Alert.alert("Player 1 is the winner")
    else if (winner === -1) {
      Alert.alert("Player 2 is the winner");
    }
  };

  let checkWinner = () => {
    let sum = 0;
    for (let i = 0; i < GameBoard.length; i++) {
      // Check rows:
      sum = GameBoard[i][0] + GameBoard[i][1] + GameBoard[i][2];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
    for (let i = 0; i < GameBoard.length; i++) {
      // Check cols:
      sum = GameBoard[0][i] + GameBoard[1][i] + GameBoard[2][i];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }

    // diagonals: main
    sum = GameBoard[0][0] + GameBoard[1][1] + GameBoard[2][2];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;

    // diagonals: secondary
    sum = GameBoard[2][0] + GameBoard[1][1] + GameBoard[0][2];
    if (sum == 3) return 1;
    else if (sum == -3) return -1;

    // No winners:
    return 0;
  };

  return (
    //  1. The Game board: <View><Touchable>icon</Touchable></View>
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onBrickPress(0, 0)}
          style={[styles.brick, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(0, 1)}
          style={[styles.brick, { borderTopWidth: 0, borderLeftWidth: 0 }]}
        >
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(0, 2)}
          style={[
            styles.brick,
            { borderRightWidth: 0, borderTopWidth: 0, borderLeftWidth: 1 },
          ]}
        >
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onBrickPress(1, 0)}
          style={[styles.brick, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(1, 1)}
          style={[styles.brick, { borderLeftWidth: 0, borderTopWidth: 0 }]}
        >
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(1, 2)}
          style={[
            styles.brick,
            { borderLeftWidth: 0, borderTopWidth: 0, borderRightWidth: 0 },
          ]}
        >
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => onBrickPress(2, 0)}
          style={[
            styles.brick,
            { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0 },
          ]}
        >
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(2, 1)}
          style={[
            styles.brick,
            { borderBottomWidth: 0, borderLeftWidth: 0, borderTopWidth: 0 },
          ]}
        >
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onBrickPress(2, 2)}
          style={[
            styles.brick,
            {
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              borderRightWidth: 0,
            },
          ]}
        >
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
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
  brick: {
    borderWidth: 5,
    height: 100,
    width: 100,
    alignItems: "center",
  },
  theX: {
    color: "blue",
    fontSize: 30,
    top: "30%",
  },
  theO: {
    color: "red",
    fontSize: 30,
    top: "30%",
  },
});
```
