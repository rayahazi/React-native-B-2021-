# navigationOptions inside of a Navigator

When defining a navigator, you can also add navigationOptions to it:

```js
const SomeNavigator = createStackNavigator(
  {
    ScreenIdentifier: SomeScreen,
  },
  {
    navigationOptions: {
      // You can set options here!
      // Please note: This is NOT defaultNavigationOptions!
    },
  }
);
```
# Add tabs navigation - TripsNavigator.js

```js
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

// import:
import { createBottomTabNavigator } from "react-navigation-tabs";
import FavoritesScreen from "../screens/FavoritesScreen";

const TripsNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    CountryTrip: {
      screen: CountryTripScreen,
    },
    TripDetail: TripDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

// tab navigator -
const TripsFavTabNavigator = createBottomTabNavigator({
  // the TripsNavigator will be loaded as first tab:
  Trips: TripsNavigator,
  // add another tab:
  Favorites: FavoriteTripScreen,
});

export default createAppContainer(TripsFavTabNavigator);
```

## Final: with icons and text and color:

<img src="../IMG/8.PNG">
<img src="../IMG/9.PNG">

```js
import React from "react";
import { Platform } from "react-native";

import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";

import CountriesScreen from "../screens/CountriesScreen";
import CountryTripScreen from "../screens/CountryTripScreen";
import TripDetailScreen from "../screens/TripDetailScreen";
import FavoriteTripScreen from "../screens/FavoriteTripScreen";
import Colors from "../constants/Colors";

// import:
import { Ionicons } from "@expo/vector-icons";

const TripsNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    CountryTrip: {
      screen: CountryTripScreen,
    },
    TripDetail: TripDetailScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor:
        Platform.OS === "android" ? "white" : Colors.primary,
    },
  }
);

// tab navigator -
const TripsFavTabNavigator = createBottomTabNavigator(
  {
    Trips: {
      screen: TripsNavigator,
      navigationOptions: {
        // define icon: tabBarIcon is a function that receives tabBar info:
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="trail-sign-outline"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        },
      },
    },
    Favorites: {
      screen: FavoriteTripScreen,
      navigationOptions: {
        // text:
        tabBarLabel: "Favorites!",
        // define icon:
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        },
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.primary,
    },
  }
);
//export default createAppContainer(TripsNavigator);
// return this instead - leads also to the stack navigator.
export default createAppContainer(TripsFavTabNavigator);
```
