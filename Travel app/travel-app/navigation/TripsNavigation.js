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
import { Ionicons } from "@expo/vector-icons";

// import:
import { createDrawerNavigator } from "react-navigation-drawer";
import FiltersScreen from "../screens/FiltersScreen";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary
  },
  headerTintColor: 'white',
  headerTitle: "A Screen",
};

const TripsNavigator = createStackNavigator(
  {
    Countries: CountriesScreen,
    CountryTrip: {
      screen: CountryTripScreen,
    },
    TripDetail: TripDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const FavNavigator = createStackNavigator(
  {
    Favorites: FavoriteTripScreen,
    TripDetail: TripDetailScreen,
  },
  {
    defaultNavigationOptions: defaultStackNavOptions,
  }
);

const TripsFavTabNavigator = createBottomTabNavigator(
  {
    Trips: {
      screen: TripsNavigator,
      navigationOptions: {
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
      screen: FavNavigator,
      navigationOptions: {
        tabBarLabel: "Favorites!",
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
      activeTintColor: Colors.primaryColor,
    },
  }
);

// Now is the time to use FiltersScreen
// 3. Create createStackNavigator
const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator(
  {
    tripsFavs: {
      screen: TripsFavTabNavigator,
      navigationOptions: {
        // Change title name
        drawerLabel: "Trips",
      },
    },
    Filters: FiltersNavigator,
  },
  // We can add third argument that defines the navigator itself:
  // Change the entire font-family and color
  {
    contentOptions: {
      activeTintColor: Colors.secondary,
      labelStyle: {
        // Change font-family
        fontFamily: "pattaya-regular",
      },
    },
  }
);

// 5. export the MainNavigator
export default createAppContainer(MainNavigator);