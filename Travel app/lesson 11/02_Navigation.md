## Navigation:

- Web - go to URL.
- Apps - go to components.

#### Install

https://reactnavigation.org/docs/getting-started/

- react navigation - called react-navigation, but it is specific for native:

```
npm i react-navigation
```

- dependncies - install 5 dependncies

```
expo install react-native-gesture-handler react-native-reanimated react-native-screens
react-native-safe-area-context @react-native-community/masked-view
```

##### Install navigators:

```
npm i react-navigation-stack
npm i @react-navigation/bottom-tabs
npm i @react-navigation/drawer
```

## Workflow:

- Create a file `navigation/TripsNavigation`

```js
// Stack navigator - pages are kept in the stack (easy to go back)
import { createStackNavigator } from "react-navigation-stack";

// built-in function that takes an object of screens for stack:
createStackNavigator({});
```

- continue:

```js
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

// import files for navigation:
import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";

// put createStackNavigator in a variable - so we can export it
const TripsNavigator = createStackNavigator({
  Countries: CountriesScreen,
  // we can put it as an object for more configuration:
  CountryTrip: {
    screen: CountryTripScreen,
  },
  TripDetail: TripDetailScreen,
});

// wrap in createAppContainer() - Create an app container to wrap the root navigator
export default createAppContainer(TripsNavigator);
```

- Add a button to `CountriesScreen.js`

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
          /*
            Most important method for navigation:
            routeName - must be one of the keys from TripsNavigator
            another syntax: 
          
          // props.navigation.navigate({
          //   routeName: 'CountryTrip'
          // })

          */
          props.navigation.navigate("CountryTrip");
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

- And to `CountryTripScreen`

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

- Alternative:

```js
props.navigation.navigate("CountryTrip");
```

- We can use `push()` - it is shorter, push always will take us to the screen (navigate not!). sometimes it is important(for big apps)

```js
props.navigation.push("CountryTrip");
```
