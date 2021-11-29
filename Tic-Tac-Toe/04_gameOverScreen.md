If we do not use `useEffect` - it will not work!!!

### GameOverScreen.js

```js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Header from "../components/Header";

export default function GameOverScreen(props) {
  return (
    <View style={styles.container}>
      <Text>GAME OVER!</Text>
      <Button title="Start a new game" onPress={() => props.onStartGame()} />
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

### App.js

```js
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import GameBoardScreen from "./screens/GameBoardScreen";
import GameOverScreen from "./screens/GameOverScreen";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  const [startGame, setstartGame] = useState(false);

  let startGameHandler = () => {
    setstartGame(true);
  };

  let gameOverHandler = () => {
    content = <GameOverScreen />;
  };
  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (startGame) content = <GameBoardScreen onGameOver={gameOverHandler} />;

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

### GameBoardScreen.js

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

  let onBrickPress = (row, col) => {
    if (GameBoard[row][col] !== 0) return;
    setGameBoard([...GameBoard, (GameBoard[row][col] = currPlayer)]);
    setCurrPlayer(currPlayer == 1 ? -1 : 1);
    let winner = checkWinner();
    if (winner === 1) {
      Alert.alert("Player 1 is the winner");
      props.onGameOver();
    } else if (winner === -1) {
      Alert.alert("Player 2 is the winner");
      props.onGameOver();
    }
  };

  let checkWinner = () => {
    let sum = 0;
    for (let i = 0; i < GameBoard.length; i++) {
      sum = GameBoard[i][0] + GameBoard[i][1] + GameBoard[i][2];
      if (sum == 3) return 1;
      else if (sum == -3) return -1;
    }
    for (let i = 0; i < GameBoard.length; i++) {
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
