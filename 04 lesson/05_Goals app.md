# Goals app:

- App.js

```js
import React, { useState } from "react";
import { Button, StyleSheet, TextInput, View, Text } from "react-native";

export default function App() {
  // Goal from the user (input)
  const [goal, setGoal] = useState("");

  // Goal list - contains all the goals
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    // update the list of goals, whenever user adds new goal
    setGoalList([...goalList, goal]);
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.input}
          placeholder="my new goal..."
          onChangeText={(txt) => setGoal(txt)}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>

      <View>
        {goalList.map((goal) => (
          <Text key={goal}>{goal}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "70%",
  },
});
```
