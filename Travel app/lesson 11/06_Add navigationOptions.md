# Add navigationOptions to `CountryTripScreen`

- Change navigationOptions from an object to a function - so we can use the props.
- use the props in navigationOptions
  > Note: we have more than 1 time the navigation settings. (next time - we will put all the settings in 1 place).

```js
import React from "react";
import { Button, StyleSheet, Text, View, Platform } from "react-native";

// import:
import { COUNTRIES } from "../data/dummy-data";
import Colors from "../constants/Colors";

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
          props.navigation.goBack();
        }}
      />
    </View>
  );
};

// navigationOptions is an object -> We want it to be function (use props)
CountryTripScreen.navigationOptions = (navigationData) => {
  // bring data from above:
  const countryId = navigationData.navigation.getParam("countryId");
  const selectedCountry = COUNTRIES.find((c) => c.id === countryId);

  return {
    headerTitle: selectedCountry.title,
    headerStyle: {
      backgroundColor: Platform.os === "android" ? Colors.primary : "",
    },
    headerTintColor: Platform.os === "android" ? "" : Colors.primary,
  };
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
