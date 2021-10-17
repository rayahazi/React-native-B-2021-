# Goals app:

1. Add ScrollView to the list of goals.

> note: We will use ScrollView when we have short amount of items (15, 20). For very long list - it is very inefficiet. (because ScrollView renders all the list - even what we don't see on the screen).

```js
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
} from "react-native";

export default function App() {
  const [goal, setGoal] = useState("");
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    setGoalList([...goalList, goal]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="my new goal..."
          onChangeText={(txt) => setGoal(txt)}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>

      <ScrollView>
        {goalList.map((goal, i) => (
          <View style={styles.listItem} key={i}>
            <Text>{goal}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "70%",
  },
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
```

### 2. FlatList

FlatList has props of:

1. data - the list we want to show.
2. keyExtractor - define unique id for each item in the list.
3. renderItem - gets a function to show each item.

```js
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  FlatList,
} from "react-native";

export default function App() {
  const [goal, setGoal] = useState("");
  const [goalList, setGoalList] = useState([]);

  const addGoalHandler = () => {
    setGoalList((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goal },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="my new goal..."
          onChangeText={(txt) => setGoal(txt)}
        />
        <Button title="Add" onPress={addGoalHandler} />
      </View>

      <FlatList
        keyExtractor={(item) => item.id}
        data={goalList}
        renderItem={(item) => (
          <View style={styles.listItem}>
            <Text>{item.item.value}</Text>
          </View>
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
  inputContainer: {
    flexDirection: "row",
    margin: 10,
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "70%",
  },
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
```
