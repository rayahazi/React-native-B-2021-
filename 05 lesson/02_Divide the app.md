# GoalInput.js

```js
import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native";

const GoalInput = (props) => {
  // Goal from the user:
  const [goal, setGoal] = useState("");

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="my new goal..."
        onChangeText={(txt) => setGoal(txt)}
      />
      <Button
        title="Add"
        // syntax1: () => props.onAddGoal(goal) -> function will not run
        // syntax2: props.onAddGoal.bind(this,goal).
        // (bind - always gets `this` as first argument)
        // bind - gets parameters that will be executed when function is executed.
        onPress={props.onAddGoal.bind(this, goal)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "70%",
  },
});

export default GoalInput;
```

# GoalItem.js

```js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const GoalItem = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={props.onDelete.bind(this, props.id)}
    >
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 5,
    backgroundColor: "whitesmoke",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 50,
    minWidth: "100%",
    borderRadius: 3,
  },
});

export default GoalItem;
```

# App.js

```js
import React, { useState } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import GoalInput from "./GoalInput";
import GoalItem from "./GoalItem";

export default function App() {
  // list of goals:
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = (goal) => {
    setGoalList((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goal },
    ]);
    console.log(goalList);
  };

  const removeGoalHandler = (goalId) => {
    // filter -  return only the diffrent items to the list
    setGoalList((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== goalId)
    );
  };

  return (
    <View style={styles.container}>
      <GoalInput onAddGoal={addGoalHandler} />
      <FlatList
        keyExtractor={(item) => item.id}
        data={goalList}
        renderItem={(item) => (
          <GoalItem
            title={item.item.value}
            id={item.item.id}
            onDelete={removeGoalHandler}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
});
```
