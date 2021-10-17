# App.js

```js
// we import react -> JSX
import React from "react";

// import componenets from react-native:
/* 
1. View -> is similar to div - container. 
2. Text -> simple text. 
3. StyleSheet -> define the design (similar to CSS)
*/
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  // We must return 1 element to the user as output:
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Open up App.js to start working on your app!
      </Text>
    </View>
  );
}

// Styling is done by JS. (similar to CSS)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
```
