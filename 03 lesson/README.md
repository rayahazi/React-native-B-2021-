# React reminder

### JSX - JavaScript XML

we must import

```js
import React from "react";
```

To allows JSX to work.

- In addition - we use react to import hooks. For example: useState.

```js
import React from "react";
import { Text, View } from "react-native";

const getMyFullName = (firstName, lastName) => {
  return firstName + " " + lastName;
};

export default function App() {
  return (
    <View>
      <Text>My full name is: {getMyFullName("Alex", "Cohen")}</Text>
    </View>
  );
}
```

### Split the App to more than 1 file:

1. Create new file `MyName.js`

```js
import React from "react";
import { View, Text } from "react-native";

const getMyFullName = (firstName, lastName) => {
  return firstName + " " + lastName;
};

const MyName = () => {
  return (
    <View>
      <Text>My full name is: {getMyFullName("Alex", "Cohen")}</Text>
    </View>
  );
};

export default MyName;
```

2. Import the file to `App.js` and use it as component:

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import MyName from "./MyName";

export default function App() {
  return (
    <View style={styles.container}>
      <MyName />
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

### props:

We can add parameters to the components(they are functions or classes).

- We can call `props` however we want. props is not a reserved word. (but it is convenient).
- we can have as many props as we want.

###### in `MyName.js` file:

```js
import React from "react";
import { View, Text } from "react-native";

// MyName is a function. Functions can get parameters
const MyName = (props) => {
  return (
    <View>
      <Text>
        My full name is: {props.fname} {props.lname}
      </Text>
    </View>
  );
};

export default MyName;
```

###### in `App.js` file:

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import MyName from "./MyName";

export default function App() {
  return (
    <View style={styles.container}>
      <MyName fname="Alex" lname="Cohen" />
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

### Add more than 1 component:

Components are reusable in react-native.
We can call the same component, with diffrent props every time.

```js
import React from "react";
import { StyleSheet, View } from "react-native";
import MyName from "./MyName";

export default function App() {
  return (
    <View style={styles.container}>
      <MyName fname="Alex" lname="Cohen" />
      <MyName fname="Bracha" lname="Levi" />
      <MyName fname="John" lname="Gadot" />
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

### JSX - strings vs objects:

- In JSX we must put variables in `{}`.
  for example:

```js
style={styles.container}
```

- In JavaScript - we define objects by `{}`.

- To use objects inside JSX variables: we must use `{{}}`
  for example:

```js
style={{color:'red'}}
```
