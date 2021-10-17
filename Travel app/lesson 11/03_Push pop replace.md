# Push pop replace

### Go back - `CountryTripScreen.js`

```js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const CountryTripScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Country trips screen</Text>

      <Button
        title="Go to details"
        onPress={() => {
          props.navigation.navigate("TripDetail");
        }}
      />

      <Button
        title="Go back"
        onPress={() => {
          // or: props.navigation.pop() -> Available only in stackNavigator.
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CountryTripScreen;
```

## popToTop() - TripDetailScreen

```js
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const TripDetailScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Trip Detail screen</Text>
      <Button
        title="Go back to countries"
        onPress={() => {
          // Goes all the way 2 screens back
          props.navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TripDetailScreen;
```

## Replace - CountriesScreen.js

- Replace the current component in the stack. We cannot go back.
  Can be used for example in LOGIN screen - after user signed in we don't want him to go back to sign-in page.

```js
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const CountriesScreen = (props) => {
  return (
    <View style={styles.container}>
      <Text>Countries screen</Text>
      <Button
        title="Go to trips"
        onPress={() => {
          // props.navigation.navigate('CountryTrip')
          // replace - no going back
          props.navigation.replace("CountryTrip");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CountriesScreen;
```
