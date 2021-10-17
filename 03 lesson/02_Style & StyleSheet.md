# Style - basic

Style is an attribute (prop).

- In react-native we use style that is similar to CSS - but actually is an object(key-value pairs) written in JS.

* All the core-coponents accept a prop named `style`.

### Inline style

- Note: we use `{{}}` because we transfer an object to JSX.

```js
<Text style={{ color: "red" }}></Text>
```

### StyleSheet

- StyleSheet is similar to CSS StyleSheets.
- StyleSheet is a class. (create() is a function that gets an object as parameter).
- If the style is too big - we can create separate file only for design.

```js
import React from "react";
import { StyleSheet, View } from "react-native";

export default function App() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
```
