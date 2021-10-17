# Flat list

- Used for presenting a list in react-native.
- The flatlist component displays scrolling list.
- flatList is good for long list of data, or data that changes over time.
- ScrollView is more general. FlatList is diffrent from ScrollView, when it shows only the current elements on the screen. (not all the elements at once)

```js
import React from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: "A" },
          { key: "B" },
          { key: "C" },
          { key: "D" },
          { key: "E" },
          { key: "F" },
          { key: "G" },
          { key: "H" },
          { key: "I" },
          { key: "J" },
          { key: "K" },
          { key: "L" },
          { key: "M" },
        ]}
        renderItem={({ item }) => <Text style={styles.txt}>{item.key}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  txt: {
    fontSize: 20,
    height: 40,
    margin: 10,
  },
});
```
