# 07_Default navigation

keep settings in 1 place:

#### Process:

1. Delete headerstyle, delete colors import and Platform.
2. Both in CountriesScreen and CountryTripScreen

```js
 headerStyle: {
      backgroundColor: Platform.OS === "android" ? Colors.primary : "",
    },
    headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  };
```

3. In tripsNavigator.js
   1. import
   2. make objects, with `navigationOptions`.
   3. That puts all configurations in 1 place

This is not ideal yet - code repeating itself:

```js
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";
// import:
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const TripsNavigator = createStackNavigator({
  // turn to object and Add navigation options:

  Countries: {
    screen: CountriesScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  },
  CountryTrip: {
    screen: CountryTripScreen,
    navigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    },
  },
  TripDetail: TripDetailScreen,
});

export default createAppContainer(TripsNavigator);
```

## Final in tripsNavigator.js

- we can use the code once:

```js
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";
// import:
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const TripsNavigator = createStackNavigator(
  {
    // turn to object and Add navigation options:

    Countries: CountriesScreen,
    CountryTrip: {
      screen: CountryTripScreen,
    },
    TripDetail: TripDetailScreen,
  },
  {
    // another object we can configure here is the:
    // options that apply to every screen:
    // defaultNavigationOptions get merged with each specific navigation option
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,

      // headerTitle : 'Stamm' //-> It does not override the content!!
      //  the settings in the first object -> win!
    },
    // ctrl + space: gives all the options.. example:
    // make the first screen to be:
    //initialRouteName:'TripDetail'
  }
);

export default createAppContainer(TripsNavigator);
```

# Notes:

1. How can you retrieve received params in a screen?
   Params can be retrieved via `props.navigation.getParam('paramname')`
2. Where can you configure the title (displayed in the header) of a screen?
   in the screen navigation
