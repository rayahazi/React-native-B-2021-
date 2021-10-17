# Button

- Button is the most basic touchable element a user can press on.

```js
<View style={styles.container}>
  <Button onPress={() => alert("You clicked a button")} title="Click me" />
</View>
```

# Touchables

- has opening and closing tags.
- has to have only one child component (element) inside it.

##### TouchableHighlight

The default touchable.

##### TouchableOpacity

Show more opacity when we click that area.

##### TouchableWithoutFeedback

Show no change when user clicks the area

##### TouchablenativeFeedback

Android only. Show darker area when user clicks.

```js
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableNativeFeedback,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Button onPress={() => alert("You clicked a button")} title="Click me" />

      <TouchableHighlight
        onPress={() => alert("You clicked TouchableHighlight")}
      >
        <View style={styles.t1}>
          <Text style={styles.txt}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>

      <TouchableOpacity onPress={() => alert("You clicked TouchableOpacity")}>
        <View style={styles.t1}>
          <Text style={styles.txt}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>

      <TouchableWithoutFeedback
        onPress={() => alert("You clicked TouchableWithoutFeedback")}
      >
        <View style={styles.t1}>
          <Text style={styles.txt}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableNativeFeedback
        onPress={() => alert("You clicked TouchableNativeFeedback")}
      >
        <View style={styles.t1}>
          <Text style={styles.txt}>TouchableNativeFeedback</Text>
        </View>
      </TouchableNativeFeedback>
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
    padding: 10,
  },
  t1: {
    backgroundColor: "steelblue",
    width: 300,
    alignItems: "center",
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "steelblue",
  },
});
```

## Class task 2

1. Create new component `Counter`, with function to export.
2. Use one of the touchables to create a button - `Add to count`, and design it with style.
3. The component will show how many times the user clicked the touchable area. (in text area).
4. Create another touchable - `Zero`, and design it with style.
5. The button will zero the counts.

## Solution:

1. Counter.js:

```js
import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

const Counter = () => {
  const [counter, setCounter] = useState(0);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCounter(counter + 1)}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Add to count</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setCounter(0)}>
        <View style={styles.btn}>
          <Text style={styles.txt}>Zero</Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.txt}>{counter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "steelblue",
    width: 300,
    alignItems: "center",
    margin: 10,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "steelblue",
  },
  txt: {
    fontSize: 20,
    padding: 10,
  },
});

export default Counter;
```

2. App.js

```js
import React from "react";
import { StyleSheet, View } from "react-native";

import Counter from "./Counter";

export default function App() {
  return (
    <View style={styles.container}>
      <Counter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
```

<img src="IMG/1.png"/>
